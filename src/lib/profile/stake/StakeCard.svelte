<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	import ProgressBar from '$lib/Common/ProgressBar.svelte';
	export let stake: {
		name: string;
		elapsedSeconds: number;
		fullSeconds: number;
		staked: number;
		unlocked: number;
	};

	$: progress = stake?.elapsedSeconds / stake?.fullSeconds;

	function formatTime(sec: number) {
		return new Date((sec || 0) * 1000).toUTCString().split(' ')[4];
	}

	function openStake() {
		dispatch('click', { stake });
	}
</script>

<div class="main" on:click={openStake}>
	<div class="name">
		{stake?.name || 'unknown wallet name'}
	</div>
	<div class="first-line">
		<div class={progress * 100 > 0 ? 'text-highlight' : 'text-normal'}>
			{stake?.staked || 0} CSPR Staked
		</div>
		<div class="text-center {progress * 100 >= 50 ? 'text-highlight' : 'text-normal'}">
			{stake?.unlocked || 0} CSPR Unlocked
		</div>
	</div>
	<div class="progress-bar">
		<ProgressBar value={progress * 100 || 0} />
	</div>
	<div class="third-line">
		<div class={progress * 100 > 0 ? 'text-highlight' : 'text-normal'}>Staked on 1 Dec 2021</div>
		<div class="text-center {progress * 100 >= 50 ? 'text-highlight' : 'text-normal'}">
			Unlocked on 1 Dec 2021
			<!-- TODO figure out the dates here -->
		</div>
		<div class="text-right {progress * 100 >= 100 ? 'text-highlight' : 'text-normal'}">
			Reward on 1 Dec 2021
		</div>
	</div>
	<div class="time-container">
		<div class="elapsed {stake?.elapsedSeconds === 0 && 'text-highlight'}">
			{formatTime(stake?.elapsedSeconds || 0)}
		</div>
		<div class="full {stake?.fullSeconds === 0 && 'text-highlight'}">
			{formatTime(stake?.fullSeconds || 0)}
		</div>
	</div>
	<div class="footer">
		<div class="footer-label">Total time until reward</div>
		<div class="footer-time {stake?.fullSeconds - stake?.elapsedSeconds === 0 && 'text-highlight'}">
			{formatTime(stake?.fullSeconds - stake?.elapsedSeconds || 0)}
		</div>
	</div>
</div>

<style lang="postcss" global>
	:local(.main) {
		@apply w-full rounded-2xl shadow-md flex flex-col px-8 py-6 gap-2 max-w-2xl dark:bg-dark-grey dark:text-light-gray cursor-pointer transition-all hover:shadow-lg;
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
