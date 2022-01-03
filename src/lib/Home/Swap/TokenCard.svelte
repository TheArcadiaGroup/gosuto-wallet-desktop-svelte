<script>

	export let cryptoUnit = 'USDT';
	export let currencyUnit = 'USD';

	export let positive = true

</script>

<div class="token-card">
	<div class="gap-1">
		<p class="font-bold my-0.5">Tether ({cryptoUnit})</p>
		<p class="text-2xl font-bold {positive ? 'text-light-green' : 'text-light-red'}">2000 {cryptoUnit}</p>
		<p class="font-bold {positive ? 'text-light-green' : 'text-light-red'}">$175 {currencyUnit}</p>
	</div>
	<div class="ml-auto text-right">
		<!-- TODO: up / down arrow -->
		<p class="font-bold {positive ? 'text-light-green' : 'text-light-red'}">+15%</p>
		<p class="font-bold text-sm {positive ? 'text-light-green' : 'text-light-red'}">897,000 CSPR</p>
		<p class="font-bold text-sm text-light-gray">(24h)</p>
	</div>
</div>

<style lang="postcss">
	.token-card {
		@apply p-5 flex flex-row rounded-[1.375rem] cursor-pointer;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
</style>