import { swapToken } from '$utils/token.util';

export function post(request: any) {
	const body = request.body;

	const result = swapToken(
		'1',
		body.selectedTokenAddress,
		body.tokenAmount,
		body.recipientAddress,
		body.network,
		body.note,
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
