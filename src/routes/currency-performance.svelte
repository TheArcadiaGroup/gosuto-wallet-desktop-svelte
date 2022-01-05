<script lang="ts">
	import CurrencyPerfomance from '$lib/components/CurrencyPerformance/CurrencyPerfomance.svelte';

	// To be populated dynamically
	let currencyPerfomance = [
		{
			tokenName: 'CSPR',
			price: 52.248,
			percentageChange: -2.12,
			prices: [
				{ x: '2022-01-03T09:00:00', y: 7 },
				{ x: '2022-01-03T10:10:00', y: 9 },
				{ x: '2022-01-03T11:18:00', y: 14 },
				{ x: '2022-01-03T12:21:00', y: 11 },
				{ x: '2022-01-03T12:27:00', y: 18 },
				{ x: '2022-01-03T12:35:00', y: 20 },
				{ x: '2022-01-03T13:00:00', y: 23 },
			],
		},
		{
			tokenName: 'Tether (USDT)',
			price: 24.214,
			percentageChange: 2.54,
			prices: [
				{ x: '2022-01-03T08:00:00', y: 7 },
				{ x: '2022-01-03T08:10:00', y: 5 },
				{ x: '2022-01-03T08:18:00', y: 9 },
				{ x: '2022-01-03T08:21:00', y: 13 },
				{ x: '2022-01-03T08:27:00', y: 15 },
				{ x: '2022-01-03T08:35:00', y: 19 },
				{ x: '2022-01-03T09:00:00', y: 22 },
			],
		},
	];
</script>

<div class="font-display flex flex-col items-center justify-center gap-10 py-20">
	<!-- <CurrencyPerfomance tokenName={'CSPR'} percentageChange={-2.12} price={52.248} />
	<CurrencyPerfomance tokenName={'Tethet (USDT)'} percentageChange={2.54} price={25.214} /> -->
	{#each currencyPerfomance as performance}
		<CurrencyPerfomance {...performance} />
	{/each}
</div>
