<script lang="ts">
	import ConfirmPopUp from '$lib/PopUps/Stake/ConfirmPopUp.svelte';

	export let stakeAmount!: number;
	export let selectedValidator!: string;
	export let validators = ['Arcadia'];
	let select: boolean = false;
</script>

<div class="staking-wrapper">
	<h2>Stake CSPR</h2>
	<div class="mt-8 md:mt-11">
		<form class="flex flex-col items-center justify-center">
			<div class="input-wrapper">
				<label for="name">Enter CSPR Amount</label>
				<input name="name" id="name" type="text" required bind:value={stakeAmount} />
				<h2
					class="absolute top-14 left-5 inline-block px-1 text-xs font-medium text-light-grey dark:text-white"
				>
					$127 USD
				</h2>
			</div>
			<div class="input-wrapper mt-12 md:mt-[67px]">
				<label for="name">Select Validator</label>
				<select
					name="validator"
					id="validator"
					bind:value={selectedValidator}
					class="w-full h-full bg-transparent px-7 py-3 border-0 resize-none focus:ring-0 sm:text-sm text-opacity-40 text-black dark:text-white"
				>
					{#each validators as validator}
						<option value={validator}>{validator}</option>
					{/each}
				</select>
			</div>
			<button
				type="button"
				on:click={() => (select = true)}
				disabled={!selectedValidator || !stakeAmount}
				class="px-12 py-2.5 bg-light-orange rounded-[35px] leading-[26px] text-sm text-white font-bold mt-6 md:mt-10"
			>
				Select
			</button>
			<button
				type="button"
				class="p-0 hidden md:block bg-transparent rounded-[35px] leading-[25px] text-[18px] text-light-grey font-bold mt-6 md:mt-10"
			>
				Cancel
			</button>
			{#if select}
				<ConfirmPopUp />
			{/if}
		</form>
	</div>
</div>

<style lang="postcss" global>
	:local(.staking-wrapper) {
		@apply flex flex-col items-center justify-center px-12 md:px-6 mt-6 md:mt-[90px];
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
</style>
