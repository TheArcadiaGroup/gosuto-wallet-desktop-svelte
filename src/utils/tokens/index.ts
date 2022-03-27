export const getTokenUsdPrice = async (token: string) => {
	let result = 0;
	switch (token) {
		case 'CSPR':
			result = await getCSPRUsdPrice();
			break;

		default:
			result = await getCSPRUsdPrice();
			break;
	}

	return result;
};

export const getCSPRUsdPrice = async () => {
	try {
		const casperInformation = await new window.CoinGecko().coins.fetch('casper-network', {});
		const price = casperInformation.data.market_data.current_price.usd;
		// const casperTotalSupply = casperInformation.data.market_data.total_supply;
		// const casperCirculatingSupply =
		//   casperInformation.data.market_data.circulating_supply;
		// const casperPriceChangePercentage24h =
		//   casperInformation.data.market_data
		//     .price_change_percentage_24h_in_currency;

		// return {
		return price;
		// 	// casperTotalSupply,
		// 	// casperCirculatingSupply,
		// 	// casperPriceChangePercentage24h,
		// };
	} catch (error) {
		console.log('getCasperMarketInformation Error : ', error);

		return 0;
	}
};
