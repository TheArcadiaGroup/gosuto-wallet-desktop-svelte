<!-- 
	@component 
	Description:
	> HistoryPage component consisting of the mid and last column for the history page.
	
	@author MikeBrandon
	@see history
-->
<script lang="ts">
	import RoundedSelect from '$lib/components/RoundedSelect.svelte';
	import ReturnHome from '$lib/components/ReturnHome.svelte';
	import { sidebarContent } from '$stores/HistoryStore';
	import { page } from '$app/stores';
	import { selectedWallet } from '$stores/user/wallets';
	import HistoryComponent from './HistoryComponent/HistoryComponent.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { historyLoading } from '$stores/user/history';

	$: isInProfileRoute = $page.url.pathname.startsWith('/profile');
	$: address = $page.params.address;
	$: walletName = $selectedWallet?.walletName || "Unknown's Wallet";

	sidebarContent.set(null);

	// Get history data from data
	export let historyArray: IHistory[] = [];

	let filteredArray: IHistory[];

	let optionsArray = ['all', 'receive', 'sent', 'swap', 'stake'];
	let filterId: number = 0;

	$: historyFilter = optionsArray[filterId];
	// TODO: REBUILD/REWORK THIS
	$: switch (filterId) {
		case 0:
			filteredArray = historyArray;
			break;
		case 1:
			filteredArray = historyArray.filter((obj) => obj.transactionType === 'receive');
			break;
		case 2:
			filteredArray = historyArray.filter((obj) => obj.transactionType === 'send');
			break;
		case 3:
			filteredArray = historyArray.filter((obj) => obj.transactionType === 'swap');
			break;
		case 4:
			filteredArray = historyArray.filter((obj) => obj.transactionType === 'stake');
			break;
		default:
			filteredArray = historyArray;
			break;
	}

	let selectedHistoryItem: IHistory | null = null;

	function historySelectionsListener(event: any): void {
		if (!event.target) return;

		const isInToken = Boolean(event.target.closest('.history-card-item'));

		if (!isInToken) {
			selectedHistoryItem = null;
			sidebarContent.set(null);
		}
	}
</script>

<div
	class="history-cards-parent"
	class:centered={!isInProfileRoute}
	on:click={historySelectionsListener}
>
	<div class="header">
		{#if !isInProfileRoute}
			<h3 class="history-title">{historyFilter} History</h3>
		{:else}
			<ReturnHome {walletName} publicKey={address} profileLocation="History" />
			<br />
			<h3>History of this wallet</h3>
		{/if}
		<RoundedSelect {optionsArray} bind:value={filterId} />
	</div>
	<div class="history-holder">
		{#each filteredArray as historyObject, i}
			<HistoryComponent
				class={i > 0 ? 'top-border' : ''}
				on:click={() => {
					selectedHistoryItem = historyObject;
					sidebarContent.set(historyObject);
				}}
				{historyObject}
				bind:selectedHistoryItem
			/>
		{/each}
		{#if $historyLoading}
			<Loading class="h-1/3 w-1/3" />
		{/if}
	</div>
</div>

<style lang="postcss" global>
	:local(.history-cards-parent) {
		@apply h-screen flex flex-col w-full;
		@apply px-4 pt-10;
		@apply lg:px-11 lg:pt-20;
	}

	:local(.centered) {
		@apply max-w-[60vw] mr-[5vw];
	}
	/* 
	:local(.spacing) {
		@apply px-[5vw];
	} */

	:local(h3) {
		@apply font-bold md:text-2xl ml-4 md:ml-0 mb-8 dark:text-white;
	}

	:local(.history-holder) {
		@apply w-full md:min-w-max md:overflow-y-auto md:h-[80%] md:pr-6 md:mt-16;
	}
	/* 
	:local(button) {
		@apply border-2 border-light-lineColor rounded-[90px];
		@apply text-sm font-bold dark:text-white;
		@apply my-6 py-2 px-4 self-center;
		@apply hover:bg-light-purple hover:text-white hover:border-light-purple transition duration-500;
	} */

	:local(.header) {
		@apply relative items-center justify-between md:flex-col md:items-start md:justify-start;
	}

	:local(.history-title) {
		@apply capitalize;
	}
</style>
