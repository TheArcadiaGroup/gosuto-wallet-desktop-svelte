import { selectedWallet } from '$stores/user/wallets';
import { retrieveData, saveData } from '$utils/dataStorage';

export const loadSelectedProfile = () => {
	try {
		let selectedProfile: IWallet | null;
		const profiles = retrieveData('profiles') || [];
		const defaultWalletIndex = +retrieveData('defaultWalletIndex') || 0;
		if (profiles?.length === 0) {
			selectedProfile = null;
		} else {
			if (defaultWalletIndex > profiles?.length - 1) {
				selectedProfile = profiles[0];
				selectedWallet.set(selectedProfile);
				saveData('defaultWalletIndex', '0');
			} else {
				selectedProfile = profiles[defaultWalletIndex];
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
