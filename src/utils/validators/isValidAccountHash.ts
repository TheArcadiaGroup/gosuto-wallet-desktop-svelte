import axios from 'axios';

export default async (accHash: string, network: 'testnet' | 'mainnet') => {
	return await axios
		.get(
			`https://event-store-api-clarity-${network}.make.services/public-keys?account_hash=${accHash}`,
		)
		.then((res) => {
			return !!res.data.data.public_key;
		})
		.catch(() => false);
};
