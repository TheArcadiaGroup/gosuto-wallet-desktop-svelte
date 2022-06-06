<!-- @component 
	Describtion:
	> A stake detail component (fills the third column on /profile/stakes routes) for confirming the stake

	Bindables:
	- `amount` = Amount from the amount input.
	- `recipient` = Value form the recipient selection.
-->
<script lang="ts">
	import { page } from '$app/stores';

	import Button from '$lib/components/Button.svelte';
	import SelectInput from '$lib/components/SelectInput.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { csprPrice } from '$stores/tokens';
	import { user } from '$stores/user';
	import { validators } from '$stores/user/stake';
	import { selectedWallet } from '$stores/user/wallets';
	import { getCSPRUsdPrice } from '$utils/tokens';
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	const stakingPayment = 2.5;
	const stakingFee = 2.5;
	const totalFees = stakingPayment + stakingFee;

	let amount = 0;
	let selectedValidatorPublicKey: string = '';
	let walletBalance = $selectedWallet!.availableBalance;

	$: userIsDelegatorOnSelectedValidator = $selectedWallet?.walletStakes.some(
		(item) => item.validator === selectedValidatorPublicKey,
	);
	$: validatorInvalid =
		$validators.some(
			(validator) =>
				validator.publicKey === selectedValidatorPublicKey && validator.currentDelegators > 952,
		) && !userIsDelegatorOnSelectedValidator;
	$: amountInvalid =
		Boolean(amount) && amount < 500 && amount !== 0 && !userIsDelegatorOnSelectedValidator;
	$: amountPastMax = amount > walletBalance;
	$: cannotPayFee = amount > walletBalance - totalFees;

	onMount(async () => {
		await getCSPRUsdPrice();
		selectedValidatorPublicKey = $page.url.searchParams.get('validator') ?? '';
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
	{#if amountInvalid}
		<div class="input-error">
			Total delegation amount to one validator cannot be less than 500 CSPR
		</div>
	{/if}
	{#if cannotPayFee}
		<div class="input-warning">
			<div class="font-bold mb-1">PLEASE NOTE!</div>
			<div class="text-light-gray">
				Transaction might fail since it uses up your all your available balance without paying for
				fees. Recommended maximum is
				<div class="font-bold text-light-lighterOrange">
					{walletBalance - totalFees} CSPR
				</div>
			</div>
		</div>
	{/if}
	{#if walletBalance && amount > walletBalance - 2.5}
		<div class="input-warning">
			<div class="font-bold mb-1">PLEASE NOTE!</div>
			<div class="text-light-gray">
				Delegating max will zero your liquid balance. As such, you won't be able to undelegate as
				undelegation requires a minimum of 2.5 CSPR liquid balance. To cater for this, the
				recommended maximum is
				<div class="font-bold text-light-lighterOrange">
					{walletBalance - 2.5 - totalFees} CSPR
				</div>
			</div>
		</div>
	{/if}
	<div
		class="w-full text-sm px-2 {amount > 0
			? 'text-light-lighterOrange dark:text-light-lighterOrange'
			: ' dark:text-white'}"
	>
		{parseFloat(
			(amount * $csprPrice.price[$user?.currency || 'usd']).toFixed(2),
		)}&nbsp;{$user?.currency.toUpperCase()}
	</div>
	<div class="select-container">
		<SelectInput label={'Recipient Address'} bind:value={selectedValidatorPublicKey}>
			{#each $validators as validator}
				<option value={validator.publicKey}>
					{validator.profile?.name ?? validator.publicKey}
				</option>
			{/each}
		</SelectInput>
		<!-- If user is already a delegator on that validator, just let them continue -->
		{#if validatorInvalid}
			<div class="input-error">
				This validator has reached the network limit for total delegators and therefore cannot be
				delegated to by new accounts. Please select another validator with fewer than 952 total
				delegators
			</div>
		{/if}
	</div>
	<div class="buttons">
		<Button
			isDisabled={amount <= 0 ||
				!selectedValidatorPublicKey ||
				validatorInvalid ||
				amountInvalid ||
				amountPastMax}
			on:click={() =>
				dispatch('showStakePopup', { validatorPublicKey: selectedValidatorPublicKey, amount })}
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

	:local(.input-error) {
		@apply text-error-red text-xs p-2;
	}

	:local(.input-warning) {
		@apply text-warning-orange text-xs p-2;
	}
</style>
