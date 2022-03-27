const { ipcMain } = require('electron');
const createWallet = require('../utils/createWallet.cjs');
const account = require('../utils/account.cjs');
const { Keys } = require('casper-js-sdk');
const profileHistory = require('../utils/profileHistory.cjs');
const { importWalletFromFile } = require('../utils/walletImportExports.cjs');
const sendMessage = require('./sendMessage.cjs');
const { csprUsdPrice } = require('../utils/priceData.cjs');
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
			console.log(err);
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

	ipcMain.on('currentPriceInUsd', async (_event, data) => {
		switch (data) {
			case 'CSPR':
				await csprUsdPrice();
				break;

			// Other tokens here

			default:
				await csprUsdPrice();
				break;
		}
	});

	// Send Transaction
	ipcMain.on('sendCSPRTokens', async (event, data) => {
		const res = await account.sendTransaction({
			fromPublicKey: '01cfbe76f5e1b7fd042714d4583e578f47675414efd9c1f8105256cea243f0ab35',
			fromPrivateKey: Keys.Ed25519.parsePrivateKey(
				'MC4CAQAwBQYDK2VwBCIEIFvkdWUFtcpt2yOrbWk+v1fHf0y3Ca3+idJYXGkPKV+y',
			),
			toPublicKey: '01cfbe76f5e1b7fd042714d4583e578f47675414efd9c1f8105256cea243f0ab35',
			amount: 2500000000,
		});
		console.log('test result', res);

		// return this as an event to the renderer process
		sendMessage('sendCSPRTokensResponse', '');
	});

	// token balance
	ipcMain.on('accountTokenBalance', async (_event, data) => {
		try {
			const parsedData = JSON.parse(data); // {walletAddress: publicKey; token: 'CSPR', contractAddress: 'STRING'}
			switch (parsedData.token) {
				case 'CSPR':
					sendMessage('accountTokenBalanceResponse', {
						token: 'CSPR',
						walletAddress: parsedData.walletAddress,
						...(await getBalance(parsedData.walletAddress)),
					});
					break;

				case 'TOKEN':
					// pass in the token contract address and name of the token;
					sendMessage('accountTokenBalanceResponse', {
						token: 'TOKEN',
						walletAddress: parsedData.walletAddress,
						...(await getBalance(parsedData.walletAddress)),
					});
					break;

				default:
					sendMessage('accountTokenBalanceResponse', {
						token: 'CSPR',
						walletAddress: parsedData.walletAddress,
						...(await getBalance(parsedData.walletAddress)),
					});

					break;
			}
		} catch (_err) {
			console.log(_err);
		}
	});
};
