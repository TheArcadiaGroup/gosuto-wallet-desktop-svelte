const CoinGecko = require('coingecko-api');
const sendMessage = require('../events/sendMessage.cjs');

module.exports = {
	csprUsdPrice: async () => {
		try {
			const casperInformation = await new CoinGecko().coins.fetch('casper-network', {});
			const price = casperInformation.data.market_data.current_price.usd;
			// const casperTotalSupply = casperInformation.data.market_data.total_supply;
			// const casperCirculatingSupply =
			//   casperInformation.data.market_data.circulating_supply;
			// const casperPriceChangePercentage24h =
			//   casperInformation.data.market_data
			//     .price_change_percentage_24h_in_currency;

			sendMessage('currentPriceInUsdResponse', {
				price,
				currency: 'CSPR',
			});

			return {
				price,
				// casperTotalSupply,
				// casperCirculatingSupply,
				// casperPriceChangePercentage24h,
			};
		} catch (error) {
			console.log('getCasperMarketInformation Error : ', error);
			sendMessage('currentPriceInUsdResponse', {
				price: 0,
				currency: 'CSPR',
			});
			return 0;
		}
	},
};
