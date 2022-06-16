<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { createToken } from '$utils/tokens/createToken';

	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import ToggleSwitch from '$lib/components/ToggleSwitch.svelte';
	import { selectedWallet } from '$stores/user/wallets';
	import { pollyfillSelectedWallet } from '$utils/pollyfillData';
	import isValidAccountHash from '$utils/validators/isValidAccountHash';
	import { user } from '$stores/user';

	let tokenName = '';
	let tokenTicker = '';
	let authorizedMinterHash = '';
	let totalSupply = 0;
	let decimals = 18;
	let mintableSupply = true;
	let shareToken = true;

	$: isMinterValid = false;

	function submitCreateToken() {
		if (!$selectedWallet?.privateKey) {
			pollyfillSelectedWallet();
		}

		const result = createToken(
			$selectedWallet!.privateKey,
			$selectedWallet!.publicKey,
			$selectedWallet!.algorithm,
			tokenName,
			tokenTicker,
			decimals,
			totalSupply,
			mintableSupply,
			authorizedMinterHash,
			shareToken,
		);

		console.log('Send Tx: ', result);
	}

	const dispatch = createEventDispatcher();

	$: (async function (minterHash) {
		isMinterValid = await isValidAccountHash(
			minterHash || $selectedWallet!.accountHash,
			$user?.network ?? 'testnet',
		);
	})(authorizedMinterHash);
</script>

<div class="create-token">
	<p class="page-title">Create Token</p>
	<div class="page-buttons">
		<Button class="create-token-button">
			<span class="button-text" slot="text">Create Token</span>
		</Button>
		<Button
			on:click={() => dispatch('switchToImport')}
			class="create-token-button create-token-inactive-button"
		>
			<span class="button-text" slot="text">Import Token</span>
		</Button>
	</div>
	<form class="create-form" on:submit|preventDefault={submitCreateToken}>
		<TextInput bind:value={tokenName} class="create-token-dark-sidebar-input" label="Token Name" />
		<TextInput
			bind:value={tokenTicker}
			class="create-token-dark-sidebar-input"
			label="Token Ticker"
		/>
		<TextInput
			bind:value={decimals}
			type="number"
			class="create-token-dark-sidebar-input"
			label="Decimals"
		/>
		<TextInput
			bind:value={totalSupply}
			type="number"
			class="create-token-dark-sidebar-input"
			label={`${mintableSupply ? 'Initial' : 'Total'} Supply`}
		/>
		{#if mintableSupply}
			<TextInput
				bind:value={authorizedMinterHash}
				class="create-token-dark-sidebar-input"
				label="Minter Account Hash"
			/>
			{#if !!authorizedMinterHash && !isMinterValid}
				<div class="error-div">Please enter a valid account hash</div>
			{/if}
		{/if}
		<div class="switch-row">
			<p class="switch-text">Mintable Supply</p>
			<div class="switch">
				<ToggleSwitch bind:checked={mintableSupply} />
			</div>
		</div>
		<div class="switch-row">
			<p class="switch-text">Share token between wallets</p>
			<div class="switch">
				<ToggleSwitch bind:checked={shareToken} />
			</div>
		</div>
		<div class="confirm-buttons">
			<Button
				isDisabled={!$selectedWallet ||
					!tokenName ||
					!tokenTicker ||
					!decimals ||
					!totalSupply ||
					(mintableSupply && !!authorizedMinterHash && !isMinterValid)}
			>
				<div slot="text" class="my-2 leading-7">Create</div>
			</Button>
			<Button
				on:click={() => dispatch('selectToken', null)}
				class="create-token-cancel-button"
				type="button"
			>
				<div slot="text" class="send-currency-cancel-send-button-text">Cancel</div>
			</Button>
		</div>
	</form>
</div>

<style global>
	:local(.create-token) {
		@apply w-full;
		@apply flex flex-col;
		@apply px-16 py-20 gap-8;
		@apply text-xl font-bold;
		@apply lg:px-7;
		@apply dark:text-white;
	}

	:local(.page-title) {
		@apply w-full;
		@apply text-center;
	}

	:local(.page-buttons) {
		@apply w-full;
		@apply flex flex-row;
		@apply gap-4;
	}

	.create-token-button {
		@apply px-2 py-2.5 !important;
	}

	.create-token-inactive-button {
		@apply bg-transparent border-none text-light-buttonText !important;
		box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.05);
	}

	:local(.button-text) {
		@apply text-base leading-7;
	}

	:local(.create-form) {
		@apply flex flex-col;
		@apply mt-8 gap-6;
	}

	.create-token-dark-sidebar-input {
		@apply dark:bg-dark-grey !important;
	}

	:local(.switch-row) {
		@apply flex flex-row;
	}

	:local(.switch-text) {
		@apply font-normal text-base;
	}

	:local(.switch) {
		@apply ml-auto;
	}

	.create-token-cancel-button {
		/* Important, because otherwise values inside button component overwrite these settings */
		@apply bg-transparent border-transparent !important;
	}

	:local(.confirm-buttons) {
		@apply w-3/4;
		@apply flex flex-col;
		@apply mx-auto gap-4 mt-28 mb-16;
		@apply lg:mt-10 lg:w-full lg:gap-1;
	}

	/* hide number input arrows */

	.create-token-dark-sidebar-input[type='number']::-webkit-outer-spin-button,
	.create-token-dark-sidebar-input[type='number']::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.create-token-dark-sidebar-input[type='number'] {
		-moz-appearance: textfield;
	}

	.error-div {
		@apply text-left text-xs text-red-300 -mt-4 mb-1 flex w-full px-2;
	}
</style>
