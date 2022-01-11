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
				class="stake-button"
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
		@apply font-bold text-[18px] md:text-[22px] xl:text-3xl leading-[25px] text-center text-black dark:text-white;
	}
	:local(.form-wrapper) {
		@apply mt-8 md:mt-11;
	}
	:local(form) {
		@apply flex flex-col w-3/4 md:w-[85%] mx-auto items-center justify-center;
	}

	:local(.input-wrapper) {
		@apply relative items-center w-full h-[49px] md:h-[53px] border border-black border-opacity-10 dark:border-white dark:border-opacity-40 rounded-[13px];
	}
	:local(label) {
		@apply absolute -top-2 left-5 -mt-px inline-block px-1 text-xs font-medium text-light-grey dark:text-white dark:bg-dark-background;
	}
	:local(input) {
		@apply w-full h-full bg-transparent px-7 py-3 border-0 resize-none focus:ring-0 sm:text-sm text-opacity-40 text-black dark:text-white;
	}
	:local(.dollar-amount) {
		@apply absolute top-14 left-5 inline-block px-1 text-xs font-medium text-light-grey dark:text-white;
	}
	:local(select) {
		@apply w-full h-full bg-transparent px-7 py-3 border-0 resize-none focus:ring-0 sm:text-sm text-opacity-40 text-black dark:text-white;
	}
	:local(.stake-button) {
		@apply px-12 py-2.5 md:w-full bg-light-orange rounded-[35px] leading-[26px] text-sm text-white font-bold mt-6 md:mt-10;
	}
	:local(.cancel-button) {
		@apply p-0 hidden md:block bg-transparent rounded-[35px] leading-[25px] text-[18px] text-light-grey dark:text-white font-bold mt-6 md:mt-10;
	}
</style>
