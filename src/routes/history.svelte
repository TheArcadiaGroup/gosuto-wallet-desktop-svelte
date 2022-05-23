<script lang="ts">
	import { onMount } from 'svelte';

	import { getSingleAccountHistory } from '$utils/getHistory';
	import { sidebarContent } from '$stores/HistoryStore';

	import HistoryPage from '$lib/pages/History/HistoryPage.svelte';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
	import Sidebar from '$lib/pages/History/HistoryComponent/Sidebar.svelte';
	import pollyfillData from '$utils/pollyfillData';
	import { wallets } from '$stores/user/wallets';
	import { user } from '$stores/user';

	let historyData: HistoryResponse | null = null;

	let currentPage = 1;
	let itemsPerPage = 10;
	let totalPages = 1;
	let loading = false;

	onMount(() => {
		pollyfillData();

		getAllHistory();
	});

	const getData = async (wallet: IWallet) => {
		loading = true;

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

	async function getAllHistory() {
		$wallets?.forEach((wallet) => {
			getData(wallet);
		});
	}

	function showMoreItems() {
		currentPage++;
		getAllHistory();
	}
</script>

<div class="flex">
	<div class="global-grid-nav">
		<Navbar />
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

<style lang="postcss" global>
	:local(.global-grid-mid) {
		@apply dark:bg-dark-background;
		@apply flex w-full justify-end;
	}
</style>
