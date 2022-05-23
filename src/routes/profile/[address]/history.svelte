<script lang="ts">
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
	import { user } from '$stores/user';
	import { onMount } from 'svelte';

	let historyData: HistoryResponse | null = null;
	let wallet: IWallet | null = $selectedWallet;
	$: walletAddress = $page.params.address;

	let currentPage = 1;
	let itemsPerPage = 10;
	let totalPages = 1;
	let loading = false;

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
				pollyfillSelectedProfile();
			}
		}

		// Can only be called once the user has been set
		getData();
	};

	const getData = async () => {
		loading = true;
		wallet =
			$selectedWallet || $wallets?.filter((wallet) => wallet.walletAddress === walletAddress)[0];

		if (wallet) {
			getSingleAccountHistory(wallet.accountHash, $user?.network, currentPage, itemsPerPage)
				.then((historyResponseObj) => {
					if (historyData) {
						const filteredItems = historyResponseObj.data.filter(
							(item) =>
								!historyData?.data.find(
									(prevItem) => prevItem.deployHash.toLowerCase() === item.deployHash.toLowerCase(),
								),
						);

						historyData.data = [...historyData?.data, ...filteredItems];
					} else {
						historyData = historyResponseObj;
					}

					totalPages = historyResponseObj.pageCount;
					currentPage = historyResponseObj.page;
				})
				.catch(() => {
					console.log('Encountered Error Loadin Page');
				});

			// TODO: Potentially Cache these results
		} else {
			// Better UI Based Error Needed
			throw Error('Wallet Not Loaded');
		}
		loading = false;
	};

	function showMoreItems() {
		const totalPages = historyData?.pageCount || 0;
		if (currentPage !== totalPages) {
			currentPage++;
			getData();
		}
	}

	function creditCardClicked() {
		getData();
	}

	onMount(() => {
		historyData = null;
		populateData();
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
		<HistoryPage
			{loading}
			{totalPages}
			{currentPage}
			historyArray={historyData?.data || []}
			on:showMoreClicked={showMoreItems}
		/>
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
