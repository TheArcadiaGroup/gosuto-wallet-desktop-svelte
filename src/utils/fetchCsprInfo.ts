import CoinGecko from 'coingecko-api';

export const getCasperMarketInformation = async () => {
	try {
		const casperInformation = await new CoinGecko().coins.fetch('casper-network', {});
		console.log(casperInformation);
		const price = casperInformation.data.market_data.current_price.usd;
		// const casperTotalSupply = casperInformation.data.market_data.total_supply;
		// const casperCirculatingSupply =
		//   casperInformation.data.market_data.circulating_supply;
		// const casperPriceChangePercentage24h =
		//   casperInformation.data.market_data
		//     .price_change_percentage_24h_in_currency;
		return {
			price,
			// casperTotalSupply,
			// casperCirculatingSupply,
			// casperPriceChangePercentage24h,
		};
	} catch (error) {
		console.log('getCasperMarketInformation Error : ', error);
	}
};
