const bip39 = require('bip39');
const nacl = require('tweetnacl');
const { CLPublicKey, Keys } = require('casper-js-sdk');
const { parseAlgorithm } = require('./casper.cjs');

module.exports = {
	getMnemonics: () => {
		const mnemonics = bip39.generateMnemonic();
		return mnemonics;
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
			algorithm: 'ed25519',
		};
	},

	// Genereate it based on file
	generateFromFile: async (fileContents) => {
		try {
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
			} else if (algorithm === 'secp256k1') {
				publicKeyUint8 = Keys.Secp256K1.privateToPublicKey(
					Keys.Secp256K1.parsePrivateKey(privateKeyUint8, 'raw'),
				);
				keyPair = Keys.Secp256K1.parseKeyPair(publicKeyUint8, privateKeyUint8, 'raw');
			} else {
				throw 'App Only Supports secp256K1 and ed25519 Algorithms';
			}

			return {
				accountHash: Buffer.from(keyPair.accountHash()).toString('hex'),
				accountHex: keyPair.accountHex(),
				privateKey: Buffer.from(keyPair.privateKey).toString('hex'),
				algorithm: algorithm,
			};
		} catch (error) {
			throw error;
		}
	},
};
