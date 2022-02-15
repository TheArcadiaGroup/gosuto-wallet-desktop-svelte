import { generateTransactions } from '$utils/historyDataSample';

export async function post(query): Promise<any> {
	let address = await query.body;
	let transactions = generateTransactions();
	let data = transactions.filter((transaction) => transaction.wallet == address);
	return {
		status: 200,
		body: JSON.stringify(data),
	};
}
