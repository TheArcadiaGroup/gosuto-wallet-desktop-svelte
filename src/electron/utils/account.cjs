const bip39 = require('bip39');
const {
	CasperClient,
	Keys,
	CasperServiceByJsonRPC,
	CLPublicKey,
	DeployUtil,
} = require('casper-js-sdk');
const { csprUsdPrice } = require('./priceData.cjs');

//Create Casper client and service to interact with Casper node.
// const apiUrl = 'http://34.66.154.252:7777';
// const apiUrl = 'http://52.70.214.247:7777';
const apiUrl = 'http://mainnet.gosuto.io:7777/rpc';
const casperService = new CasperServiceByJsonRPC(apiUrl);

const casperClient = new CasperClient(apiUrl);

module.exports = {
	getBalance: async (publicKey) => {
		try {
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

			const currentPriceInUsd = await csprUsdPrice();

			return {
				balance: balance.toString(),
				balanceInUsd: currentPriceInUsd * balance,
				tokenPriceInUsd: currentPriceInUsd,
			};
		} catch (error) {
			console.log(error);
			const currentPriceInUsd = await csprUsdPrice();

			return {
				balance: 0,
				balanceInUsd: 0,
				tokenPriceInUsd: currentPriceInUsd,
			};
		}
	},
	sendTransaction: async ({ fromPublicKey, fromPrivateKey, toPublicKey, amount }) => {
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
	},
};
