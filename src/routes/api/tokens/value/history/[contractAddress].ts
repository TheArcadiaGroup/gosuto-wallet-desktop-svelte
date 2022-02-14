import { getTokenValue } from '$utils/token.util';

export const get = async (request: any) => {
	if (!request.params?.contractAddress)
		return {
			status: 400,
			body: {
				error: 'Missing contract address!',
			},
		};

	const values = [];

	for (let i = 0; i < 10; i++) {
		const value = getTokenValue(request.params.contractAddress);
		values.push({ x: new Date(Date.now() - (-10 + i) * 30 * 60 * 1000).toISOString(), y: value });
	}

	return {
		status: 200,
		body: values,
	};
};
