import { walletLoaders } from '$stores/dataLoaders';
import { selectedWallet, wallets } from '$stores/user/wallets';
import { get } from 'svelte/store';
import { getCsprBalance } from './balances';
import { saveData } from './dataStorage';

const updateWallet = (address: string, propertyName: string, propertyValue: any) => {
	if (get(selectedWallet)?.walletAddress.toLowerCase().trim() === address.toLowerCase().trim()) {
		selectedWallet.update((wallet) => {
			if (wallet && wallet.hasOwnProperty(propertyName)) {
				// @ts-ignore
				wallet[propertyName] = propertyValue;
			}

			return wallet;
		});

		saveData('selectedProfile', JSON.stringify(get(selectedWallet)));
	}

	const _wallets = get(wallets).map((wallet) => {
		if (wallet.walletAddress.toLowerCase().trim() === address.toLowerCase().trim()) {
			if (wallet && wallet.hasOwnProperty(propertyName)) {
				// @ts-ignore
				wallet[propertyName] = propertyValue;
			}
		}

		return wallet;
	});

	saveData('wallets', JSON.stringify(_wallets));
};

export const loadWalletData = async (address: string) => {
	// Takes the wallet address and sets its loading status to true in the wallets loading state store
	// So we check the wallet data loading status and it is dynamically updated when the data for that wallet has loaded

	// Data to be loaded => wallet balance (CSPR)
	walletLoaders.update((_loader) => {
		_loader[address] = true;
		return _loader;
	});

	getCsprBalance(address);
};

export const loadWalletsData = async (addresses: string[]) => {
	// Takes an array of addresses and loads their data using the loadWalletData
	addresses.forEach((address) => loadWalletData(address));
};
