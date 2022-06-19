// Add logic for validating public keys

export default (publicKey: string) => {
	const { CLPublicKey } = window.CasperSDK;

	try {
		return !!CLPublicKey.fromHex(publicKey);
	} catch {
		return false;
	}
};
