import { user } from '$stores/user';
import { tokens } from '$stores/user/tokens';
import { selectedWallet, wallets } from '$stores/user/wallets';
import { retrieveData, saveData } from '$utils/dataStorage';
import { loadWalletData } from './dataLoaders';
import { getTokenValue } from './token.util';

// IMPORTANT: If it becomes too expensive to fetch and save data, only save and fetch when the data has changed or was not previously present. (if statements)

export const pollyFillTokens = async () => {
	// Get current cspr token price in usd
	const selectedWallet = pollyfillSelectedProfile();
	let walletsInDB: DBTokens = retrieveData('tokens');

	// Add global token to the global tokens array if not present (this is common when the app has been initialized and its data is not available any more)
	if (!walletsInDB || !walletsInDB.global?.find((token) => token.tokenTicker === 'CSPR')) {
		if (!walletsInDB) {
			walletsInDB = { global: [] };
		}
		walletsInDB['global'].push({
			tokenName: 'CSPR',
			tokenTicker: 'CSPR',
			tokenAmountHeld: selectedWallet.availableBalance,
			tokenAmountHeldUSD: selectedWallet.availableBalanceUSD,
			limitedSupply: false,
			mintableSupply: false,
			shareToken: true,
			contractString: '',
			contractAddress: '',
			tokenPriceUSD: (await getTokenValue('CSPR')).price,
			decimalsOfPrecision: 5,
			walletAddress: selectedWallet?.walletAddress,
		});

		saveData('tokens', JSON.stringify(walletsInDB));
	}

	// Add all global tokens to the array
	await Promise.all(
		walletsInDB.global.map(async (token) => {
			if (token.tokenTicker === 'CSPR') {
				token.tokenAmountHeld = selectedWallet.availableBalance;
				token.tokenAmountHeldUSD = selectedWallet.availableBalanceUSD;
				token.tokenPriceUSD = (await getTokenValue('CSPR')).price;
			}

			return token;
		}),
	);

	let dbTokens = [...walletsInDB.global];

	if (walletsInDB[selectedWallet.walletAddress.toLowerCase()]) {
		dbTokens = [...dbTokens, ...walletsInDB[selectedWallet.walletAddress.toLowerCase()]];
	}

	tokens.set(dbTokens);

	return dbTokens;
};

export const pollyFillUser = () => {
	// Fetch data if need be here
	let dbUser: IUser = retrieveData('user') || {
		// We'll only ever have one user, so all the wallets belong to this user so no need for wallets embedded object here.
		// This object has the global user's settings
		name: 'Unknown User',
		email: '',
		avatar: '/images/png/avatar.png',
		theme: 'light',
		network: 'mainnet',
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

	loadWalletData(dbSelectedProfile.walletAddress);

	return dbSelectedProfile;
};

export default () => {
	pollyFillUser();
	pollyFillWallets();
	pollyfillSelectedProfile();
	pollyFillTokens();
};
