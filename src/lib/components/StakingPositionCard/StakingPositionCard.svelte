<script lang="ts">
	export let unstaked: boolean = false;
	export let walletName: string;
	export let stakedAmount: number;
	export let unlockedAmount: number;
	export let percentage: number;
	export let stakedOn: string;
	export let unstakedOn: string;
	export let unlockedOn: string;
	export let rewardOn: string;
	export let reclaimOn: string;
	export let timeOne: string;
	export let timeTwo: string;
	export let totalTimeUntilReward: string;

	const startTrigger = 33;
	const midTrigger = 50;
	const endTrigger = 100;

	let selected = false;

	const toggleSelection = () => {
		selected = !selected;
	};
</script>

<div
	on:click={toggleSelection}
	class="position-card {selected ? 'border border-light-purple' : ''}"
>
	<div class="w-[90%] mx-auto">
		<div class="wallet-name">
			<h2>
				{walletName}
			</h2>
		</div>
		<div class="position-details">
			<div
				class="amount-details {percentage >= startTrigger
					? 'text-light-lighterOrange font-bold'
					: 'text-light-grayShadeOne font-medium'}"
			>
				<span>{stakedAmount} CSPR</span>
				<span>Staked</span>
			</div>

			<div
				class="amount-details {percentage >= midTrigger
					? 'text-light-orange font-bold'
					: 'text-light-grayShadeOne font-medium'} {unstaked ? 'hidden' : 'flex'}"
			>
				<span>{unlockedAmount} CSPR</span>
				<span>Unlocked</span>
			</div>
			<!-- Blank div evenly space the amounts -->
			<div />
		</div>
		<div class="progress-bar">
			<div class="progress progress-background" style="width: {percentage}%" />
		</div>
		<div class="position-details">
			<div
				class="date-details {percentage >= startTrigger
					? 'text-light-lighterOrange font-bold'
					: 'text-light-grayShadeOne font-medium'} {unstaked ? 'hidden' : 'flex'}"
			>
				<span>Staked on</span>
				<span>{stakedOn}</span>
			</div>

			<div
				class="date-details {percentage >= midTrigger
					? 'text-light-orange font-bold'
					: 'text-light-grayShadeOne font-medium'} {unstaked ? 'hidden' : 'flex'}"
			>
				<span>Unlocked On</span>
				<span>{unlockedOn}</span>
			</div>

			<div
				class="date-details {percentage >= endTrigger
					? 'text-light-orange font-bold'
					: 'text-light-grayShadeOne font-medium'} {unstaked ? 'hidden' : 'flex'}"
			>
				<span>Reward On</span>
				<span>{rewardOn}</span>
			</div>

			<div
				class="date-details {percentage >= startTrigger
					? 'text-light-lighterOrange font-bold'
					: 'text-light-grayShadeOne font-medium'} {unstaked ? 'flex' : 'hidden'}"
			>
				<span>Unstaked on</span>
				<span>{unstakedOn}</span>
			</div>

			<div
				class="date-details {percentage >= endTrigger
					? 'text-light-orange font-bold'
					: 'text-light-grayShadeOne font-medium'} {unstaked ? 'flex' : 'hidden'}"
			>
				<span>Reclaimed on</span>
				<span>{reclaimOn}</span>
			</div>
		</div>
		<div class="timers-wrapper">
			<div class=" timers {unstaked ? 'hidden' : 'flex'}">
				<div class={timeOne === '00:00:00:00' ? 'text-light-lighterOrange' : ''}>
					{timeOne}
				</div>
				<div class="{timeTwo === '00:00:00:00' ? 'text-light-lighterOrange' : ''} pl-10">
					{timeTwo}
				</div>
			</div>
		</div>
		<div class="time-left">
			<p>Total Time Until Reward</p>
			<p class={totalTimeUntilReward === '00:00:00:00' ? 'text-light-lighterOrange' : ''}>
				{totalTimeUntilReward}
			</p>
		</div>
	</div>
</div>

<style lang="postcss" global>
	:local(.position-card) {
		@apply font-display  xl:w-full rounded-[21px] md:rounded-[22px] xl:rounded-[2vmax];
		@apply bg-white dark:bg-dark-grey border border-transparent hover:border-light-purple;
		@apply shadow-[0px-4px_9px_rgba(0,_0,_0,_0.05)] dark:shadow-[0px_4px_12px_rgba(0,_0,_0,_0.05)];
	}
	.wallet-name {
		@apply font-semibold md:font-bold text-sm xl:text-[1vmax] text-black dark:text-white text-left leading-[19px];
		@apply mt-[17px] md:mt-[30px] xl:mt-[4vmax];
	}
	:local(.position-details) {
		@apply mt-[9px] xl:mt-[2vmax] flex flex-row items-center justify-between gap-y-4;
	}
	:local(.amount-details) {
		@apply flex-row gap-x-2 xl:gap-x-5 justify-center text-xs xl:text-[1vmax] leading-[15px] text-left;
	}
	.progress-bar {
		@apply mt-[3px] xl:mt-[1vmax] h-[17px] xl:h-[1vmax] rounded-full bg-neutral-200 dark:bg-black dark:bg-opacity-10;
	}
	.progress {
		@apply h-full rounded-full text-xs leading-none py-1 text-center text-white bg-light-orangeShadeOne;
	}
	:local(.date-details) {
		@apply flex-col justify-center text-xs xl:text-[1vmax] leading-[15px] text-center  xl:gap-y-[1vmax];
	}
	.timers-wrapper {
		@apply mt-[17px] xl:mt-[4vmax] text-xs xl:text-[1vmax] text-neutral-600 dark:text-light-grayShadeOne;
		@apply border-b border-light-grey border-dashed;
	}
	.timers {
		@apply justify-center space-x-10 divide-x divide-dashed divide-light-grey;
	}
	.time-left {
		@apply flex flex-col items-center gap-y-1 xl:gap-y-[1vmax] my-6 xl:my-[1.5vmax];
		@apply text-xs xl:text-[1vmax] text-light-lighterOrange dark:text-light-grayShadeOne md:text-light-grey text-center;
	}
</style>
