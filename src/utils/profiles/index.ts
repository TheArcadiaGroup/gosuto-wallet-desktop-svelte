import { selectedWallet } from '$stores/user/wallets';
import { retrieveData, saveData } from '$utils/dataStorage';

export const loadSelectedWallet = () => {
	try {
		let selectedWallet: IWallet | null;
		const wallets = retrieveData('wallets') || [];
		const defaultWalletIndex = +retrieveData('defaultWalletIndex') || 0;
		if (wallets?.length === 0) {
			selectedWallet = null;
		} else {
			if (defaultWalletIndex > wallets?.length - 1) {
				selectedWallet = wallets[0];
				selectedWallet.set(selectedWallet);
				saveData('defaultWalletIndex', '0');
			} else {
				selectedWallet = wallets[defaultWalletIndex];
				selectedWallet.set(selectedWallet);
				saveData('defaultWalletIndex', defaultWalletIndex.toString());
			}
		}
		return selectedWallet;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const walletNameIsValid = (walletName: string) => {
	const wallets: IWallet[] = retrieveData('wallets') || [];

	return !wallets.filter((wallet) => wallet.walletName.trim() === walletName.trim())[0];
};
