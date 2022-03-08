import axios from 'axios';

export const getSingleAccountHistory = async (accountHash: string, page = 1, limit = 10) => {
	const res = await axios.get(
		`https://event-store-api-clarity-mainnet.make.services/accounts/${accountHash}/transfers?page=${page}&limit=${limit}`,
	);

	return res.data;
};
