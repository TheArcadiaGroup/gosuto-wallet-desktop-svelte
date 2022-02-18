<!-- 
	@component 
	Description:
	> HistoryPage component consisting of the mid and last column for the history page.
	
	@author MikeBrandon
	@see history
-->
<script lang="ts">
	import HistoryComponent from '$lib/components/HistoryComponent.svelte';
	import GridLayout from '$lib/Common/GridLayout.svelte';
	import RoundedSelect from '$lib/Common/RoundedSelect.svelte';
	import Sidebar from '$lib/components/HistoryComponent/sidebar.svelte';
	import ReturnHome from '$lib/components/Profile/ReturnHome.svelte';

	export let historyArray: HistoryObject[];
	export let hideNavbar: boolean = true;
	export let isInProfileRoute: boolean = false;
	export let walletNumber: string = '1';
	export let address: string = '0x9f98e01d3...4ed7';
	let filteredArray: HistoryObject[];
	let showingArray: HistoryObject[];

	let numberOfItemsShown = 7;
	let pageNumber = 1;

	let optionsArray: string[] = ['All', 'Received', 'Sent', 'Swap', 'Stake'];
	let filterId: number = 0;
	$: historyFilter = optionsArray[filterId];

	$: showingArray = historyArray.slice(0, numberOfItemsShown * pageNumber);

	$: switch (filterId) {
		case 0:
			filteredArray = showingArray;
			break;
		case 1:
			filteredArray = showingArray.filter((obj) => obj.status === 'Received');
			break;
		case 2:
			filteredArray = showingArray.filter((obj) => obj.status === 'Sent');
			break;
		case 3:
			filteredArray = showingArray.filter((obj) => obj.status === 'Swap');
			break;
		case 4:
			filteredArray = showingArray.filter((obj) => obj.status === 'Stake');
			break;
		default:
			break;
	}

	let selectedTokenIndex = -1;

	function selectToken(e: { detail: { id: number } }): void {
		selectedTokenIndex = e.detail.id;
	}

	function showMoreItems() {
		pageNumber++;
	}
</script>

<GridLayout {hideNavbar}>
	<div class="mid-holder" class:center-mid={!hideNavbar} slot="mid">
		<div class="main">
			<div class="header">
				{#if !isInProfileRoute}
					<h3>{historyFilter} History</h3>
				{:else}
					<ReturnHome {walletNumber} publicKey={address} profileLocation="History" />
					<br />
					<h3>History of this wallet</h3>
				{/if}
				<RoundedSelect {optionsArray} bind:value={filterId} />
			</div>
			<div class="history-holder">
				<!-- Received -->
				{#each showingArray as historyObject, i}
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
			{#if filteredArray.length >= numberOfItemsShown}
				<button on:click={showMoreItems}>Show more</button>
			{/if}
		</div>
	</div>
	<Sidebar
		slot="last"
		historyObject={selectedTokenIndex !== -1 ? filteredArray[selectedTokenIndex] : null}
	/>
</GridLayout>

<style lang="postcss" global>
	:local(.mid-holder) {
		@apply flex items-center md:justify-end mr-[2vw] w-full md:w-auto px-4;
	}

	:local(.center-mid) {
		@apply md:justify-center;
	}

	:local(.main) {
		@apply h-screen flex flex-col w-full md:max-w-[50vw] pt-8 2xl:pt-16;
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
</style>
