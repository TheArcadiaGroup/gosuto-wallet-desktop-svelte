const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('api', {
	send: (channel, data) => {
		// whitelist channels, add your channels here
		let validChannels = [
			'toMain',
			'createWalletFromMnemonics',
			'createWalletFromFile',
			'generateMnemonics',
			'importWalletFromFile',
		];
		if (validChannels.includes(channel)) {
			ipcRenderer.send(channel, data);
		}
	},
	receive: (channel, func) => {
		let validChannels = [
			'fromMain',
			'createWalletFromMnemonicsResponse',
			'createWalletFromFileResponse',
			'generateMnemonicsResponse',
			'importWalletFromFileResponse',
		];
		if (validChannels.includes(channel)) {
			// Deliberately strip event as it includes `sender`
			ipcRenderer.on(channel, (event, ...args) => func(...args));
		}
	},
});
