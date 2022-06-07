import { retrieveData } from '$utils/dataStorage';

export const walletNameIsValid = (walletName: string) => {
	const wallets: IWallet[] = retrieveData('wallets') || [];

	return !wallets.filter((wallet) => wallet.walletName.trim() === walletName.trim())[0];
};
