<script lang="ts">
	import { sendToken } from '$utils/token.util';

	import TextInput from '$lib/components/TextInput.svelte';
	import SelectInput from '$lib/components/SelectInput.svelte';
	import Button from '$lib/components/Button.svelte';
	import Popup from '$lib/components/Popup.svelte';
	import { shortenAddress } from '$utils';
	import { selectedWallet } from '$stores/user/wallets';
	import { goto } from '$app/navigation';
	import { user } from '$stores/user';

	export let selectedToken: IToken;

	let popup = '';
	let popupContent = '';
	let confirmPopup = false;

	let tokenAmount = 0;
	let recipientAddress = '';
	let note = '';
	let network: 'mainnet' | 'testnet' = 'mainnet';
	$: tokenMinusFee =
		tokenAmount *
		(1 -
			(import.meta.env.VITE_SEND_TX_FEE_PERCENTAGE
				? +import.meta.env.VITE_SEND_TX_FEE_PERCENTAGE
				: 2.5) /
				100);

	function sendCurrency(): void {
		popup = 'Send CSPR';
		popupContent = `You are about to send ${tokenAmount} ${selectedToken} to ${shortenAddress(
			recipientAddress,
		)} on the ${network}.`;
		confirmPopup = true;
	}

	async function confirmSend(): Promise<void> {
		confirmPopup = false;
		popupContent = '';

		if ($selectedWallet) {
			console.log(
				$selectedWallet.walletAddress,
				$selectedWallet.privateKey,
				tokenAmount,
				recipientAddress,
				selectedToken.contractAddress,
				network,
				note,
			);

			const result = await sendToken(
				$selectedWallet.walletAddress,
				$selectedWallet.privateKey,
				tokenAmount,
				recipientAddress,
				selectedToken.contractAddress,
				network,
				note,
			);

			console.log(result);

			if (typeof result !== 'string') {
				popup = 'Send Failed!';
			} else {
				popup = 'Success';
				popupContent = `You sent ${tokenAmount} ${selectedToken} to ${recipientAddress}`;
			}

			return;
		} else {
			// TODO: SHOW NOTIFICATION - NO WALLET FOUND
			goto('/profile');
			return;
		}
	}

	function closePopup(): void {
		confirmPopup = false;
		popupContent = '';
		popup = '';
	}
</script>

<div class="currency">
	<form class="currency-form" on:submit|preventDefault={sendCurrency}>
		<h2 class="currency-form-title">
			Send {selectedToken.tokenName} ({selectedToken.tokenTicker})
		</h2>
		<div class="currency-form-row">
			<TextInput
				bind:value={tokenAmount}
				class="send-currency-dark-sidebar-input"
				type="number"
				label="Enter {selectedToken.tokenName} amount"
			/>
		</div>
		<div class="currency-money-amount">
			<p>
				${(selectedToken.tokenPriceUSD * tokenMinusFee).toFixed(2)} USD
			</p>
			<p class="money-right">{import.meta.env.VITE_SEND_TX_FEE_PERCENTAGE || 2.5}% Fee</p>
		</div>
		<p class="currency-money-amount">
			Recipient receives: {tokenMinusFee ?? 0}
			{selectedToken.tokenTicker} ({parseFloat(
				selectedToken.tokenPriceUSD * tokenMinusFee > 99999999
					? (selectedToken.tokenPriceUSD * tokenMinusFee).toFixed(2)
					: (selectedToken.tokenPriceUSD * tokenMinusFee).toFixed(3),
			)} USD)
		</p>
		<div class="currency-form-row">
			<TextInput
				bind:value={recipientAddress}
				class="send-currency-dark-sidebar-input"
				label="Recipient Address"
			/>
		</div>
		<div class="currency-form-row">
			<TextInput
				bind:value={note}
				class="send-currency-dark-sidebar-input"
				label="Note (optional)"
			/>
		</div>
		<div class="currency-form-row">
			<SelectInput
				selectCustomClass="text-sm"
				bind:value={network}
				class="send-currency-dark-sidebar-input"
				label="Network"
			>
				<option value="mainnet">CSPR Network (Mainnet)</option>
				<option value="testnet">CSPR Network (Testnet)</option>
			</SelectInput>
		</div>
		<div class="currency-buttons">
			<Button isDisabled={!$selectedWallet || !recipientAddress || tokenAmount <= 0}>
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
				confirmPopup ? confirmSend() : closePopup();
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
		@apply dark:bg-dark-blue;
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
		@apply ml-4;
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

	/* hide number input arrows */

	.send-currency-dark-sidebar-input[type='number']::-webkit-outer-spin-button,
	.send-currency-dark-sidebar-input[type='number']::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.send-currency-dark-sidebar-input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
