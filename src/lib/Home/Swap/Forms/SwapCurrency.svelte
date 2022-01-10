<script lang="ts">
	import SwapTokensIcon from '$icons/SwapTokensIcon.svelte';
	import TextInput from '$lib/Common/TextInput.svelte';
	import Button from '$lib/Common/Button.svelte';
	import SelectInput from '$lib/Common/SelectInput.svelte';

	export let fromToken = 'USDT'
	export let createNewToken = true
</script>
<div class="swap-currency dark:bg-dark-blue">
	<form class="swap-form" on:submit|preventDefault>
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
		<div class='buttons'>
			<Button>Swap</Button>
			<Button color="none">Cancel</Button>
		</div>
	</form>
</div>

<style lang="postcss">

    .swap-currency {
        @apply h-full w-full;
        box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
    }

	.swap-form {
		@apply h-full w-full flex flex-col px-7;
	}

	.form-title {
		@apply text-xl font-bold text-center mt-20 mb-14;
	}

	.form-row {
		@apply w-full flex flex-row gap-4 items-center justify-center;
	}

	.row-text-input {
		@apply w-2/3;
	}

	.row-text {
		@apply mt-4 w-1/3 text-center font-bold text-base text-light-grey;
	}

	.row-token-select {
		@apply w-1/3;
	}

	.money-amount {
		@apply font-medium text-sm text-light-grey mt-5;
	}

	.swap-icon {
		@apply w-full flex items-center justify-center py-6;
	}

	.create-token-warning {
		@apply text-[#BDBDBE] text-sm font-semibold mt-6;
	}

	.buttons {
		@apply flex flex-col gap-1 mt-10;
	}
</style>
