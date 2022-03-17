const { ipcMain } = require('electron');
const createWallet = require('../utils/createWallet.cjs');
const staking = require('../utils/staking.cjs');
const sendMessage = require('./sendMessage.cjs');
const { Keys } = require('casper-js-sdk');

/**
 * Receiving messages from Renderer
 */
module.exports = () => {
	ipcMain.on('toMain', async (event, data) => {
		sendMessage('toMain', 'Nope, not that');
		console.log(data);
	});

	ipcMain.on('createWallet', async (event, data) => {
		const res = await staking.delegate({
			privateKey: Keys.Ed25519.parsePrivateKey(
				Keys.Ed25519.readBase64WithPEM(
					'-----BEGIN PRIVATE KEY-----\r\nMC4CAQAwBQYDK2VwBCIEIFvkdWUFtcpt2yOrbWk+v1fHf0y3Ca3+idJYXGkPKV+y\r\n-----END PRIVATE KEY-----\r\n',
				),
			),
			validatorPublicKey: '0106ca7c39cd272dbf21a86eeb3b36b7c26e2e9b94af64292419f7862936bca2ca',
			amount: 10,
		});
		console.log('test delegate', res);

		// return this as an event to the renderer process
		sendMessage('createWalletResponse', res);
	});
};
