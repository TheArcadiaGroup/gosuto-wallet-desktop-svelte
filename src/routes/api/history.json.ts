import { generateTransactions } from '$utils/historyDataSample';

export async function get(params: any): Promise<any> {
	let data = generateTransactions();
	return {
		status: 200,
		body: JSON.stringify(data),
	};
}
