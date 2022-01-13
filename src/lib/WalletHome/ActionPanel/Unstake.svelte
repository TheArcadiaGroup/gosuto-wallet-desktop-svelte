<script lang="ts">
	import ArrowLeftIcon from '$icons/ArrowLeftIcon.svelte';
	import ConfirmPopUp from '$lib/PopUps/Unstake/ConfirmPopUp.svelte';
	import { convertDate } from '$utils';

	let unstakeAmount: number = 15;
	// Set this Date
	let unstakingWaitDate: Date = new Date(Date.now());
	let unstake: boolean = false;
</script>

{#if unstake}
	<ConfirmPopUp />
{/if}
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
		<h2>Unstake CSPR</h2>
		<p class="font-bold">
			Unstake: {unstakeAmount} CSPR
		</p>
		<p class="unstake-wait">
			Unstaking will take until: <span class="text-light-orange">
				{convertDate(unstakingWaitDate)}
			</span>
		</p>
	</div>
	<div class="buttons">
		<button type="button" on:click={() => (unstake = true)} class="action-button">Unstake</button>
		<button class="cancel-button">Cancel</button>
	</div>
</div>

<!-- Styles -->
<style lang="postcss" global>
	:local(.wrapper) {
		@apply w-3/4 md:w-[85%] 2xl:w-3/4 mx-auto;
	}

	:local(.header) {
		@apply mt-[59px] hidden md:flex flex-row items-center justify-start gap-x-2.5 2xl:gap-x-[1vmax];
	}
	.header > button {
		@apply w-7 h-7 2xl:w-[2vmax] 2xl:h-[2vmax] rounded-full hidden md:flex items-center justify-center border-2 border-light-neutrals1;
	}
	.header > button > span {
		@apply w-3 h-3 2xl:w-[1vmax] 2xl:h-[1vmax] text-light-neutrals4;
	}
	.header > h2 {
		@apply font-bold text-[18px] 2xl:text-[1.5vmax] leading-[25px] text-center text-black dark:text-white;
	}
	:local(.action-details) {
		@apply mt-16 md:mt-6 2xl:mt-[3vmax] w-full flex flex-col gap-y-4 2xl:gap-[4.5vmax] text-center;
	}
	.action-details > h2 {
		@apply font-bold text-2xl 2xl:text-[1.5vmax] leading-8 text-black dark:text-white;
	}
	.action-details > p {
		@apply text-base 2xl:text-[1.25vmax]  leading-6 text-light-grey dark:text-dark-gosutoIconGrey;
	}
	:local(.unstake-wait) {
		@apply font-normal md:tracking-tighter;
	}
	:local(.buttons) {
		@apply flex flex-col items-center w-full;
	}
	:local(.action-button) {
		@apply px-12 py-2.5 2xl:py-[1.25vmax] md:w-full bg-light-orange rounded-full leading-[26px] text-sm md:text-[18px] 2xl:text-[.8vmax] text-white font-bold mt-[75px] md:mt-[30px] 2xl:mt-[3vmax];
	}
	:local(.cancel-button) {
		@apply p-0 hidden md:block bg-transparent rounded-[35px] leading-[25px] text-[18px] 2xl:text-[1vmax] text-light-grey dark:text-white font-bold mt-6 md:mt-10 2xl:mt-[2.5vmax];
	}
</style>
