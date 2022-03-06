import { selectedWallet } from '$stores/user/wallets';
import { retrieveData, saveData } from '$utils/dataStorage';

export const loadSelectedProfile = () => {
	try {
		let selectedProfile: IWallet | null;
		const wallets = retrieveData('wallets') || [];
		const defaultWalletIndex = +retrieveData('defaultWalletIndex') || 0;
		if (wallets?.length === 0) {
			selectedProfile = null;
		} else {
			if (defaultWalletIndex > wallets?.length - 1) {
				selectedProfile = wallets[0];
				selectedWallet.set(selectedProfile);
				saveData('defaultWalletIndex', '0');
			} else {
				selectedProfile = wallets[defaultWalletIndex];
				selectedWallet.set(selectedProfile);
				saveData('defaultWalletIndex', defaultWalletIndex.toString());
			}
		}
		return selectedProfile;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const walletNameIsValid = (walletName: string) => {
	const wallets: IWallet[] = retrieveData('wallets') || [];

	return !wallets.filter((wallet) => wallet.walletName.trim() === walletName.trim())[0];
};
