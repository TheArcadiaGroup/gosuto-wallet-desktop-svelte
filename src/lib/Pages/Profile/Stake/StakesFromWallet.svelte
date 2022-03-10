<!-- @component 
	Describtion:
	> Content on the middle column on /profile/stakes routes. Displays stakes from a specific wallet.
	
	Props:
	- `stakeArray` = Array with object of data about individual stakes from a specific wallet (staked amount, etc.).
	- `wallet` = Object with data of the wallet (name & public key).
	
	Events:
	- `stakeSelect` = Dispatched when a stake card is clicked. Passes the stake data via event details.
-->
<script lang="ts">
	import ArrowInCircle from '$lib/components/ArrowInCircle.svelte';
	import Button from '$lib/components/Button.svelte';
	import Duplicate from '$icons/Duplicate.svelte';
	import StakeCard from './StakeCard.svelte';
	import { goto } from '$app/navigation';
	import ReturnHome from '$lib/components/ReturnHome.svelte';

	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	import { shortenAddress } from '$utils';

	const dispatch = createEventDispatcher();

	export let stakeArray: IStake[];
	export let wallet: IWallet;
	export let forRoute: 'profile' | 'all-stakes' = 'profile';

	$: showingArray = stakeArray.slice(0, numberOfItemsShown * pageNumber);

	let numberOfItemsShown = 6;
	let pageNumber = 1;

	/**Handler for clicking the back button in the middle column. Redirects back from `/profile/stakes` to `/profile`*/
	function backHandler() {
		goto(`/${forRoute}`);
	}

	/**Handler for clicking the public key that copies the PK to user's clipboard.*/
	function copyPK() {
		// TODO copy public key to clipboard (I assume that this is what this is supposed to do)
	}

	/**Triggered when a stake card is clicked. Dispatches an event of stake selection*/
	function stakeSelect(e: CustomEvent) {
		dispatch('stakeSelect', e.detail);
	}

	function addStake() {
		dispatch('addStake');
	}

	function showMoreItems() {
		pageNumber++;
	}
</script>

<div class="main">
	<div class="header">
		<ReturnHome
			walletName={wallet?.walletName || 'Unknown'}
			publicKey={shortenAddress($page.params.address)}
			profileLocation="Stakes"
		/>
	</div>

	<div class="title item">
		<div class="title-label">Stakes from this wallet</div>
		<div>
			<Button>
				<div slot="text" class="button-label" on:click={addStake}>+ Stake</div>
			</Button>
		</div>
	</div>
	<div class="stake-cards-container item">
		{#each showingArray as stake}
			<StakeCard {stake} on:click={stakeSelect} />
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
