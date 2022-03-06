<!-- @component 
	Describtion:
	> A card component representing individual stakes in the StakesFromWallet component.
	
	Props:
	- `stake` = An object with data of the stake (name, staked amount, etc.)
	
	Events:
	- `click` = Dispatched when the card is clicked. Passes the stake data and the `closeStake()` function via the event details.
-->
<script lang="ts">
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import { convertDate } from '$utils';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let stake: IStake;

	let elapsedSeconds = Math.abs(new Date() - new Date(stake?.initialStakeDate)) / 1000;
	let fullSeconds =
		Math.abs(new Date(stake?.rewardDate) - new Date(stake?.initialStakeDate)) / 1000;

	$: progress = elapsedSeconds / fullSeconds; // progress in % of the stake

	/**Function that formats time from seconds to specified displaying format*/
	function formatTime(sec: number) {
		return new Date((sec || 0) * 1000).toUTCString().split(' ')[4];
	}

	let open = false; // Boolean variable that determines if the stake is open (it's details are shown in the third column). Used for deciding whether to show the highligh border.

	/**Function that is passed as an event property that closes this stake (hides the highlight border)*/
	function closeStake() {
		open = false;
	}

	/**Handler for clicking on the card that dispatches an event and shows the highlight border*/
	function openStake() {
		dispatch('click', { stake, closeStake });
		open = true;
	}
</script>

<div class="main {open && 'open'}" on:click={openStake}>
	<div class="name">
		{stake?.parentWallet || 'unknown wallet name'}
	</div>
	<div class="first-line">
		<div class={progress * 100 > 0 ? 'text-highlight' : 'text-normal'}>
			{stake?.stakeAmount || 0} CSPR Staked
		</div>
		<div class="text-center {progress * 100 >= 50 ? 'text-highlight' : 'text-normal'}">
			{stake?.unlocked || 0} CSPR Unlocked
		</div>
	</div>
	<div class="progress-bar">
		<ProgressBar value={progress * 100 || 0} />
	</div>
	<div class="third-line">
		<div class={progress * 100 > 0 ? 'text-highlight' : 'text-normal'}>
			Staked on {convertDate(stake?.initialStakeDate) || 0}
		</div>
		<div class="text-center {progress * 100 >= 50 ? 'text-highlight' : 'text-normal'}">
			Unlocked on {convertDate(stake?.reclamationDate) || 0}
			<!-- TODO figure out the dates here -->
		</div>
		<div class="text-right {progress * 100 >= 100 ? 'text-highlight' : 'text-normal'}">
			Reward on {convertDate(stake?.rewardDate) || 0}
		</div>
	</div>
	<div class="time-container">
		<div class="elapsed {elapsedSeconds === 0 && 'text-highlight'}">
			{formatTime(elapsedSeconds || 0)}
		</div>
		<div class="full {fullSeconds === 0 && 'text-highlight'}">
			{formatTime(fullSeconds || 0)}
		</div>
	</div>
	<div class="footer">
		<div class="footer-label">Total time until reward</div>
		<div class="footer-time {fullSeconds - elapsedSeconds === 0 && 'text-highlight'}">
			{formatTime(fullSeconds - elapsedSeconds || 0)}
		</div>
	</div>
</div>

<style lang="postcss" global>
	:local(.main) {
		@apply w-full rounded-2xl shadow-md flex flex-col px-8 py-6 gap-2 max-w-2xl dark:bg-dark-grey dark:text-light-gray cursor-pointer transition-all hover:shadow-lg border border-transparent;
	}

	:local(.open) {
		@apply border-light-orange;
	}

	:local(.name) {
		@apply font-bold dark:font-semibold dark:text-white;
	}

	:local(.first-line) {
		@apply grid grid-cols-3 w-full place-content-between text-sm;
	}

	:local(.progress-bar) {
		@apply w-full h-4;
	}

	:local(.third-line) {
		@apply grid grid-cols-3 w-full place-content-between text-sm;
	}
	:local(.text-highlight) {
		@apply text-light-orange font-semibold;
	}

	:local(.time-container) {
		@apply grid grid-cols-2 w-full place-items-center text-sm;
	}

	:local(.elapsed) {
		@apply border-r border-b w-full text-center border-dashed border-light-grey pb-2;
	}

	:local(.full) {
		@apply border-b w-full text-center border-dashed border-light-grey pb-2;
	}

	:local(.footer) {
		@apply w-full text-sm mt-2;
	}

	:local(.footer-label) {
		@apply w-full text-center;
	}

	:local(.footer-time) {
		@apply w-full text-center;
	}

	:local(.text-normal) {
		@apply text-light-gray;
	}
</style>
