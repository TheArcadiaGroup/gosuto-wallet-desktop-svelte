const { CLPublicKey, DeployUtil, CLValueBuilder, RuntimeArgs } = require('casper-js-sdk');
const { ethers } = require('ethers');
const { getCasperClientAndService } = require('../index.cjs');
const { signTransaction } = require('./index.cjs');

module.exports = {
	sendUsingLedger: async (
		fromPublicKey,
		ledgerAccountIndex,
		toPublicKey,
		amount,
		network = 'testnet',
	) => {
		try {
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

			const session = DeployUtil.ExecutableDeployItem.newTransfer(
				amountAsBigNumber,
				toKey,
				null,
				id,
			);

			const payment = DeployUtil.standardPayment(paymentAmount);
			const deploy = DeployUtil.makeDeploy(deployParams, session, payment);

			// To Sign the Deploy, we basically change the signature parameter of the deploy and then send it over.
			const signature = await signTransaction(ledgerAccountIndex, deploy);

			console.log(signature);

			if (
				!signature ||
				signature?.error ||
				signature?.errorMessage?.toLowerCase() !== 'no errors'
			) {
				throw 'Failed to sign transaction. Please make sure your ledger is unlocked and Casper App is Active/Open and try again';
			}

			const signedDeploy = DeployUtil.setSignature(deploy, signature.signatureRS, publicKey);

			const deployHash = await casperClient.putDeploy(signedDeploy);

			// Return the deploy info using the deployHash
			return await casperClient.getDeploy(deployHash);
		} catch (error) {
			console.log(error);
			throw error;
		}
	},

	delegateUsingLedger: async ({
		publicKey,
		validatorPublicKey,
		amount,
		ledgerAccountIndex,
		network = 'testnet',
	}) => {
		try {
			network = network ?? 'testnet';

			const { casperService, casperClient } = getCasperClientAndService(network);
			const networkName = network === 'mainnet' ? 'casper' : 'casper-test';
			const client = casperClient;

			publicKey = CLPublicKey.fromHex(publicKey);
			const deployParams = new DeployUtil.DeployParams(publicKey, networkName);

			amount = ethers.utils.parseUnits(amount.toString(), 9);

			const payment = DeployUtil.standardPayment(5000000000);
			const args = RuntimeArgs.fromMap({
				delegator: publicKey,
				validator: CLPublicKey.fromHex(validatorPublicKey),
				amount: CLValueBuilder.u512(amount),
			});
			let contractHash = 'ccb576d6ce6dec84a551e48f0d0b7af89ddba44c7390b690036257a04a3ae9ea';
			if (network === 'testnet') {
				contractHash = '93d923e336b20a4c4ca14d592b60e5bd3fe330775618290104f9beb326db7ae2';
			}
			const session = DeployUtil.ExecutableDeployItem.newStoredContractByHash(
				Uint8Array.from(Buffer.from(contractHash, 'hex')),
				'delegate',
				args,
			);
			const deploy = DeployUtil.makeDeploy(deployParams, session, payment);

			// To Sign the Deploy, we basically change the signature parameter of the deploy and then send it over.
			const signature = await signTransaction(ledgerAccountIndex, deploy);

			console.log(signature);

			if (
				!signature ||
				signature?.error ||
				signature?.errorMessage?.toLowerCase() !== 'no errors'
			) {
				throw 'Failed to sign transaction. Please make sure your ledger is unlocked and Casper App is Active/Open and try again';
			}

			const signedDeploy = DeployUtil.setSignature(deploy, signature.signatureRS, publicKey);

			const deployHash = await casperClient.putDeploy(signedDeploy);

			// Return the deploy info using the deployHash
			return await casperClient.getDeploy(deployHash);
		} catch (error) {
			console.log(error);
			throw error;
		}
	},

	undelegateUsingLedger: async ({
		publicKey,
		validatorPublicKey,
		amount,
		ledgerAccountIndex,
		network = 'testnet',
	}) => {
		try {
			const { casperService, casperClient } = getCasperClientAndService(network);
			const networkName = network === 'mainnet' ? 'casper' : 'casper-test';

			publicKey = CLPublicKey.fromHex(publicKey);
			const deployParams = new DeployUtil.DeployParams(publicKey, networkName);
			const payment = DeployUtil.standardPayment(5000000000);

			amount = ethers.utils.parseUnits(amount.toString(), 9);

			const args = RuntimeArgs.fromMap({
				delegator: publicKey,
				validator: CLPublicKey.fromHex(validatorPublicKey),
				amount: CLValueBuilder.u512(amount),
			});
			let contractHash = 'ccb576d6ce6dec84a551e48f0d0b7af89ddba44c7390b690036257a04a3ae9ea';
			if (network === 'testnet') {
				contractHash = '93d923e336b20a4c4ca14d592b60e5bd3fe330775618290104f9beb326db7ae2';
			}
			const session = DeployUtil.ExecutableDeployItem.newStoredContractByHash(
				Uint8Array.from(Buffer.from(contractHash, 'hex')),
				'undelegate',
				args,
			);
			const deploy = DeployUtil.makeDeploy(deployParams, session, payment);

			// To Sign the Deploy, we basically change the signature parameter of the deploy and then send it over.
			const signature = await signTransaction(ledgerAccountIndex, deploy);

			console.log(signature);

			if (
				!signature ||
				signature?.error ||
				signature?.errorMessage?.toLowerCase() !== 'no errors'
			) {
				throw 'Failed to sign transaction. Please make sure your ledger is unlocked and Casper App is Active/Open and try again';
			}

			const signedDeploy = DeployUtil.setSignature(deploy, signature.signatureRS, publicKey);

			const deployHash = await casperClient.putDeploy(signedDeploy);

			// Return the deploy info using the deployHash
			return await casperClient.getDeploy(deployHash);
		} catch (error) {
			console.log(error);
			throw error;
		}
	},
};
