const axios = require('axios');
const {
	Keys,
	CasperClient,
	CLPublicKey,
	DeployUtil,
	RuntimeArgs,
	CLValue,
	CLValueBuilder,
	CLU512,
} = require('casper-js-sdk');
const casperDelegationContractHexCode = './constants/casperDelegationContractHexCode.cjs';

const { getCasperClientAndService } = require('./index.cjs');

module.exports = {
	// Get all validator info
	getAllValidators: async () => {
		const res = await axios.get('https://api.caspercommunity.io/validators');
		return res.data;
	},

	// Delegate stake
	delegate: async ({ privateKey, validatorPublicKey, amount, network = 'testnet' }) => {
		const { casperService, casperClient } = getCasperClientAndService(network);
		const networkName = network === 'mainnet' ? 'casper' : 'casper-test';
		const client = casperClient;
		const publicKey = Keys.Ed25519.privateToPublicKey(privateKey);
		const keyPair = Keys.Ed25519.parseKeyPair(publicKey, privateKey);
		const deployParams = new DeployUtil.DeployParams(keyPair.publicKey, networkName);
		const payment = DeployUtil.standardPayment(5000000000);
		const args = RuntimeArgs.fromMap({
			delegator: keyPair.publicKey,
			validator: CLPublicKey.fromHex(validatorPublicKey),
			amount: CLValueBuilder.u512(amount),
		});
		let contractHash = 'ccb576d6ce6dec84a551e48f0d0b7af89ddba44c7390b690036257a04a3ae9ea';
		if (network === 'casper-test') {
			contractHash = '93d923e336b20a4c4ca14d592b60e5bd3fe330775618290104f9beb326db7ae2';
		}
		const session = DeployUtil.ExecutableDeployItem.newStoredContractByHash(
			Uint8Array.from(Buffer.from(contractHash, 'hex')),
			'delegate',
			args,
		);
		const deploy = DeployUtil.makeDeploy(deployParams, session, payment);
		const signedDeploy = DeployUtil.signDeploy(deploy, keyPair);
		const executionResult = await client.putDeploy(signedDeploy);
		return executionResult;
	},

	// Undelegate
	undelegate: async ({ privateKey, validatorPublicKey, amount, network = 'testnet' }) => {
		const { casperService, casperClient } = getCasperClientAndService(network);
		const networkName = network === 'mainnet' ? 'casper' : 'casper-test';
		const client = casperClient;
		const publicKey = Keys.Ed25519.privateToPublicKey(privateKey);
		const keyPair = Keys.Ed25519.parseKeyPair(publicKey, privateKey);
		const deployParams = new DeployUtil.DeployParams(keyPair.publicKey, networkName);
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
			'undelegate',
			args,
		);
		const deploy = DeployUtil.makeDeploy(deployParams, session, payment);
		const signedDeploy = DeployUtil.signDeploy(deploy, keyPair);
		const executionResult = await client.putDeploy(signedDeploy);
		return executionResult;
	},
};
