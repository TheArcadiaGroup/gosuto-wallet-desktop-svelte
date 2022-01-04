<script lang="ts">
	import Chart from './Chart.svelte';
	import CurrencyName from './CurrencyName.svelte';
	import CurrencyPrice from './CurrencyPrice.svelte';
	import SelectMenu from './SelectMenu.svelte';
	export let price: number;
	export let percentageChange: number;
	export let tokenName: string;
</script>

<!-- class="bg-white dark:bg-dark-grey w-[375px] sm:w-[628px] rounded-[22px] pl-[21px] pr-[15px] sm:pl-[29px] sm:pr-[25px] pt-5 sm:pt-[34px]  pb-[30px] sm:pb-[19px] flex flex-col currency-performance-card" -->
<div
	class="bg-white dark:bg-dark-grey w-[375px] sm:w-[628px] rounded-[22px] pl-[21px] pr-[15px] sm:pl-[29px] sm:pr-[25px] pt-5 sm:pt-[34px]  pb-[30px] sm:pb-[19px] flex flex-col currency-performance-card"
>
	<div class="flex flex-row justify-between items-start">
		<div class=" flex flex-col justify-start">
			<CurrencyName {tokenName} />
			<CurrencyPrice {price} {percentageChange} />
		</div>
		<SelectMenu />
	</div>

	<Chart />
</div>

<style>
	.currency-performance-card {
		box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.05);
	}
</style>
