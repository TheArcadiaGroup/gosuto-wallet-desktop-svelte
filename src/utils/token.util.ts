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
	network: string,
	note?: string,
): boolean {
	const token = localStorage.getItem('tokens:' + wallet + ':' + contractAddress);

	if (!token) return false;

	const tokenObject = JSON.parse(token) as IToken;

	if (tokenObject.tokenAmountHeld < tokenAmount) return false;

	tokenObject.tokenAmountHeld -= tokenAmount;

	// TODO: recalculate tokenAmountHeldUSD

	localStorage.setItem('tokens:' + wallet + ':' + contractAddress, JSON.stringify(tokenAmount));

	// send token to a wallet & add it to history

	return true;
}
