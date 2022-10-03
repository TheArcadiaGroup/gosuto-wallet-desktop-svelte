const { CLPublicKey, DeployUtil } = require('casper-js-sdk');
const { ethers } = require('ethers');
const { getCasperClientAndService } = require('../index.cjs');
const { signTransaction } = require('./index.cjs');

module.exports = {
	sendUsingLedger: async (fromPublicKey, ledgerAccountIndex, toPublicKey, amount, network) => {
		const { _casperService, casperClient } = getCasperClientAndService(network);

		const amountAsBigNumber = ethers.utils.parseUnits(amount, 9); // Convert the digit amount to BigNumber

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

		// To Sign the Deploy, we basically change the signature parameter of the deploy and then send it over.
		//  So...
		const approval = new DeployUtil.Approval();
		const signature = await signTransaction(ledgerAccountIndex, deploy.hash);

		console.log(signature);

		if (!signature || !signature?.error) {
			throw 'Failed to sign transaction. Please make sure your ledger is unlocked and Casper App is Active/Open and try again';
		}

		DeployUtil.setSignature(deploy, signature);

		approval.signature = Keys.Secp256K1.accountHex(signature);

		deploy.approvals.push(approval);

		const deployHash = await casperClient.putDeploy(deploy);

		// Return the deploy info using the deployHash
		return await casperClient.getDeploy(deployHash);

		// export const signDeploy = (
		// 	deploy: Deploy,
		// 	signingKey: AsymmetricKey
		//   ): Deploy => {
		// 	const approval = new Approval();
		// 	const signature = signingKey.sign(deploy.hash);
		// 	approval.signer = signingKey.accountHex();
		// 	switch (signingKey.signatureAlgorithm) {
		// 	  case SignatureAlgorithm.Ed25519:
		// 		approval.signature = Keys.Ed25519.accountHex(signature);
		// 		break;
		// 	  case SignatureAlgorithm.Secp256K1:
		// 		approval.signature = Keys.Secp256K1.accountHex(signature);
		// 		break;
		// 	}
		// 	deploy.approvals.push(approval);

		// 	return deploy;
		//   };
	},
};
