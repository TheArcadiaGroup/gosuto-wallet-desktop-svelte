import { retrieveData, saveData } from './dataStorage';

export function getAllTokens(): IToken[] {
	// @ts-ignore
	const wallets: any = JSON.parse(retrieveData('tokens')) ?? {};
	const allTokens: IToken[] = [];

	if (!wallets) return [];

	for (const wallet of Object.values(wallets)) {
		for (const token of Object.values(wallet))
			if (!allTokens.includes(token)) allTokens.push(token);
	}

	return allTokens;
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

export function sendToken(
	wallet: string,
	contractAddress: string,
	tokenAmount: number,
	recipientAddress: string,
	network: string,
	note?: string,
): boolean {
	const tokens: any = retrieveData('tokens');

	const token = JSON.parse(tokens)?.[wallet]?.[contractAddress] ?? undefined;

	if (!token) return false;

	const tokenObject = token as IToken;

	if (tokenObject.tokenAmountHeld < tokenAmount) return false;

	tokenObject.tokenAmountHeld -= tokenAmount;

	const tokenUSDValue = getTokenValue(contractAddress);
	tokenObject.tokenAmountHeld = tokenUSDValue * tokenObject.tokenAmountHeld;

	tokens[wallet][contractAddress] = tokenObject;

	saveData('tokens', JSON.stringify(tokens));

	// send token to a wallet & add it to history

	return true;
}

export function swapToken(
	wallet: string,
	fromContractAddress: string,
	fromAmount: number,
	toContractAddress: string,
	toAmount: number,
): boolean {
	const tokens: any = retrieveData('tokens');

	const token = JSON.parse(tokens)?.[wallet]?.[fromContractAddress] ?? undefined;
	const toToken = JSON.parse(tokens)?.[wallet]?.[toContractAddress] ?? undefined;

	if (!token || !toToken) return false;

	const tokenObject = JSON.parse(token) as IToken;
	const toTokenObject = JSON.parse(toToken) as IToken;

	if (tokenObject.tokenAmountHeld < fromAmount) return false;

	tokenObject.tokenAmountHeld -= fromAmount;
	toTokenObject.tokenAmountHeld += toAmount;

	const tokenUSDValue = getTokenValue(fromContractAddress);
	tokenObject.tokenAmountHeld = tokenUSDValue * tokenObject.tokenAmountHeld;

	const toTokenUSDValue = getTokenValue(toContractAddress);
	toTokenObject.tokenAmountHeld = toTokenUSDValue * toTokenObject.tokenAmountHeld;

	tokens[wallet][fromContractAddress] = tokenObject;
	tokens[wallet][toContractAddress] = toTokenObject;

	saveData('tokens', JSON.stringify(tokens));

	//saveData('tokens:' + wallet + ':' + fromContractAddress, JSON.stringify(tokenObject));
	//saveData('tokens:' + wallet + ':' + toContractAddress, JSON.stringify(toTokenObject));

	return true;
}

export function getTokenValue(contractAddress: string): number {
	return Math.floor(Math.random() * 123456) / 10000;
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
