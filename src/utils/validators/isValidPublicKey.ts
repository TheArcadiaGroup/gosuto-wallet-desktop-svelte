// Add logic for validating public keys

import { CLPublicKey } from 'casper-js-sdk';

export default (publicKey: string) => {
	try {
		return !!CLPublicKey.fromHex(publicKey);
	} catch {
		return false;
	}
};
