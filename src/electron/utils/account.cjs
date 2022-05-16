const { Keys, CLPublicKey, DeployUtil } = require('casper-js-sdk');
const { ethers } = require('ethers');
const { getCasperClientAndService } = require('./index.cjs');

module.exports = {
	getBalance: async (accountHash, network = 'testnet') => {
		console.log('\n\n GET BALANCE: ', accountHash, network, '\n\n');
		try {
			const { casperService, casperClient } = getCasperClientAndService(network);
			const balanceBigNumber = await casperClient.balanceOfByAccountHash(accountHash);

			console.log('Account Balance: ', ethers.utils.formatUnits(balanceBigNumber, 9));

			return ethers.utils.formatUnits(balanceBigNumber, 9);
		} catch (error) {
			console.log('\n\nBalance ERROR: \n\n', accountHash, '\n\n', error);

			return '0';
		}
	},
	sendTransaction: async ({ fromPublicKey, fromPrivateKey, toPublicKey, amount, network }) => {
		console.log('\n\n', { fromPublicKey, fromPrivateKey, toPublicKey, amount, network }, '\n\n');
		try {
			const { casperService, casperClient } = getCasperClientAndService(network);
			// Read keys from the structure created in #Generating keys
			const signKeyPair = Keys.Ed25519.parseKeyPair(
				Buffer.from(fromPublicKey, 'hex'),
				Buffer.from(fromPrivateKey, 'hex'),
			);

			let networkName = network === 'mainnet' ? 'casper' : 'casper-testnet';

			// For native-transfers the payment price is fixed
			const paymentAmount = 10000000000;

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

			const session = DeployUtil.ExecutableDeployItem.newTransfer(amount, toKey, null, id);

			const payment = DeployUtil.standardPayment(paymentAmount);
			const deploy = DeployUtil.makeDeploy(deployParams, session, payment);
			const signedDeploy = DeployUtil.signDeploy(deploy, signKeyPair);

			// Here we are sending the signed deploy
			const response = await casperClient.putDeploy(signedDeploy);

			return response;
		} catch (err) {
			return err;
		}
	},
	getTokenBalance: async () => {
		// TODO: IMPROVE THIS
		return '0';
	},
};
