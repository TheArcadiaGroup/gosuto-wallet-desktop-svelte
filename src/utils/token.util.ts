import { sendTokenTracker } from '$stores/activityLoaders';
import { user } from '$stores/user';
import { get } from 'svelte/store';
import { decryptPrvKey, retrieveData, saveData } from './dataStorage';
import { parseTransferData } from './responseParsers/transfers';
import { getTokenUsdPrice } from './tokens';
import sendCspr from './tokens/sendCspr';

export function getAllTokens(): IToken[] {
	// @ts-ignore
	const tokens: IToken[] = JSON.parse(retrieveData('tokens')) ?? [];

	return tokens;
}

export function addToken(wallet: string, token: IToken): boolean {
	let tokens: any = retrieveData('tokens');
	if (!tokens) tokens = {};
	if (!tokens[wallet]) tokens[wallet] = {};
	tokens[wallet][token.contractHash] = token;
	saveData('tokens', tokens);

	return true;
}

export function deleteToken(wallet: string, contractAddress: string): boolean {
	// @ts-ignore
	const tokens: any = JSON.parse(retrieveData('tokens'));
	if (tokens && tokens[wallet] && tokens[wallet][contractAddress]) {
		delete tokens[wallet];
		saveData('tokens', tokens);
		return true;
	}

	return false;
}

export async function sendToken(
	publicKey: string,
	privateKey: string,
	tokenAmount: number,
	recipientAddress: string,
	contractAddress: string = 'CSPR',
	network: 'testnet' | 'mainnet' = 'testnet',
	note: string = '',
	tokenTicker: string = 'CSPR',
	algorithm: 'secp256k1' | 'ed25519' = 'ed25519',
): Promise<void | {
	id: string;
	senderWallet: any;
	senderPrivateKey: any;
	recipientWallet: any;
	amount: any;
	network: 'mainnet' | 'testnet';
	error: null;
	fulfilled: boolean;
}> {
	if (contractAddress === 'CSPR') {
		// Create unique tx ID to track it once its returned

		const requestObj = {
			id: Math.random().toString(16).slice(2),
			senderWallet:
				// '01cfbe76f5e1b7fd042714d4583e578f47675414efd9c1f8105256cea243f0ab35' ||
				publicKey,
			senderPrivateKey:
				// 'MC4CAQAwBQYDK2VwBCIEIFvkdWUFtcpt2yOrbWk+v1fHf0y3Ca3+idJYXGkPKV+y' ||
				privateKey,
			recipientWallet:
				// '01cfbe76f5e1b7fd042714d4583e578f47675414efd9c1f8105256cea243f0ab35' ||
				recipientAddress,
			amount: tokenAmount,
			network: network, // use testnet just in case the user makes a mistake
		};

		sendTokenTracker.update((transactions) => {
			transactions[requestObj.id] = {
				...requestObj,
				error: null,
				fulfilled: false,
				token: tokenTicker,
			};
			return transactions;
		});

		// window.api.send('sendCSPRTokens', JSON.stringify(requestObj));
		sendCspr(publicKey, privateKey, recipientAddress, tokenAmount, network, algorithm)
			.then((response) => {
				parseTransferData(
					JSON.stringify({
						id: requestObj.id,
						data: response,
						error: null,
						message: 'Successfully Executed Transaction',
					}),
				);
			})
			.catch((err) => {
				console.log(err);
				parseTransferData(
					JSON.stringify({
						id: requestObj.id,
						data: null,
						error: err,
						message: 'Encountered Error While Transferring CSPR Tokens',
					}),
				);
			});

		return { ...requestObj, error: null, fulfilled: false };
	}
}

export async function swapToken(
	wallet: string,
	fromContractAddress: string,
	fromAmount: number,
	toContractAddress: string,
	toAmount: number,
): Promise<boolean> {
	const tokens: any = retrieveData('tokens');

	const token = JSON.parse(tokens)?.[wallet]?.[fromContractAddress] ?? undefined;
	const toToken = JSON.parse(tokens)?.[wallet]?.[toContractAddress] ?? undefined;

	if (!token || !toToken) return false;

	const tokenObject = JSON.parse(token) as IToken;
	const toTokenObject = JSON.parse(toToken) as IToken;

	if (tokenObject.tokenAmountHeld < fromAmount) return false;

	tokenObject.tokenAmountHeld -= fromAmount;
	toTokenObject.tokenAmountHeld += toAmount;

	const tokenUSDValue = (await getTokenValue(fromContractAddress)).price[
		get(user)?.currency || 'usd'
	];
	tokenObject.tokenAmountHeld = tokenUSDValue * tokenObject.tokenAmountHeld;

	const toTokenUSDValue = (await getTokenValue(toContractAddress)).price[
		get(user)?.currency || 'usd'
	];
	toTokenObject.tokenAmountHeld = toTokenUSDValue * toTokenObject.tokenAmountHeld;

	tokens[wallet][fromContractAddress] = tokenObject;
	tokens[wallet][toContractAddress] = toTokenObject;

	saveData('tokens', tokens);

	return true;
}

export async function getTokenValue(contractAddress: string): Promise<{
	price: {
		usd: number;
		eur: number;
		jpy: number;
	};
	price_change: number;
}> {
	return await getTokenUsdPrice(contractAddress);
}

export function createToken(
	privateKey: string,
	pvkAlgorithm: 'ed25519' | 'secp256k1',
	tokenName: string,
	tokenTicker: string,
	decimals: number,
	totalSupply: number,
	mintableSupply: boolean,
	authorizedMinterHash: string,
	shareToken: boolean,
): boolean {
	// const tokens = JSON.parse(retrieveData('tokens')) ?? {};

	// const token = {
	// 	tokenName,
	// 	tokenTicker,
	// 	tokenAmountHeld: 0, // no need to store different sets of these as each token is limited to its network either testnet or mainnet
	// 	tokenAmountHeldUSD: 0, // no need to store different sets of these as each token is limited to its network either testnet or mainnet
	// 	shareToken, // share between wallets not networks
	// 	contractHash: '', // must never start with hash
	// 	tokenPriceUSD: 0,
	// 	decimals,
	// } as IToken;

	console.log({
		private_key: decryptPrvKey(privateKey),
		pvk_algorithm: pvkAlgorithm,
		token_name: tokenName,
		token_symbol: tokenTicker,
		token_decimals: decimals,
		total_supply: totalSupply,
		mintable: mintableSupply,
		authorized_minter: authorizedMinterHash,
		network: get(user)?.network ?? 'testnet',
	});

	// Send request to electron
	window.api.send(
		'deployErc20Contract',
		JSON.stringify({
			private_key: decryptPrvKey(privateKey),
			pvk_algorithm: pvkAlgorithm,
			token_name: tokenName,
			token_symbol: tokenTicker,
			token_decimals: decimals,
			total_supply: totalSupply,
			mintable: mintableSupply,
			authorized_minter: authorizedMinterHash,
			network: get(user)?.network ?? 'testnet',
		}),
	);

	// saveData('tokens', tokens);

	return true;
}

export function importToken(
	wallet: string,
	contractAddress: string,
	tokenTicker: string,
	decimals: number,
	shareToken: boolean,
): boolean {
	return true;
}
