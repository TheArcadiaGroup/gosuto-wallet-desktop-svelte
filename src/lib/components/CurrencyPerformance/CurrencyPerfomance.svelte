<script lang="ts">
	import Chart from './Chart.svelte';
	import CurrencyName from './CurrencyName.svelte';
	import CurrencyPrice from './CurrencyPrice.svelte';
	import SelectMenu from './SelectMenu.svelte';

	export let price: number;
	export let percentageChange: number;
	export let tokenName: string;
	export let prices: {
		x: string;
		y: number;
	}[];
</script>

<div class="card">
	<div class="card-header">
		<div class="currency-details">
			<CurrencyName {tokenName} />
			<CurrencyPrice {price} {percentageChange} />
		</div>
		<SelectMenu />
	</div>

	<Chart {prices} />
</div>

<style lang="postcss" global>
	.card {
		@apply w-[375px] sm:w-[628px] rounded-[22px] pl-[21px] pr-[15px] sm:pl-[29px] sm:pr-[25px] pt-5 sm:pt-[34px]  pb-[30px] sm:pb-[19px] flex flex-col shadow-[0px_4px_13px_rgba(0,_0,_0,_0.05)] bg-white dark:bg-dark-grey;
	}
	.card-header {
		@apply flex flex-row justify-between items-start;
	}
	.currency-details {
		@apply flex flex-col justify-start;
	}
</style>
