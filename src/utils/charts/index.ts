import { csprPrice } from '$stores/tokens';
import { user } from '$stores/user';
import { getCSPRUsdPrice } from '$utils/tokens';
import { get } from 'svelte/store';

/*
    ----------- REQUIRED FORMAT -------------
    [{
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

export const getCoinChart = async (coin: string, coinName: string) => {
	const CoinGeckoClient = new window.CoinGecko();

	// Get coins first to check if the desired coin exists
	// console.log(await CoinGeckoClient.coins.all());

	// Fetch recent price info from casper
	getCSPRUsdPrice();

	let oneDay = await CoinGeckoClient.coins.fetchMarketChart(coin, {
		vs_currency: get(user)?.currency ?? 'usd',
		days: '1',
	});
	let oneWeek = await CoinGeckoClient.coins.fetchMarketChart(coin, {
		vs_currency: get(user)?.currency ?? 'usd',
		days: '7',
	});
	let oneMonth = await CoinGeckoClient.coins.fetchMarketChart(coin, {
		vs_currency: get(user)?.currency ?? 'usd',
		days: '30',
	});

	return {
		tokenName: coinName,
		price: get(csprPrice).price[get(user)?.currency ?? 'usd'],
		percentageChange: get(csprPrice).price_change,
		chartPrices: {
			day: oneDay.data.prices.map((item) => ({
				x: new Date(item[0]).toISOString(),
				y: item[1],
			})),
			week: oneWeek.data.prices.map((item) => ({
				x: new Date(item[0]).toISOString(),
				y: item[1],
			})),
			month: oneMonth.data.prices.map((item) => ({
				x: new Date(item[0]).toISOString(),
				y: item[1],
			})),
		},
	};
};
