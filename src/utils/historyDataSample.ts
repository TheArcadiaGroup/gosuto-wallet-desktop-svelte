export const generateTransactions = () => {
	let data = [];
	let statuses = ['Received', 'Sent', 'Stake', 'Swap'];

	for (let index = 0; index < 6; index++) {
		data.push({
			wallet: `wallet-${Math.floor(Math.random() * 2 + 1)}`,
			status: statuses[Math.floor(Math.random() * 3)],
			dateAndTime: `Apr ${Math.floor(Math.random() * 30 + 1)}, 2021 ${Math.floor(
				Math.random() * 12 + 1,
			)}:${Math.floor(Math.random() * 59 + 1)}:${Math.floor(Math.random() * 59 + 1)} ${
				Math.floor(Math.random() * 2) > 1 ? 'am' : 'pm'
			} (CST)`,
			amount: Math.round(Math.random() * 10 * 100) / 100,
			price: Math.round(Math.random() * 10 * 100) / 100,
			cryptoUnit: 'USDT',
			currencyUnit: 'USD',
			SwapData: null,
			toAccount: '0x9f98e01d2gj92ngn2g7gn24ed7',
			fromAccount: '0x9f98e01d2gj92ngn2g7gn24ed7',
		});
	}

	for (let index = 0; index < 6; index++) {
		data.push({
			wallet: `wallet-${Math.floor(Math.random() * 2 + 1)}`,
			status: 'Swap',
			dateAndTime: `Apr ${Math.floor(Math.random() * 30 + 1)}, 2021 ${Math.floor(
				Math.random() * 12 + 1,
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
			toAccount: '0x9f98e01d2gj92ngn2g7gn24ed7',
			fromAccount: '0x9f98e01d2gj92ngn2g7gn24ed7',
		});
	}

	return data;
};
