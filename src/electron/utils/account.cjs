const bip39 = require('bip39');
const {
	CasperClient,
	Keys,
	CasperServiceByJsonRPC,
	CLPublicKey,
	DeployUtil,
} = require('casper-js-sdk');
const { ethers } = require('ethers');

//Create Casper client and service to interact with Casper node.
// const apiUrl = 'http://34.66.154.252:7777';
// const apiUrl = 'http://52.70.214.247:7777';
// const apiUrl = 'http://mainnet.gosuto.io:7777/rpc';
const mainnetApiUrl = 'http://mainnet.gosuto.io:7777/rpc';
const testnetApiUrl = 'http://testnet.gosuto.io:7777/rpc';

function getCasperClientAndService(network) {
	const casperService = new CasperServiceByJsonRPC(
		network === 'mainnet' ? mainnetApiUrl : testnetApiUrl,
	);

	const casperClient = new CasperClient(network === 'mainnet' ? mainnetApiUrl : testnetApiUrl);

	return { casperService, casperClient };
}

module.exports = {
	getBalance: async (publicKey, network = 'testnet') => {
		try {
			const { casperService, casperClient } = getCasperClientAndService(network);

			const latestBlock = await casperService.getLatestBlockInfo();
			const root = await casperService.getStateRootHash(latestBlock.block.hash);

			const balanceUref = await casperService.getAccountBalanceUrefByPublicKey(
				root,
				CLPublicKey.fromHex(publicKey),
			);

			//account balance from the last block
			const balance = await casperService.getAccountBalance(
				latestBlock.block.header.state_root_hash,
				balanceUref,
			);

			return ethers.utils.formatUnits(balance, 9);
		} catch (error) {
			console.log(error);

			return '0';
		}
	},
	sendTransaction: async ({ fromPublicKey, fromPrivateKey, toPublicKey, amount, network }) => {
		try {
			const { casperService, casperClient } = getCasperClientAndService(network);
			// Read keys from the structure created in #Generating keys
			const signKeyPair = Keys.Ed25519.parseKeyPair(
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

			const publicKey = CLPublicKey.fromHex(fromPublicKey);

			let deployParams = new DeployUtil.DeployParams(publicKey, networkName, gasPrice, ttl);

			// We create a public key from account-address (it is the hex representation of the public-key with an added prefix)
			const toKey = CLPublicKey.fromHex(toPublicKey);

			const session = DeployUtil.ExecutableDeployItem.newTransfer(amount, toKey, null, id);

			const payment = DeployUtil.standardPayment(paymentAmount);
			const deploy = DeployUtil.makeDeploy(deployParams, session, payment);
			const signedDeploy = DeployUtil.signDeploy(deploy, signKeyPair);

			// Here we are sending the signed deploy
			return await casperClient.putDeploy(signedDeploy);
		} catch (err) {
			console.log(err);
			return err;
		}
	},
	getTokenBalance: async () => {
		// TODO: IMPROVE THIS
		return '0';
	},
};
