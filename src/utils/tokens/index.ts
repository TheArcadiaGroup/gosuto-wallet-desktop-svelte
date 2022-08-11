import { tokenLoaders } from '$stores/dataLoaders';
import { csprPrice } from '$stores/tokens';
import { user } from '$stores/user';
import { tokens } from '$stores/user/tokens';
import { selectedWallet } from '$stores/user/wallets';
import { retrieveData, saveData } from '$utils/dataStorage';
import { get } from 'svelte/store';

// TOKEN - TRANSFORM TO TOKEN SPECIFIC ADDRESS AND MAKE IT DYNAMIC
export const getTokenUsdPrice = async (token: string) => {
	let result = {
		price: {
			usd: 0,
			eur: 0,
			jpy: 0,
		},
		price_change: {
			usd: 0,
			eur: 0,
			jpy: 0,
		},
	};
	switch (token) {
		case 'CSPR':
			result = await getCSPRUsdPrice();
			break;

		default:
			result = await getCSPRUsdPrice();
			break;
	}

	return result;
};

export const getCSPRUsdPrice = async () => {
	try {
		const casperInformation = await new window.CoinGecko().coins.fetch('casper-network', {});

		const price = {
			usd: casperInformation.data.market_data.current_price.usd,
			eur: casperInformation.data.market_data.current_price.eur,
			jpy: casperInformation.data.market_data.current_price.jpy,
		};
		const casperPriceChangePercentage24h = {
			usd: (casperInformation.data.market_data as any).price_change_percentage_24h_in_currency.usd,
			jpy: (casperInformation.data.market_data as any).price_change_percentage_24h_in_currency.jpy,
			eur: (casperInformation.data.market_data as any).price_change_percentage_24h_in_currency.eur,
		};

		csprPrice.set({
			price,
			price_change: casperPriceChangePercentage24h,
		});

		return {
			price,
			price_change: casperPriceChangePercentage24h,
		};
	} catch (error) {
		console.log('getCasperMarketInformation Error : ', error);

		return {
			price: {
				usd: 1,
				eur: 1,
				jpy: 1,
			},
			price_change: {
				usd: 0,
				eur: 0,
				jpy: 0,
			},
		};
	}
};

export const loadTokenBalance = async (token: IToken, publicKey: string) => {
	// CSPR Is loaded from the wallet not as a token - its the main global token
	if (token.contractHash !== 'CSPR' && publicKey === get(selectedWallet)?.publicKey) {
		if (!get(tokenLoaders)[token.contractHash]) {
			tokenLoaders.update((_loader) => {
				_loader[token.contractHash] = new Date();
				return _loader;
			});

			// TODO Improve This to Match which token is being loaded
			window.api.send(
				'erc20TokenBalance',
				JSON.stringify({
					contractHash: token.contractHash,
					publicKey: publicKey,
					network: get(user)?.network || 'testnet',
				}),
			);
		}
	}
};

export const receiveTokenBalance = async () => {
	window.api.receive(
		'erc20TokenBalanceResponse',
		async (data: {
			contractHash: string;
			publicKey: string;
			network: 'testnet' | 'mainnet';
			balance: number;
		}) => {
			// If its not the current user's data, discard it
			if (get(selectedWallet)?.publicKey === data.publicKey) {
				const dbTokens = retrieveData('tokens');

				(dbTokens[data.publicKey][data.network ?? 'testnet'] as IToken[]).map((token) => {
					if (token.contractHash === data.contractHash) {
						token.tokenAmountHeld = +data.balance;
					}
					return token;
				});

				saveData('tokens', dbTokens);

				tokens.set(dbTokens);
			}
			tokenLoaders.update((_loader) => {
				_loader[data.contractHash] = null;
				return _loader;
			});
		},
	);
};
