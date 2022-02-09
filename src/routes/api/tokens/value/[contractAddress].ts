import { getTokenValue } from '$utils/token.util';

export const get = async (request: any) => {
	if (!request.params?.contractAddress)
		return {
			status: 400,
			body: {
				error: 'Missing contract address!',
			},
		};

	const value = getTokenValue(request.params.contractAddress);

	return {
		status: 200,
		body: value,
	};
};
