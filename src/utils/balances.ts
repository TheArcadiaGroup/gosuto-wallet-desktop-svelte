import { user } from '$stores/user';
import { get } from 'svelte/store';
import { retrieveData } from './dataStorage';

export const getCsprBalance = (walletAddress: string) => {
	// Due to issues when trying to load balances from the publicKey as opposed to the accountHash, we need to get the account hash instead. However, we have another issue which is code readability and trying to update everything to use the accountHash as opposed to the public key (walletAddress). However, we need it so we will use it.

	const wallets: IWallet[] = retrieveData('wallets');

	const wallet = wallets.find(
		(wallet) => wallet.walletAddress.toLowerCase() === walletAddress.toLowerCase(),
	);

	if (wallet) {
		window.api.send(
			'accountCsprBalance',
			JSON.stringify({
				token: 'CSPR',
				accountHash: wallet.accountHash,
				walletAddress: walletAddress,
				network: get(user)?.network || 'testnet',
			}),
		);
	}
};
