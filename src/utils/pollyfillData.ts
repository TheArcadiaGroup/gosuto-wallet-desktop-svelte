import { goto } from '$app/navigation';
import { walletLoaders } from '$stores/dataLoaders';
import { user } from '$stores/user';
import { tokens } from '$stores/user/tokens';
import { selectedWallet, wallets } from '$stores/user/wallets';
import { retrieveData, saveData } from '$utils/dataStorage';
import { get } from 'svelte/store';
import { loadWalletData } from './dataLoaders';
import { getTokenValue } from './token.util';
import { checkIfTokenDeploysDone } from './tokens/createToken';

// IMPORTANT: If it becomes too expensive to fetch and save data, only save and fetch when the data has changed or was not previously present. (if statements)

export const pollyFillTokens = async () => {
	// Get current cspr token price in usd
	const selectedWallet = pollyfillSelectedWallet();

	if (selectedWallet) {
		let tokensInDB: DBTokens = retrieveData('tokens');

		// Add CSPR to user tokens list if not present
		if (
			!tokensInDB ||
			!tokensInDB[selectedWallet.publicKey]?.[get(user)?.network ?? 'testnet']?.find(
				(token) => token.tokenTicker === 'CSPR',
			)
		) {
			if (!tokensInDB) {
				tokensInDB = { [selectedWallet.publicKey]: { mainnet: [], testnet: [] } };
			}

			if (!tokensInDB[selectedWallet.publicKey]) {
				tokensInDB = { [selectedWallet.publicKey]: { mainnet: [], testnet: [] }, ...tokensInDB };
			}

			const setToNetwork = async (network: 'testnet' | 'mainnet') => {
				tokensInDB[selectedWallet.publicKey][network].push({
					tokenName: 'CSPR',
					tokenTicker: 'CSPR',
					tokenAmountHeld: selectedWallet?.availableBalance[network] ?? 0,
					tokenAmountHeldUSD: selectedWallet?.availableBalanceUSD[network] ?? 0,
					shareToken: true,
					contractHash: 'CSPR', // defaults to this to facilitate sending
					tokenPriceUSD: (await getTokenValue('CSPR')).price[get(user)?.currency || 'usd'],
					decimals: 9,
				});
			};

			if (tokensInDB[selectedWallet.publicKey]?.testnet.length <= 0) {
				await setToNetwork('testnet');
			}
			if (tokensInDB[selectedWallet.publicKey]?.mainnet.length <= 0) {
				await setToNetwork('mainnet');
			}
		}

		// Add all global tokens to the array
		await Promise.all(
			tokensInDB[selectedWallet.publicKey][get(user)?.network ?? 'testnet'].map(async (token) => {
				if (token.tokenTicker === 'CSPR' && selectedWallet) {
					token.tokenAmountHeld = selectedWallet.availableBalance[get(user)?.network || 'testnet'];
					token.tokenAmountHeldUSD =
						selectedWallet.availableBalanceUSD[get(user)?.network || 'testnet'];
					token.tokenPriceUSD = (await getTokenValue('CSPR')).price[get(user)?.currency || 'usd'];
					token.decimals = 9;
				}

				return token;
			}),
		);

		tokens.set(tokensInDB);

		saveData('tokens', tokensInDB);

		checkIfTokenDeploysDone();
	}
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
		currency: 'usd',
	};

	saveData('user', dbUser);

	user.set(dbUser);
	return dbUser;
};

export const pollyFillWallets = () => {
	// Wallets
	const dbWallets: IWallet[] = retrieveData('wallets') || [];

	saveData('wallets', dbWallets);

	wallets.set(dbWallets);

	if (dbWallets.length === 0) {
		goto('/add-wallet');
	}

	return dbWallets;
};

export const pollyfillSelectedWallet = () => {
	// Wallets
	let dbSelectedWallet: IWallet = retrieveData('selectedWallet');

	if (!dbSelectedWallet) {
		// If its not present, get the first item from the wallets array, if it doesn't exist, a better option is to redirect to onboarding for the user to create wallet.
		const dbWallets: IWallet[] = retrieveData('wallets');
		dbSelectedWallet = dbWallets[0] || null;
	}

	if (dbSelectedWallet) {
		saveData('selectedWallet', dbSelectedWallet);

		selectedWallet.set(dbSelectedWallet);

		if (!get(walletLoaders)[dbSelectedWallet.publicKey]) {
			loadWalletData(dbSelectedWallet.publicKey);
		}
	}

	return dbSelectedWallet;
};

export default () => {
	pollyFillUser();
	pollyFillWallets();
	pollyfillSelectedWallet();
	pollyFillTokens();
};
