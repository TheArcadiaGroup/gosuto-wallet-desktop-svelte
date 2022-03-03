const { ipcMain } = require('electron');
const createWallet = require('../utils/createWallet.cjs');
const account = require('../utils/account.cjs');
const { Keys } = require('casper-js-sdk');
const sendMessage = require('./sendMessage.cjs');

/**
 * Receiving messages from Renderer
 */
module.exports = () => {
	ipcMain.on('toMain', async (event, data) => {
		sendMessage('toMain', 'Nope, not that');
		console.log(data);
	});

	ipcMain.on('createWallet', async (event, data) => {
		const res = await account.sendTransaction({
			fromPublicKey: '01cfbe76f5e1b7fd042714d4583e578f47675414efd9c1f8105256cea243f0ab35',
			fromPrivateKey: Keys.Ed25519.parsePrivateKey(
				'MC4CAQAwBQYDK2VwBCIEIFvkdWUFtcpt2yOrbWk+v1fHf0y3Ca3+idJYXGkPKV+y',
			),
			toPublicKey: '01cfbe76f5e1b7fd042714d4583e578f47675414efd9c1f8105256cea243f0ab35',
			amount: 2500000000,
		});
		console.log('test result', res);

		// return this as an event to the renderer process
		sendMessage('createWalletResponse', '');
	});
};
