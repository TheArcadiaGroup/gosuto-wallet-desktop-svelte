<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import SwapTokensIcon from '$icons/SwapTokensIcon.svelte';
	import TextInput from '$lib/Common/TextInput.svelte';
	import Button from '$lib/Common/Button.svelte';
	import SelectInput from '$lib/Common/SelectInput.svelte';
	import Popup from '$lib/Common/Popup.svelte';

	let dispatch = createEventDispatcher()

	export let fromToken = 'USDT'
	export let createNewToken = true

	let popup = ''
	let confirmPopup = false

	function confirmSwap (): void {
		confirmPopup = false
		if (Math.random() >= 0.5) popup = 'Swap Failed!'
		else popup = 'Swap Successful!'
	}

	function closePopup (): void {
		confirmPopup = false
		popup = ''
	}
</script>

<div class="swap-currency">
	<form class="swap-form" on:submit|preventDefault={ () => {popup = 'Are you sure you want to swap?'; confirmPopup = true; }}>
		<h2 class="form-title">Swap</h2>
		<div class="form-row">
			<div class="row-text-input">
				<TextInput label="From"/>
			</div>
			<p class="row-text">{fromToken}</p>
		</div>
		<p class="money-amount">$0.00 USD</p>
		<div class="swap-icon">
			<SwapTokensIcon />
		</div>
		<div class="form-row">
			<div class="row-text-input">
				<TextInput label="To" />
			</div>
			<div class="row-token-select">
				<SelectInput label="">
					<option value=''>USDC</option>
					<option value=''>USDT</option>
					<option value=''>CSPR</option>
				</SelectInput>
			</div>
		</div>
		<p class="money-amount">$0.00 USD</p>
		{#if createNewToken}
			<p class="create-token-warning">
				This wallet currently does not contain USDC.
				USDC token will be added to this wallet upon swap
			</p>
		{/if}
		<div class="buttons">
			<Button>
				<div slot="text" class="landing-7 my-2">Swap</div>
			</Button>
			<Button class="cancel-swap-button" type="button">
				<div slot="text" class="cancel-swap-button-text">
					Cancel
				</div>
			</Button>
		</div>
	</form>
	{#if popup}
		<Popup title={popup} hasCancel={confirmPopup} on:confirm={() => { confirmPopup ? confirmSwap() : closePopup()} } on:cancel={closePopup} />
	{/if}
</div>

<style lang="postcss">

    .swap-currency {
        @apply relative min-h-[20rem] rounded-t-3xl h-full w-full;
		@apply md:rounded-none;
		@apply dark:bg-dark-blue;
        box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
    }

	.swap-currency::before {
		content: '';
		@apply absolute left-1/2 -translate-x-1/2 top-0 my-3 w-1/3 h-2 rounded-3xl bg-light-transparentGrey12;
        @apply md:hidden;
	}

	.swap-form {
		@apply h-full w-full flex flex-col px-16;
		@apply md:px-7;
	}

	.form-title {
		@apply text-xl font-bold text-center mt-16 mb-7;
		@apply md:mt-20 md:mb-14;
		@apply dark:text-white;
	}

	.form-row {
		@apply w-full flex flex-row gap-4 items-center justify-center;
	}

	.row-text-input {
		@apply w-2/3;
	}

	.row-text {
		@apply mt-4 w-1/3 text-center font-bold text-sm;
		@apply text-light-grey dark:text-white;
	}

	.row-token-select {
		@apply w-1/3;
	}

	.money-amount {
		@apply font-medium text-sm mt-5;
		@apply text-light-grey dark:text-white;
	}

	.swap-icon {
		@apply w-2/3 flex items-center justify-center py-6;
		@apply md:w-full;
	}

	.create-token-warning {
		@apply text-light-grey189 text-sm font-semibold mt-3;
		@apply md:mt-6;
	}

	.buttons {
		@apply w-3/4 mx-auto flex flex-col gap-4 mt-28 mb-16;
		@apply md:mt-10 md:w-full md:gap-1;
	}

	:global(.cancel-swap-button) {
		/* Important, because otherwise values inside button component overwrite these settings */
		@apply bg-transparent border-transparent !important;
	}

	.cancel-swap-button-text {
		@apply my-2 text-xs leading-7 font-bold text-dark-gray dark:text-white md:text-sm;
	}
</style>
