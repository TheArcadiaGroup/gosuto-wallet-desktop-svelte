<script lang="ts">
	import Chart from './Chart.svelte';
	import CurrencyName from './CurrencyName.svelte';
	import CurrencyPrice from './CurrencyPrice.svelte';
	import SelectMenu from './SelectMenu.svelte';
</script>

<div
	class="bg-white w-[375px] md:w-[620px] rounded-[22px] pl-[21px] pr-[15px] pt-5 pb-[30px] flex flex-col currency-performance-card"
>
	<div class="flex flex-row justify-between items-start">
		<div class=" flex flex-col justify-start">
			<CurrencyName />
			<CurrencyPrice />
		</div>
		<SelectMenu />
	</div>
	<div class="w-full h-full">
		<Chart />
	</div>
</div>

<style>
	.currency-performance-card {
		box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.05);
	}
</style>
