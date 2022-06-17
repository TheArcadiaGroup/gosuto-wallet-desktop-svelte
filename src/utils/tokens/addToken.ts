import { getEndpointByNetwork } from '$utils/casper';
import { retrieveData, saveData } from '$utils/dataStorage';
import { CasperClient } from 'casper-js-sdk';
import { pollyFillTokens } from '$utils/pollyfillData';
import { contractSimpleGetter } from 'casper-js-client-helper/dist/helpers/lib';
import { addingTokens } from '$stores/user/tokens';

export const addTokenGivenContractHash = async (
	contractHash: string,
	decimals: number,
	shareToken: boolean,
	publicKey: string,
	tokenTicker: string | null,
	network: 'testnet' | 'mainnet' = 'testnet',
	preferContractDetails: boolean = true,
) => {
	const dbTokens: DBTokens = retrieveData('tokens');
	if (!dbTokens[publicKey][network].find((item) => item.contractHash === contractHash)) {
		const txId = Math.random().toString(16).slice(2);

		addingTokens.update((tokensAdding) => {
			tokensAdding[txId] = {
				result: false,
				error: null,
			};

			return tokensAdding;
		});

		window.api.send(
			'getErc20TokenDetails',
			JSON.stringify({
				id: txId,
				contractHash,
				network,
				decimals,
				publicKey,
				tokenTicker,
				preferContractDetails,
				shareToken,
			}),
		);

		return { data: 'Successfully Added Token', error: null };
	} else {
		return { data: null, error: 'Token Already Exists' };
	}
};
