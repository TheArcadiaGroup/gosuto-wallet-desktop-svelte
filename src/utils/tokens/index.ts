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
		price_change: 0,
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
		// const casperTotalSupply = casperInformation.data.market_data.total_supply;
		// const casperCirculatingSupply =
		//   casperInformation.data.market_data.circulating_supply;
		// const casperPriceChangePercentage24h =
		const casperPriceChangePercentage24h = (casperInformation.data.market_data as any)
			.price_change_percentage_24h;

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
			price_change: 0,
		};
	}
};

export const loadTokenBalance = async (token: IToken, publicKey: string) => {
	// CSPR Is loaded from the wallet not as a token - its the main global token
	if (token.tokenTicker !== 'CSPR') {
		tokenLoaders.update((_loader) => {
			_loader[token.tokenTicker] = new Date();
			return _loader;
		});

		// TODO Improve This to Match which token is being loaded
		window.api.send(
			'tokenBalance',
			JSON.stringify({
				token: token.tokenTicker,
				contractHash: token.contractHash,
				publicKey: publicKey,
				network: get(user)?.network || 'testnet',
			}),
		);
	}
};

export const receiveTokenBalance = async () => {
	window.api.receive('tokenBalanceResponse', async (data: any) => {
		// If its not the current user's data, discard it
		if (get(selectedWallet)?.publicKey.toLowerCase() === data.publicKey.toLowerCase()) {
			const dbTokens = retrieveData('tokens');
			const userTokens: IToken[] = dbTokens[data.publicKey][get(user)?.network ?? 'testnet'];

			userTokens.map((token) => {
				if (token.tokenTicker === data.token) {
					token.tokenAmountHeld = +data.balance;
					// TODO: SET TOKEN USD BALANCE
				}
				return token;
			});

			saveData('tokens', dbTokens);

			// Only Update the token balances we wish as opposed to resetting everything
			tokens.update((_tokens) => {
				_tokens[get(user)?.network ?? 'testnet'].map((token) => {
					if (token.contractHash === data.contractHash) {
						token.tokenAmountHeld = +data.balance;
						// TODO: SET TOKEN USD BALANCE
					}
					return token;
				});
				return _tokens;
			});
		}

		tokenLoaders.update((_loader) => {
			_loader[data.token] = null;
			return _loader;
		});
	});
};
