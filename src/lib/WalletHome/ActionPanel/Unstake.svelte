<script lang="ts">
	import ArrowLeftIcon from '$icons/ArrowLeftIcon.svelte';
	import ConfirmPopUp from '$lib/PopUps/Unstake/ConfirmPopUp.svelte';
	import ConfirmPopUpWithUnstakeDate from '$lib/PopUps/Unstake/ConfirmPopUpWithUnstakeDate.svelte';
	import { convertDate } from '$utils';

	export let unstakeAmount!: number;
	// Set this Date
	export let unstakingWaitDate: Date = new Date(Date.now());
	let unstake: boolean = false;
</script>

<!-- {#if unstake}{
    // <ConfirmPopUpWithUnstakeDate/>
    Cl
} -->
{#if unstake}
	<ConfirmPopUp />
{/if}
<div class="w-3/4 md:w-[85%] xl:w-3/4 mx-auto">
	<div class="hidden md:flex flex-row items-center justify-start gap-x-2.5">
		<button
			class="w-7 h-7 rounded-full hidden md:flex items-center justify-center border-2 border-light-neutrals1
				"
		>
			<span class="w-3 h-3 text-light-neutrals4">
				<ArrowLeftIcon />
			</span>
		</button>
		<h2
			class="font-bold text-[18px] xl:text-3xl leading-[25px] text-center text-black dark:text-white"
		>
			Stake
		</h2>
	</div>
	<div class="mt-16 md:mt-6 w-full flex flex-col gap-y-4 text-center">
		<h2 class="font-bold text-2xl leading-8 text-black ">Unstake CSPR</h2>
		<p class="font-bold text-base leading-6 text-light-grey">Unstake: {unstakeAmount} CSPR</p>
		<p class="font-normal text-base leading-6 text-light-grey">
			Unstaking will take until: <span class="text-light-orange">
				{convertDate(unstakingWaitDate)}
			</span>
		</p>
	</div>
	<div class="flex flex-col items-center w-full">
		<button type="button" on:click={() => (unstake = true)} class="unstake-button">Unstake</button>
		<button class="cancel-button">Cancel</button>
	</div>
</div>

<!-- Styles -->
<style lang="postcss" global>
	:local(.unstake-button) {
		@apply px-12 py-2.5 md:w-full bg-light-orange rounded-[35px] leading-[26px] text-sm text-white font-bold mt-[75px] md:mt-10;
	}
	:local(.cancel-button) {
		@apply p-0 hidden md:block bg-transparent rounded-[35px] leading-[25px] text-[18px] text-light-grey dark:text-white font-bold mt-6 md:mt-10;
	}
</style>
