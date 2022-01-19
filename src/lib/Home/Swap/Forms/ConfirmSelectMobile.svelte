<script>
	import Button from '$lib/Common/Button.svelte';

	export let cryptoName = 'Tether';
	export let cryptoUnit = 'USDT';
	export let cryptoAmount = 2000;
	export let positive = true;
</script>

<div class="select-currency">
	<div class="currency-info">
		<p class="selected-crypto">{cryptoName} ({cryptoUnit})</p>
		<div class="currency-amount {positive ? 'text-light-green' : 'text-light-red'}">
			<p class="crypto-amount">{cryptoAmount} {cryptoUnit}</p>
			<p class="real-amount">$175 USD</p>
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
		@apply md:rounded-none;
		@apply dark:bg-dark-grey md:dark:bg-dark-blue;
		box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
	}

	:local(.select-currency::before) {
		content: '';
		@apply absolute top-0 my-3 w-1/3 h-2 rounded-3xl bg-light-transparentGrey12;
		@apply md:hidden;
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
