<script lang="ts">
	import { onMount } from 'svelte';

	import HistoryPage from '$lib/pages/History/HistoryPage.svelte';
	import ProfileNavigation from '$lib/pages/Profile/ProfileNavigation.svelte';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
	import Sidebar from '$lib/pages/History/HistoryComponent/Sidebar.svelte';

	import { page } from '$app/stores';
	import { getSingleAccountHistory } from '$utils/getHistory';
	import { sidebarContent } from '$stores/HistoryStore';
	import { pollyFillWallets, pollyFillUser, pollyfillSelectedProfile } from '$utils/pollyfillData';
	import { selectedWallet, wallets } from '$stores/user/wallets';
	import { saveData } from '$utils/dataStorage';

	let data: HistoryObject[] = [];
	let wallet: IWallet | null = $selectedWallet;
	$: walletAddress = $page.params.address;

	let currentPage = 1;
	let itemsPerPage = 10;

	onMount(() => {
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
				pollyfillSelectedProfile();
			}
		}

		// Can only be called once the user has been set
		getData();
	});

	const getData = async () => {
		wallet =
			$selectedWallet || $wallets?.filter((wallet) => wallet.walletAddress === walletAddress)[0];

		if (wallet) {
			const historyObj = await getSingleAccountHistory(
				wallet.accountHash,
				currentPage,
				itemsPerPage,
			);
			data = [...data, historyObj.data];
		} else {
			// Better UI Based Error Needed
			throw Error('Wallet Not Loaded');
		}
	};

	function showMoreItems() {
		currentPage++;
		getData();
	}

	function creditCardClicked() {
		getData();
	}
</script>

{#if data}
	<div class="flex">
		<div class="global-grid-nav">
			<Navbar />
		</div>
		<div class="global-grid-left">
			<ProfileNavigation on:cardClicked={creditCardClicked} />
		</div>
		<div class="global-grid-mid">
			<HistoryPage on:showMoreClicked={showMoreItems} />
		</div>
		<div class="global-grid-right">
			<Sidebar historyObject={$sidebarContent} />
		</div>
	</div>
{/if}

<style lang="postcss" global>
	/* :local(.size-full) {
		@apply w-full h-full;
	} */
</style>
