const { ipcMain, app } = require('electron');
const createWallet = require('../utils/createWallet.cjs');
const account = require('../utils/account.cjs');
const profileHistory = require('../utils/profileHistory.cjs');
const { importWalletFromFile } = require('../utils/walletImportExports.cjs');
const sendMessage = require('./sendMessage.cjs');
const { getBalance, getTokenBalance } = require('../utils/account.cjs');
const { readFileUsingDialog, writeFile } = require('../utils/fileInteractions.cjs');
const { getAllValidators, delegate, undelegate } = require('../utils/staking.cjs');
const {
	isEncryptionAvailable,
	encryptString,
	decryptString,
} = require('../utils/storage/index.cjs');
const { saveData, retrieveData } = require('../data/index.cjs');
const { deployErc20Contract } = require('../utils/tokens/index.cjs');

/**
 * Receiving messages from Renderer
 */
module.exports = () => {
	// This can be asynchronous as the sveltestore is used as a backup during runtime
	ipcMain.on('saveData', (event, data) => {
		const parsedData = JSON.parse(data);
		saveData(parsedData.key, parsedData.data);
	});

	// This needs to be synchronous to ensure data is saved and read quickly
	ipcMain.on('retrieveData', (event, data) => {
		event.returnValue = retrieveData(data);
	});

	ipcMain.on('getHistory', async (event, data) => {
		try {
			// 34b0394b11dc3ecb1bf6f26c9754aa2e9f38d7bec33003374b4b3fac8566c258 => accountHash
			const parsedData = JSON.parse(data);
			const res = await profileHistory.getTransferHistory({
				accountHash: parsedData?.accountHash,
				network: parsedData?.network || 'testnet',
				page: parsedData?.page || 1,
				limit: parsedData?.limit || 10,
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
		const algorithm = data.algorithm || 'ed25519';

		try {
			const res = await account.sendTransaction({
				fromPublicKey: fromPublicKey,
				fromPrivateKey: fromPrivateKey,
				toPublicKey: toPublicKey,
				amount: amount,
				network: network,
				algorithm: algorithm,
			});

			sendMessage(
				'sendCSPRTokensResponse',
				JSON.stringify({ id: data.id, data: res, error: null }),
			);
			event.returnValue = { id: data.id, data: res, error: null };
		} catch (err) {
			sendMessage(
				'sendCSPRTokensResponse',
				JSON.stringify({
					id: data.id,
					error: err,
					data: null,
					message: 'Encountered Error While Transferring CSPR Tokens',
				}),
			);
			event.returnValue = JSON.stringify({
				id: data.id,
				error: err,
				data: null,
				message: 'Encountered Error While Transferring CSPR Tokens',
			});
		}
	});

	// token balance
	ipcMain.on('accountCsprBalance', async (event, data) => {
		// Testnet is the fallback network here
		const parsedData = JSON.parse(data);

		const returnValue = {
			token: 'CSPR',
			publicKey: parsedData.publicKey,
			accountHash: parsedData.accountHash,
			balance: await getBalance(
				parsedData.accountHash,
				parsedData.publicKey,
				parsedData.network || 'testnet',
			),
			network: parsedData.network || 'testnet',
		};
		sendMessage('accountCsprBalanceResponse', JSON.stringify(returnValue));

		event.returnValue = JSON.stringify(returnValue);
	});

	// LOAD TOKEN BALANCE - TODO
	ipcMain.on('tokenBalance', async (event, data) => {
		try {
			// Testnet is the fallback network here
			const parsedData = JSON.parse(data); // {publicKey: publicKey; token: 'CSPR', contractAddress: 'STRING'}
			const returnValue = {
				token: parsedData.token,
				publicKey: parsedData.publicKey,
				balance: await getTokenBalance(),
			};
			event.returnValue = returnValue;
			sendMessage('tokenBalanceResponse', returnValue);
		} catch (_err) {
			const returnValue = {
				balance: '0',
				token: parsedData.token,
				publicKey: parsedData.publicKey,
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
		data = JSON.parse(data);

		const {
			id,
			privateKey,
			accountHash,
			publicKey,
			validatorPublicKey,
			amount,
			network,
			algorithm,
		} = data;

		try {
			const response = await delegate({
				privateKey,
				accountHash,
				publicKey: publicKey,
				validatorPublicKey,
				amount,
				network: network ?? 'testnet',
				algorithm: algorithm ?? 'ed25519',
			});
			sendMessage(
				'delegateResponse',
				JSON.stringify({
					id,
					data: response,
					error: null,
				}),
			);

			event.returnValue = JSON.stringify({
				id,
				data: response,
				error: null,
			});
		} catch (error) {
			// Handle Error and Return Error Object
			console.log(error);
			sendMessage(
				'delegateResponse',
				JSON.stringify({
					id: data.id,
					data: null,
					error: error,
					message: 'Encountered Error While Executing Staking Request',
				}),
			);
			event.returnValue = JSON.stringify({
				id: data.id,
				data: null,
				error: error,
				message: 'Encountered Error While Executing Staking Request',
			});
		}
	});

	// Unstake/Undelegate
	ipcMain.on('undelegate', async (event, data) => {
		data = JSON.parse(data);

		const {
			id,
			privateKey,
			accountHash,
			publicKey,
			validatorPublicKey,
			amount,
			network,
			algorithm,
		} = data;

		try {
			const response = await undelegate({
				id,
				privateKey,
				accountHash,
				publicKey: publicKey,
				validatorPublicKey,
				amount,
				network: network ?? 'tesnet',
				algorithm: algorithm ?? 'ed25519',
			});
			sendMessage(
				'undelegateResponse',
				JSON.stringify({
					id,
					data: response,
				}),
			);

			event.returnValue = JSON.stringify({
				id,
				data: response,
			});
		} catch (error) {
			// Handle Error and Return Error Object
			sendMessage(
				'undelegateResponse',
				JSON.stringify({
					id: data.id,
					error: error,
					message: 'Encountered Error While Executing Unstake Request',
				}),
			);
			event.returnValue = JSON.stringify({
				id: data.id,
				error: error,
				message: 'Encountered Error While Executing Unstake Request',
			});
		}
	});

	// TOKEN MINTING, SENDING, ETC.
	ipcMain.on('deployErc20Contract', async (event, data) => {
		try {
			data = JSON.parse(data);

			const response = await deployErc20Contract(
				data.token_name,
				data.token_symbol,
				data.token_decimals,
				data.total_supply,
				data.private_key,
				data.pvk_algorithm,
				data.network ?? 'testnet',
				data.mintable ?? true,
				data.authorized_minter,
			);

			sendMessage(
				'deployErc20ContractResponse',
				JSON.stringify({
					id: data.id,
					share_token: data.share_token,
					public_key: data.public_key,
					network: data.network ?? 'testnet',
					data: response,
					error: null,
				}),
			);
		} catch (error) {
			sendMessage(
				'deployErc20ContractResponse',
				JSON.stringify({
					id: data.id,
					data: null,
					error: error,
				}),
			);
		}
	});

	ipcMain.on('openUrl', async (event, data) => {
		try {
			await require('electron').shell.openExternal(data);
		} catch (error) {
			console.log(error);
		}
	});

	ipcMain.on('selectProfileImage', async (event, _data) => {
		const res = await readFileUsingDialog('profileImage');

		event.returnValue = res;
	});

	ipcMain.on('exportWalletCertificate', async (event, data) => {
		try {
			data = JSON.parse(data);
			event.returnValue = await writeFile(
				'exportWalletCertificate',
				data.walletName,
				data.privateKeyContent,
			);
		} catch (error) {
			event.returnValue = error;
		}
	});

	ipcMain.on('encryption', async (event, data) => {
		try {
			const parsedData = JSON.parse(data);
			let result = {
				data: null,
				error: null,
				message: '',
			};
			if (parsedData?.method === 'encrypt') {
				result = {
					data: encryptString(parsedData.stringToEncrypt),
					error: null,
					message: '',
				};
			} else if (parsedData?.method === 'decrypt') {
				result = {
					data: decryptString(parsedData.stringToDecrypt),
					error: null,
					message: '',
				};
			} else if (parsedData?.method === 'check') {
				const res = isEncryptionAvailable();
				result = {
					data: res,
					error: null,
					message: '',
				};
			} else {
				result = {
					data: res,
					error: 'Inaccurate Encryption Method Provided',
					message: 'Inaccurate Encryption Method Provided',
				};
			}

			event.returnValue = JSON.stringify(result);
			sendMessage('encryptionResponse', JSON.stringify(result));
		} catch (error) {
			event.returnValue = JSON.stringify({
				data: null,
				error: error,
				message: '',
			});
			sendMessage('encryptionResponse', JSON.stringify({ data: null, error: error, message: '' }));
		}
	});

	ipcMain.on('appInfo', (event, _data) => {
		event.returnValue = { rootPath: app.getAppPath() };
	});
};
