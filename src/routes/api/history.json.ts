import { generateTransactions } from '$utils/historyDataSample';

export const get = () => {
	let data = generateTransactions();
	return {
		body: {
			data,
		},
	};
};
