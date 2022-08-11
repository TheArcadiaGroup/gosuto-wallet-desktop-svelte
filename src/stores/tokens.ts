import { writable } from 'svelte/store';

// Defaults to 1 to ensure the balance will be shown when multiplied
export const csprPrice = writable<CSPRPrices>({
	price_change: {
		jpy: 0,
		usd: 0,
		eur: 0,
	},
	price: {
		jpy: 1,
		usd: 1,
		eur: 1,
	},
});
