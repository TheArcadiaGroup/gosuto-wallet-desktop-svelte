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

	ipcMain.on('generateMnemonics', async (event, data) => {
		console.log('Generate Mnemonics', data);

		// return this as an event to the renderer process
		sendMessage('generateMnemonicsResponse', createWallet.getMnemonics());
	});
	ipcMain.on('createWallet', async (event, data) => {
		const res = await createWallet.generateFromMnemonics(data);
		sendMessage('createWalletResponse', res);
	});
	ipcMain.on('createWalletFromFile', async (event, data) => {
		const res = await createWallet.generateFromFile(data);
		sendMessage('createWalletFromFileResponse', res);
	});
};
