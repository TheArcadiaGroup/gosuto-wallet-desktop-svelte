import { mintingTokens } from '$stores/user/tokens';
import { getEndpointByNetwork } from '$utils/casper';
import { retrieveData, saveData } from '$utils/dataStorage';
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
};
