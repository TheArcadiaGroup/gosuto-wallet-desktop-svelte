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

	const tokenUSDValue = getTokenValue(contractAddress);
	tokenObject.tokenAmountHeld = tokenUSDValue * tokenObject.tokenAmountHeld;

	localStorage.setItem('tokens:' + wallet + ':' + contractAddress, JSON.stringify(tokenObject));

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
	const token = localStorage.getItem('tokens:' + wallet + ':' + fromContractAddress);
	const toToken = localStorage.getItem('tokens:' + wallet + ':' + toContractAddress);

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

	localStorage.setItem('tokens:' + wallet + ':' + fromContractAddress, JSON.stringify(tokenObject));
	localStorage.setItem('tokens:' + wallet + ':' + toContractAddress, JSON.stringify(toTokenObject));

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
		tokenPriceUSD: USDPrice,
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
