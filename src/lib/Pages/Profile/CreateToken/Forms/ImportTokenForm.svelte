<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { importToken } from '$utils/token.util';

	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import ToggleSwitch from '$lib/components/ToggleSwitch.svelte';

	let contractAddress = '';
	let tokenTicker = '';
	let decimals = 0;
	let shareToken = true;

	function submitImportToken() {
		const result = importToken('1', contractAddress, tokenTicker, decimals, shareToken);
	}

	const dispatch = createEventDispatcher();
</script>

<div class="create-token">
	<p class="page-title">Import Token</p>
	<div class="page-buttons">
		<Button
			on:click={() => dispatch('switchToCreate')}
			class="create-token-button create-token-inactive-button"
		>
			<span class="button-text" slot="text">Create Token</span>
		</Button>
		<Button class="create-token-button">
			<span class="button-text" slot="text">Import Token</span>
		</Button>
	</div>
	<form class="create-form" on:submit|preventDefault={submitImportToken}>
		<TextInput
			bind:value={contractAddress}
			class="create-token-dark-sidebar-input"
			label="Contract Address"
		/>
		<TextInput
			bind:value={tokenTicker}
			class="create-token-dark-sidebar-input"
			label="Token Ticker"
		/>
		<TextInput
			bind:value={decimals}
			class="create-token-dark-sidebar-input"
			label="Decimals of Precision"
			type="number"
		/>
		<div class="switch-row">
			<p class="switch-text">Share token between wallets</p>
			<div class="switch">
				<ToggleSwitch bind:checked={shareToken} />
			</div>
		</div>
		<div class="confirm-buttons">
			<Button>
				<div slot="text" class="my-2 leading-7">Import</div>
			</Button>
			<Button
				on:click={() => dispatch('selectToken', { tokenName: 'Cancel' })}
				class="create-token-cancel-button"
				type="button"
			>
				<div slot="text" class="send-currency-cancel-send-button-text">Cancel</div>
			</Button>
		</div>
	</form>
</div>

<style lang="postcss" global>
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

	:local(.switch-row) {
		@apply flex flex-row;
	}

	:local(.switch-text) {
		@apply font-normal text-base;
	}

	:local(.switch) {
		@apply ml-auto;
	}
</style>
