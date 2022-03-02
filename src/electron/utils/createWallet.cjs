const bip39 = require('bip39');

module.exports = getMnemonics = () => {
	return bip39.generateMnemonic();
};
