<!-- @component 
	Describtion:
	> Content on the middle column on /profile/stakes routes. Displays stakes from a specific wallet.
	
	Props:
	- `stakeArray` = Array with object of data about individual stakes from a specific wallet (staked amount, etc.).
	- `wallet` = Object with data of the wallet (name & public key).
	
	Events:
	- `selectStake` = Dispatched when a stake card is clicked. Passes the stake data via event details.
-->
<script lang="ts">
	// import ArrowInCircle from '$lib/components/ArrowInCircle.svelte';
	import Button from '$lib/components/Button.svelte';
	// import Duplicate from '$icons/Duplicate.svelte';
	import StakeCard from './StakeCard.svelte';
	import ReturnHome from '$lib/components/ReturnHome.svelte';

	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let stakeArray: IStake[] = [];

	$: showingArray = stakeArray.slice(0, numberOfItemsShown * pageNumber);

	let numberOfItemsShown = 6;
	let pageNumber = 1;
	let forRoute = $page.path.startsWith('/profile') ? 'profile' : 'all-stakes';

	/**Triggered when a stake card is clicked. Dispatches an event of stake selection*/
	function selectStake(e: CustomEvent) {
		dispatch('selectStake', e.detail);
	}

	function addStake() {
		dispatch('addStake');
	}

	function showMoreItems() {
		pageNumber++;
	}
</script>

<div class="main">
	{#if forRoute === 'profile'}
		<div class="header">
			<ReturnHome walletName={''} publicKey={$page.params.address} profileLocation="Stake CSPR" />
		</div>

		<div class="title item">
			<div class="title-label">Stakes from this wallet</div>
			<div>
				<Button>
					<div slot="text" class="button-label" on:click={addStake}>+ Stake</div>
				</Button>
			</div>
		</div>
	{/if}

	<div class="stake-cards-container item">
		{#each showingArray as stake}
			<StakeCard {stake} on:click={selectStake} />
		{/each}
	</div>
	<div class="show-more-container">
		{#if stakeArray.length >= numberOfItemsShown}
			<div class="show-more" on:click={showMoreItems}>Show more</div>
		{/if}
	</div>
</div>

<style lang="postcss" global>
	:local(.main) {
		@apply h-screen w-full flex flex-col gap-4 items-center dark:text-white dark:bg-dark-gosutoDark;
		@apply px-4 pt-10;
		@apply lg:px-11 lg:pt-20;
	}

	:local(.header) {
		@apply self-start;
	}

	:local(.header-name) {
		@apply text-2xl font-semibold mb-1;
	}

	:local(.header-pk) {
		@apply text-light-lighterGray ml-4 dark:text-white;
	}

	:local(.header-duplicate) {
		@apply w-4 text-light-lighterGray dark:text-white;
	}

	:local(.title) {
		@apply flex flex-row justify-between w-full;
	}

	:local(.title-label) {
		@apply text-lg font-semibold;
	}

	:local(.button-label) {
		@apply my-2 mx-4;
	}

	:local(.stake-cards-container) {
		@apply flex-grow h-0 px-8 overflow-y-scroll flex flex-col items-center gap-8 py-4 xl:h-[72vh] 2xl:h-[80vh];
	}

	:local(.show-more-container) {
		@apply w-full grid place-content-center;
	}

	:local(.show-more) {
		@apply border-2 border-light-lineColor rounded-[90px];
		@apply text-sm font-bold cursor-pointer dark:text-white;
		@apply py-2 px-4 self-center;
		@apply hover:bg-light-purple hover:text-white hover:border-light-purple transition duration-500;
	}

	:local(.item) {
		@apply w-full;
	}
</style>
