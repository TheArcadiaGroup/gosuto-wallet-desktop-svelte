const { ipcMain } = require('electron');
const createWallet = require('../utils/createWallet.cjs');
const profileHistory = require('../utils/profileHistory.cjs');
const { importWalletFromFile } = require('../utils/walletImportExports.cjs');
const sendMessage = require('./sendMessage.cjs');

/**
 * Receiving messages from Renderer
 */
module.exports = () => {
	ipcMain.on('toMain', async (_event, data) => {
		sendMessage('toMain', 'Nope, not that');
		console.log(data);
	});


	ipcMain.on('createWallet', async (event, data) => {
		const res = await profileHistory.getTransferHistory({
			accountHash: '34b0394b11dc3ecb1bf6f26c9754aa2e9f38d7bec33003374b4b3fac8566c258',
		});
		console.log('Please create wallet', res);
    
  });

	// Generate Wallet Mnemonics
	ipcMain.on('generateMnemonics', async (_event, _data) => {
		// return this as an event to the renderer process
		sendMessage('generateMnemonicsResponse', createWallet.getMnemonics());
	});

	// Create wallet from mnemonics
	ipcMain.on('createWalletFromMnemonics', async (_event, data) => {
		const res = await createWallet.generateFromMnemonics(data);
		sendMessage('createWalletFromMnemonicsResponse', res);
	});

	// Create wallet from file
	ipcMain.on('createWalletFromFile', async (_event, data) => {
		const res = await createWallet.generateFromFile(data);
		sendMessage('createWalletFromFileResponse', res);
	});

	// Import wallet from file
	ipcMain.on('importWalletFromFile', async (_event, data) => {
		const res = await importWalletFromFile();
		sendMessage('importWalletFromFileResponse', res);
	});
};
