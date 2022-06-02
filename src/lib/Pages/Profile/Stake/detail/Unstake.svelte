<!-- @component 
	Describtion:
	> A stake detail component (fills the third column on /profile/stakes routes) that unstakes the stake.

	Props:
	- `disabled` = A boolean variable. When true, the buttons aren't showed and unstaking is diabled.
-->
<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { convertDate } from '$utils';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let stake: IStake | null = null;
	let tokenAmount: number;

	/**Handler for clicking the "Unstake" button. Unstakes the stake.*/
	function unstake() {
		dispatch('unstake', { validatorPublicKey: stake?.validator, amount: tokenAmount });
	}

	/**Handler for clicking the "Cancel" button. Cancels the unstake and hides the component.*/
	function cancel() {
		// cancel stake
		stake = null;
	}
</script>

{#if stake}
	<div class="unstake">
		<div class="title">Unstake CSPR</div>
		<div class="text-sm dark:text-white">
			Total Staked:
			<span class="text-light-orange">
				{parseFloat(stake.stakeAmount.toFixed(2))}
			</span>
			CSPR
		</div>
		<div class="currency-form-row">
			<TextInput
				bind:value={tokenAmount}
				class="unstake-currency-dark-sidebar-input"
				type="number"
				step={0.00001}
				label="Amount To Unstake"
				addTextBg={true}
			/>
		</div>
		<div class="buttons">
			<Button on:click={unstake}>
				<div slot="text" class="button-text">Unstake</div>
			</Button>
			<Button on:click={cancel} isTransparent={true}>
				<div slot="text" class="button-text">Cancel</div>
			</Button>
		</div>
		<div class="staking-length">
			Please note. You will need to undelegate in order to have them become liquid again. There is a
			7 era delay to undelegate. Era duration is approximately 120 minutes. Unstaking could take
			until:
			<div class="until-date">{convertDate(new Date(Date.now() + 120 * 60 * 1000))}</div>
		</div>
	</div>
{/if}

<style lang="postcss" global>
	:local(.unstake) {
		@apply w-full h-full flex flex-col items-stretch gap-2 py-6 px-2;
	}

	:local(.title) {
		@apply font-semibold dark:text-white text-center;
	}

	:local(.text) {
		@apply text-sm dark:text-white text-center;
	}

	:local(.staking-length) {
		@apply text-xs text-light-lighterGray;
	}

	:local(.until-date) {
		@apply text-light-orange gap-2;
	}

	:local(.buttons) {
		@apply my-3 w-full flex flex-col gap-3;
	}

	:local(.button-text) {
		@apply p-2;
	}

	:local(.currency-form-row) {
		@apply w-full;
		@apply flex flex-row items-center justify-center;
		@apply gap-4;
	}

	/* hide number input arrows */

	.unstake-currency-dark-sidebar-input[type='number']::-webkit-outer-spin-button,
	.unstake-currency-dark-sidebar-input[type='number']::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.unstake-currency-dark-sidebar-input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
