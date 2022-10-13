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
	import { userHistory } from '$stores/user/history';

	let allHistory: IHistory[] = [];
	$: allHistory;

	$: $userHistory &&
		Object.keys($userHistory[$user?.network ?? 'testnet']).map((item) => {
			if ($userHistory?.[$user?.network ?? 'testnet']?.[item]?.data) {
				const filteredItem =
					$userHistory?.[$user?.network ?? 'testnet'][item]?.data?.filter(
						(newItem) =>
							!allHistory.some((previousItem) => previousItem.deployHash === newItem.deployHash),
					) ?? [];

				allHistory = [...allHistory, ...filteredItem].sort(
					(a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime(),
				);
			}
		});

	onMount(() => {
		pollyfillData();
		getAllHistory();
	});

	const getData = async (wallet: IWallet) => {
		getSingleAccountHistory(
			wallet.accountHash,
			wallet.publicKey,
			$user?.network,
			wallet.walletName,
		);
	};

	async function getAllHistory() {
		$wallets?.forEach((wallet) => {
			getData(wallet);
		});
	}

	function showMoreItems() {
		getAllHistory();
	}

	$: if ($user?.network) {
		allHistory = [];
		getAllHistory();
	}
</script>

<div class="flex">
	<div class="global-grid-nav">
		<Navbar />
	</div>
	<div class="global-grid-mid">
		<HistoryPage historyArray={allHistory || []} on:showMoreClicked={showMoreItems} />
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
