<script lang="ts">
	import HistoryPage from '$lib/pages/History/HistoryPage.svelte';
	import ProfileNavigation from '$lib/pages/Profile/ProfileNavigation.svelte';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
	import Sidebar from '$lib/pages/History/HistoryComponent/Sidebar.svelte';

	import { page } from '$app/stores';
	import { getSingleAccountHistory } from '$utils/getHistory';
	import { sidebarContent } from '$stores/HistoryStore';
	import { pollyFillWallets, pollyFillUser, pollyfillSelectedWallet } from '$utils/pollyfillData';
	import { previousSelectedWallet, selectedWallet, wallets } from '$stores/user/wallets';
	import { saveData } from '$utils/dataStorage';
	import { user } from '$stores/user';
	import { onMount } from 'svelte';
	import { userHistory } from '$stores/user/history';

	let wallet: IWallet | null = $selectedWallet;
	$: walletAddress = $page.params.address;

	const populateData = () => {
		pollyFillUser();

		// select the desired profile
		if ($wallets.length <= 0) {
			pollyFillWallets();
		}

		// select wallet
		if ($selectedWallet?.walletAddress !== walletAddress) {
			const newlySelectedWallet = $wallets.find(
				(_wallet) => _wallet.walletAddress.toLowerCase() === walletAddress.toLowerCase(),
			);

			if (newlySelectedWallet) {
				selectedWallet.set(newlySelectedWallet);
				saveData('selectedProfile', JSON.stringify(newlySelectedWallet));
			} else {
				pollyfillSelectedWallet();
			}
		}
	};

	const getData = async () => {
		wallet =
			$selectedWallet || $wallets?.filter((wallet) => wallet.walletAddress === walletAddress)[0];

		if (wallet) {
			getSingleAccountHistory(
				wallet.accountHash,
				wallet.walletAddress,
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
		if (_wallet?.walletAddress) {
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
		<HistoryPage historyArray={$userHistory?.[walletAddress]?.data || []} />
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
