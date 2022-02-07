import { generateTransactions } from '$utils/historyDataSample';

export const get = ({ query }) => {
	let address = query.get('address');
	let transactions = generateTransactions();
	let data = transactions.filter((transaction) => transaction.wallet == address);
	return {
		body: {
			data,
		},
	};
};
