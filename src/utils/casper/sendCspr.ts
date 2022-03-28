import { CasperClient } from '.';

export default async (
	fromPublicKey: string,
	fromPrivateKey: string,
	toPublicKey: string,
	amount: number,
) => {
	// Read keys from the structure created in #Generating keys
	const signKeyPair = window.CasperSDK.Keys.Ed25519.parseKeyPair(
		Buffer.from(fromPublicKey, 'hex'),
		Buffer.from(fromPrivateKey, 'hex'),
	);

	let networkName = 'casper';

	// For native-transfers the payment price is fixed
	const paymentAmount = 10000000000;

	// transfer_id field in the request to tag the transaction and to correlate it to your back-end storage
	const id = 187821;

	// gasPrice for native transfers can be set to 1
	const gasPrice = 1;

	// Time that the deploy will remain valid for, in milliseconds
	// The default value is 1800000 ms (30 minutes)
	const ttl = 1800000;

	const publicKey = window.CasperSDK.CLPublicKey.fromHex(fromPublicKey);

	let deployParams = new window.CasperSDK.DeployUtil.DeployParams(
		publicKey,
		networkName,
		gasPrice,
		ttl,
	);

	// We create a public key from account-address (it is the hex representation of the public-key with an added prefix)
	const toKey = window.CasperSDK.CLPublicKey.fromHex(toPublicKey);

	const session = window.CasperSDK.DeployUtil.ExecutableDeployItem.newTransfer(
		amount,
		toKey,
		null,
		id,
	);

	const payment = window.CasperSDK.DeployUtil.standardPayment(paymentAmount);
	const deploy = window.CasperSDK.DeployUtil.makeDeploy(deployParams, session, payment);
	const signedDeploy = window.CasperSDK.DeployUtil.signDeploy(deploy, signKeyPair);

	// Here we are sending the signed deploy
	const casperClient = await CasperClient();
	return await casperClient.putDeploy(signedDeploy);
};
