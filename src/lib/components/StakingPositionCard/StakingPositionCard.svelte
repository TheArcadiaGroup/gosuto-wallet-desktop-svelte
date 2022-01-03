<script lang="ts">
	export let unstaked: boolean;
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

	let startTrigger = 33;
	let midTrigger = 50;
	let endTrigger = 100;
	let selected = false;
</script>

<div
	on:click={() => (selected = true)}
	class="font-display w-[351px] sm:w-[620px] rounded-[21px] sm:rounded-[22px] bg-white dark:bg-[#2A2F3C] shadow-light-stake-position dark:shadow-dark-stake-position hover:border hover:border-[#725DFF] {selected
		? 'border border-[#725DFF]'
		: ''}"
>
	<h2
		class="font-semibold sm:font-bold text-sm text-black dark:text-white text-left leading-[19px] ml-7 mt-[17px] sm:ml-8 sm:mt-[30px]"
	>
		{walletName}
	</h2>
	<div class="mt-[9px] flex flex-row items-center justify-between mx-[33px]">
		<div
			class="flex flex-col sm:flex-row sm:gap-x-1 justify-center text-xs leading-[15px] text-left {percentage >=
			startTrigger
				? 'text-[#FF7A28] font-bold'
				: 'text-[#AEBBC5] font-medium'}"
		>
			<span>{stakedAmount} CSPR</span>
			<span>Staked</span>
		</div>

		<div
			class="flex flex-col sm:flex-row sm:gap-x-1 justify-center text-xs leading-[15px] text-left {percentage >=
			midTrigger
				? 'text-[#FF8266] font-bold'
				: 'text-[#AEBBC5] font-medium'}"
		>
			<span>{unlockedAmount} CSPR</span>
			<span>Unlocked</span>
		</div>
		<div />
	</div>
	<div
		class="mt-[3px] ml-7 mr-[23px] h-[17px] rounded-full bg-neutral-200 dark:bg-black dark:bg-opacity-10"
	>
		<div
			class="h-full rounded-full text-xs leading-none py-1 text-center text-white progress-background"
			style="width: {percentage}%"
		/>
	</div>
	<div class="mt-[9px] flex flex-row items-center justify-between mx-[23px]">
		<div
			class:hidden={unstaked}
			class="flex flex-col justify-center text-xs leading-[15px] text-center {percentage >=
			startTrigger
				? 'text-[#FF7A28] font-bold'
				: 'text-[#AEBBC5] font-medium'}"
		>
			<span>Staked on</span>
			<span>{stakedOn}</span>
		</div>

		<div
			class:hidden={unstaked}
			class="flex flex-col justify-center text-xs leading-[15px] text-center {percentage >=
			midTrigger
				? 'text-[#FF8266] font-bold'
				: 'text-[#AEBBC5] font-medium'}"
		>
			<span>Unlocked On</span>
			<span>{unlockedOn}</span>
		</div>

		<div
			class:hidden={unstaked}
			class="flex flex-col justify-center text-xs leading-[15px] text-center {percentage >=
			endTrigger
				? 'text-[#FF8266] font-bold'
				: 'text-[#AEBBC5] font-medium'}"
		>
			<span>Reward On</span>
			<span>{rewardOn}</span>
		</div>

		<div
			class:hidden={!unstaked}
			class="flex flex-col justify-center text-xs leading-[15px] text-center {percentage >=
			startTrigger
				? 'text-[#FF7A28] font-bold'
				: 'text-[#AEBBC5] font-medium'}"
		>
			<span>Unstaked on</span>
			<span>{unstakedOn}</span>
		</div>

		<div
			class:hidden={!unstaked}
			class="flex flex-col justify-center text-xs leading-[15px] text-center {percentage >=
			endTrigger
				? 'text-[#FF7A28] font-bold'
				: 'text-[#AEBBC5] font-medium'}"
		>
			<span>Reclaimed on</span>
			<span>{reclaimOn}</span>
		</div>
	</div>
	<div
		class="mt-[17px] mx-[23px] flex justify-center space-x-10 text-xs text-neutral-600 dark:text-[#AEBBC5] border-b border-[#4F4F4F] border-dashed divide-x divide-dashed divide-[#4F4F4F]"
	>
		<div class="{timeOne === '00:00:00:00' ? 'text-[#FF7A28]' : ''} bg-transparent	">
			{timeOne}
		</div>
		<div class="{timeTwo === '00:00:00:00' ? 'text-[#FF7A28]' : ''} pl-10">
			{timeTwo}
		</div>
	</div>
	<div class="flex items-center justify-center ">
		<div
			class="flex flex-col items-center my-6 text-xs text-[#FF7A28] dark:text-[#AEBBC5] sm:text-[#4F4F4F] text-center"
		>
			<span>Total Time Until Reward</span>
			<span class={totalTimeUntilReward === '00:00:00:00' ? 'text-[#FF7A28]' : ''}>
				{totalTimeUntilReward}
			</span>
		</div>
	</div>
</div>

<style>
	.progress-background {
		background: linear-gradient(0deg, #ffcb66, #ffcb66), #ffcb66;
	}
</style>
