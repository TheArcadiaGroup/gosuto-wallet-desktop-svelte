export interface IToken {
	tokenName: string;
	tokenTicker: string;
	tokenAmountHeld: number;
	tokenAmountHeldUSD: number;
	limitedSupply: boolean;
	mintableSupply: boolean;
	contractString: string;
	contractAddress: string;
	tokenPrice: number;
	decimalsOfPrecision: number;
}

export function addToken(wallet: string, token: IToken): boolean {
	localStorage.setItem('tokens:' + wallet + ':' + token.contractAddress, JSON.stringify(token));

	return true;
}

export function deleteToken(wallet: string, contractAddress: string): boolean {
	if (localStorage.getItem('tokens:' + wallet + ':' + contractAddress)) {
		localStorage.removeItem('tokens:' + wallet + ':' + contractAddress);
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
	const token = localStorage.getItem('tokens:' + wallet + ':' + contractAddress);

	if (!token) return false;

	const tokenObject = JSON.parse(token) as IToken;

	if (tokenObject.tokenAmountHeld < tokenAmount) return false;

	tokenObject.tokenAmountHeld -= tokenAmount;

	// TODO: recalculate tokenAmountHeldUSD
	const tokenUSDValue = getTokenValue(contractAddress);
	tokenObject.tokenAmountHeld = tokenUSDValue * tokenObject.tokenAmountHeld;

	localStorage.setItem('tokens:' + wallet + ':' + contractAddress, JSON.stringify(tokenAmount));

	// send token to a wallet & add it to history

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
): boolean {
	const contractAddress = 'abc';

	const token = {
		tokenName,
		tokenTicker,
		tokenAmountHeld: 0,
		tokenAmountHeldUSD: 0,
		limitedSupply,
		mintableSupply,
		contractString,
		tokenPrice: USDPrice,
		decimalsOfPrecision: 16,
		contractAddress: contractAddress,
	} as IToken;

	localStorage.setItem('tokens:' + wallet + ':' + contractAddress, JSON.stringify(token));

	return true;
}

export function importToken(
	wallet: string,
	contractAddress: string,
	tokenTicker: string,
	decimals: number,
): boolean {
	return true;
}
