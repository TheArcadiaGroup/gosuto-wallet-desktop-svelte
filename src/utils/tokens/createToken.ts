import { user } from '$stores/user';
import { mintingTokens } from '$stores/user/tokens';
import { parseTokenCreationHash } from '$utils/responseParsers/tokenCreation';
import { get } from 'svelte/store';
import { decryptPrvKey, retrieveData, saveData } from '../dataStorage';

export function addTokenTxToBeTracked(
	deployHash: string,
	publicKey: string,
	shareToken: boolean,
	network: 'testnet' | 'mainnet',
) {
	// Id here is used to facilitate tracking between frontend and electron
	const createdNotAddedTokens = retrieveData('token_mints') ?? [];

	if (createdNotAddedTokens.find((item: any) => item.deployHash === deployHash)) {
		createdNotAddedTokens.map((item: any) => {
			if (item.deployHash === deployHash) {
				item.lastChecked = Date.now();
			}

			return item;
		});
	} else {
		createdNotAddedTokens.push({
			deployHash,
			publicKey,
			shareToken,
			network,
			lastChecked: Date.now(),
		});
	}

	saveData('token_mints', createdNotAddedTokens);
}

export function checkIfTokenDeploysDone() {
	const createdNotAddedTokens = retrieveData('token_mints') ?? [];
	createdNotAddedTokens.map(
		(preToken: {
			deployHash: string;
			shareToken: boolean;
			publicKey: string;
			network: 'mainnet' | 'testnet';
		}) => {
			parseTokenCreationHash(
				preToken.deployHash,
				preToken.shareToken,
				preToken.publicKey,
				preToken.network,
			);
			return preToken;
		},
	);
}

export function createToken(
	privateKey: string,
	publicKey: string,
	pvkAlgorithm: 'ed25519' | 'secp256k1',
	tokenName: string,
	tokenTicker: string,
	decimals: number,
	totalSupply: number,
	mintableSupply: boolean,
	authorizedMinterHash: string,
	shareToken: boolean,
	ledgerAccountIndex: number | undefined = undefined,
): boolean {
	// Send request to electron
	const txId = Math.random().toString(16).slice(2);

	mintingTokens.update((tokensMinting) => {
		tokensMinting[txId] = {
			result: false,
			error: null,
		};

		return tokensMinting;
	});

	window.api.send(
		'deployErc20Contract',
		JSON.stringify({
			id: txId,
			share_token: shareToken,
			public_key: publicKey,
			private_key: decryptPrvKey(privateKey),
			pvk_algorithm: pvkAlgorithm,
			token_name: tokenName,
			token_symbol: tokenTicker,
			token_decimals: decimals,
			total_supply: totalSupply,
			mintable: mintableSupply,
			authorized_minter: authorizedMinterHash,
			network: get(user)?.network ?? 'testnet',
			ledger_account_index: ledgerAccountIndex,
		}),
	);

	return true;
}
