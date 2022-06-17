import { addingTokens, mintingTokens } from '$stores/user/tokens';
import { getEndpointByNetwork } from '$utils/casper';
import { retrieveData, saveData } from '$utils/dataStorage';
import { pollyFillTokens } from '$utils/pollyfillData';
import { addTokenGivenContractHash } from '$utils/tokens/addToken';
import { addTokenTxToBeTracked } from '$utils/tokens/createToken';
import { CasperClient } from 'casper-js-sdk';

export const parseTokenCreationHash = async (
	deployHash: string,
	shareToken: boolean,
	publicKey: string,
	network: 'testnet' | 'mainnet',
) => {
	try {
		const casperClient = new CasperClient(getEndpointByNetwork(network));
		const deploy = await casperClient.getDeploy(deployHash);

		if (deploy[1].execution_results?.[0]?.result) {
			if (deploy[1].execution_results[0].result.Failure) {
				// Tx Failed
				// if (get(mintingToken)) {
				// 	mintingToken.set(false);
				// }
			} else if (deploy[1].execution_results[0].result.Success) {
				// TX Suceeded

				// Add this contract hash to db - but confirm the contract is correct first
				// console.log(
				// 	(deploy[1].execution_results[0].result.Success as any)?.effect.transforms
				// 		.find((item: any) => item.transform === 'WriteContract')
				// 		?.key.replace('hash-', ''),
				// );

				addTokenGivenContractHash(
					(deploy[1].execution_results[0].result.Success as any)?.effect.transforms
						.find((item: any) => item.transform === 'WriteContract')
						?.key.replace('hash-', ''),
					0,
					shareToken,
					publicKey,
					'',
					network,
					true,
				);
			}

			// Update db for any tokens that haven't been added yet but now have
			let createdNotAddedTokens = retrieveData('token_mints') ?? [];
			createdNotAddedTokens = createdNotAddedTokens.filter(
				(item: any) => item.deployHash !== deployHash,
			);
			saveData('token_mints', createdNotAddedTokens);
		} else {
			// Tx Has to continue waiting for result - save the tx was last checked just in case we need to cancel checks for deploys that fail
			addTokenTxToBeTracked(deployHash, publicKey, shareToken, network);
		}
	} catch (error) {
		addTokenTxToBeTracked(deployHash, publicKey, shareToken, network);
		return;
	}
};

export default () => {
	window.api.receive('deployErc20ContractResponse', async (response: string) => {
		try {
			const res = JSON.parse(response);

			//  Update the user here with complete response
			if (res.id) {
				mintingTokens.update((tokensMinting) => {
					Object.keys(tokensMinting).map((key) => {
						if (key === res.id) {
							tokensMinting[key].result = true;
							tokensMinting[key].error = res.error
								? 'We Encountered an Error Performing That Request.'
								: null;
						}
					});

					return tokensMinting;
				});
			}

			parseTokenCreationHash(res.data, res.share_token, res.public_key, res.network);
		} catch (error) {
			console.log(error);

			return;
		}
	});

	window.api.receive('getErc20TokenDetailsResponse', async (response: string) => {
		try {
			const res: {
				data: {
					id: string;
					contractHash: string;
					decimals: number;
					shareToken: boolean;
					publicKey: string;
					tokenTicker: string;
					network: 'testnet' | 'mainnet';
					preferContractDetails: boolean;
					tokenName: string;
				};
				error: any | null;
			} = JSON.parse(response);

			if (res.data.id) {
				addingTokens.update((tokensAdding) => {
					Object.keys(tokensAdding).map((key) => {
						if (key === res.data.id) {
							tokensAdding[key].result = true;
							tokensAdding[key].error = res.error
								? 'We Encountered an Error Performing That Request.'
								: null;
						}
					});

					return tokensAdding;
				});
			}

			if (res.error) {
				return {
					data: null,
					error: res.error,
				};
			}

			res.data.decimals = !res.data.preferContractDetails ? res.data.decimals : res.data.decimals;
			res.data.tokenTicker = !res.data.preferContractDetails
				? res.data.tokenTicker
				: res.data.tokenTicker;
			const tokenName = res.data.tokenName;

			const dbTokens: DBTokens = retrieveData('tokens');
			// Get token data
			if (res.data.shareToken) {
				// Loop through every wallet addding this token
				Object.keys(dbTokens).map((key) => {
					if (
						!dbTokens[key][res.data.network].find(
							(item) => item.contractHash === res.data.contractHash,
						)
					) {
						dbTokens[key][res.data.network].push({
							tokenName: tokenName,
							tokenTicker: res.data.tokenTicker,
							tokenAmountHeld: 0,
							tokenAmountHeldUSD: 0,
							shareToken: res.data.shareToken,
							contractHash: res.data.contractHash,
							tokenPriceUSD: 0,
							decimals: res.data.decimals,
						});
					}
				});
			} else {
				// Add to the current wallet only
				dbTokens[res.data.publicKey][res.data.network].push({
					tokenName: tokenName,
					tokenTicker: res.data.tokenTicker,
					tokenAmountHeld: 0,
					tokenAmountHeldUSD: 0,
					shareToken: res.data.shareToken,
					contractHash: res.data.contractHash,
					tokenPriceUSD: 0,
					decimals: res.data.decimals,
				});
			}

			saveData('tokens', dbTokens);
			pollyFillTokens();
		} catch (error) {}
	});
};
