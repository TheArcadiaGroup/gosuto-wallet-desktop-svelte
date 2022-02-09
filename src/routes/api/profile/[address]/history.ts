import { generateTransactions } from '$utils/historyDataSample';

export async function get({ query }): Promise<any> {
	let address = query.get('address');
	let transactions = generateTransactions();
	let data = transactions.filter((transaction) => transaction.wallet == address);
	return {
		status: 200,
		body: JSON.stringify(data),
	};
}
