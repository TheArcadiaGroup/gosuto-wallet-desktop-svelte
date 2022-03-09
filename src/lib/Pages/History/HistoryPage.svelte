<!-- 
	@component 
	Description:
	> HistoryPage component consisting of the mid and last column for the history page.
	
	@author MikeBrandon
	@see history
-->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import HistoryComponent from './HistoryComponent/HistoryComponent.svelte';
	import GridLayout from '$lib/components/GridLayout.svelte';
	import RoundedSelect from '$lib/components/RoundedSelect.svelte';
	import Sidebar from '$lib/pages/History/HistoryComponent/Sidebar.svelte';
	import ReturnHome from '$lib/components/ReturnHome.svelte';


	export let data: GetHistoryResponse[];
	export let hideNavbar: boolean = true;
	export let isInProfileRoute: boolean = false;
	export let address: string;

	const dispatch = createEventDispatcher();

	// Get history data from data
	let historyArray: HistoryObject[] = [];
	let filteredArray: HistoryObject[];

	type TransactionStatus = 'Received' | 'Sent' | 'Stake' | 'Swap' | 'All' | undefined;
	let optionsArray: TransactionStatus[] = ['All', 'Received', 'Sent', 'Swap', 'Stake'];
	let filterId: number = 0;

	$: historyFilter = optionsArray[filterId];
	$: switch (filterId) {
		case 0:
			filteredArray = historyArray;
			break;
		case 1:
			filteredArray = historyArray.filter((obj) => obj.status === 'Received');
			break;
		case 2:
			filteredArray = historyArray.filter((obj) => obj.status === 'Sent');
			break;
		case 3:
			filteredArray = historyArray.filter((obj) => obj.status === 'Swap');
			break;
		case 4:
			filteredArray = historyArray.filter((obj) => obj.status === 'Stake');
			break;
		default:
			break;
	}

	let selectedTokenIndex = -1;

	function selectToken(e: { detail: { id: number } }): void {
		selectedTokenIndex = e.detail.id;
	}

	function showMoreItems() {
		dispatch('showMoreClicked');
	}
</script>

<GridLayout {hideNavbar}>
	<div
		class="mid-holder"
		class:spacing={!isInProfileRoute}
		class:center-mid={!hideNavbar}
		slot="mid"
	>
		<div class="main">
			<div class="header">
				{#if !isInProfileRoute}
					<h3>{historyFilter} History</h3>
				{:else}
					<ReturnHome
						walletName={$selectedWallet?.walletName || 'unknown wallet name'}
						publicKey={address || '...'}
						profileLocation="History"
					/>
					<br />
					<h3>History of this wallet</h3>
				{/if}
				<RoundedSelect {optionsArray} bind:value={filterId} />
			</div>
			<div class="history-holder">
				<!-- Received -->
				{#each filteredArray as historyObject, i}
					<HistoryComponent
						on:deselect={() => {
							selectedTokenIndex = -1;
						}}
						class={i > 0 ? 'top-border' : ''}
						on:select={selectToken}
						index={i}
						clicked={selectedTokenIndex === i}
						wallet={historyObject.wallet}
						status={historyObject.status}
						dateAndTime={historyObject.dateAndTime}
						SwapData={historyObject.SwapData}
						amount={historyObject.amount}
						price={historyObject.price}
						cryptoUnit={historyObject.cryptoUnit}
						currencyUnit={historyObject.currencyUnit}
					/>
				{/each}
			</div>
			<!-- {#if filteredArray.length >= numberOfItemsShown} -->
			<button on:click={showMoreItems}>Show more</button>
			<!-- {/if} -->
		</div>
	</div>
	<Sidebar
		slot="last"
		historyObject={selectedTokenIndex !== -1 ? filteredArray[selectedTokenIndex] : null}
	/>
</GridLayout>

<style lang="postcss" global>
	:local(.mid-holder) {
		@apply flex w-full mr-[5vw] md:w-auto;
	}

	:local(.main) {
		@apply h-screen flex flex-col w-full;
		@apply px-4 pt-10;
		@apply lg:px-11 lg:pt-20;
	}

	:local(.spacing) {
		@apply px-[5vw];
	}

	:local(h3) {
		@apply font-bold md:text-2xl ml-4 md:ml-0 mb-8 dark:text-white;
	}

	:local(.history-holder) {
		@apply w-full md:overflow-y-auto md:h-[80%] md:pr-6 md:mt-16;
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
</style>
