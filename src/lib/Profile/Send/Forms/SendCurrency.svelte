<!--
@component
The wallet send last column, this component should be shown if user has selected a Token.
This component allows user to select how much and what token they want to send, and who to send it to.
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
	 * Name of the token user has selected, and is sending from.
	 * @type {string}
	 */
	export let selectedTokenName = 'Tether';
	/**
	 * Code of the token user has selected, and is sending from.
	 * @type {string}
	 */
	export let selectedToken = 'USDT';

	let popup = '';
	let popupContent = '';
	let confirmPopup = false;

	/**
	 * A function run when user clicks confirm inside the 'are you sure' popup.
	 * It has 50% chance to show Swap successful and 50% chance to show Swap failed, because web3 is not implemented yet
	 */
	function confirmSwap(): void {
		confirmPopup = false;
		popupContent = '';
		if (Math.random() >= 0.5) popup = 'Send Failed!';
		else {
			popup = 'Success';
			popupContent = 'You sent 50 CSPR to 4e32r8932hdi32hurh8hri3hior2io3r32rj3iofj';
		}
	}

	/**
	 * A function executed when close in any popup is clicked, used to clear internal popup and confirm popup, so the popup is hidden.
	 */
	function closePopup(): void {
		confirmPopup = false;
		popupContent = '';
		popup = '';
	}
</script>

<div class="currency">
	<form
		class="currency-form"
		on:submit|preventDefault={() => {
			popup = 'Send CSPR';
			popupContent = 'You are about to send 50 CSPR to 4e32r8932hdi32hurh8hri3hior2io3r32rj3iofj on the CSPR network.';
			confirmPopup = true;
		}}
	>
		<h2 class="currency-form-title">Send { selectedTokenName } ({ selectedToken })</h2>
		<div class="currency-form-row">
			<TextInput class="send-currency-dark-sidebar-input" label="Enter { selectedTokenName } amount" />
		</div>
		<div class="currency-money-amount">
			<p>$0.00 USD</p>
			<p class="money-right">2.5% Fee</p>
		</div>
		<p class="currency-money-amount">Recipient receives: 0 Tether (0 USD)</p>
		<div class="currency-form-row">
			<TextInput class="send-currency-dark-sidebar-input" label="Recipient Address" />
		</div>
		<div class="currency-form-row">
			<TextInput class="send-currency-dark-sidebar-input" label="Note (optional)" />
		</div>
		<div class="currency-form-row">
			<SelectInput class="send-currency-dark-sidebar-input" label="Network">
				<option value="cspr-network">CSPR Network</option>
				<option value="cspr-network">CSPR Network</option>
				<option value="cspr-network">CSPR Network</option>
			</SelectInput>
		</div>
		<div class="currency-buttons">
			<Button>
				<div slot="text" class="leading-7 my-2">Send</div>
			</Button>
			<Button class="send-currency-cancel-send-button" type="button">
				<div slot="text" class="send-currency-cancel-send-button-text">Cancel</div>
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
		>
			<p class="popup-text">{popupContent}</p>
		</Popup>
	{/if}
</div>

<style lang="postcss" global>
	:local(.currency) {
		@apply relative;
		@apply min-h-[20rem] h-full w-full;
		@apply dark:bg-dark-grey;
	}

	:local(.currency-form) {
		@apply h-full w-full;
		@apply flex flex-col;
		@apply px-16 gap-8;
		@apply lg:px-7;
	}

	:local(.currency-form-title) {
		@apply mt-16 mb-7;
		@apply text-xl font-bold text-center;
		@apply lg:mt-20 lg:mb-14;
		@apply dark:text-white;
	}

	:local(.currency-form-row) {
		@apply w-full;
		@apply flex flex-row items-center justify-center;
		@apply gap-4;
	}

	:local(.currency-money-amount) {
		@apply flex;
		@apply ml-8 mt-5;
		@apply font-medium text-sm text-light-grey;
		@apply dark:text-white;
	}

	:local(.money-right) {
		@apply ml-auto;
	}

	:local(.currency-buttons) {
		@apply w-3/4;
		@apply flex flex-col;
		@apply mx-auto gap-4 mt-28 mb-16;
		@apply lg:mt-10 lg:w-full lg:gap-1;
	}

	:local(.popup-text) {
		@apply dark:text-white;
	}

	.send-currency-cancel-send-button {
		/* Important, because otherwise values inside button component overwrite these settings */
		@apply bg-transparent border-transparent !important;
	}

	.send-currency-cancel-send-button-text {
		@apply my-2;
		@apply text-xs leading-7 font-bold text-dark-gray;
		@apply lg:text-sm;
		@apply dark:text-white;
	}

	.send-currency-dark-sidebar-input {
		@apply dark:bg-dark-grey !important;
	}
</style>
