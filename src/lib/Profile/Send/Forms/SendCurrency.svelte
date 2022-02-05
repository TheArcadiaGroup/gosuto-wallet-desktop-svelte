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
	 * Name of the token user has selected, and is swapping from.
	 * @type {string}
	 */
	export let selectedTokenName = 'Tether';
	/**
	 * Code of the token user has selected, and is swapping from.
	 * @type {string}
	 */
	export let selectedToken = 'USDT';

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
		<h2 class="swap-currency-form-title">Send { selectedTokenName }({ selectedToken })</h2>
		<div class="swap-currency-form-row">
			<TextInput label="Enter { selectedTokenName } amount" />
		</div>
		<div class="swap-currency-money-amount">
			<p>$0.00 USD</p>
			<p class="money-right">2.5% Fee</p>
		</div>
		<p class="swap-currency-money-amount">Recipient receives: 0 Tether (0 USD)</p>
		<div class="swap-currency-form-row">
			<TextInput label="Recipient Address" />
		</div>
		<div class="swap-currency-form-row">
			<TextInput label="Note (optional)" />
		</div>
		<div class="swap-currency-form-row">
			<SelectInput label="">
				<option value="cspr-network">CSPR Network</option>
				<option value="cspr-network">CSPR Network</option>
				<option value="cspr-network">CSPR Network</option>
			</SelectInput>
		</div>
		<div class="swap-currency-buttons">
			<Button>
				<div slot="text" class="leading-7 my-2">Send</div>
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

	.swap-currency-money-amount {
		@apply mt-5;
		@apply flex;
		@apply font-medium text-sm text-light-grey;
		@apply dark:text-white;
	}

	.money-right {
		@apply ml-auto;
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
