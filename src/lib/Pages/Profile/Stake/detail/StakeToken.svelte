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

	const dispatch = createEventDispatcher();

	let amount = 0;
	let selectedValidatorHash: string = '';

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
	{#if amount < 500 && amount !== 0}
		<div class="input-error-warning">
			Total delegation amount to one validator cannot be less than 500 CSPR
		</div>
	{/if}
	<div class="w-full text-sm px-2 dark:text-white">
		{parseFloat(
			(amount * $csprPrice[$user?.currency || 'usd']).toFixed(2),
		)}&nbsp;{$user?.currency.toUpperCase()}
	</div>
	{#if $user?.network === 'mainnet'}
		<div class="select-container">
			<SelectInput label={'Recipient Address'} bind:value={selectedValidatorHash}>
				{#each $validators as validator}
					<option value={validator.validatorHash}>{validator.validatorName}</option>
				{/each}
			</SelectInput>
			{#if $validators.find((validator) => validator.validatorHash === selectedValidatorHash && validator.currentDelegators > 952)}
				<div class="input-error-warning">
					This validator has reached the network limit for total delegators and therefore cannot be
					delegated to by new accounts. Please select another validator with fewer than 952 total
					delegators
				</div>
			{/if}
		</div>
	{:else}
		<div class="input-container">
			<TextInput
				class="stake-amount-input"
				type="text"
				label={'Validator Public Key'}
				bind:value={selectedValidatorHash}
				addTextBg={true}
			/>
		</div>
	{/if}
	<div class="buttons">
		<Button
			on:click={() => dispatch('showStakePopup', { validatorHash: selectedValidatorHash, amount })}
		>
			<div slot="text" class="button-text">Stake</div>
		</Button>
		<Button
			class="cancel-stake-button"
			isTransparent={true}
			on:click={() => dispatch('cancelStake')}
		>
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

	:local(.input-error-warning) {
		@apply text-red-400 text-xs p-2;
	}
</style>
