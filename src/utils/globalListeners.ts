import { wallets } from '$stores/user/wallets';
import { get } from 'svelte/store';

export const priceInfoListener = () => {
	window.api.receive('currentPriceInUsdResponse', (data: any) => {
		console.log('PRICE DATA RESPONSE: ', data);
		// When we get this data, we need to add to each of the respective tokens we receive back and update the store
	});
};

export const userCSPRBalance = () => {
	window.api.receive('accountTokenBalanceResponse', (data: any) => {
		// data => token: 'CSPR', price: number
		console.log('ACCOUNT BALANCE DATA: ', data);
		const _wallets = get(wallets).map((wallet) => {
			if (wallet.walletAddress === data.walletAddress) {
				wallet.availableBalanceUSD = data.balanceInUsd;
			}
			return wallet;
		});

		wallets.set(_wallets);
	});
};

export default () => {
	priceInfoListener();
	userCSPRBalance();
};
