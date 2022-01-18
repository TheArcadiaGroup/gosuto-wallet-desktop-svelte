export const generateTransactions = () => {
	let data = [];
	let statuses = ['Received', 'Sent', 'Stake', 'Swap'];

	for (let index = 0; index < 6; index++) {
		data.push({
			status: statuses[Math.floor(Math.random() * 3)],
			dateAndTime: `Apr ${Math.floor(Math.random() * 30 + 1)}, 2021 ${Math.floor(
				Math.random() * 23 + 1,
			)}:${Math.floor(Math.random() * 59 + 1)}:${Math.floor(Math.random() * 59 + 1)} ${
				Math.floor(Math.random() * 2) > 1 ? 'am' : 'pm'
			} (CST)`,
			amount: Math.round(Math.random() * 10 * 100) / 100,
			price: Math.round(Math.random() * 10 * 100) / 100,
			cryptoUnit: 'USDT',
			currencyUnit: 'USD',
			SwapData: null,
		});
	}

	for (let index = 0; index < 6; index++) {
		data.push({
			status: 'Swap',
			dateAndTime: `Apr ${Math.floor(Math.random() * 30 + 1)}, 2021 ${Math.floor(
				Math.random() * 23 + 1,
			)}:${Math.floor(Math.random() * 59 + 1)}:${Math.floor(Math.random() * 59 + 1)} ${
				Math.floor(Math.random() * 2) > 1 ? 'am' : 'pm'
			} (CST)`,
			amount: null,
			price: null,
			SwapData: {
				fromAmount: Math.round(Math.random() * 10 * 100) / 100,
				toAmount: Math.round(Math.random() * 10 * 100) / 100,
				fromPrice: Math.round(Math.random() * 10 * 100) / 100,
				toPrice: Math.round(Math.random() * 10 * 100) / 100,
				fromCryptoUnit: 'USDT',
				fromPriceUnit: 'USD',
				toCryptoUnit: 'CSPR',
				toPriceUnit: 'USD',
			},
		});
	}

	return data;
};
