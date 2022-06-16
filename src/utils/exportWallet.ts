import { Keys } from 'casper-js-sdk';
import { decryptPrvKey } from './dataStorage';

export const walletAsPem = (
	walletName: string,
	privateKey: string,
	algorithm: 'secp256k1' | 'ed25519',
) => {
	try {
		let keyPair: Keys.AsymmetricKey;
		let publicKey: Uint8Array;
		privateKey = decryptPrvKey(privateKey);

		if (algorithm === 'secp256k1') {
			publicKey = Keys.Secp256K1.privateToPublicKey(Buffer.from(privateKey, 'hex'));
			keyPair = Keys.Secp256K1.parseKeyPair(publicKey, Buffer.from(privateKey, 'hex'), 'raw');
		} else {
			publicKey = Keys.Ed25519.privateToPublicKey(Buffer.from(privateKey, 'hex'));
			keyPair = Keys.Ed25519.parseKeyPair(publicKey, Buffer.from(privateKey, 'hex'));
		}

		const res = window.api.sendSync(
			'exportWalletCertificate',
			JSON.stringify({
				walletName,
				privateKeyContent: keyPair.exportPrivateKeyInPem(),
			}),
		);

		if (res === true) {
			return res;
		} else {
			throw res;
		}
	} catch (error) {
		throw error;
	}
};
