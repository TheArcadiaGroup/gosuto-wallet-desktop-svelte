const { contextBridge, ipcRenderer } = require('electron');
// const path = require('path');
// const { Titlebar } = require('custom-electron-titlebar');

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
			'appUpdates',
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
			'appUpdates',
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
		];
		if (validChannels.includes(channel)) {
			// Deliberately strip event as it includes `sender`
			ipcRenderer.on(channel, (event, ...args) => func(...args));
		}
	},
});

// window.addEventListener('DOMContentLoaded', () => {
// 	// 	// Title bar implemenation
// 	new Titlebar({
// 		backgroundColor: '#363B46',
// 		foregroundColor: '#fff',
// 		icon: path.join(__dirname, '../logo.png'),
// 		containerOverflow: 'hidden',
// 		minimizable: false,
// 		maximizable: false,
// 	});
// });
