const { ipcMain } = require('electron');
const createWallet = require('../utils/createWallet.cjs');
const profileHistory = require('../utils/profileHistory.cjs');
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
		const res = await profileHistory.getTransferHistory({
			accountHash: '34b0394b11dc3ecb1bf6f26c9754aa2e9f38d7bec33003374b4b3fac8566c258',
		});
		console.log('Please create wallet', res);

		// return this as an event to the renderer process
		sendMessage('createWalletResponse', createWallet());
	});
};
