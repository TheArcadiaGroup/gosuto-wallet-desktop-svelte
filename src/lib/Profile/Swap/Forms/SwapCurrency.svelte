<!--
@component
The wallet swap last column, this component should be shown if user has selected a Token.
This component allows user to select how much and what token they want to swap with their currently selected token.
The logic whether this component is shown or not is handled by it's parents
@author marekvospel
-->
<script lang="ts">
	import TextInput from '$lib/Common/TextInput.svelte';
	import SwapTokensIcon from '$icons/SwapTokensIcon.svelte';
	import SelectInput from '$lib/Common/SelectInput.svelte';
	import Button from '$lib/Common/Button.svelte';
	import Popup from '$lib/Common/Popup.svelte';

	/**
	 * Code of the token user has selected, and is swapping from.
	 * @type {string}
	 */
	export let fromToken = 'USDT';
	/**
	 * Whether a warning about crating a new token should be shown.
	 * The warning: 'This wallet currently does not contain USDC. USDC token will be added to this wallet upon swap'
	 * @type {boolean}
	 */
	export let createNewToken = true;

	let popup = '';
	let confirmPopup = false;

	/**
	 * A function run when user clicks confirm inside the 'are you sure' popup.
	 * It has 50% chance to show Swap successful and 50% chance to show Swap failed, because web3 is not implemented yet
	 */
	function confirmSwap(): void {
		confirmPopup = false;
		if (Math.random() >= 0.5) popup = 'Swap Failed!';
		else popup = 'Swap Successful!';
	}

	/**
	 * A function executed when close in any popup is clicked, used to clear internal popup and confirm popup, so the popup is hidden.
	 */
	function closePopup(): void {
		confirmPopup = false;
		popup = '';
	}
</script>

<div class="swap-currency">
	<form
		class="swap-currency-form"
		on:submit|preventDefault={() => {
			popup = 'Are you sure you want to swap?';
			confirmPopup = true;
		}}
	>
		<h2 class="swap-currency-form-title">Swap</h2>
		<div class="swap-currency-form-row">
			<div class="swap-currency-row-text-input">
				<TextInput label="From" />
			</div>
			<p class="swap-currency-row-text">{fromToken}</p>
		</div>
		<p class="swap-currency-money-amount">$0.00 USD</p>
		<div class="swap-currency-swap-icon">
			<SwapTokensIcon />
		</div>
		<div class="swap-currency-form-row">
			<div class="swap-currency-row-text-input">
				<TextInput label="To" />
			</div>
			<div class="swap-currency-row-token-select">
				<SelectInput label="">
					<option value="">USDC</option>
					<option value="">USDT</option>
					<option value="">CSPR</option>
				</SelectInput>
			</div>
		</div>
		<p class="swap-currency-money-amount">$0.00 USD</p>
		{#if createNewToken}
			<p class="swap-currency-create-token-warning">
				This wallet currently does not contain USDC. USDC token will be added to this wallet upon
				swap
			</p>
		{/if}
		<div class="swap-currency-buttons">
			<Button>
				<div slot="text" class="leading-7 my-2">Swap</div>
			</Button>
			<Button class="swap-currency-cancel-swap-button" type="button">
				<div slot="text" class="swap-currency-cancel-swap-button-text">Cancel</div>
			</Button>
		</div>
	</form>
	{#if popup}
		<Popup
			title={popup}
			hasCancel={confirmPopup}
			on:confirm={() => {
				confirmPopup ? confirmSwap() : closePopup();
			}}
			on:cancel={closePopup}
		/>
	{/if}
</div>

<style lang="postcss" global>
	.swap-currency {
		@apply relative;
		@apply min-h-[20rem] h-full w-full;
		@apply dark:bg-dark-grey;
	}

	.swap-currency-form {
		@apply h-full w-full;
		@apply flex flex-col;
		@apply px-16;
		@apply lg:px-7;
	}

	.swap-currency-form-title {
		@apply mt-16 mb-7;
		@apply text-xl font-bold text-center;
		@apply lg:mt-20 lg:mb-14;
		@apply dark:text-white;
	}

	.swap-currency-form-row {
		@apply w-full;
		@apply flex flex-row items-center justify-center;
		@apply gap-4;
	}

	.swap-currency-row-text-input {
		@apply w-2/3;
	}

	.swap-currency-row-text {
		@apply w-1/3;
		@apply text-center font-bold text-sm text-light-grey;
		@apply mt-4;
		@apply dark:text-white;
	}

	.swap-currency-row-token-select {
		@apply w-1/3;
	}

	.swap-currency-money-amount {
		@apply mt-5;
		@apply font-medium text-sm text-light-grey;
		@apply dark:text-white;
	}

	.swap-currency-swap-icon {
		@apply w-2/3;
		@apply flex items-center justify-center;
		@apply py-6;
		@apply lg:w-full;
	}

	.swap-currency-create-token-warning {
		@apply mt-3;
		@apply text-light-grey189 text-sm font-semibold;
		@apply lg:mt-6;
	}

	.swap-currency-buttons {
		@apply w-3/4;
		@apply flex flex-col;
		@apply mx-auto gap-4 mt-28 mb-16;
		@apply lg:mt-10 lg:w-full lg:gap-1;
	}

	.swap-currency-cancel-swap-button {
		/* Important, because otherwise values inside button component overwrite these settings */
		@apply bg-transparent border-transparent !important;
	}

	.swap-currency-cancel-swap-button-text {
		@apply my-2;
		@apply text-xs leading-7 font-bold text-dark-gray;
		@apply lg:text-sm;
		@apply dark:text-white;
	}
</style>
