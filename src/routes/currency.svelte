<script>
	import CurrencyPerfomance from '$lib/components/CurrencyPerformance/CurrencyPerfomance.svelte';
</script>

<div class="font-display flex flex-col items-center justify-center gap-10 py-20">
	<div class="dark">
		<CurrencyPerfomance percentageChange="-2.12" price="52.248" />
		<!-- <CurrencyPerfomance tokenName={'Tether (USDT)'} /> -->
	</div>
</div>
