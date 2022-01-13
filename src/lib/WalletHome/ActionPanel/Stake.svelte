<script lang="ts">
	import ConfirmPopUp from '$lib/PopUps/Stake/ConfirmPopUp.svelte';

	let amount: number = 20;
	let selectedValidator!: string;
	let validators = ['Arcadia'];
	let action: boolean = false;
</script>

{#if action}
	<ConfirmPopUp {amount} />
{/if}
<div class="staking-wrapper">
	<h2 class="heading">Stake CSPR</h2>
	<div class="form-wrapper">
		<form>
			<div class="input-wrapper">
				<label for="name">Enter CSPR Amount</label>
				<input name="name" id="name" type="text" required bind:value={amount} />
				<h2 class="dollar-amount">$127 USD</h2>
			</div>
			<div class="input-wrapper validators">
				<!-- <div class="input-wrapper"> -->
				<label for="name">Select Validator</label>
				<select name="validator" id="validator" bind:value={selectedValidator}>
					{#each validators as validator}
						<option value={validator}>{validator}</option>
					{/each}
				</select>
			</div>
			<button
				type="button"
				on:click={() => (action = true)}
				disabled={!selectedValidator || !amount}
				class="action-button"
			>
				Stake
			</button>
			<button type="button" class="cancel-button">Cancel</button>
		</form>
	</div>
</div>

<style lang="postcss" global>
	:local(.staking-wrapper) {
		@apply w-full mt-6 md:mt-[90px] 2xl:mt-[6.25vw];
	}
	:local(.heading) {
		@apply font-bold text-[18px] md:text-[22px] 2xl:text-[1.5vw] leading-[25px] 2xl:leading-[1.75vw] text-center text-black dark:text-white;
	}
	:local(.form-wrapper) {
		@apply mt-8 md:mt-11 2xl:mt-[3vw];
	}
	:local(form) {
		@apply flex flex-col w-3/4 md:w-[85%] mx-auto items-center justify-center;
	}

	:local(.input-wrapper) {
		@apply relative flex items-center  border 2xl:border-2 border-black border-opacity-10 dark:border-white dark:border-opacity-40;
		@apply w-full h-[49px] md:h-[53px] 2xl:h-[3.5vw] rounded-2xl 2xl:rounded-[1vw];
	}
	:local(label) {
		@apply absolute -top-2 left-6 2xl:left-[1vw] px-1 2xl:px-3 text-xs 2xl:text-[1vw] font-medium text-light-grey dark:text-white bg-white dark:bg-dark-grey md:dark:bg-dark-blue;
	}
	.input-wrapper > input,
	select {
		@apply bg-transparent border-0 focus:ring-0;
		@apply w-full h-full px-5 py-3 2xl:px-[1vw];
		@apply md:text-base 2xl:text-[1.25vw] text-opacity-40 text-black dark:text-white 2xl:leading-[1.5vw];
	}
	:local(.dollar-amount) {
		@apply absolute top-14 2xl:top-[4vw] left-6 2xl:left-[1vw] inline-block px-1 text-xs 2xl:text-[1vw] 2xl:leading-[1.5vw] font-medium text-light-grey dark:text-white;
	}
	:local(.validators) {
		@apply mt-12 md:mt-[67px] 2xl:mt-[4.5vw];
	}
	:local(.action-button) {
		@apply px-12 py-2.5 2xl:py-[0.5vw] md:w-full bg-light-orange rounded-full leading-[26px] 2xl:leading-[1.75vw] text-sm md:text-[18px] 2xl:text-[1.25vw] text-white font-bold mt-[75px] md:mt-[30px] 2xl:mt-[2vw];
	}
	:local(.cancel-button) {
		@apply p-0 hidden md:block bg-transparent  leading-[25px] 2xl:leading-[1.75vw] text-[18px] 2xl:text-[1.25vw] text-light-grey dark:text-white font-bold mt-6 md:mt-10 2xl:mt-[2.5vw];
	}
</style>
