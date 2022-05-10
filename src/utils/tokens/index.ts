import { tokenLoaders } from '$stores/dataLoaders';
import { user } from '$stores/user';
import { tokens } from '$stores/user/tokens';
import { selectedWallet } from '$stores/user/wallets';
import { retrieveData, saveData } from '$utils/dataStorage';
import { get } from 'svelte/store';

// TOKEN - TRANSFORM TO TOKEN SPECIFIC ADDRESS AND MAKE IT DYNAMIC
export const getTokenUsdPrice = async (token: string) => {
	let result = {
		price: 0,
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
		const price = casperInformation.data.market_data.current_price.usd;
		// const casperTotalSupply = casperInformation.data.market_data.total_supply;
		// const casperCirculatingSupply =
		//   casperInformation.data.market_data.circulating_supply;
		// const casperPriceChangePercentage24h =
		const casperPriceChangePercentage24h = (casperInformation.data.market_data as any)
			.price_change_percentage_24h;

		return {
			price,
			price_change: casperPriceChangePercentage24h,
		};
	} catch (error) {
		console.log('getCasperMarketInformation Error : ', error);

		return {
			price: 0,
			price_change: 0,
		};
	}
};

export const loadTokenBalance = async (token: IToken, walletAddress: string) => {
	// CSPR Is loaded from the wallet not as a token - its the main global token
	if (token.tokenTicker !== 'CSPR') {
		tokenLoaders.update((_loader) => {
			_loader[token.tokenTicker] = true;
			return _loader;
		});

		// TODO Improve This to Match which token is being loaded
		window.api.send(
			'tokenBalance',
			JSON.stringify({
				token: token.tokenTicker,
				walletAddress: walletAddress,
				network: get(user)?.network || 'testnet',
			}),
		);
	}
};

export const receiveTokenBalance = async () => {
	window.api.receive('tokenBalanceResponse', async (data: any) => {
		// If its not the current user's data, discard it
		if (get(selectedWallet)?.walletAddress.toLowerCase() === data.walletAddress.toLowerCase()) {
			const dbTokens = retrieveData('tokens');
			const userTokens: IToken[] = dbTokens[data.walletAddress.toLowerCase()];

			userTokens.map((token) => {
				if (token.tokenTicker === data.token) {
					token.tokenAmountHeld = +data.balance;
					// TODO: SET TOKEN USD BALANCE
				}
				return token;
			});

			const globalTokens: IToken[] = dbTokens.global;

			globalTokens.map((token) => {
				if (token.tokenTicker === data.token) {
					token.tokenAmountHeld = +data.balance;
					// TODO: SET TOKEN USD BALANCE
				}
				return token;
			});

			dbTokens[data.walletAddress.toLowerCase()] = userTokens;
			dbTokens.global = globalTokens;

			saveData('tokens', dbTokens);

			// Only Update the token balances we wish as opposed to resetting everything
			tokens.update((tokens) => {
				tokens.map((token) => {
					if (token.tokenTicker === data.token) {
						token.tokenAmountHeld = +data.balance;
						// TODO: SET TOKEN USD BALANCE
					}
					return token;
				});
				return tokens;
			});
		}

		tokenLoaders.update((_loader) => {
			_loader[data.token] = false;
			return _loader;
		});
	});
};
