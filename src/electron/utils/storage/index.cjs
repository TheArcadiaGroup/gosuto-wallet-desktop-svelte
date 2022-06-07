const { safeStorage } = require('electron');

module.exports = {
	isEncryptionAvailable: () => {
		return safeStorage.isEncryptionAvailable();
	},
	encryptString: (stringToEncrypt) => {
		return safeStorage.encryptString(stringToEncrypt).toString('hex');
	},
	decryptString: (stringToDecrypt) => {
		return safeStorage.decryptString(Buffer.from(stringToDecrypt, 'hex'));
	},
};
