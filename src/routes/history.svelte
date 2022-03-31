<script lang="ts">
	import { onMount } from 'svelte';

	import { getSingleAccountHistory } from '$utils/getHistory';
	import { sidebarContent } from '$stores/HistoryStore';
	import { retrieveData } from '$utils/dataStorage';

	import HistoryPage from '$lib/pages/History/HistoryPage.svelte';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
	import Sidebar from '$lib/pages/History/HistoryComponent/Sidebar.svelte';
	import pollyfillData from '$utils/pollyfillData';
	import { wallets } from '$stores/user/wallets';

	let data: HistoryObject[] = [];

	let currentPage = 1;
	let itemsPerPage = 10;

	onMount(() => {
		pollyfillData();

		getAllHistory();
	});

	const getData = async (wallet: IWallet) => {
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
		{#if data}
			<HistoryPage on:showMoreClicked={showMoreItems} />
		{/if}
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
