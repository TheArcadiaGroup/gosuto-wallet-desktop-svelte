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
	<div class="currency-info">
		<p class="selected-crypto">{cryptoName} ({cryptoUnit})</p>
		<div class="currency-amount {positive ? 'text-light-green' : 'text-light-red'}">
			<p class="crypto-amount">{cryptoAmount} {cryptoUnit}</p>
			<p class="real-amount">{currencySymbol}{currencyAmount} {currencyAmount}</p>
		</div>
	</div>
	<div class="button">
		<Button><span class="my-2">Select</span></Button>
	</div>
</div>

<style lang="postcss" global>
	:local(.select-currency) {
		@apply relative h-full w-full min-h-[20rem] rounded-t-3xl px-16;
		@apply flex flex-col items-center justify-center;
	}

	:local(.selected-crypto) {
		@apply font-bold;
		@apply text-light-grey dark:text-white;
	}

	:local(.currency-info) {
		@apply w-full flex flex-row;
	}

	:local(.currency-amount) {
		@apply ml-auto flex flex-col text-right;
	}

	:local(.crypto-amount) {
		@apply font-bold text-sm;
	}

	:local(.real-amount) {
		@apply font-bold text-xs;
	}

	:local(.button) {
		@apply w-1/2 mx-auto flex flex-col gap-4 pt-4;
		@apply md:mt-10 md:w-full md:gap-1;
	}
</style>
