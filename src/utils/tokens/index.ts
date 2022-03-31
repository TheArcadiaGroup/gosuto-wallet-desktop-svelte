export const getTokenUsdPrice = async (token: string) => {
	let result = {
		price: 0,
		price_change: 0,
	};
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
		const casperPriceChangePercentage24h = (casperInformation.data.market_data as any)
			.price_change_percentage_24h;

		return {
			price,
			price_change: casperPriceChangePercentage24h,
		};
	} catch (error) {
		console.log('getCasperMarketInformation Error : ', error);

		return {
			price: 0,
			price_change: 0,
		};
	}
};
