<!--
@component
The wallet swap last column. This component is used to confirm whether user actually wants, or doesn't want to swap the tokens.
It is currently not used, and is only on mobile version inside of the app designs.
@todo use this component inside swap route instead of showing confirm popup
@author marekvospel
-->
<script>
	import Button from '$lib/Common/Button.svelte';

	/**
	 * Whether the token is rising (true, green values will be shown), or declining (false, red values will be shown)
	 * @type {boolean}
	 */
	export let positive = true;

	/**
	 * Name of the token shown inside this component
	 * @type {string}
	 */
	export let cryptoName = 'Tether';
	/**
	 * Code of the token shown inside this component
	 * @type {string}
	 */
	export let cryptoUnit = 'USDT';
	/**
	 * Amount of the token shown inside this component
	 * @type {number}
	 */
	export let cryptoAmount = 2000;

	/**
	 * Code of the real currency shown inside this component
	 */
	export let currencyUnit = 'USD';
	/**
	 * Symbol of the real currency shown inside this component
	 */
	export let currencySymbol = '$';
	/**
	 * Amount of the real currency shown inside this component
	 */
	export let currencyAmount = 175;
</script>

<div class="select-currency">
	<div class="select-currency-info">
		<p class="select-currency-selected-crypto">{cryptoName} ({cryptoUnit})</p>
		<div class="select-currency-amount {positive ? 'text-light-green' : 'text-light-red'}">
			<p class="select-currency-crypto-amount">{cryptoAmount} {cryptoUnit}</p>
			<p class="select-currency-real-amount">{currencySymbol}{currencyAmount} {currencyAmount}</p>
		</div>
	</div>
	<div class="select-currency-button">
		<Button><span class="my-2">Select</span></Button>
	</div>
</div>

<style lang="postcss" global>
	.select-currency {
		@apply relative;
		@apply h-full w-full min-h-[20rem];
		@apply flex flex-col items-center justify-center;
		@apply px-16;
		@apply dark:bg-dark-grey;
	}

	.select-currency-selected-crypto {
		@apply font-bold text-light-grey;
		@apply dark:text-white;
	}

	.select-currency-info {
		@apply w-full;
		@apply flex flex-row;
	}

	.select-currency-amount {
		@apply flex flex-col;
		@apply ml-auto;
		@apply text-right;
	}

	.select-currency-crypto-amount {
		@apply font-bold text-sm;
	}

	.select-currency-real-amount {
		@apply font-bold text-xs;
	}

	.select-currency-button {
		@apply w-1/2;
		@apply flex flex-col;
		@apply mx-auto gap-4 pt-4;
		@apply lg:mt-10 lg:w-full lg:gap-1;
	}
</style>
