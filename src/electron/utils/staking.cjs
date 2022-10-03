const axios = require('axios');
const { Keys, CLPublicKey, DeployUtil, RuntimeArgs, CLValueBuilder } = require('casper-js-sdk');
const casperDelegationContractHexCode = './constants/casperDelegationContractHexCode.cjs';
const { ethers } = require('ethers');

const { getCasperClientAndService } = require('./index.cjs');

module.exports = {
	// Get all validator info
	getAllValidators: async () => {
		const res = await axios.get('https://api.caspercommunity.io/validators');
		return res.data;
	},

	// Delegate stake
	delegate: async ({
		privateKey,
		accountHash,
		publicKey,
		validatorPublicKey,
		amount,
		network,
		algorithm,
	}) => {
		try {
			network = network ?? 'testnet';

			const { casperService, casperClient } = getCasperClientAndService(network);
			const networkName = network === 'mainnet' ? 'casper' : 'casper-test';
			const client = casperClient;
			// Read keys from the structure created in #Generating keys
			// if (privateKey.length !== 128) {
			// 	privateKey = Keys.Ed25519.parsePrivateKey(privateKey);
			// }
			// const publicKey = Keys.Ed25519.privateToPublicKey(privateKey);
			const keyPair =
				algorithm === 'ed25519'
					? Keys.Ed25519.parseKeyPair(Buffer.from(publicKey, 'hex'), Buffer.from(privateKey, 'hex'))
					: Keys.Secp256K1.parseKeyPair(
							Buffer.from(publicKey.slice(2), 'hex'),
							Buffer.from(privateKey, 'hex'),
							'raw',
					  );

			const deployParams = new DeployUtil.DeployParams(keyPair.publicKey, networkName);

			amount = ethers.utils.parseUnits(amount.toString(), 9);

			const payment = DeployUtil.standardPayment(5000000000);
			const args = RuntimeArgs.fromMap({
				delegator: keyPair.publicKey,
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
			const signedDeploy = DeployUtil.signDeploy(deploy, keyPair);
			const executionResultHash = await client.putDeploy(signedDeploy);

			// Return the deploy info using the deployHash
			return await casperClient.getDeploy(executionResultHash);
		} catch (error) {
			throw error;
		}
	},

	// Undelegate
	undelegate: async ({
		privateKey,
		validatorPublicKey,
		amount,
		network = 'testnet',
		algorithm,
	}) => {
		const { casperService, casperClient } = getCasperClientAndService(network);
		const networkName = network === 'mainnet' ? 'casper' : 'casper-test';

		// Read keys from the structure created in #Generating keys
		if (privateKey.length !== 128) {
			privateKey = Keys.Ed25519.parsePrivateKey(privateKey);
		}

		const publicKey = Keys.Ed25519.privateToPublicKey(privateKey);

		const keyPair =
			algorithm === 'ed25519'
				? Keys.Ed25519.parseKeyPair(Buffer.from(publicKey, 'hex'), Buffer.from(privateKey, 'hex'))
				: Keys.Secp256K1.parseKeyPair(
						Buffer.from(publicKey.slice(2), 'hex'),
						Buffer.from(privateKey, 'hex'),
						'raw',
				  );

		const deployParams = new DeployUtil.DeployParams(keyPair.publicKey, networkName);
		const payment = DeployUtil.standardPayment(5000000000);

		amount = ethers.utils.parseUnits(amount.toString(), 9);

		const args = RuntimeArgs.fromMap({
			delegator: keyPair.publicKey,
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
		const signedDeploy = DeployUtil.signDeploy(deploy, keyPair);
		const executionResult = await client.putDeploy(signedDeploy);

		return await casperClient.getDeploy(executionResult);
	},
};
