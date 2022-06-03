import { getEndpointByNetwork } from '$utils/casper';
import { CasperClient, Keys, CLPublicKey, DeployUtil } from 'casper-js-sdk';
import { ethers } from 'ethers';

export default async (
	fromPublicKey: string,
	fromPrivateKey: string | Uint8Array,
	toPublicKey: string,
	amount: number,
	network: 'testnet' | 'mainnet' = 'testnet',
) => {
	try {
		const casperClient = new CasperClient(getEndpointByNetwork(network));
		// Read keys from the structure created in #Generating keys
		// if (fromPrivateKey.length !== 128) {
		//     fromPrivateKey = Keys.Ed25519.parsePrivateKey(fromPrivateKey);
		// }

		const amountAsBigNumber = ethers.utils.parseUnits(amount.toString(), 9); // Convert the digit amount to BigNumber

		const signKeyPair = Keys.Ed25519.parseKeyPair(
			Buffer.from(fromPublicKey, 'hex'),
			fromPrivateKey.length !== 128 && Array.isArray(fromPrivateKey)
				? Keys.Ed25519.parsePrivateKey(fromPrivateKey as Uint8Array)
				: Buffer.from(fromPrivateKey as string, 'hex'),
		);

		let networkName = network === 'mainnet' ? 'casper' : 'casper-test';

		// For native-transfers the payment price is fixed
		const paymentAmount = 100000000; // previously 10000000000

		// transfer_id field in the request to tag the transaction and to correlate it to your back-end storage
		const id = 187821;

		// gasPrice for native transfers can be set to 1
		const gasPrice = 1;

		// Time that the deploy will remain valid for, in milliseconds
		// The default value is 1800000 ms (30 minutes)
		const ttl = 1800000;

		const publicKey = CLPublicKey.fromHex(fromPublicKey);

		let deployParams = new DeployUtil.DeployParams(publicKey, networkName, gasPrice, ttl);

		// We create a public key from account-address (it is the hex representation of the public-key with an added prefix)
		const toKey = CLPublicKey.fromHex(toPublicKey);

		const session = DeployUtil.ExecutableDeployItem.newTransfer(amountAsBigNumber, toKey, null, id);

		const payment = DeployUtil.standardPayment(paymentAmount);
		const deploy = DeployUtil.makeDeploy(deployParams, session, payment);
		const signedDeploy = DeployUtil.signDeploy(deploy, signKeyPair);

		// Here we are sending the signed deploy - returns the hash
		const deployHash = await casperClient.putDeploy(signedDeploy);

		// Return the deploy info using the deployHash
		return await casperClient.getDeploy(deployHash);
	} catch (err) {
		throw err;
	}
};
