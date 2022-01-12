<script lang="ts">
	import ArrowLeftIcon from '$icons/ArrowLeftIcon.svelte';

	let initialStake: number = 20;
	let totalRewards: number = 20;
	let claim: boolean = false;
</script>

{#if claim}
	<!-- <ConfirmPopUp /> -->
{/if}
\
<div class="wrapper">
	<div class="header">
		<button class="back-button">
			<span>
				<ArrowLeftIcon />
			</span>
		</button>
		<h2>Stake</h2>
	</div>
	<div class="action-details">
		<h2>Claim Rewards</h2>
		<p class="font-normal">
			Initial stake: {initialStake} CSPR
		</p>
		<p class="font-bold">
			Total Rewards: {totalRewards} CSPR
		</p>
	</div>
	<div class="buttons">
		<button type="button" on:click={() => (claim = true)} class="action-button">Claim</button>
		<button class="cancel-button">Cancel</button>
	</div>
</div>

<!-- Styles -->
<style lang="postcss" global>
	:local(.wrapper) {
		@apply w-3/4 md:w-[85%] xl:w-3/4 mx-auto;
	}

	:local(.header) {
		@apply mt-[59px] hidden md:flex flex-row items-center justify-start gap-x-2.5 xl:gap-x-[1vmax];
	}
	.header > button {
		@apply w-7 h-7 xl:w-[2vmax] xl:h-[2vmax] rounded-full hidden md:flex items-center justify-center border-2 border-light-neutrals1;
	}
	.header > button > span {
		@apply w-3 h-3 xl:w-[1vmax] xl:h-[1vmax] text-light-neutrals4;
	}
	.header > h2 {
		@apply font-bold text-[18px] xl:text-[1.5vmax] leading-[25px] text-center text-black dark:text-white;
	}
	:local(.action-details) {
		@apply mt-16 md:mt-6 xl:mt-[3vmax] w-full flex flex-col gap-y-4 xl:gap-[4.5vmax] text-center;
	}
	.action-details > h2 {
		@apply font-bold text-2xl xl:text-[1.5vmax] leading-8 text-black dark:text-white;
	}
	.action-details > p {
		@apply text-base xl:text-[1.25vmax]  leading-6 text-light-grey dark:text-dark-gosutoIconGrey;
	}
	:local(.buttons) {
		@apply flex flex-col items-center w-full;
	}
	:local(.action-button) {
		@apply px-12 py-2.5 xl:py-[1.25vmax] md:w-full bg-light-orange rounded-full leading-[26px] text-sm md:text-[18px] xl:text-[.8vmax] text-white font-bold mt-[75px] md:mt-[30px] xl:mt-[3vmax];
	}
	:local(.cancel-button) {
		@apply p-0 hidden md:block bg-transparent rounded-[35px] leading-[25px] text-[18px] xl:text-[1vmax] text-light-grey dark:text-white font-bold mt-6 md:mt-10 xl:mt-[2.5vmax];
	}
</style>
