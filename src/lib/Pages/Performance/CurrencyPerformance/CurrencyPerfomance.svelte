<script lang="ts">
	import Chart from './Chart.svelte';
	import CurrencyName from './CurrencyName.svelte';
	import CurrencyPrice from './CurrencyPrice.svelte';
	import SelectMenu from './SelectMenu.svelte';

	export let price: number;
	export let percentageChange: number;
	export let tokenName: string;
	export let chartPrices: {
		day: ChartPrice[];
		week: ChartPrice[];
		month: ChartPrice[];
	};

	let selectedRange: 'day' | 'week' | 'month';
	$: selectedRange = 'day';
</script>

<div class="card">
	<div class="card-header">
		<div class="currency-details">
			<CurrencyName {tokenName} />
			<CurrencyPrice {price} {percentageChange} />
		</div>
		<SelectMenu bind:selectedRange />
	</div>

	<Chart chartPrices={chartPrices[selectedRange]} />
</div>

<style lang="postcss" global>
	:local(.card) {
		@apply w-[85%] rounded-[22px] 2xl:rounded-[1.5vw] pt-5 md:pt-[34px] 2xl:pt-[2.5vw] pb-[30px] md:pb-[19px] 2xl:pb-[1.25vw] flex flex-col shadow-[0px_4px_13px_rgba(0,_0,_0,_0.05)] bg-white dark:bg-dark-blue;
	}
	:local(.card-header) {
		@apply w-[90%] mx-auto flex flex-row justify-between items-center;
	}
	:local(.currency-details) {
		@apply flex flex-col justify-start 2xl:gap-y-[0.5vw];
	}
</style>
