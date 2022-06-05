import { Keys } from 'casper-js-sdk';

export const walletAsPem = (privateKey: string) => {
	// const ll = JSON.stringify(privateKey).replace('{', '').replace('}', '').split(',');
	// const newll = ll.map((val) => {
	// 	return parseInt(val.substr(val.indexOf(':') + 1, val.length));
	// });
	// const privateKeyArr = Uint8Array.from(newll);

	const publicKey = Keys.Ed25519.privateToPublicKey(Buffer.from(privateKey, 'hex'));
	const keyPair = Keys.Ed25519.parseKeyPair(publicKey, Buffer.from(privateKey as string, 'hex'));

	const pem = keyPair.exportPrivateKeyInPem();

	console.log(pem);

	return pem;
};
