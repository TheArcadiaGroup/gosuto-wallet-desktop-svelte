export function post(request: any) {
	const body = request.body;

	const result = true;

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
