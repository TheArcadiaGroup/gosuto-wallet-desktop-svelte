const { readFileUsingDialog } = require('./fileInteractions.cjs');
const { generateFromFile } = require('./createWallet.cjs');

module.exports = {
	// Only Supports ED25519 for now
	importWalletFromFile: async () => {
		const fileContents = await readFileUsingDialog('walletFile');
		let res;

		if (fileContents) {
			try {
				const wallet = await generateFromFile(fileContents);
				if (wallet.privateKey) {
					res = wallet;
				} else {
					// error
					res = null;
				}
			} catch (err) {
				res = null;
			}
		} else {
			// return error;
			res = null;
		}

		return res;
	},

	exportWalletToFile: () => {},
};
