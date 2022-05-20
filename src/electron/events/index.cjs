const { ipcMain, app } = require('electron');
const createWallet = require('../utils/createWallet.cjs');
const account = require('../utils/account.cjs');
const { Keys } = require('casper-js-sdk');
const profileHistory = require('../utils/profileHistory.cjs');
const { importWalletFromFile } = require('../utils/walletImportExports.cjs');
const sendMessage = require('./sendMessage.cjs');
const { getBalance, getTokenBalance } = require('../utils/account.cjs');
const { readFileUsingDialog } = require('../utils/fileInteractions.cjs');
const { getAllValidators, delegate, undelegate } = require('../utils/staking.cjs');

/**
 * Receiving messages from Renderer
 */
module.exports = () => {
	ipcMain.on('getHistory', async (event, data) => {
		console.log('\n\n Get History \n\n');
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
		data = JSON.parse(data);
		const fromPublicKey = data.senderWallet;
		const fromPrivateKey = data.senderPrivateKey;
		const toPublicKey = data.recipientWallet;
		const amount = data.amount;
		const network = data.network || 'testnet';

		try {
			const res = await account.sendTransaction({
				fromPublicKey: fromPublicKey,
				fromPrivateKey: fromPrivateKey,
				toPublicKey: toPublicKey,
				amount: amount,
				network: network,
			});

			sendMessage('sendCSPRTokensResponse', JSON.stringify({ id: data.id, data: res }));
			event.returnValue = { id: data.id, data: res };
		} catch (err) {
			sendMessage(
				'sendCSPRTokensResponse',
				JSON.stringify({
					id: data.id,
					error: err,
					message: 'Encountered Message While Transferring CSPR Tokens',
				}),
			);
			event.returnValue = JSON.stringify({
				id: data.id,
				error: err,
				message: 'Encountered Message While Transferring CSPR Tokens',
			});
		}
	});

	// token balance
	ipcMain.on('accountCsprBalance', async (event, data) => {
		// Testnet is the fallback network here
		const parsedData = JSON.parse(data); // {walletAddress: publicKey; token: 'CSPR', contractAddress: 'STRING'}

		const returnValue = {
			token: 'CSPR',
			walletAddress: parsedData.walletAddress,
			accountHash: parsedData.accountHash,
			balance: await getBalance(
				parsedData.accountHash,
				parsedData.walletAddress,
				parsedData.network || 'testnet',
			),
		};
		sendMessage('accountCsprBalanceResponse', returnValue);

		event.returnValue = returnValue;
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
			const returnValue = {
				balance: '0',
				token: parsedData.token,
				walletAddress: parsedData.walletAddress,
			};
			event.returnValue = returnValue;
			sendMessage('tokenBalanceResponse', returnValue);
		}
	});

	// STAKING
	// Get Validators
	ipcMain.on('getValidators', async (event, data) => {
		const validators = await getAllValidators();
		event.returnValue = validators;

		sendMessage('getValidatorsResponse', validators);

		return validators;
	});

	// Stake/Delegate
	ipcMain.on('delegate', async (event, data) => {
		sendMessage('delegateResponse', null);
	});

	// Unstake/Undelegate
	ipcMain.on('undelegate', async (event, data) => {
		sendMessage('undelegateResponse', null);
	});

	ipcMain.on('selectProfileImage', async (event, _data) => {
		const res = await readFileUsingDialog('profileImage');

		event.returnValue = res;
	});

	ipcMain.on('appInfo', (event, _data) => {
		event.returnValue = { rootPath: app.getAppPath() };
	});
};
