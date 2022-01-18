<script lang="ts">
	import GridLayout from '$lib/Common/GridLayout.svelte';
	import CurrencyPerfomance from '$lib/components/CurrencyPerformance/CurrencyPerfomance.svelte';

	// To be populated dynamically from the DB when this route is served.
	let currencyPerfomance = [
		{
			tokenName: 'CSPR',
			price: 52.248,
			percentageChange: -2.12,
			chartPrices: [
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
			chartPrices: [
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

<GridLayout>
	<div slot="mid" class="column-container">
		<div class="card-container">
			{#each currencyPerfomance as performance}
				<CurrencyPerfomance {...performance} />
			{/each}
		</div>
	</div>
</GridLayout>

<!-- Styles -->
<style lang="postcss" global>
	:local(.column-container) {
		@apply dark:bg-dark-gosutoDark border-none h-full;
	}
	:local(.card-container) {
		@apply flex flex-col items-center justify-center gap-10 py-20;
	}
</style>
