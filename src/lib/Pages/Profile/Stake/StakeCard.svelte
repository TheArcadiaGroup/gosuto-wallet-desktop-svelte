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
	import { convertDate, shortenAddress } from '$utils';

	export let stake: IStake;
	export let selectedStake: IStake | null = null;

	let elapsedSeconds =
		Math.abs(new Date().getTime() - new Date(stake?.initialStakeDate).getTime()) / 1000;
	let fullSeconds =
		Math.abs(
			new Date(stake?.latestRewardDate).getTime() - new Date(stake?.initialStakeDate).getTime(),
		) / 1000;

	/**Function that formats time from seconds to specified displaying format*/
	function formatTime(sec: number) {
		return new Date((sec || 0) * 1000).toUTCString().split(' ')[4];
	}
</script>

<div
	class="stake-card-item {selectedStake?.validator === stake.validator ? 'selected' : ''}"
	on:click
>
	<div class="name">
		{stake?.validator
			? stake?.validator.length === 66
				? shortenAddress(stake?.validator)
				: stake?.validator
			: 'Unknown Validator'}
	</div>
	<div class="first-line">
		<div
			class="flex flex-col items-start justify-center {stake?.stakeAmount > 0
				? 'text-highlight'
				: 'text-normal'}"
		>
			<span>
				{parseFloat(stake?.stakeAmount.toFixed(4)) || 0} CSPR
			</span>
			<span>Staked</span>
		</div>
		<div
			class="flex flex-col items-end justify-center text-center {stake?.reward >= 50
				? 'text-light-green '
				: 'text-normal'}"
		>
			<span>
				{parseFloat(stake?.reward.toFixed(4)) || 0} CSPR
			</span>
			<span>Reward</span>
		</div>
	</div>
	<div class="progress-bar">
		<ProgressBar
			value={stake?.stakeAmount ?? 0}
			secondaryBar={true}
			secondaryBarClass={'bg-light-green'}
			secondaryBarValue={stake?.reward ?? 0}
		/>
	</div>
	<div class="third-line">
		<div class="flex flex-col items-start justify-center text-normal">
			<span>Staked on</span>
			<span>
				{convertDate(stake?.initialStakeDate) || 0}
			</span>
		</div>
		<div class="flex flex-col items-end justify-center w-1/3 text-right text-normal">
			<span>Most Recent Reward on</span>
			<span>
				{convertDate(stake?.latestRewardDate) || 0}
			</span>
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
		<div class="footer-label">Total Time Since Stake</div>
		<div class="footer-time {fullSeconds - elapsedSeconds === 0 && 'text-highlight'}">
			{formatTime(fullSeconds - elapsedSeconds || 0)}
		</div>
	</div>
</div>

<style lang="postcss" global>
	:local(.stake-card-item) {
		@apply w-full rounded-2xl shadow-md flex flex-col px-8 py-6 gap-2 max-w-2xl dark:bg-dark-grey dark:text-light-gray cursor-pointer transition-all hover:shadow-lg border border-transparent;
	}

	:local(.selected) {
		@apply border-light-orange;
	}

	:local(.name) {
		@apply font-bold dark:font-semibold dark:text-white text-lg capitalize;
	}

	:local(.first-line) {
		@apply flex justify-between items-center w-full place-content-between text-sm mb-2;
	}

	:local(.progress-bar) {
		@apply w-full h-4;
	}

	:local(.third-line) {
		@apply flex items-center justify-between w-full text-xs;
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
