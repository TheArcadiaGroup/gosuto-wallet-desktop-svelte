import { user } from '$stores/user';
import { selectedWallet, wallets } from '$stores/user/wallets';
import { retrieveData, saveData } from '$utils/dataStorage';

// IMPORTANT: If it becomes too expensive to fetch and save data, only save and fetch when the data has changed or was not previously present. (if statements)

export const pollyFillUser = () => {
	// Fetch data if need be here
	let dbUser: IUser = retrieveData('user') || {
		// We'll only ever have one user, so all the wallets belong to this user so no need for wallets embedded object here.
		// This object has the global user's settings
		name: 'Unknown User',
		email: '',
		avatar: 'https://i.pinimg.com/originals/bf/57/02/bf57026ee75af2f414000cec322f7404.gif',
		theme: 'light',
	};

	saveData('user', JSON.stringify(dbUser));

	user.set(dbUser);
	return dbUser;
};

export const pollyFillWallets = () => {
	// Wallets
	const dbWallets: IWallet[] = retrieveData('wallets') || [];

	saveData('wallets', JSON.stringify(dbWallets));

	wallets.set(dbWallets);

	return dbWallets;
};

export const pollyfillSelectedProfile = () => {
	// Wallets
	let dbSelectedProfile: IWallet = retrieveData('selectedProfile');

	if (!dbSelectedProfile) {
		// If its not present, get the first item from the wallets array, if it doesn't exist, a better option is to redirect to onboarding for the user to create wallet.
		const dbWallets: IWallet[] = retrieveData('wallets');
		dbSelectedProfile = dbWallets[0] || null;
	}

	saveData('selectedProfile', JSON.stringify(dbSelectedProfile));

	selectedWallet.set(dbSelectedProfile);

	return dbSelectedProfile;
};

export default () => {
	pollyFillUser();
	pollyFillWallets();
	pollyfillSelectedProfile();
};
