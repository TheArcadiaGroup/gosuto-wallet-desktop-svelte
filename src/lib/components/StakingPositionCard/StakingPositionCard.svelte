<script lang="ts">
	export let unstaked: boolean = false;
	export let walletName: string = '';
	export let stakedAmount: number = 0;
	export let unlockedAmount: number = 0;
	export let percentage: number = 0;
	export let stakedOn: string = '';
	export let unstakedOn: string = '';
	export let unlockedOn: string = '';
	export let rewardOn: string = '';
	export let reclaimOn: string = '';
	export let timeOne: string = '';
	export let timeTwo: string = '';
	export let totalTimeUntilReward: string = '';

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
	<h2 class="wallet-name">
		{walletName}
	</h2>
	<div class="position-details mx-[33px]">
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
				: 'text-light-grayShadeOne font-medium'}"
		>
			<span>{unlockedAmount} CSPR</span>
			<span>Unlocked</span>
		</div>
		<!-- Blank evenly space the amounts -->
		<div />
	</div>
	<div class="progress-bar">
		<div class="progress progress-background" style="width: {percentage}%" />
	</div>
	<div class="position-details mx-[23px]">
		<div
			class:hidden={unstaked}
			class="date-details {percentage >= startTrigger
				? 'text-light-lighterOrange font-bold'
				: 'text-light-grayShadeOne font-medium'}"
		>
			<span>Staked on</span>
			<span>{stakedOn}</span>
		</div>

		<div
			class:hidden={unstaked}
			class="date-details {percentage >= midTrigger
				? 'text-light-orange font-bold'
				: 'text-light-grayShadeOne font-medium'}"
		>
			<span>Unlocked On</span>
			<span>{unlockedOn}</span>
		</div>

		<div
			class:hidden={unstaked}
			class="date-details {percentage >= endTrigger
				? 'text-light-orange font-bold'
				: 'text-light-grayShadeOne font-medium'}"
		>
			<span>Reward On</span>
			<span>{rewardOn}</span>
		</div>

		<div
			class:hidden={!unstaked}
			class="date-details {percentage >= startTrigger
				? 'text-light-lighterOrange font-bold'
				: 'text-light-grayShadeOne font-medium'}"
		>
			<span>Unstaked on</span>
			<span>{unstakedOn}</span>
		</div>

		<div
			class:hidden={!unstaked}
			class="date-details {percentage >= endTrigger
				? 'text-light-lighterOrange font-bold'
				: 'text-light-grayShadeOne font-medium'}"
		>
			<span>Reclaimed on</span>
			<span>{reclaimOn}</span>
		</div>
	</div>
	<div class="timers">
		<div class={timeOne === '00:00:00:00' ? 'text-light-lighterOrange' : ''}>
			{timeOne}
		</div>
		<div class="{timeTwo === '00:00:00:00' ? 'text-light-lighterOrange' : ''} pl-10">
			{timeTwo}
		</div>
	</div>
	<div class="time-left">
		<span>Total Time Until Reward</span>
		<span class={totalTimeUntilReward === '00:00:00:00' ? 'text-light-lighterOrange' : ''}>
			{totalTimeUntilReward}
		</span>
	</div>
</div>

<style lang="postcss" global>
	:local(.position-card) {
		@apply font-display w-[351px] sm:w-[620px] rounded-[21px] sm:rounded-[22px] bg-white dark:bg-dark-grey shadow-light-stake-position dark:shadow-dark-stake-position hover:border hover:border-light-purple;
	}
	.wallet-name {
		@apply font-semibold sm:font-bold text-sm text-black dark:text-white text-left leading-[19px] ml-7 mt-[17px] sm:ml-8 sm:mt-[30px];
	}
	.position-details {
		@apply mt-[9px] flex flex-row items-center justify-between;
	}
	.amount-details {
		@apply flex flex-col sm:flex-row sm:gap-x-1 justify-center text-xs leading-[15px] text-left;
	}
	.date-details {
		@apply flex flex-col justify-center text-xs leading-[15px] text-center;
	}
	.progress-bar {
		@apply mt-[3px] ml-7 mr-[23px] h-[17px] rounded-full bg-neutral-200 dark:bg-black dark:bg-opacity-10;
	}
	.progress {
		@apply h-full rounded-full text-xs leading-none py-1 text-center text-white;
	}
	.timers {
		@apply mt-[17px] mx-[23px] flex justify-center space-x-10 text-xs text-neutral-600 dark:text-light-grayShadeOne border-b border-light-grey border-dashed divide-x divide-dashed divide-light-grey;
	}
	.time-left {
		@apply flex flex-col items-center my-6 text-xs text-light-lighterOrange dark:text-light-grayShadeOne sm:text-light-grey text-center;
	}
	.progress-background {
		background: linear-gradient(0deg, #ffcb66, #ffcb66), #ffcb66;
	}
</style>
