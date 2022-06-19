import axios from 'axios';

export const getValidatorPerformances = async (
	publicKeys: string[],
	era_id: number,
	network: 'mainnet' | 'testnet' = 'testnet',
) => {
	let page = 0;
	const returnObj: {
		[key: string]: number;
	} = {};

	const totalPages = Math.ceil(publicKeys.length / 12); // Round up
	let prevResponse: any = null;

	for (let i = 1; i < totalPages; i++) {
		page = i;
		const val = await axios
			.post(
				`https://event-store-api-clarity-${network}.make.services/relative-average-validator-performances?limit=12&page=${page}`,
				{
					era_id: era_id,
					public_key: publicKeys,
				},
			)
			.then((res) => {
				if (res.data.data[0]?.public_key === prevResponse?.[0]?.public_key) {
					return null;
				} else {
					prevResponse = res.data.data;
					res.data.data.map((item: { public_key: string; average_score: number }) => {
						returnObj[item.public_key] = item.average_score;
					});

					return returnObj;
				}
			})
			.catch((err) => {
				console.log(err);
				return returnObj;
			});

		if (val) {
			continue;
		} else {
			// Stop the loop at the page where the data response is the same
			break;
		}
	}

	return returnObj;
};

export const getValidatorProfiles = async (
	accountHashes: string[],
	network: 'mainnet' | 'testnet' = 'testnet',
) => {
	let page = 0;
	const returnObj: {
		[key: string]: {
			is_active: boolean;
			name: string;
			description: string;
			website: string | null;
		};
	} = {};

	// Divide number of items into batches of 100 items
	const totalPages = Math.ceil(accountHashes.length / 100); // Round up
	let prevResponse: any = null;

	for (let i = 1; i < totalPages; i++) {
		page = i;
		const val = await axios
			.post(
				`https://event-store-api-clarity-${network}.make.services/accounts-info?limit=100&page=${page}`,
				{
					account_hash: accountHashes,
				},
			)
			.then((res) => {
				if (res.data.data[0]?.account_hash === prevResponse?.[0]?.account_hash) {
					return null;
				} else {
					prevResponse = res.data.data;
					// Parse Data
					res.data.data.map(
						(validator: {
							account_hash: string;
							info: { owner: { name: any; description: any; website: any; type: string[] } };
							is_active: any;
						}) => {
							if (validator.info?.owner?.type?.some((item) => item === 'validator')) {
								returnObj[validator.account_hash] = {
									is_active: validator.is_active,
									name: validator.info?.owner?.name ?? validator.account_hash,
									description: validator.info?.owner?.description ?? 'No Description',
									website: validator.info?.owner?.website ?? null,
								};
							} else if (validator.is_active) {
								returnObj[validator.account_hash] = {
									is_active: validator.is_active,
									name: validator.info?.owner?.name ?? validator.account_hash,
									description: validator.info?.owner?.description ?? 'No Description',
									website: validator.info?.owner?.website ?? null,
								};
							}
						},
					);

					return returnObj;
				}
			})
			.catch((err) => {
				console.log(err);
				return returnObj;
			});

		if (val) {
			continue;
		} else {
			// Stop the loop at the page where the data response is the same
			break;
		}
	}

	return returnObj;
};
