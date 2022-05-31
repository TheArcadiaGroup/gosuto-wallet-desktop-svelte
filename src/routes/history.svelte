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
	import { allHistoryData, previousAllHistoryData } from '$stores/user/history';

	let currentPage = 1;
	let itemsPerPage = 10;
	let walletProxyStorage: { [key: string]: { total: number; loading: boolean; fetched: number } } =
		{};
	$: totalItems = 0;
	$: loading = Object.keys(walletProxyStorage).some((key) => walletProxyStorage[key].loading);

	onMount(() => {
		pollyfillData();
		getAllHistory();
	});

	const getData = async (wallet: IWallet) => {
		walletProxyStorage[wallet.accountHash] = {
			total: walletProxyStorage[wallet.accountHash]?.total ?? 0,
			fetched: walletProxyStorage[wallet.accountHash]?.fetched ?? 0,
			loading: true,
		};

		getSingleAccountHistory(
			wallet.accountHash,
			wallet.walletAddress,
			$user?.network,
			currentPage,
			itemsPerPage,
			wallet.walletName,
		)
			.then((historyResponseObj) => {
				// If wallet has changed since this call was made, do not assign the values
				if ($allHistoryData) {
					const newData = [
						...$allHistoryData.data,
						...historyResponseObj.data.filter(
							(item) =>
								!$allHistoryData?.data.some(
									(presentItem) => presentItem.deployHash === item.deployHash,
								),
						),
					].sort(
						(a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime(),
					);

					allHistoryData.update((items) => {
						if (items) {
							items.data = newData;
						}

						return items;
					});
				} else {
					allHistoryData.update(() => historyResponseObj);
				}

				currentPage = historyResponseObj.page;
				walletProxyStorage[wallet.accountHash] = {
					total: historyResponseObj.total,
					loading: false,
					fetched: historyResponseObj.data.length,
				};

				if ($allHistoryData?.data.length === $previousAllHistoryData?.data.length) {
					totalItems = -1;
				}
			})
			.catch((err) => {
				console.log('Encountered Error Loading Page', err);
				walletProxyStorage[wallet.accountHash] = {
					total: walletProxyStorage[wallet.accountHash]?.total ?? 0,
					loading: false,
					fetched: walletProxyStorage[wallet.accountHash]?.fetched ?? 0,
				};
			});
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
			{totalItems}
			historyArray={$allHistoryData?.data || []}
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
