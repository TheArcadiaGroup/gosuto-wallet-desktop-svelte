const { ipcMain } = require('electron');
const createWallet = require('../utils/createWallet.cjs');
const account = require('../utils/account.cjs');
const { Keys } = require('casper-js-sdk');
const profileHistory = require('../utils/profileHistory.cjs');
const { importWalletFromFile } = require('../utils/walletImportExports.cjs');
const sendMessage = require('./sendMessage.cjs');
const { getBalance } = require('../utils/account.cjs');

/**
 * Receiving messages from Renderer
 */
module.exports = () => {
	ipcMain.on('toMain', async (_event, data) => {
		sendMessage('toMain', 'Nope, not that');
		console.log(data);
	});

	ipcMain.on('getHistory', async (event, data) => {
		try {
			// 34b0394b11dc3ecb1bf6f26c9754aa2e9f38d7bec33003374b4b3fac8566c258 => accountHash
			const parsedData = JSON.parse(data);
			const res = await profileHistory.getTransferHistory({
				accountHash: parsedData?.accountHash,
				page: parsedData?.page,
				limit: parsedData?.limit,
			});

			sendMessage('getHistoryResponse', res);
		} catch (err) {
			sendMessage('getHistoryResponse', { data: [], pageCount: 0, itemCount: 0, pages: [] });
		}
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

	// Send Transaction
	ipcMain.on('sendCSPRTokens', async (event, data) => {
		const fromPublicKey = data.senderWallet;
		const fromPrivateKey = data.senderPrivateKey;
		const toPublicKey = data.recipientWallet;
		const amount = data.amount;

		const res = await account.sendTransaction({
			fromPublicKey: fromPublicKey,
			fromPrivateKey: Keys.Ed25519.parsePrivateKey(fromPrivateKey),
			toPublicKey: toPublicKey,
			amount: amount,
		});

		event.returnValue = res;
	});

	// token balance
	ipcMain.on('accountTokenBalance', async (event, data) => {
		try {
			const parsedData = JSON.parse(data); // {walletAddress: publicKey; token: 'CSPR', contractAddress: 'STRING'}
			switch (parsedData.token) {
				case 'CSPR':
					event.returnValue = {
						token: 'CSPR',
						walletAddress: parsedData.walletAddress,
						balance: await getBalance(parsedData.walletAddress),
					};
					break;

				case 'TOKEN':
					// pass in the token contract address and name of the token;
					event.returnValue = {
						token: 'TOKEN',
						walletAddress: parsedData.walletAddress,
						balance: await getBalance(parsedData.walletAddress),
					};
					break;

				default:
					event.returnValue = {
						token: 'CSPR',
						walletAddress: parsedData.walletAddress,
						balance: await getBalance(parsedData.walletAddress),
					};

					break;
			}
		} catch (_err) {
			console.log(_err);

			event.returnValue = {
				balance: '0',
				token: parsedData.token,
				walletAddress: parsedData.walletAddress,
			};
		}
	});
};
