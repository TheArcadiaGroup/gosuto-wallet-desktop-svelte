import { user } from '$stores/user';
import { get } from 'svelte/store';

export const getCsprBalance = (walletAddress: string) => {
	window.api.send(
		'accountTokenBalance',
		JSON.stringify({
			token: 'CSPR',
			walletAddress: walletAddress,
			network: get(user)?.network || 'testnet',
		}),
	);
};
