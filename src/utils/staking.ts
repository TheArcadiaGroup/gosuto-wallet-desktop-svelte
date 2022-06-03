import { stakeCsprTracker, unStakeCsprTracker } from '$stores/activityLoaders';
import {
	CasperClient,
	CLPublicKey,
	CLValueBuilder,
	DeployUtil,
	Keys,
	RuntimeArgs,
} from 'casper-js-sdk';
import { ethers } from 'ethers';
import { getEndpointByNetwork } from './casper';
import { parseDelegationResponse } from './responseParsers/delegations';

export const delegate = (
	walletAddress: string,
	accountHash: string,
	privateKey: string | Uint8Array,
	validatorPublicKey: string,
	amount: number,
	network: 'testnet' | 'mainnet' = 'testnet',
) => {
	const txId = Math.random().toString(16).slice(2);

	stakeCsprTracker.update((stakeTxs) => {
		stakeTxs[txId] = {
			id: txId,
			walletAddress,
			accountHash,
			privateKey: privateKey as string,
			validatorPublicKey,
			amount,
			network,
			error: null,
			fulfilled: false,
		};
		return stakeTxs;
	});

	try {
		const publicKey = walletAddress;
		network = network ?? 'testnet';

		const casperClient = new CasperClient(getEndpointByNetwork(network));
		const networkName = network === 'mainnet' ? 'casper' : 'casper-test';

		// Read keys from the structure created in #Generating keys
		// if (privateKey.length !== 128) {
		// 	privateKey = Keys.Ed25519.parsePrivateKey(privateKey);
		// }
		// const publicKey = Keys.Ed25519.privateToPublicKey(privateKey);
		const keyPair = Keys.Ed25519.parseKeyPair(
			Buffer.from(publicKey, 'hex'),
			privateKey.length !== 128 && Array.isArray(privateKey)
				? Keys.Ed25519.parsePrivateKey(privateKey as Uint8Array)
				: Buffer.from(privateKey as string, 'hex'),
		);
		const deployParams = new DeployUtil.DeployParams(keyPair.publicKey, networkName);

		const amountAsBigNumber = ethers.utils.parseUnits(amount.toString(), 9);

		const payment = DeployUtil.standardPayment(5000000000);
		const args = RuntimeArgs.fromMap({
			delegator: keyPair.publicKey,
			validator: CLPublicKey.fromHex(validatorPublicKey),
			amount: CLValueBuilder.u512(amountAsBigNumber),
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
		casperClient
			.putDeploy(signedDeploy)
			.then(async (executionResultHash) => {
				const response = await casperClient.getDeploy(executionResultHash);
				parseDelegationResponse(
					JSON.stringify({
						id: txId,
						data: response,
						error: null,
					}),
				);
			})
			.catch((error) => {
				throw error;
			});

		// Return the deploy info using the deployHash
	} catch (error) {
		parseDelegationResponse(
			JSON.stringify({
				id: txId,
				data: null,
				error: error,
			}),
		);
	}

	return {
		id: txId,
		walletAddress,
		accountHash,
		privateKey,
		validatorPublicKey,
		amount,
		network,
		error: null,
		fulfilled: false,
	};
};

export const undelegate = (
	walletAddress: string,
	accountHash: string,
	privateKey: string | Uint8Array,
	validatorPublicKey: string,
	amount: number,
	network: 'testnet' | 'mainnet' = 'testnet',
) => {
	const txId = Math.random().toString(16).slice(2);

	unStakeCsprTracker.update((unStakeTxs) => {
		unStakeTxs[txId] = {
			id: txId,
			walletAddress,
			accountHash,
			privateKey: privateKey as string,
			validatorPublicKey,
			amount,
			network,
			error: null,
			fulfilled: false,
		};
		return unStakeTxs;
	});

	try {
		const publicKey = walletAddress;
		network = network ?? 'testnet';
		const casperClient = new CasperClient(getEndpointByNetwork(network));
		const networkName = network === 'mainnet' ? 'casper' : 'casper-test';

		// Read keys from the structure created in #Generating keys
		// if (privateKey.length !== 128) {
		// 	privateKey = Keys.Ed25519.parsePrivateKey(privateKey);
		// }

		// const publicKey = Keys.Ed25519.privateToPublicKey(privateKey);

		const keyPair = Keys.Ed25519.parseKeyPair(
			Buffer.from(publicKey, 'hex'),
			privateKey.length !== 128 && Array.isArray(privateKey)
				? Keys.Ed25519.parsePrivateKey(privateKey as Uint8Array)
				: Buffer.from(privateKey as string, 'hex'),
		);

		const deployParams = new DeployUtil.DeployParams(keyPair.publicKey, networkName);
		const payment = DeployUtil.standardPayment(5000000000);

		const amountAsBigNumber = ethers.utils.parseUnits(amount.toString(), 9);

		const args = RuntimeArgs.fromMap({
			delegator: keyPair.publicKey,
			validator: CLPublicKey.fromHex(validatorPublicKey),
			amount: CLValueBuilder.u512(amountAsBigNumber),
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

		casperClient
			.putDeploy(signedDeploy)
			.then(async (executionResultHash) => {
				const response = await casperClient.getDeploy(executionResultHash);
				parseDelegationResponse(
					JSON.stringify({
						id: txId,
						data: response,
						error: null,
					}),
					'unstake',
				);
			})
			.catch((error) => {
				throw error;
			});

		// Return the deploy info using the deployHash
	} catch (error) {
		parseDelegationResponse(
			JSON.stringify({
				id: txId,
				data: null,
				error: error,
			}),
			'unstake',
		);
	}

	return {
		id: txId,
		walletAddress,
		accountHash,
		privateKey,
		validatorPublicKey,
		amount,
		network,
		error: null,
		fulfilled: false,
	};
};
