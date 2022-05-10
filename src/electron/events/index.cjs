const { ipcMain, app } = require('electron');
const createWallet = require('../utils/createWallet.cjs');
const account = require('../utils/account.cjs');
const { Keys } = require('casper-js-sdk');
const profileHistory = require('../utils/profileHistory.cjs');
const { importWalletFromFile } = require('../utils/walletImportExports.cjs');
const sendMessage = require('./sendMessage.cjs');
const { getBalance, getTokenBalance } = require('../utils/account.cjs');
const { readFileUsingDialog } = require('../utils/fileInteractions.cjs');

/**
 * Receiving messages from Renderer
 */
module.exports = () => {
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
	ipcMain.on('generateMnemonics', async (event, _data) => {
		// return this as an event to the renderer process
		// sendMessage('generateMnemonicsResponse', createWallet.getMnemonics());
		event.returnValue = createWallet.getMnemonics();
	});

	// Create wallet from mnemonics
	ipcMain.on('createWalletFromMnemonics', async (event, data) => {
		const res = await createWallet.generateFromMnemonics(data);
		// sendMessage('createWalletFromMnemonicsResponse', res);
		event.returnValue = res;
	});

	// Create wallet from file
	ipcMain.on('createWalletFromFile', async (event, data) => {
		const res = await createWallet.generateFromFile(data);
		// sendMessage('createWalletFromFileResponse', res);
		event.returnValue = res;
	});

	// Import wallet from file
	ipcMain.on('importWalletFromFile', async (event, _data) => {
		const res = await importWalletFromFile();
		// sendMessage('importWalletFromFileResponse', res);
		event.returnValue = res;
	});

	// Send Transaction
	ipcMain.on('sendCSPRTokens', async (event, data) => {
		const fromPublicKey = data.senderWallet;
		const fromPrivateKey = data.senderPrivateKey;
		const toPublicKey = data.recipientWallet;
		const amount = data.amount;
		const network = data.network || 'testnet';

		const res = await account.sendTransaction({
			fromPublicKey: fromPublicKey,
			fromPrivateKey: Keys.Ed25519.parsePrivateKey(fromPrivateKey),
			toPublicKey: toPublicKey,
			amount: amount,
			network: network,
		});

		event.returnValue = res;

		sendMessage('sendCSPRTokensResponse', res);
	});

	// token balance
	ipcMain.on('accountCsprBalance', async (event, data) => {
		try {
			// Testnet is the fallback network here
			const parsedData = JSON.parse(data); // {walletAddress: publicKey; token: 'CSPR', contractAddress: 'STRING'}
			const returnValue = {
				token: 'CSPR',
				walletAddress: parsedData.walletAddress,
				balance: await getBalance(parsedData.walletAddress, parsedData.network || 'testnet'),
			};
			event.returnValue = returnValue;
			sendMessage('accountCsprBalanceResponse', returnValue);
		} catch (_err) {
			console.log(_err);

			const returnValue = {
				balance: '0',
				token: parsedData.token,
				walletAddress: parsedData.walletAddress,
			};
			event.returnValue = returnValue;
			sendMessage('accountCsprBalanceResponse', returnValue);
		}
	});

	// LOAD TOKEN BALANCE - TODO
	ipcMain.on('tokenBalance', async (event, data) => {
		try {
			// Testnet is the fallback network here
			const parsedData = JSON.parse(data); // {walletAddress: publicKey; token: 'CSPR', contractAddress: 'STRING'}
			const returnValue = {
				token: parsedData.token,
				walletAddress: parsedData.walletAddress,
				balance: await getTokenBalance(),
			};
			event.returnValue = returnValue;
			sendMessage('tokenBalanceResponse', returnValue);
		} catch (_err) {
			console.log(_err);

			const returnValue = {
				balance: '0',
				token: parsedData.token,
				walletAddress: parsedData.walletAddress,
			};
			event.returnValue = returnValue;
			sendMessage('tokenBalanceResponse', returnValue);
		}
	});

	ipcMain.on('selectProfileImage', async (event, _data) => {
		const res = await readFileUsingDialog('profileImage');

		event.returnValue = res;
	});

	ipcMain.on('appInfo', (event, _data) => {
		event.returnValue = { rootPath: app.getAppPath() };
	});
};
