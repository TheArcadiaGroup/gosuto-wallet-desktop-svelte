import { swapToken } from '$utils/token.util';

export function post(request: any) {
	const body = request.body;

	const result = swapToken(
		body.wallet,
		body.fromContractAddress,
		body.fromAmount,
		body.toContractAddress,
		body.toAmount,
	);

	if (result) {
		return {
			status: 200,
			body: {
				success: true,
			},
		};
	}

	return {
		status: 400,
		body: {
			success: false,
			error: 'there was an error',
		},
	};
}
