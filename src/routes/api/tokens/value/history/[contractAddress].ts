import { getTokenValue } from '$utils/token.util';

/**
 * This is an endpoint, which returns the value of a token in the past.
 * x value is an ISO formatted date and y is the value of the currency
 *
 * [
 *   {
 *     "x": "2022-02-14T21:22:43.906Z",
 *     "y": 2.0833
 *   },
 *   {
 *     "x": "2022-02-14T20:52:43.906Z",
 *     "y": 6.1714
 *   },
 *   {
 *     "x": "2022-02-14T20:22:43.906Z",
 *     "y": 8.5044
 *   },
 *   {
 *     "x": "2022-02-14T19:52:43.906Z",
 *     "y": 0.2273
 *   }
 * ]
 */
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
