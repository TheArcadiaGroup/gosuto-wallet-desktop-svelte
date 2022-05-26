import { stakeCsprTracker } from '$stores/activityLoaders';

export const delegate = (
	walletAddress: string,
	accountHash: string,
	privateKey: string,
	validatorPublicKey: string,
	amount: number,
	network: 'testnet' | 'mainnet' = 'testnet',
) => {
	const txId = Math.random().toString(16).slice(2);
	window.api.send(
		'delegate',
		JSON.stringify({
			id: txId,
			privateKey,
			walletAddress,
			accountHash,
			validatorPublicKey,
			amount,
			network,
		}),
	);

	stakeCsprTracker.update((stakeTxs) => {
		stakeTxs[txId] = {
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
		return stakeTxs;
	});

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

export const undelegate = async (
	privateKey: string,
	validatorPublicKey: string,
	amount: number,
	network: 'testnet' | 'network' = 'testnet',
) => {
	window.api.send(
		'delegate',
		JSON.stringify({
			privateKey,
			validatorPublicKey,
			amount,
			network,
		}),
	);
};
