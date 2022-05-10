import { user } from '$stores/user';
import { get } from 'svelte/store';

export const getCsprBalance = (walletAddress: string) => {
	window.api.send(
		'accountCsprBalance',
		JSON.stringify({
			token: 'CSPR',
			walletAddress: walletAddress,
			network: get(user)?.network || 'testnet',
		}),
	);
};
