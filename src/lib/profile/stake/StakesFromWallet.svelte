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
	import ArrowInCircle from '$lib/Common/ArrowInCircle.svelte';
	import Button from '$lib/Common/Button.svelte';
	import Duplicate from '$icons/Duplicate.svelte';
	import StakeCard from './StakeCard.svelte';
	import { goto } from '$app/navigation';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	interface Stake {
		name: string;
		elapsedSeconds: number;
		fullSeconds: number;
		staked: number;
		unlocked: number;
	}

	export let stakeArray: Stake[];
	export let wallet: any;

	/**Handler for clicking the back button in the middle column. Redirects back from `/profile/stakes` to `/profile`*/
	function backHandler() {
		goto('/profile');
	}

	/**Handler for clicking the public key that copies the PK to user's clipboard.*/
	function copyPK() {
		// TODO copy public key to clipboard (I assume that this is what this is supposed to do)
	}

	/**Triggered when a stake card is clicked. Dispatches an event of stake selection*/
	function stakeSelect(e: CustomEvent) {
		dispatch('stakeSelect', e.detail);
	}

	// DEV
	wallet = {
		name: 'Wallet 1',
		publicKey: '0x9f98e01d2...4ed7',
	};

	stakeArray = Array(10).fill({
		name: wallet?.name,
		elapsedSeconds: 20,
		fullSeconds: 69,
		staked: 420,
		unlocked: 69,
	});
</script>

<div class="main">
	<div class="header item">
		<div class="h-6">
			<ArrowInCircle disabled={false} alwaysShowBorder={true} on:click={backHandler} />
		</div>
		<div class="header-name">{wallet?.name || 'unknown wallet name'}</div>
		<div class="header-pk">{wallet?.publicKey || '...'}</div>
		<div class="header-duplicate" on:click={copyPK}>
			<Duplicate />
		</div>
	</div>

	<div class="title item">
		<div class="title-label">Stakes from this wallet</div>
		<div>
			<Button>
				<div slot="text" class="button-label">+ Stake</div>
			</Button>
		</div>
	</div>
	<div class="stake-cards-container item">
		{#each stakeArray as stake}
			<StakeCard {stake} on:click={stakeSelect} />
		{/each}
	</div>
	<div class="show-more-container">
		<!-- TODO show this only, when there are too many cards -->
		<div class="show-more">Show more</div>
	</div>
</div>

<style lang="postcss" global>
	:local(.main) {
		@apply h-full w-full flex flex-col items-center py-4 md:py-10 gap-4 dark:text-white;
	}

	:local(.header) {
		@apply flex flex-row gap-3 items-center px-4;
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
		@apply flex flex-row justify-between px-8;
	}

	:local(.title-label) {
		@apply text-lg font-semibold;
	}

	:local(.button-label) {
		@apply my-2 mx-4;
	}

	:local(.stake-cards-container) {
		@apply flex-grow h-0 px-8 overflow-y-scroll flex flex-col items-center gap-8 py-4;
	}

	:local(.show-more-container) {
		@apply w-full grid place-content-center;
	}

	:local(.show-more) {
		@apply rounded-full py-1 px-3 font-semibold cursor-pointer text-xs border-2 border-l-light-scrollBar hover:bg-light-scrollBar transition-all;
	}

	:local(.item) {
		@apply w-full;
	}
</style>
