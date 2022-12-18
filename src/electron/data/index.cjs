const Store = require('electron-store');
const fs = require('fs');
const path = require('path');
const { isEncryptionAvailable, encryptString } = require('../utils/storage/index.cjs');

// The encryption key in this case is used to ensure data will be obfuscated and users can't directly edit the config file. This helps in preventing them from directly editing it and resulting in errors in the app
const store = new Store({
	accessPropertiesByDotNotation: false,
	fileExtension: 'gosuto',
	name: 'gosuto_data',
	encryptionKey: '', // @o4EB%Fb&MGFyk^LXj$9Xt5uk94RaR
});

// TODO: ADD MIGRATIONS FOR THE DATA ONCE A NEW VERSION HAS BEEN DEPLOYED

function injestDataFromPreviousWallet(app) {
	const injestedWallets = fs.readFileSync(path.join(app.getPath('userData'), '/wallets.json'), {
		encoding: 'utf8',
	});

	// get current wallet keys if some wallets are already present
	const currentWallets = store.get('wallets') ?? [];
	const importedWallets = JSON.parse(injestedWallets) ?? [];
	importedWallets.map((iWallet) => {
		const thisWallet = currentWallets.find(
			(wallet) => wallet?.publicKey?.toLowerCase() === iWallet?.accountHex?.toLowerCase(),
		);
		if (!thisWallet) {
			const newWallet = {
				walletName:
					`${iWallet?.walletName?.trim()} ${Math.random()
						.toString()
						.replace('.')
						.substring(0, 5)}` ??
					`Unknown ${Math.random().toString().replace('.').substring(0, 5)}`,
				walletPassword: { password: 'password', isEncrypted: false },
				walletImage: '',
				seedPhrase: '',
				availableBalanceUSD: {
					mainnet: 0.0,
					testnet: 0.0,
				},
				availableBalance: {
					mainnet: 0.0,
					testnet: 0.0,
				},
				stakedBalance: {
					mainnet: 0.0,
					testnet: 0.0,
				},
				stakingRewards: {
					mainnet: 0.0,
					testnet: 0.0,
				},
				unclaimedRewards: {
					mainnet: 0.0,
					testnet: 0.0,
				},
				walletTokens: {
					mainnet: [],
					testnet: [],
				},
				walletStakes: {
					mainnet: [],
					testnet: [],
				},
				algorithm: iWallet?.accountHex?.startsWith('02') ? 'secp256k1' : 'ed25519',
				publicKey: iWallet?.accountHex?.trim(),
				accountHash: iWallet?.accountHash.trim(),
				privateKey: isEncryptionAvailable()
					? encryptString(iWallet?.privateKey.trim())
					: iWallet?.privateKey.trim(),
				lockStatus: {
					lastUnlocked: Date.now(),
					lockTimeout: 300,
					isLocked: false,
				},
			};

			currentWallets.push(newWallet);

			store.set('wallets', currentWallets);
		}

		return iWallet;
	});
}

module.exports = {
	saveData: (key, data) => {
		store.set(key, data);
	},
	retrieveData: (key) => {
		return store.get(key);
	},
	injestDataFromPreviousWallet,
};
