<script lang="ts">
	import { onMount } from 'svelte';

	import CurrencyPerfomance from '$lib/pages/Performance/CurrencyPerformance/CurrencyPerfomance.svelte';
	// import { getAllTokens } from '$utils/token.util';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
	import { getCoinChart } from '$utils/charts';
	import Loading from '$lib/components/Loading.svelte';
	import { user } from '$stores/user';

	/**
	 * This is the array of tokens, that will be shown in this route. It is being populated by the onMount hook.
	 * each currency has 4 properties. tokenName, price (it's price in USD), percentageChange (how much the price of this currency has changed since the start of the chart), and chartPrices (the currency's performance chart point - x & y value)
	 * percentageChange will be calculated from chartPrices inside onMount as long as the chartPrices first element is the current value and the last element is the currency value on the first x point
	 * percentageChange's element should have an x value (date.toISOString()) and y value (how much it was worth on that date)
	 *
	 * an example of populated currencyPerformance
	 * [{
	 * "tokenName": "Test (TST)",
	 * "price": 9.5775,
	 * "percentageChange": -126,
	 * "chartPrices": [
	 *   {
	 *     "x": "2022-02-14T21:22:43.906Z",
	 *     "y": 2.0833
	 *   },
	 *   {
	 *     "x": "2022-02-14T20:52:43.906Z",
	 *     "y": 6.1714
	 *   },
	 *   {
	 *     "x": "2022-02-14T20:22:43.906Z",
	 *     "y": 8.5044
	 *   },
	 *   {
	 *     "x": "2022-02-14T19:52:43.906Z",
	 *     "y": 0.2273
	 *   }
	 * ]
	 * }]
	 */
	let currencyPerfomance: {
		tokenName: string;
		price: number;
		percentageChange: number;
		chartPrices: {
			day: ChartPrice[];
			week: ChartPrice[];
			month: ChartPrice[];
		};
	}[] = [];

	async function loadData() {
		loading = true;
		currencyPerfomance = [await getCoinChart('casper-network', 'Casper (CSPR)')];
		console.log(currencyPerfomance);
		loading = false;
	}

	$: loading = false;

	onMount(async () => {
		await loadData();
	});

	$: if ($user?.currency) {
		loadData();
	}
</script>

<div class="page-container">
	<div class="global-grid-nav">
		<Navbar />
	</div>
	<div class="global-grid-mid column-container">
		{#if loading}
			<Loading />
		{:else}
			<div class="card-container">
				{#each currencyPerfomance as performance}
					<CurrencyPerfomance {...performance} />
				{/each}
			</div>
		{/if}
	</div>
</div>

<!-- Styles -->
<style lang="postcss" global>
	:local(.page-container) {
		@apply flex flex-row;
	}

	:local(.column-container) {
		@apply dark:bg-dark-gosutoDark border-none;
	}
	:local(.card-container) {
		@apply flex flex-col items-center justify-center gap-10 py-20;
	}
</style>
