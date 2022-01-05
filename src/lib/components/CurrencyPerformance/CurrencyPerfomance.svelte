<script lang="ts">
	import Chart from './Chart.svelte';
	import CurrencyName from './CurrencyName.svelte';
	import CurrencyPrice from './CurrencyPrice.svelte';
	import SelectMenu from './SelectMenu.svelte';

	export const price: number = 0;
	export const percentageChange: number = 0;
	export const tokenName: string = '';
</script>

<div
	class="w-[375px] sm:w-[628px] rounded-[22px] pl-[21px] pr-[15px] sm:pl-[29px] sm:pr-[25px] pt-5 sm:pt-[34px]  pb-[30px] sm:pb-[19px] flex flex-col shadow-[0px_4px_13px_rgba(0,_0,_0,_0.05)] bg-white dark:bg-dark-grey"
>
	<!-- <div class="card dark:dark-color"> -->
	<div class="card-header">
		<div class="currency-details">
			<CurrencyName {tokenName} />
			<CurrencyPrice {price} {percentageChange} />
		</div>
		<SelectMenu />
	</div>

	<Chart />
</div>

<style>
	.card {
		@apply w-[375px] sm:w-[628px] rounded-[22px] pl-[21px] pr-[15px] sm:pl-[29px] sm:pr-[25px] pt-5 sm:pt-[34px]  pb-[30px] sm:pb-[19px] flex flex-col shadow-[0px_4px_13px_rgba(0,_0,_0,_0.05)] bg-white dark:bg-dark-grey;
	}
	.card-header {
		@apply flex flex-row justify-between items-start;
	}
	.currency-details {
		@apply flex flex-col justify-start;
	}
	/* .dark-color {
		background-color: #2a2f3c;
	} */
</style>
