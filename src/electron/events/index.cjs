const { ipcMain } = require('electron');
const createWallet = require('../utils/createWallet.cjs');
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
		console.log('Please create wallet', data);

		// return this as an event to the renderer process
		sendMessage('createWalletResponse', createWallet());
	});
};
