const bip39 = require('bip39');
const nacl = require('tweetnacl');
const { CLPublicKey, Keys } = require('casper-js-sdk');
const { parseAlgorithm } = require('./casper.cjs');

module.exports = {
	getMnemonics: () => {
		return bip39.generateMnemonic();
	},

	// Generate wallet based on mnemonics
	generateFromMnemonics: async (mnemonic) => {
		let accountHex = '';
		const cleanMnemonic = mnemonic
			.split(' ')
			.map((mnemonic_) => mnemonic_.trim())
			.join(' ');
		const currentMnemonicSeed = await bip39.mnemonicToSeed(cleanMnemonic);
		const keyPairFromSeed = nacl.sign.keyPair.fromSeed(
			Uint8Array.from(currentMnemonicSeed.subarray(0, 32)).valueOf(),
		);
		const edKey = new Keys.Ed25519(keyPairFromSeed);
		accountHex = edKey.accountHex();
		const publicKey = CLPublicKey.fromHex(edKey.accountHex());

		let accountHash;
		accountHex = publicKey.toHex();
		accountHash = publicKey.toAccountHash();
		accountHash = Buffer.from(accountHash).toString('hex');
		const privateKey = Buffer.from(edKey.privateKey).toString('hex');
		return {
			accountHex,
			accountHash,
			privateKey,
		};
	},

	// Genereate it based on file
	generateFromFile: async (fileContents) => {
		const { algorithm, secretKeyBase64 } = parseAlgorithm(fileContents);
		let privateKeyUint8 = '';
		let publicKeyUint8;
		let keyPair;
		privateKeyUint8 = secretKeyBase64;
		if (algorithm === 'ed25519') {
			publicKeyUint8 = Keys.Ed25519.privateToPublicKey(
				Keys.Ed25519.parsePrivateKey(privateKeyUint8),
			);
			keyPair = Keys.Ed25519.parseKeyPair(publicKeyUint8, privateKeyUint8);
		} else {
			publicKeyUint8 = Keys.Secp256K1.privateToPublicKey(
				Keys.Secp256K1.parsePrivateKey(privateKeyUint8),
			);
			keyPair = Keys.Secp256K1.parseKeyPair(publicKeyUint8, privateKeyUint8);
		}

		return {
			accountHash: Buffer.from(keyPair.accountHash()).toString('hex'),
			accountHex: keyPair.accountHex(),
			privateKey: Buffer.from(keyPair.privateKey, 'hex').toString('hex'),
		};
	},
};
