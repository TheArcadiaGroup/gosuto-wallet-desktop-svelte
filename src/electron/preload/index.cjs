const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('api', {
	send: (channel, data) => {
		// whitelist channels, add your channels here
		let validChannels = [
			// 'toMain',
			'createWalletFromMnemonics',
			'createWalletFromFile',
			'generateMnemonics',
			'importWalletFromFile',
			'getHistory',
			'sendCSPRTokens',
			'accountCsprBalance',
			'delegate',
			'undelegate',
			'openUrl',
			'exportWalletCertificate',
			'encryption',
			'saveData',
			'deployErc20Contract',
			'erc20TokenBalance',
			'sendErc20Tokens',
			'getErc20TokenDetails',
			'ledger',
			'appUpdates',
			'log',
		];
		if (validChannels.includes(channel)) {
			ipcRenderer.send(channel, data);
		}
	},
	sendSync: (channel, data) => {
		// whitelist channels, add your channels here
		let validChannels = [
			'toMain',
			'createWalletFromMnemonics',
			'createWalletFromFile',
			'generateMnemonics',
			'importWalletFromFile',
			'getHistory',
			'sendCSPRTokens',
			'accountCsprBalance',
			'selectProfileImage',
			'openUrl',
			'delegate',
			'undelegate',
			'exportWalletCertificate',
			'encryption',
			'retrieveData',
			'sendErc20Tokens',
			'getErc20TokenDetails',
			'appInfo',
			'ledger',
			'appUpdates',
			'log',
		];
		if (validChannels.includes(channel)) {
			return ipcRenderer.sendSync(channel, data);
		}
	},
	receive: (channel, func) => {
		let validChannels = [
			// 'fromMain',
			'createWalletFromMnemonicsResponse',
			'createWalletFromFileResponse',
			'generateMnemonicsResponse',
			'importWalletFromFileResponse',
			'getHistoryResponse',
			'sendCSPRTokensResponse',
			'accountCsprBalanceResponse',
			'delegateResponse',
			'undelegateResponse',
			'encryptionResponse',
			'deployErc20ContractResponse',
			'erc20TokenBalanceResponse',
			'sendErc20TokensResponse',
			'getErc20TokenDetailsResponse',
			'appUpdatesResponse',
			'ledgerResponse',
		];
		if (validChannels.includes(channel)) {
			// Deliberately strip event as it includes `sender`
			ipcRenderer.on(channel, (event, ...args) => func(...args));
		}
	},
});
