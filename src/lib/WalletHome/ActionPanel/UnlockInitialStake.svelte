<script lang="ts">
	import ArrowLeftIcon from '$icons/ArrowLeftIcon.svelte';

	let initialStake: number = 20;
	let claim: boolean = false;
</script>

{#if claim}
	<!-- <ConfirmPopUp /> -->
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
		<h2>Unlock initial stake</h2>
		<p class="font-normal">
			Initial stake: {initialStake} CSPR
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
		@apply hidden md:flex flex-row items-center justify-start gap-x-2.5;
	}
	.header > button {
		@apply w-7 h-7 rounded-full hidden md:flex items-center justify-center border-2 border-light-neutrals1;
	}
	.header > button > span {
		@apply w-3 h-3 text-light-neutrals4;
	}
	.header > h2 {
		@apply font-bold text-[18px] xl:text-3xl leading-[25px] text-center text-black dark:text-white;
	}
	:local(.action-details) {
		@apply mt-16 md:mt-6 w-full flex flex-col gap-y-4 text-center;
	}
	.action-details > h2 {
		@apply font-bold text-2xl leading-8 text-black dark:text-white;
	}
	.action-details > p {
		@apply text-base  leading-6 text-light-grey dark:text-dark-gosutoIconGrey;
	}
	:local(.unstake-wait) {
		@apply font-normal md:tracking-tighter xl:tracking-normal;
	}
	:local(.buttons) {
		@apply flex flex-col items-center w-full;
	}
	:local(.action-button) {
		@apply px-12 py-2.5 md:w-full bg-light-orange rounded-[35px] leading-[26px] text-sm text-white font-bold mt-[114px] md:mt-[30px];
	}
	:local(.cancel-button) {
		@apply p-0 hidden md:block bg-transparent rounded-[35px] leading-[25px] text-[18px] text-light-grey dark:text-white font-bold mt-6 md:mt-10;
	}
</style>
