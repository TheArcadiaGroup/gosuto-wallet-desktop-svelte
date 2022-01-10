<script lang="ts">
	import SwapTokensIcon from '$icons/SwapTokensIcon.svelte';
	import TextInput from '$lib/Common/TextInput.svelte';
</script>
<div class="swap-currency dark:bg-dark-blue">
	<form class="swap-form" on:submit|preventDefault>
		<h2>Swap</h2>
		<div class="form-row">
			<TextInput label="From"/>
			<p>USDT</p>
		</div>
		<p>$0.00 USD</p>
		<div class="swap-icon">
			<SwapTokensIcon />
		</div>
		<div class="form-row">
			<TextInput label='To' />
			<select id=''>
				<option>USDT</option>
				<option>USDC</option>
				<option>CSPR</option>
			</select>
		</div>
		<p>
			This wallet currently does not contain USDC.<br>
			USDC token will be added to this wallet upon swap
		</p>
		<button>Swap</button>
		<button>Cancel</button>
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

	.form-row {
		@apply flex flex-row items-center;
	}

	.swap-icon {
		@apply w-full flex items-center justify-center;
	}
</style>
