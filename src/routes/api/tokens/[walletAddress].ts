// Just a test API route

export const get = async () => {
	return {
		status: 200,
		body: [
			{
				cryptoUnit: 'CSPR',
				cryptoName: 'Casper',
				positive: false,
			},
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
			{
				positive: false,
			},
			{
				cryptoName: 'Test',
				cryptoUnit: 'TST',
			},
		],
	};
};
