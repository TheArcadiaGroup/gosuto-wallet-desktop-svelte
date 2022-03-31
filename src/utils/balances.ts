import { selectedWallet, wallets } from '$stores/user/wallets';
import { get } from 'svelte/store';
import { saveData } from './dataStorage';
import { getCSPRUsdPrice } from './tokens';

export const getCsprBalance = async (walletAddress: string) => {
	const data = window.api.sendSync(
		'accountTokenBalance',
		JSON.stringify({ token: 'CSPR', walletAddress: walletAddress }),
	);

	console.log(data);

	const csprPrice = await getCSPRUsdPrice();

	const _wallets = get(wallets).map((wallet) => {
		if (wallet.walletAddress === data.walletAddress) {
			wallet.availableBalanceUSD = +data.balance * csprPrice.price;
			wallet.availableBalance = +data.balance; // returned as string
		}
		return wallet;
	});
	wallets.set(_wallets);

	const thisWallet = get(selectedWallet);
	if (thisWallet?.walletAddress === walletAddress) {
		thisWallet.availableBalanceUSD = +data.balance * csprPrice.price;
		thisWallet.availableBalance = +data.balance; // returned as string
	}

	selectedWallet.set(thisWallet);
	saveData('selectedProfile', JSON.stringify(thisWallet));

	return +data;
};
