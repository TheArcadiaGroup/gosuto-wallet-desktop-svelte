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
	tokenAmount: string,
	tokenDecimals: number,
	recipientPublicKey: string,
	contractHash: string = 'CSPR',
	network: 'testnet' | 'mainnet' = 'testnet',
	_note: string = '',
	tokenTicker: string = 'CSPR',
	algorithm: 'secp256k1' | 'ed25519' = 'ed25519',
	ledgerTx: { accountIndex: number } | null,
): Promise<void | {
	id: string;
	senderWallet: any;
	senderPrivateKey: any;
	recipientPublicKey: any;
	amount: any;
	network: 'mainnet' | 'testnet';
	error: null;
	fulfilled: boolean;
}> {
	const requestObj = {
		// Create unique tx ID to track it once its returned
		id: Math.random().toString(16).slice(2),
		senderWallet: publicKey,
		senderPrivateKey: privateKey,
		recipientPublicKey: recipientPublicKey,
		amount: tokenAmount,
		network: network, // use testnet just in case the user makes a mistake
		contractHash: contractHash,
		algorithm: algorithm,
		tokenDecimals: tokenDecimals,
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

	if (contractHash === 'CSPR') {
		// window.api.send('sendCSPRTokens', JSON.stringify(requestObj));
		if (ledgerTx) {
			window.api.send(
				'ledger',
				JSON.stringify({
					action: 'SendCsprUsingLedger',
					fromPublicKey: publicKey,
					ledgerAccountIndex: ledgerTx.accountIndex,
					toPublicKey: recipientPublicKey,
					amount: tokenAmount,
					network,
					id: requestObj.id,
				}),
			);
		} else {
			sendCspr(publicKey, privateKey, recipientPublicKey, tokenAmount, network, algorithm)
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
		}

		return { ...requestObj, error: null, fulfilled: false };
	} else {
		requestObj.senderPrivateKey = !isNaN(+requestObj.senderPrivateKey)
			? requestObj.senderPrivateKey
			: decryptPrvKey(requestObj.senderPrivateKey.toString());
		window.api.send('sendErc20Tokens', JSON.stringify(requestObj));
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
	price_change: {
		usd: number;
		eur: number;
		jpy: number;
	};
}> {
	return await getTokenUsdPrice(contractAddress);
}
