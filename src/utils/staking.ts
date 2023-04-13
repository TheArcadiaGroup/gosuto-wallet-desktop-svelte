import { stakeCsprTracker, unStakeCsprTracker } from '$stores/activityLoaders';
import { ethers } from 'ethers';
import { getEndpointByNetwork } from './casper';
import { decryptPrvKey } from './dataStorage';
import { parseDelegationResponse } from './responseParsers/delegations';

export const delegate = (
	publicKey: string,
	accountHash: string,
	privateKey: string,
	validatorPublicKey: string,
	amount: number,
	network: 'testnet' | 'mainnet' = 'testnet',
	algorithm: 'secp256k1' | 'ed25519' = 'ed25519',
	ledgerTx: { accountIndex: number } | null,
) => {
	const { CasperClient, CLPublicKey, CLValueBuilder, DeployUtil, Keys, RuntimeArgs } =
		window.CasperSDK;
	const txId = Math.random().toString(16).slice(2);

	stakeCsprTracker.update((stakeTxs) => {
		stakeTxs[txId] = {
			id: txId,
			publicKey,
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

	if (ledgerTx) {
		window.api.send(
			'ledger',
			JSON.stringify({
				privateKey,
				accountHash,
				publicKey,
				validatorPublicKey,
				amount,
				network,
				algorithm,
				ledgerAccountIndex: ledgerTx.accountIndex,
				id: txId,
				action: 'StakeUsingLedger',
			}),
		);
	} else {
		try {
			network = network ?? 'testnet';

			const casperClient = new CasperClient(getEndpointByNetwork(network));
			const networkName = network === 'mainnet' ? 'casper' : 'casper-test';

			const decryptedPrivateKey = decryptPrvKey(privateKey);

			const keyPair =
				algorithm === 'ed25519'
					? Keys.Ed25519.parseKeyPair(
							Buffer.from(publicKey, 'hex'),
							Buffer.from(decryptedPrivateKey, 'hex'),
					  )
					: Keys.Secp256K1.parseKeyPair(
							Buffer.from(publicKey.slice(2), 'hex'),
							Buffer.from(decryptedPrivateKey, 'hex'),
							'raw',
					  );

			const deployParams = new DeployUtil.DeployParams(keyPair.publicKey, networkName);

			const amountAsBigNumber = ethers.utils.parseUnits(amount.toString(), 9);

			const payment = DeployUtil.standardPayment(2500000000); // previously 5000000000
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
	}

	return {
		id: txId,
		publicKey,
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
	publicKey: string,
	accountHash: string,
	privateKey: string,
	validatorPublicKey: string,
	amount: number,
	network: 'testnet' | 'mainnet' = 'testnet',
	algorithm: 'secp256k1' | 'ed25519' = 'ed25519',
	ledgerTx: { accountIndex: number } | null,
) => {
	const txId = Math.random().toString(16).slice(2);

	unStakeCsprTracker.update((unStakeTxs) => {
		unStakeTxs[txId] = {
			id: txId,
			publicKey,
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

	if (ledgerTx) {
		window.api.send(
			'ledger',
			JSON.stringify({
				publicKey,
				validatorPublicKey,
				amount,
				network,
				algorithm,
				ledgerAccountIndex: ledgerTx.accountIndex,
				id: txId,
				action: 'UnStakeUsingLedger',
			}),
		);
	} else {
		const { CasperClient, CLPublicKey, CLValueBuilder, DeployUtil, Keys, RuntimeArgs } =
			window.CasperSDK;

		try {
			network = network ?? 'testnet';
			const casperClient = new CasperClient(getEndpointByNetwork(network));
			const networkName = network === 'mainnet' ? 'casper' : 'casper-test';

			const decryptedPrivateKey = decryptPrvKey(privateKey);

			const keyPair =
				algorithm === 'ed25519'
					? Keys.Ed25519.parseKeyPair(
							Buffer.from(publicKey, 'hex'),
							Buffer.from(decryptedPrivateKey, 'hex'),
					  )
					: Keys.Secp256K1.parseKeyPair(
							Buffer.from(publicKey.slice(2), 'hex'),
							Buffer.from(decryptedPrivateKey, 'hex'),
							'raw',
					  );

			const deployParams = new DeployUtil.DeployParams(keyPair.publicKey, networkName);
			const payment = DeployUtil.standardPayment(3000000000); // 5000000000

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
	}

	return {
		id: txId,
		publicKey,
		accountHash,
		privateKey,
		validatorPublicKey,
		amount,
		network,
		error: null,
		fulfilled: false,
	};
};
