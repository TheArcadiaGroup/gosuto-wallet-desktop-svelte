import { goto } from '$app/navigation';
import { selectedWallet, wallets, walletToUnlock } from '$stores/user/wallets';
import { retrieveData, saveData } from '$utils/dataStorage';
import { pollyfillSelectedWallet } from '$utils/pollyfillData';
import { get } from 'svelte/store';

export const walletNameIsValid = (walletName: string) => {
	const wallets: IWallet[] = retrieveData('wallets') || [];

	return !wallets.filter((wallet) => wallet.walletName.trim() === walletName.trim())[0];
};

export const checkLockStatus = (
	wallet: IWallet | null,
	to: string,
	cancel: () => void = () => undefined,
) => {
	if (wallet) {
		if (
			wallet.lockStatus.isLocked ||
			(wallet.lockStatus.lastUnlocked + wallet.lockStatus.lockTimeout * 1000 < Date.now() &&
				!wallet.lockStatus.isLocked)
		) {
			cancel();
			// Timeout has expired, now we show the popup
			wallet.lockStatus = {
				...wallet.lockStatus,
				isLocked: true,
			};
			if (get(selectedWallet)?.publicKey === wallet.publicKey) {
				selectedWallet.set(wallet);
				saveData('selectedWallet', wallet);
			}

			get(wallets).map((_wallet) => {
				if (_wallet.publicKey === wallet.publicKey) {
					return wallet;
				}
				return _wallet;
			});
			saveData('wallets', get(wallets));

			walletToUnlock.set({ wallet, path: to ?? `/profile/${wallet.publicKey}` });

			return false;
		} else {
			// console.log(
			// 	'Ending: ',
			// 	new Date(wallet.lockStatus.lastUnlocked + wallet.lockStatus.lockTimeout * 1000),
			// 	wallet.lockStatus,
			// );
			return true;
		}
	}
	return false;
};

export const navigateToUrl = (to: string, cancel: () => void) => {
	try {
		if (!to.includes('/add-wallet') && to !== '/') {
			// Check whether the wallet has been authenticated first
			// Get the specific selected wallet from the wallets, if none is present, just use the selected wallet or pollyfill it
			const wallet = get(selectedWallet) || pollyfillSelectedWallet();

			if (!wallet && !to.includes('/add-wallet')) {
				// Prompt user to create wallet
				cancel();
				goto('/add-wallet');
			}

			if (!wallet && to !== '/profile') {
				cancel();
				goto('/profile');
			} else if (wallet && to === '/profile') {
				// selectedWallet.set(null);
				walletToUnlock.set(null);
			} else if (wallet) {
				// check if wallet is locked or if the wallet last lock is past the allowed duration show popup
				checkLockStatus(wallet, to, cancel);
			}
		}
	} catch (error) {
		console.log(to, error);
	}
};
