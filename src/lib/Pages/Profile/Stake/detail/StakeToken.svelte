<!-- @component 
	Describtion:
	> A stake detail component (fills the third column on /profile/stakes routes) for confirming the stake

	Bindables:
	- `amount` = Amount from the amount input.
	- `recipient` = Value form the recipient selection.
-->
<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import SelectInput from '$lib/components/SelectInput.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { csprPrice } from '$stores/tokens';
	import { user } from '$stores/user';
	import { validators } from '$stores/user/stake';
	import { getCSPRUsdPrice } from '$utils/tokens';
	import { createEventDispatcher, onMount } from 'svelte';

	export let amount: number;
	export let recipient: string;

	const dispatch = createEventDispatcher();

	/**Handler for clicking the "Confirm" button. Confirms the stake.*/
	function confirmStake() {
		// confirm stake
		dispatch('confirmStake');
	}

	/**Handler for clicking the "Cancel" button. Cancels the stake.*/
	function cancelStake() {
		// cancel stake
		dispatch('cancelStake');
	}

	onMount(async () => {
		await getCSPRUsdPrice();
	});
</script>

<div class="confirm">
	<div class="title">Stake CSPR</div>
	<div class="input-container">
		<TextInput
			class="stake-amount-input"
			type="number"
			step={0.0001}
			label={'Enter CSPR amount'}
			bind:value={amount}
			addTextBg={true}
		/>
	</div>
	<div class="w-full text-sm dark:text-white">
		{(amount * $csprPrice[$user?.currency || 'usd']).toFixed(
			2,
		)}&nbsp;{$user?.currency.toUpperCase()}
	</div>
	<div class="select-container">
		<SelectInput label={'Recipient Address'} bind:value={recipient}>
			{#each $validators as validator}
				<option value={validator}>{validator.validatorName}</option>
			{/each}
		</SelectInput>
	</div>
	<div class="buttons">
		<Button on:click={confirmStake}>
			<div slot="text" class="button-text">Stake</div>
		</Button>
		<Button isTransparent={true} on:click={cancelStake}>
			<div slot="text" class="button-text">Cancel</div>
		</Button>
	</div>
</div>

<style lang="postcss" global>
	:local(.confirm) {
		@apply w-full h-full flex flex-col items-center gap-2 py-6;
	}

	:local(.title) {
		@apply font-semibold dark:text-white;
	}

	:local(.input-container) {
		@apply w-full;
	}

	:local(.select-container) {
		@apply w-full;
	}

	:local(.button-text) {
		@apply p-2;
	}

	:local(.buttons) {
		@apply my-3 w-full flex flex-col gap-3;
	}

	:local(option) {
		@apply capitalize;
	}
</style>
