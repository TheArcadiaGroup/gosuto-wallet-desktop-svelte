import { generateTransactions } from '$utils/historyDataSample';

export async function get({ params }: any): Promise<any> {
	const address = params['address'];
	let transactions = generateTransactions();
	let data = transactions.filter((transaction) => transaction.wallet == address);
	return {
		status: 200,
		body: JSON.stringify(data),
	};
}
