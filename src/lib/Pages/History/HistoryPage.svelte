<!-- 
	@component 
	Description:
	> HistoryPage component consisting of the mid and last column for the history page.
	
	@author MikeBrandon
	@see history
-->
<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	// import HistoryComponent from './HistoryComponent/HistoryComponent.svelte';
	import RoundedSelect from '$lib/components/RoundedSelect.svelte';
	import ReturnHome from '$lib/components/ReturnHome.svelte';
	import { sidebarContent } from '$stores/HistoryStore';
	import { page } from '$app/stores';
	import { selectedWallet } from '$stores/user/wallets';
	import { shortenAddress } from '$utils';

	$: isInProfileRoute = $page.path.startsWith('/profile');
	$: address = $page.params.address;
	$: walletName = $selectedWallet?.walletName || "Unknown's Wallet";

	const dispatch = createEventDispatcher();

	sidebarContent.set(null);

	// Get history data from data
	let historyArray: IHistory[] = $selectedWallet?.walletHistory || [];
	let filteredArray: IHistory[];

	let optionsArray = ['all', 'receive', 'send', 'swap', 'stake'];
	let filterId: number = 0;

	$: historyFilter = optionsArray[filterId];
	// TODO: REBUILD/REWORK THIS
	// $: switch (filterId) {
	// 	case 0:
	// 		filteredArray = historyArray;
	// 		break;
	// 	case 1:
	// 		filteredArray = historyArray.filter((obj) => obj.transactionType === 'receive');
	// 		break;
	// 	case 2:
	// 		filteredArray = historyArray.filter((obj) => obj.transactionType === 'send');
	// 		break;
	// 	case 3:
	// 		filteredArray = historyArray.filter((obj) => obj.transactionType === 'swap');
	// 		break;
	// 	case 4:
	// 		filteredArray = historyArray.filter((obj) => obj.transactionType === 'stake');
	// 		break;
	// 	default:
	// 		break;
	// }

	let selectedTokenIndex = -1;

	function selectToken(e: { detail: { id: number } }): void {
		selectedTokenIndex = e.detail.id;
		// TODO: REBUILD/REWORK THIS
		// sidebarContent.set(filteredArray[selectedTokenIndex]);
	}

	function showMoreItems() {
		dispatch('showMoreClicked');
	}
</script>

<div class="main" class:centered={!isInProfileRoute}>
	<div class="header">
		{#if !isInProfileRoute}
			<h3 class="history-title">{historyFilter} History</h3>
		{:else}
			<ReturnHome {walletName} publicKey={shortenAddress(address)} profileLocation="History" />
			<br />
			<h3>History of this wallet</h3>
		{/if}
		<RoundedSelect {optionsArray} bind:value={filterId} />
	</div>
	<div class="history-holder">
		<!-- Received -->
		<!-- TODO: REBUILD/REWORK THIS -->
		<!-- {#each filteredArray as historyObject, i}
			<div class="bg-red-400">Replace with Improved History Component</div>
			<HistoryComponent
				on:deselect={() => {
					selectedTokenIndex = -1;
				}}
				class={i > 0 ? 'top-border' : ''}
				on:select={selectToken}
				index={i}
				clicked={selectedTokenIndex === i}
				wallet={$selectedWallet?.walletName}
				status={historyObject.transactionType}
				dateAndTime={historyObject.transactionDate}
				SwapData={historyObject.SwapData}
				amount={historyObject.transactionFee}
				price={historyObject.transactionFee}
				cryptoUnit={historyObject.transactionHash}
				currencyUnit={historyObject.currencyUnit}
			/>
		{/each} -->
	</div>
	<button on:click={showMoreItems}>Show more</button>
</div>

<style lang="postcss" global>
	:local(.main) {
		@apply h-screen flex flex-col w-full;
		@apply px-4 pt-10;
		@apply lg:px-11 lg:pt-20;
	}

	:local(.centered) {
		@apply max-w-[60vw] mr-[5vw];
	}

	:local(.spacing) {
		@apply px-[5vw];
	}

	:local(h3) {
		@apply font-bold md:text-2xl ml-4 md:ml-0 mb-8 dark:text-white;
	}

	:local(.history-holder) {
		@apply w-full md:min-w-max md:overflow-y-auto md:h-[80%] md:pr-6 md:mt-16;
	}

	:local(button) {
		@apply border-2 border-light-lineColor rounded-[90px];
		@apply text-sm font-bold dark:text-white;
		@apply my-6 py-2 px-4 self-center;
		@apply hover:bg-light-purple hover:text-white hover:border-light-purple transition duration-500;
	}

	:local(.header) {
		@apply relative items-center justify-between md:flex-col md:items-start md:justify-start;
	}

	:local(.history-title) {
		@apply capitalize;
	}
</style>
