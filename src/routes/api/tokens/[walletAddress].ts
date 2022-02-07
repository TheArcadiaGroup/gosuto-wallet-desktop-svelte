// Just a test API route

export const get = async () => {
	return {
		status: 200,
		body: [
			{},
			{
				tokenName: 'Casper',
				tokenTicker: 'CSPR',
				tokenAmountHeld: 10,
				tokenAmountHeldUSD: 100,
				limitedSupply: true,
				mintableSupply: true,
				contractString: '',
				contractAddress: '',
				tokenPrice: 10,
				decimalsOfPrecision: 16,
			},
			{},
			{},
			{},
		],
	};
};
