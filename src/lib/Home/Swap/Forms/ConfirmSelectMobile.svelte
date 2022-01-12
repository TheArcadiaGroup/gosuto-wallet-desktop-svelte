<script>
	import Button from '$lib/Common/Button.svelte';

	export let cryptoName = 'Tether'
	export let cryptoUnit = 'USDT'
	export let cryptoAmount = 2000
	export let positive = true
</script>
<div class="select-currency dark:bg-dark-grey md:dark:bg-dark-blue">
	<div class="currency-info">
		<p class="font-bold light:text-light-grey dark:text-white">{cryptoName} ({cryptoUnit})</p>
		<div class="currency-amount { positive ? 'text-light-green' : 'text-light-red' }">
			<p class="crypto-amount">{cryptoAmount} {cryptoUnit}</p>
			<p class="real-amount" >$175 USD</p>
		</div>
	</div>
	<div class="button">
		<Button><span class="my-2">Select</span></Button>
	</div>
</div>

<style lang="postcss">

	.select-currency {
		@apply relative h-full w-full min-h-[20rem] rounded-t-3xl px-16;
		@apply flex flex-col items-center justify-center;
		@apply md:rounded-none;
		box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
	}

	.select-currency::before {
		content: '';
		@apply absolute top-0 my-3 w-1/3 h-2 rounded-3xl bg-[#c4c4c41e];
        @apply md:hidden;
	}

	.currency-info {
		@apply w-full flex flex-row;
	}

	.currency-amount {
		@apply ml-auto flex flex-col text-right;
	}

	.crypto-amount {
		@apply font-bold text-sm;
	}

	.real-amount {
		@apply font-bold text-xs;
	}

	.button {
        @apply w-1/2 mx-auto flex flex-col gap-4 pt-4;
        @apply md:mt-10 md:w-full md:gap-1;
    }
</style>