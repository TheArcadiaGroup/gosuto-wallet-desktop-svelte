import { tokenLoaders, walletLoaders } from '$stores/dataLoaders';
import { user } from '$stores/user';
import { wallets, selectedWallet } from '$stores/user/wallets';
import { saveData } from '$utils/dataStorage';
import { getCSPRUsdPrice } from '$utils/tokens';
import { get } from 'svelte/store';

export default function () {
	window.api.receive('accountCsprBalanceResponse', async (data: any) => {
		const csprPrice = await getCSPRUsdPrice();

		const _wallets = get(wallets).map((wallet) => {
			if (wallet.walletAddress === data.walletAddress) {
				wallet.availableBalanceUSD = +data.balance * csprPrice.price[get(user)?.currency || 'usd'];
				wallet.availableBalance = +data.balance; // returned as string
			}
			return wallet;
		});
		wallets.set(_wallets);

		const thisWallet = get(selectedWallet);
		if (thisWallet && thisWallet.walletAddress === data.walletAddress) {
			thisWallet.availableBalanceUSD =
				+data.balance * csprPrice.price[get(user)?.currency || 'usd'];
			thisWallet.availableBalance = +data.balance; // returned as string
			selectedWallet.set(thisWallet);
			saveData('selectedProfile', JSON.stringify(thisWallet));
		}

		tokenLoaders.update((_loader) => {
			_loader['CSPR'] = null;
			return _loader;
		});

		walletLoaders.update((_loader) => {
			_loader[data.walletAddress] = null;
			return _loader;
		});

		return +data;
	});
}
