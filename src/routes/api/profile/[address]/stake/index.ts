import { generateStakes } from '$utils/stakeDataSample';

export async function post(query): Promise<any> {
	let address = await query.body;
	let transactions = generateStakes();
	//dev//
	let data = transactions.filter((transaction) => transaction.parentWallet == address);
	return {
		status: 200,
		body: JSON.stringify(data),
	};
}
