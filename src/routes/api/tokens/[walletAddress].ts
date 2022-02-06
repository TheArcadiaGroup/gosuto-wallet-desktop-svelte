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
			{},
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
