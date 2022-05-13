import { walletLoaders } from '$stores/dataLoaders';
import { getCsprBalance } from './balances';

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
