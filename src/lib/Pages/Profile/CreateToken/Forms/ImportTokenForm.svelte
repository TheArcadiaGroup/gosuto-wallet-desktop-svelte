<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import ToggleSwitch from '$lib/components/ToggleSwitch.svelte';
	import { addTokenGivenContractHash } from '$utils/tokens/addToken';
	import { user } from '$stores/user';
	import { selectedWallet } from '$stores/user/wallets';
	import { pollyfillSelectedWallet } from '$utils/pollyfillData';
	import Popup from '$lib/components/Popup.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import ErrorIcon from '$icons/ErrorIcon.svelte';
	import SuccessIcon from '$icons/SuccessIcon.svelte';
	import { addingTokens } from '$stores/user/tokens';

	let contractHash = '';
	let tokenTicker = '';
	let decimals = 18;
	let shareToken = true;
	let preferContractDetails = true;

	let popup = '';
	let popupContent = '';
	let confirmPopup = false;

	async function submitImportToken() {
		popup = 'Adding Token';
		confirmPopup = false;

		if (!$selectedWallet?.privateKey) {
			pollyfillSelectedWallet();
		}

		await addTokenGivenContractHash(
			contractHash,
			decimals,
			shareToken,
			$selectedWallet!.publicKey,
			tokenTicker,
			$user?.network ?? 'testnet',
			preferContractDetails,
		);
	}

	function openConfirmPopup() {
		popup = 'Add Token';
		popupContent = `<p>You are about to add an ERC-20 Token Contract on the Casper ${
			$user?.network ?? 'testnet'
		} Network to your token list.</p>`;
		confirmPopup = true;
	}

	function confirmAddToken() {
		submitImportToken();
	}

	function closePopup(): void {
		confirmPopup = false;
		popupContent = '';
		popup = '';
	}

	$: ((tokenAddTxes) => {
		if (tokenAddTxes) {
			Object.keys(tokenAddTxes).map((key) => {
				if (tokenAddTxes[key]) {
					if (tokenAddTxes[key]?.error) {
						// Show error
						popup = 'Token Import Failed!';
						popupContent = tokenAddTxes[key]?.error || `<p>Failed to Import The Token</p>`;
					} else if (tokenAddTxes[key]?.result) {
						// Clear loader and show respective popup with tx details
						popup = 'Success';
						popupContent = `<p>Succcessfully Imported Token</p>`;

						// Clear Create Token Form
						contractHash = '';
						tokenTicker = '';
						decimals = 18;
					}

					if (tokenAddTxes[key]?.result) {
						// remove the key from the sendTokenTrackers list
						delete tokenAddTxes[key];
						addingTokens.set(tokenAddTxes);
					}
				}
			});
		}
	})($addingTokens);

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
	<form class="create-form" on:submit|preventDefault={openConfirmPopup}>
		<TextInput
			bind:value={contractHash}
			class="create-token-dark-sidebar-input"
			label="Contract Hash"
		/>

		{#if !preferContractDetails}
			<TextInput
				bind:value={tokenTicker}
				class="create-token-dark-sidebar-input"
				label="Token Ticker"
			/>
			<!-- <TextInput
				bind:value={decimals}
				class="create-token-dark-sidebar-input"
				label="Decimals"
				type="number"
			/> -->
		{/if}
		<div class="switch-row">
			<p class="switch-text">Prefer Contract Details</p>
			<div class="switch">
				<ToggleSwitch bind:checked={preferContractDetails} />
			</div>
		</div>
		<div class="switch-row">
			<p class="switch-text">Share token between wallets</p>
			<div class="switch">
				<ToggleSwitch bind:checked={shareToken} />
			</div>
		</div>
		<div class="confirm-buttons">
			<Button isDisabled={!contractHash || (!preferContractDetails && !tokenTicker)}>
				<div slot="text" class="my-2 leading-7">Import</div>
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

{#if popup}
	<Popup
		title={popup}
		hasCancel={confirmPopup}
		on:confirm={() => {
			confirmPopup ? confirmAddToken() : closePopup();
		}}
		on:cancel={closePopup}
	>
		<p class="popup-text">
			{#if popup === 'Adding Token'}
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
				<div>Please double check the accuracy of the contract hash before proceeding.</div>
			</div>
		{/if}
		{#if popup === 'Success'}
			<div class="popup-text opacity-50 text-2xs my-3">
				<div class="flex flex-row items-center justify-center bold">
					<SuccessIcon class="mr-1" fill={'#31de90'} /> Successfully Added!
				</div>
			</div>
		{/if}
	</Popup>
{/if}

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
