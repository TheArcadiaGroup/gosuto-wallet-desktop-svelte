import { getSingleAccountHistory } from '$utils/getHistory';
import { generateTransactions } from '$utils/historyDataSample';

export async function get({ params, query }: any): Promise<any> {
	const historyObj = await getSingleAccountHistory(
		params['accountHash'],
		query.get('page'),
		query.get('limit'),
	);

	// Mike Here
	console.log(historyObj);

	const address = params['address'];
	let transactions = generateTransactions();
	let data = transactions.filter((transaction) => transaction.wallet == address);
	return {
		status: 200,
		body: JSON.stringify(data),
	};
}
