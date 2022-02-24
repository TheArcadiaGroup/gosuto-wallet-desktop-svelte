const { ipcMain } = require('electron');
const createWallet = require('../utils/createWallet.cjs');
const sendMessage = require('./sendMessage.cjs');

/**
 * Receiving messages from Renderer
 */
module.exports = () => {
	ipcMain.on('toMain', async (_event, data) => {
		sendMessage('toMain', 'Nope, not that');
		console.log(data);
	});

	// Generate Wallet Mnemonics
	ipcMain.on('generateMnemonics', async (_event, _data) => {
		// return this as an event to the renderer process
		sendMessage('generateMnemonicsResponse', createWallet.getMnemonics());
	});

	// Create wallet from mnemonics
	ipcMain.on('createWallet', async (event, data) => {
		const res = await createWallet.generateFromMnemonics(data);
		sendMessage('createWalletResponse', res);
	});

	// Create wallet from file
	ipcMain.on('createWalletFromFile', async (event, data) => {
		const res = await createWallet.generateFromFile(data);
		sendMessage('createWalletFromFileResponse', res);
	});
};
