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
	import Loading from '$lib/components/Loading.svelte';
	import { sendTokenTracker } from '$stores/activityLoaders';
	import ErrorIcon from '$icons/ErrorIcon.svelte';
	import isValidPublicKey from '$utils/validators/isValidPublicKey';
	import SuccessIcon from '$icons/SuccessIcon.svelte';
	import { retrieveData, saveData } from '$utils/dataStorage';
	import { tokens } from '$stores/user/tokens';

	/*
	Validation Requirements
		- amount to be greater than 100
		- recipient address needs to be a public key
		- note should be a maximum of 100 characters
	*/

	// Defaults
	const paymentCost = 0.1; // Default payment amount
	const transactionCost = 0.1; // Default transaction cost
	const totalCost = paymentCost + transactionCost;

	export let selectedToken: IToken;

	let popup = '';
	let popupContent = '';
	let confirmPopup = false;

	let tokenAmount = 2.5;
	let recipientAddress = '';
	let note = '';
	let network: 'mainnet' | 'testnet' = $user?.network || 'mainnet';

	function sendCurrency(): void {
		popup = 'Send CSPR';
		popupContent = `<p>You are about to send <span class='amount'>${tokenAmount}</span> ${
			selectedToken.tokenTicker
		} to ${shortenAddress(recipientAddress)} on the ${network}.</p>`;
		confirmPopup = true;
	}

	async function confirmSend(): Promise<void> {
		confirmPopup = false;
		popupContent = '';

		if ($selectedWallet) {
			const result = await sendToken(
				$selectedWallet.publicKey,
				$selectedWallet.privateKey,
				tokenAmount,
				recipientAddress,
				selectedToken.contractHash,
				network,
				note,
				selectedToken.tokenTicker,
				$selectedWallet.algorithm,
			);

			// The result in this case matches the ID of the transaction that has just been sent out, or will be undefined until non-cspr token sending is enabled
			if (result) {
				// Show Loading Animation or start checker for the successful token sending
				if (result.error) {
					popup = 'Send Failed!';
					popupContent = `<p>${result.error ?? ''}</p>`;
				} else {
					popup = 'Sending';
					popupContent = `<p>Currently sending, <span class='amount'>${tokenAmount}</span> ${
						selectedToken.tokenTicker
					} to ${shortenAddress(recipientAddress)}.</p>`;
				}
			} else if (selectedToken.contractHash === 'CSPR') {
				popup = 'Send Failed!';
			} else if (selectedToken.contractHash !== 'CSPR') {
				popup = 'Sending';
				popupContent = `<p>Currently sending, <span class='amount'>${tokenAmount}</span> ${
					selectedToken.tokenTicker
				} to ${shortenAddress(recipientAddress)}.</p>`;
			}

			console.log(result);

			return;
		} else {
			// TODO: SHOW NOTIFICATION - NO WALLET FOUND
			goto('/profile');
			return;
		}
	}

	$: ((sendTokensTxs) => {
		if (sendTokensTxs) {
			// Called everytime there's an update so we have time to only get rid of one popup or show a success popup
			// First check if new transactions came in
			Object.keys(sendTokensTxs).map((item) => {
				if (sendTokensTxs[item]) {
					if (sendTokensTxs[item]?.error) {
						// Show error
						popup = 'Send Failed!';
						popupContent =
							sendTokensTxs[item]?.error ||
							`<p>Failed to send <span class='amount'>${sendTokensTxs[item]?.amount}</span> ${
								sendTokensTxs[item]?.token
							} to ${shortenAddress(sendTokensTxs[item]?.recipientPublicKey ?? '')}</p>`;
					} else if (sendTokensTxs[item]?.fulfilled) {
						// Clear loader and show respective popup with tx details

						popup = 'Success';
						popupContent = `<p>Succcessfully sent <span class='amount'>${
							sendTokensTxs[item]?.amount
						}</span> ${sendTokensTxs[item]?.token} to ${shortenAddress(
							sendTokensTxs[item]?.recipientPublicKey ?? '',
						)}.</p>`;
					}

					if (sendTokensTxs[item]?.fulfilled) {
						// remove the item from the sendTokenTrackers list
						delete sendTokensTxs[item];
						sendTokenTracker.set(sendTokensTxs);
					}
				}
			});
		}
	})($sendTokenTracker);

	function closePopup(): void {
		confirmPopup = false;
		popupContent = '';
		popup = '';
	}

	$: hasError =
		tokenAmount <= 0 ||
		tokenAmount < 2.5 ||
		tokenAmount > selectedToken.tokenAmountHeld - totalCost ||
		(Boolean(recipientAddress) && recipientAddress === $selectedWallet!.publicKey) ||
		(Boolean(recipientAddress) && !publicKeyValid);
	$: publicKeyValid = isValidPublicKey(recipientAddress);
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
				step={0.00001}
				label="Enter {selectedToken.tokenName} amount"
				addTextBg={true}
			/>
		</div>
		<!-- Amount Validation -->
		{#if tokenAmount <= 0 || tokenAmount < 2.5}
			<div class="error-div">
				<ErrorIcon class="mr-1" fill={'#e6332a'} />
				Amount must be at least 2.5 CSPR.
			</div>
		{/if}
		{#if tokenAmount > selectedToken.tokenAmountHeld - totalCost}
			<div class="error-div">
				<ErrorIcon class="mr-1" fill={'#e6332a'} />
				You can send a maximum of {Math.max(0, selectedToken.tokenAmountHeld - totalCost)}
			</div>
		{/if}

		<div class="currency-money-amount">
			<p class={selectedToken.tokenPriceUSD * tokenAmount > 0 ? 'text-light-lighterOrange' : ''}>
				${parseFloat((selectedToken.tokenPriceUSD * totalCost)?.toFixed(2))}
				{$user?.currency.toUpperCase() || 'USD'}
			</p>
			<p class="money-right">Approx. Fee</p>
		</div>
		<p class="currency-money-amount send-recipient-details">
			Recipient Receives:
			<span class={tokenAmount > 0 ? 'text-light-lighterOrange 2xl:ml-2' : ''}>
				<br class="2xl:hidden" />
				{parseFloat(tokenAmount?.toFixed(5)) ?? 0}
				{selectedToken.tokenTicker}
				({parseFloat((selectedToken.tokenPriceUSD * tokenAmount)?.toFixed(2))}
				{$user?.currency.toUpperCase() || 'USD'})
			</span>
		</p>
		<div class="currency-form-row">
			<TextInput
				bind:value={recipientAddress}
				class="send-currency-dark-sidebar-input"
				label="Recipient Address"
				addTextBg={true}
			/>
		</div>
		{#if Boolean(recipientAddress) && !publicKeyValid}
			<div class="error-div">
				<ErrorIcon class="mr-1" fill={'#e6332a'} />
				Please enter a valid public key
			</div>
		{/if}
		{#if Boolean(recipientAddress) && recipientAddress === $selectedWallet?.publicKey}
			<div class="error-div">
				<ErrorIcon class="mr-1" fill={'#e6332a'} />
				You cannot send tokens to yourself
			</div>
		{/if}
		<!-- <div class="currency-form-row">
			<TextInput
				bind:value={note}
				class="send-currency-dark-sidebar-input"
				label="Note (optional)"
				addTextBg={true}
			/>
		</div> -->
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
			<Button isDisabled={!$selectedWallet || !recipientAddress || hasError}>
				<div slot="text" class="leading-7 my-2">Send</div>
			</Button>
			<Button class="send-currency-cancel-send-button" type="button">
				<div slot="text" class="send-currency-cancel-send-button-text">Cancel</div>
			</Button>
		</div>
	</form>
</div>

{#if popup}
	<Popup
		title={popup}
		hasCancel={confirmPopup}
		on:confirm={() => {
			confirmPopup ? confirmSend() : closePopup();
		}}
		on:cancel={closePopup}
	>
		<p class="popup-text">
			{#if popup === 'Sending'}
				<Loading useFirework={false} size={60} />
			{:else}
				{@html popupContent}
			{/if}
		</p>
		{#if confirmPopup}
			<div class="popup-text opacity-50 text-2xs my-3">
				<div class="flex flex-row items-center justify-center bold">
					<ErrorIcon class="mr-1" fill={'#f1bf0b'} /> WARNING!
				</div>
				<div>
					Please double check the accuracy of the recipient public key. Funds sent to an incorrect
					public key cannot be recovered.
				</div>
			</div>
		{/if}
		{#if popup === 'Success'}
			<div class="popup-text opacity-50 text-2xs my-3">
				<div class="flex flex-row items-center justify-center bold">
					<SuccessIcon class="mr-1" fill={'#31de90'} /> Successfully Sent!
				</div>
				<div>
					After the transaction has been included in a block. It will appear in your history.
				</div>
			</div>
		{/if}
	</Popup>
{/if}

<style lang="postcss" global>
	:local(.currency) {
		@apply relative;
		@apply min-h-[20rem] h-full w-full;
		@apply dark:bg-dark-blue;
	}

	:local(.currency-form) {
		@apply h-full w-full pb-5;
		@apply flex flex-col;
		@apply px-8 gap-5;
		@apply lg:px-4 2xl:px-7;
	}

	:local(.currency-form-title) {
		@apply mt-16 mb-0;
		@apply text-xl font-bold text-center;
		@apply lg:mt-20;
		@apply dark:text-white;
	}

	:local(.currency-form-row) {
		@apply w-full;
		@apply flex flex-row items-center justify-center;
		/* @apply gap-4; */
	}

	:local(.currency-money-amount) {
		@apply flex;
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
		@apply dark:text-white break-words;
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
	/* 
	.send-currency-dark-sidebar-input {
		@apply dark:bg-dark-grey !important;
	} */

	/* hide number input arrows */

	.send-currency-dark-sidebar-input[type='number']::-webkit-outer-spin-button,
	.send-currency-dark-sidebar-input[type='number']::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.send-currency-dark-sidebar-input[type='number'] {
		-moz-appearance: textfield;
	}

	:local(.send-recipient-details) {
		@apply block -mt-2;
	}

	:local(.error-div) {
		@apply text-left text-xs text-[#e6332a] -mt-2 mb-1 flex items-center w-full px-2;
	}
</style>
