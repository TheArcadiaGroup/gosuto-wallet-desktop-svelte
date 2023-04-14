const { Keys, CLPublicKey, DeployUtil } = require('casper-js-sdk');
const { ethers } = require('ethers');
const { getCasperClientAndService } = require('./index.cjs');
const log = require('electron-log');

module.exports = {
	getBalance: async (accountHash, publicKey, network = 'testnet') => {
		try {
			// TODO - FIX MOST RECENT BLOCK INFORMATION BUG
			const { casperService, casperClient } = getCasperClientAndService(network);

			const latestBlock = await casperService.getLatestBlockInfo();
			const root = await casperService.getStateRootHash(latestBlock.block.hash);

			const balanceUref = await casperService.getAccountBalanceUrefByPublicKey(
				root,
				CLPublicKey.fromHex(publicKey),
			);

			//account balance from the last block
			const balanceBigNumber = await casperService.getAccountBalance(
				latestBlock.block.header.state_root_hash,
				balanceUref,
			);

			const actualBalance = ethers.utils.formatUnits(balanceBigNumber, 9);

			log.info('Account Balance: ', actualBalance);

			return actualBalance;
		} catch (error) {
			const { casperService, casperClient } = getCasperClientAndService(network);

			return await casperClient
				.balanceOfByAccountHash(accountHash)
				.then((balanceBigNumber) => {
					const actualBalance = ethers.utils.formatUnits(balanceBigNumber, 9);

					log.error('Fallback Balance: ', actualBalance, '\n\n', error);

					return actualBalance;
				})
				.catch((_err) => {
					log.error('\n\nBalance ERROR: \n\n', accountHash, '\n\n', _err);

					return '0';
				});
		}
	},
	sendTransaction: async ({
		fromPublicKey,
		fromPrivateKey,
		toPublicKey,
		amount,
		network,
		algorithm,
	}) => {
		// Todo: Convert Amount to Ethers 1e9
		try {
			const { casperService, casperClient } = getCasperClientAndService(network);
			// Read keys from the structure created in #Generating keys
			// if (fromPrivateKey.length !== 128) {
			// 	fromPrivateKey = Keys.Ed25519.parsePrivateKey(fromPrivateKey);
			// }

			amount = ethers.utils.parseUnits(amount.toString(), 9); // Convert the digit amount to BigNumber

			const signKeyPair =
				algorithm === 'ed25519'
					? Keys.Ed25519.parseKeyPair(
							Buffer.from(fromPublicKey, 'hex'),
							Buffer.from(fromPrivateKey, 'hex'),
					  )
					: Keys.Secp256K1.parseKeyPair(
							Buffer.from(fromPublicKey.slice(2), 'hex'),
							Buffer.from(fromPrivateKey, 'hex'),
							'raw',
					  );

			let networkName = network === 'mainnet' ? 'casper' : 'casper-test';

			// For native-transfers the payment price is fixed
			const paymentAmount = 5000000000;

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

			// Here we are sending the signed deploy - returns the hash
			const deployHash = await casperClient.putDeploy(signedDeploy);

			// Return the deploy info using the deployHash
			return await casperClient.getDeploy(deployHash);
		} catch (err) {
			log.error('Send Tx Error: ', err);
			throw err;
		}
	},
};
