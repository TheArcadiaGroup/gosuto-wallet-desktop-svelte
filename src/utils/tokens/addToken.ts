import { getEndpointByNetwork } from '$utils/casper';
import { retrieveData } from '$utils/dataStorage';
import { CasperClient } from 'casper-js-sdk';
import { contractSimpleGetter } from 'casper-js-client-helper/dist/helpers/lib';
import { ethers } from 'ethers';

export const checkIfTokenIsSupported = async (
	contractHash: string,
	network: 'testnet' | 'mainnet',
) => {
	try {
		const casperClient = new CasperClient(getEndpointByNetwork(network));
		// Check contract keys
		const namedKeys =
			(
				await casperClient.nodeClient.getBlockState(
					await casperClient.nodeClient.getStateRootHash(),
					`hash-${contractHash}`,
					[],
				)
			).Contract?.namedKeys.map((item) => item.name) ?? [];
		// required keys - name*, symbol, decimals, balances, allowances, total_supply*

		console.log(namedKeys);

		if (namedKeys.length < 5) {
			return false;
		}

		if (
			namedKeys.includes('name') &&
			namedKeys.includes('symbol') &&
			namedKeys.includes('decimals') &&
			namedKeys.includes('balances') &&
			namedKeys.includes('allowances')
		) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		// Enter a valid contract address
		return false;
	}
};

export const getTokenNamedKeyValue = async (
	contractHash: string,
	key: string,
	network: 'testnet' | 'mainnet',
) => {
	return await contractSimpleGetter(getEndpointByNetwork(network), contractHash, [key]);
};

export const addTokenGivenContractHash = async (
	contractHash: string,
	decimals: number,
	shareToken: boolean,
	publicKey: string,
	tokenTicker: string | null,
	network: 'testnet' | 'mainnet' = 'testnet',
	preferContractDetails: boolean = true,
) => {
	if (!(await checkIfTokenIsSupported(contractHash, network))) {
		return {
			data: null,
			error:
				'Please make sure your token has at least one of the following keys: symbol, decimals, balances, allowances',
		};
	}

	// Add token to page and fetch details from Casper to Confirm the one's entered
	const dbTokens: DBTokens = retrieveData('tokens');
	if (!dbTokens[publicKey][network].find((item) => item.contractHash === contractHash)) {
		// Get token data
		decimals = !preferContractDetails
			? decimals
			: +ethers.utils.formatUnits(
					await getTokenNamedKeyValue(contractHash, 'decimals', network),
					0,
			  );
		tokenTicker = !preferContractDetails
			? tokenTicker
			: await getTokenNamedKeyValue(contractHash, 'symbol', network);
		const tokenName = await getTokenNamedKeyValue(contractHash, 'name', network);

		console.log({
			tokenName: tokenName,
			tokenTicker: tokenTicker as string,
			tokenAmountHeld: 0,
			tokenAmountHeldUSD: 0,
			shareToken: shareToken,
			contractHash: contractHash,
			tokenPriceUSD: 0,
			decimals: decimals as number,
		});
		// dbTokens[publicKey][network].push({
		//     tokenName: tokenName,
		//     tokenTicker: tokenTicker as string,
		//     tokenAmountHeld: 0,
		//     tokenAmountHeldUSD: 0,
		//     shareToken: shareToken,
		//     contractHash: contractHash,
		//     tokenPriceUSD: 0,
		//     decimals: decimals as number
		// })

		return { data: 'Successfully Added Token', error: null };
	} else {
		return { data: null, error: 'Token Already Exists' };
	}
};
