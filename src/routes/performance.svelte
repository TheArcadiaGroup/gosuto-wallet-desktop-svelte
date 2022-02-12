<script lang="ts">
	import { onMount } from 'svelte';

	import CurrencyPerfomance from '$components/CurrencyPerformance/CurrencyPerfomance.svelte';
	import { getAllTokens } from '$utils/token.util';
	import Navbar from '$components/Navbar/Navbar.svelte';

	// To be populated dynamically from the DB when this route is served.
	let currencyPerfomance = [];

	onMount(async () => {
		const currencies = getAllTokens();

		for (const currency of currencies) {
			// @ts-ignore
			const price = await (
				await fetch('/api/tokens/value/' + encodeURIComponent(currency.contractAddress))
			).json();
			// @ts-ignore
			const currencyHistory = await (
				await fetch('/api/tokens/value/history/' + encodeURIComponent(currency.contractAddress))
			).json();

			const lastY = currencyHistory[0].y;
			const startY = currencyHistory[currencyHistory.length - 1].y;

			const percentage =
				startY < lastY ? Math.floor((lastY / startY) * 100) : -Math.floor((startY / lastY) * 100);

			currencyPerfomance[currencyPerfomance.length] = {
				tokenName: currency.tokenName + ` (${currency.tokenTicker})`,
				price: price.value,
				percentageChange: percentage,
				chartPrices: currencyHistory,
			};
		}
	});
</script>

<div class="page-container">
	<div class="global-grid-nav">
		<Navbar />
	</div>
	<div class="global-grid-mid column-container">
		<div class="card-container">
			{#each currencyPerfomance as performance}
				<CurrencyPerfomance {...performance} />
			{/each}
		</div>
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
