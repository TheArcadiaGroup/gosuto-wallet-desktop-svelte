import { generateStakes } from '$utils/stakeDataSample';

export async function get(params: any): Promise<any> {
	let data = generateStakes();
	return {
		status: 200,
		body: JSON.stringify(data),
	};
}
