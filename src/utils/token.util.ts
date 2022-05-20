import { sendTokenTracker } from '$stores/activityLoaders';
import { user } from '$stores/user';
import { get } from 'svelte/store';
import { retrieveData, saveData } from './dataStorage';
import { getTokenUsdPrice } from './tokens';

export function getAllTokens(): IToken[] {
	// @ts-ignore
	const tokens: IToken[] = JSON.parse(retrieveData('tokens')) ?? [];

	return tokens;
}

export function addToken(wallet: string, token: IToken): boolean {
	let tokens: any = retrieveData('tokens');
	if (!tokens) tokens = {};
	if (!tokens[wallet]) tokens[wallet] = {};
	tokens[wallet][token.contractAddress] = token;
	saveData('tokens', JSON.stringify(tokens));

	return true;
}

export function deleteToken(wallet: string, contractAddress: string): boolean {
	// @ts-ignore
	const tokens: any = JSON.parse(retrieveData('tokens'));
	if (tokens && tokens[wallet] && tokens[wallet][contractAddress]) {
		delete tokens[wallet];
		saveData('tokens', JSON.stringify(tokens));
		return true;
	}

	return false;
}

export async function sendToken(
	walletAddress: string,
	privateKey: string,
	tokenAmount: number,
	recipientAddress: string,
	contractAddress: string = 'CSPR',
	network: 'testnet' | 'mainnet' = 'testnet',
	note: string = '',
	tokenTicker: string = 'CSPR',
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
	console.log({
		'Wallet Address': walletAddress,
		'Private Key': privateKey,
		Amount: tokenAmount,
		Recipient: recipientAddress,
		'Contract Address': contractAddress,
		Network: network,
		Note: note,
	});
	if (contractAddress === 'CSPR') {
		// Create unique tx ID to track it once its returned

		const requestObj = {
			id: Math.random().toString(16).slice(2),
			senderWallet:
				// '01cfbe76f5e1b7fd042714d4583e578f47675414efd9c1f8105256cea243f0ab35' ||
				walletAddress,
			senderPrivateKey:
				// 'MC4CAQAwBQYDK2VwBCIEIFvkdWUFtcpt2yOrbWk+v1fHf0y3Ca3+idJYXGkPKV+y' ||
				privateKey,
			recipientWallet:
				// '01cfbe76f5e1b7fd042714d4583e578f47675414efd9c1f8105256cea243f0ab35' ||
				recipientAddress,
			amount: tokenAmount,
			network: get(user)?.network || 'testnet', // use testnet just in case the user makes a mistake
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

		window.api.send('sendCSPRTokens', JSON.stringify(requestObj));

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

	const tokenUSDValue = (await getTokenValue(fromContractAddress)).price;
	tokenObject.tokenAmountHeld = tokenUSDValue * tokenObject.tokenAmountHeld;

	const toTokenUSDValue = (await getTokenValue(toContractAddress)).price;
	toTokenObject.tokenAmountHeld = toTokenUSDValue * toTokenObject.tokenAmountHeld;

	tokens[wallet][fromContractAddress] = tokenObject;
	tokens[wallet][toContractAddress] = toTokenObject;

	saveData('tokens', JSON.stringify(tokens));

	return true;
}

export async function getTokenValue(
	contractAddress: string,
): Promise<{ price: number; price_change: number }> {
	return await getTokenUsdPrice(contractAddress);
}

export function createToken(
	wallet: string,
	tokenName: string,
	tokenTicker: string,
	contractString: string,
	USDPrice: number,
	limitedSupply: boolean,
	mintableSupply: boolean,
	shareToken: boolean,
): boolean {
	const contractAddress = 'abc';

	// @ts-ignore
	const tokens = JSON.parse(retrieveData('tokens')) ?? {};

	const token = {
		tokenName,
		tokenTicker,
		tokenAmountHeld: 0,
		tokenAmountHeldUSD: 0,
		limitedSupply,
		mintableSupply,
		shareToken,
		contractString,
		tokenPriceUSD: USDPrice,
		decimalsOfPrecision: 16,
		contractAddress: contractAddress,
	} as IToken;

	if (!tokens[wallet]) tokens[wallet] = {};
	tokens[wallet][contractAddress] = token;

	saveData('tokens', JSON.stringify(tokens));

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
