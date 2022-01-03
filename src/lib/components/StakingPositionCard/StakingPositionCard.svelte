<script lang="ts">
	export let walletName: string;
	export let tokenAmount: number;
	export let percentage: number;
	export let stakingDate: string;
	export let unlockedOn: string;
	export let rewardOn: string;
	export let totalTimeUntilReward: string;

	let startTrigger = 33;
	let midTrigger = 50;
	let endTrigger = 100;
</script>

<button class="staking-position-card">
	<h2
		class="font-semibold sm:font-bold text-sm text-black text-left leading-[19px] ml-7 mt-[17px] sm:ml-8 sm:mt-[30px]"
	>
		{walletName}
	</h2>
	<div
		class="mt-[9px] flex flex-row items-center gap-x-[67px] sm:gap-x-0 sm:justify-between mx-[33px]"
	>
		<div
			class="flex flex-col justify-center text-xs leading-[15px] text-[#FF7A28] font-bold text-left"
		>
			<span>{tokenAmount} CSPR</span>
			<span class="md:hidden">Unlocked</span>
		</div>

		<div
			class="flex flex-col justify-center text-xs leading-[15px] text-[#AEBBC5] font-medium text-left"
		>
			<span>{tokenAmount} CSPR</span>
			<span class="md:hidden">Unlocked</span>
		</div>
		<div
			class="hidden sm:flex flex-col justify-center text-xs leading-[15px] text-[#AEBBC5] font-medium text-left"
		>
			<span>{tokenAmount} CSPR</span>
			<span class="md:hidden">Unlocked</span>
		</div>
	</div>
	<div class="progress-bar">
		<div class="progress" style="width: {percentage}%" />
	</div>
	<div class="mt-[9px] flex flex-row items-center justify-between mx-[23px]">
		<div
			class="flex flex-col justify-center text-xs leading-[15px] text-[#FF7A28] font-bold text-center"
		>
			<span>Staked On</span>
			<span>{stakingDate}</span>
		</div>

		<div
			class="flex flex-col justify-center text-xs leading-[15px] text-[#AEBBC5] font-medium text-center"
		>
			<span>Unlocked On</span>
			<span>{unlockedOn}</span>
		</div>

		<div
			class="flex flex-col justify-center text-xs leading-[15px] text-[#AEBBC5] font-medium text-center"
		>
			<span>Reward On</span>
			<span>{rewardOn}</span>
		</div>
	</div>
	<div
		class="mt-[17px] mx-[23px] grid grid-cols-2 text-xs text-neutral-600 border-b border-[#FF7A28] sm:border-[#4F4F4F] border-dashed divide-x divide-dashed divide-[#FF7A28] sm:divide-[#4F4F4F]"
	>
		<div>19:12:53:27</div>
		<div>19:12:53:27</div>
	</div>
	<div class="flex items-center justify-center ">
		<div
			class="flex flex-col items-center my-6 text-xs text-[#FF7A28] sm:text-[#4F4F4F] text-center"
		>
			<span>Total Time Until Reward</span>
			<span>{totalTimeUntilReward}</span>
		</div>
	</div>
</button>

<style>
	.staking-position-card {
		@apply col-auto font-display w-[351px] sm:w-[620px] rounded-[21px] sm:rounded-[22px] bg-white shadow-stake-position hover:border hover:border-[#725DFF] active:border-[#725DFF];
	}
	.progress {
		@apply h-full rounded-full text-xs leading-none py-1 text-center text-white;
		background: linear-gradient(0deg, #ffcb66, #ffcb66), #ffcb66;
	}
	.progress-bar {
		@apply mt-[3px] ml-7 mr-[23px] h-[17px] rounded-full bg-neutral-200;
	}
</style>
