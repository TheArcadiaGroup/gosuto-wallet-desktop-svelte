<script lang="ts">
	import ConfirmPopUp from '$lib/PopUps/Stake/ConfirmPopUp.svelte';

	let stakeAmount!: number;
	let selectedValidator!: string;
	let validators = ['Arcadia'];
	let stake: boolean = false;
</script>

<div class="staking-wrapper">
	<h2 class="heading">Stake CSPR</h2>
	<div class="form-wrapper">
		<form>
			<div class="input-wrapper">
				<label for="name">Enter CSPR Amount</label>
				<input name="name" id="name" type="text" required bind:value={stakeAmount} />
				<h2 class="dollar-amount">$127 USD</h2>
			</div>
			<div class="input-wrapper mt-12 md:mt-[67px]">
				<label for="name">Select Validator</label>
				<select name="validator" id="validator" bind:value={selectedValidator}>
					{#each validators as validator}
						<option value={validator}>{validator}</option>
					{/each}
				</select>
			</div>
			<button
				type="button"
				on:click={() => (stake = true)}
				disabled={!selectedValidator || !stakeAmount}
				class="action-button"
			>
				Stake
			</button>
			<button type="button" class="cancel-button">Cancel</button>
			{#if stake}
				<ConfirmPopUp />
			{/if}
		</form>
	</div>
</div>

<style lang="postcss" global>
	:local(.staking-wrapper) {
		@apply w-full mt-6 md:mt-[90px];
	}
	:local(.heading) {
		@apply font-bold text-[18px] md:text-[22px] xl:text-[1.5vmax] leading-[25px] text-center text-black dark:text-white;
	}
	:local(.form-wrapper) {
		@apply mt-8 md:mt-11 xl:mt-[3.5vmax];
	}
	:local(form) {
		@apply flex flex-col w-3/4 md:w-[85%] mx-auto items-center justify-center;
	}

	:local(.input-wrapper) {
		@apply relative flex items-center  border xl:border-2 border-black border-opacity-10 dark:border-white dark:border-opacity-40;
		@apply w-full h-[49px] md:h-[53px] xl:h-[3vmax] rounded-2xl;
	}
	:local(label) {
		@apply absolute -top-2 left-8 px-1 text-xs font-medium text-light-grey dark:text-white bg-white dark:bg-dark-blue;
	}
	:local(input) {
		@apply bg-transparent border-0 focus:ring-0;
		@apply w-full h-full px-7 py-3;
		@apply md:text-sm xl:text-[1.5vmax] text-opacity-40 text-black dark:text-white;
	}
	:local(.dollar-amount) {
		@apply absolute top-14 left-5 inline-block px-1 text-xs font-medium text-light-grey dark:text-white;
	}
	:local(select) {
		/* @apply w-full h-full bg-transparent px-7 py-3 border-0 resize-none focus:ring-0 md:text-sm text-opacity-40 text-black dark:text-white; */
		@apply bg-yellow-300 border-0 focus:ring-0;
		@apply w-full h-full px-7 py-3;
		@apply md:text-sm xl:text-[1.5vmax] text-opacity-40 text-black dark:text-white;
	}
	:local(.action-button) {
		@apply px-12 py-2.5 xl:py-[1.25vmax] md:w-full bg-light-orange rounded-full leading-[26px] text-sm md:text-[18px] xl:text-[.8vmax] text-white font-bold mt-[75px] md:mt-[30px] xl:mt-[3vmax];
	}
	:local(.cancel-button) {
		@apply p-0 hidden md:block bg-transparent rounded-[35px] leading-[25px] text-[18px] xl:text-[1vmax] text-light-grey dark:text-white font-bold mt-6 md:mt-10 xl:mt-[2.5vmax];
	}
</style>
