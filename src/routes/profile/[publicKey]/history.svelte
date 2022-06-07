<script lang="ts">
	import HistoryPage from '$lib/pages/History/HistoryPage.svelte';
	import ProfileNavigation from '$lib/pages/Profile/ProfileNavigation.svelte';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
	import Sidebar from '$lib/pages/History/HistoryComponent/Sidebar.svelte';

	import { page } from '$app/stores';
	import { getSingleAccountHistory } from '$utils/getHistory';
	import { sidebarContent } from '$stores/HistoryStore';
	import { pollyFillWallets, pollyFillUser, pollyfillSelectedWallet } from '$utils/pollyfillData';
	import { selectedWallet, wallets } from '$stores/user/wallets';
	import { saveData } from '$utils/dataStorage';
	import { user } from '$stores/user';
	import { onMount } from 'svelte';
	import { userHistory } from '$stores/user/history';

	let wallet: IWallet | null = $selectedWallet;
	$: publicKey = $page.params.publicKey;

	const populateData = () => {
		pollyFillUser();

		// select the desired profile
		if ($wallets.length <= 0) {
			pollyFillWallets();
		}

		// select wallet
		if ($selectedWallet?.publicKey !== publicKey) {
			const newlySelectedWallet = $wallets.find(
				(_wallet) => _wallet.publicKey.toLowerCase() === publicKey.toLowerCase(),
			);

			if (newlySelectedWallet) {
				selectedWallet.set(newlySelectedWallet);
				saveData('selectedWallet', newlySelectedWallet);
			} else {
				pollyfillSelectedWallet();
			}
		}
	};

	const getData = async () => {
		wallet = $selectedWallet || $wallets?.filter((wallet) => wallet.publicKey === publicKey)[0];

		if (wallet) {
			getSingleAccountHistory(
				wallet.accountHash,
				wallet.publicKey,
				$user?.network,
				wallet.walletName,
			);
		} else {
			throw Error('Wallet Not Loaded');
		}
	};

	function creditCardClicked() {
		getData();
	}

	onMount(() => {
		populateData();
		getData();
	});

	selectedWallet.subscribe((_wallet) => {
		if (_wallet?.publicKey) {
			getData();
		}
	});
</script>

<div class="flex">
	<div class="global-grid-nav">
		<Navbar />
	</div>
	<div class="global-grid-left">
		<ProfileNavigation on:cardClicked={creditCardClicked} />
	</div>
	<div class="global-grid-mid">
		<HistoryPage historyArray={$userHistory?.[publicKey]?.data || []} />
	</div>
	<div class="global-grid-right">
		<Sidebar historyObject={$sidebarContent} />
	</div>
</div>

<!-- <style lang="postcss" global>
	/* :local(.size-full) {
		@apply w-full h-full;
	} */
</style> -->
