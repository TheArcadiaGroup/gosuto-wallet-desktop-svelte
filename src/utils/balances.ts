import { user } from '$stores/user';
import { ethers } from 'ethers';
import { get } from 'svelte/store';
import { getEndpointByNetwork } from './casper';
import { retrieveData } from './dataStorage';
import { parseBalanceResponse } from './responseParsers/accBalance';
import { tokenLoaders, walletLoaders } from '$stores/dataLoaders';

export const getBalance = async (
	accountHash: string,
	publicKey: string,
	network: 'testnet' | 'mainnet' = 'testnet',
) => {
	const { CasperClient, CasperServiceByJsonRPC, CLPublicKey } = window.CasperSDK;

	try {
		// TODO - FIX MOST RECENT BLOCK INFORMATION BUG
		const casperService = new CasperServiceByJsonRPC(getEndpointByNetwork(network));

		const latestBlock = await casperService.getLatestBlockInfo();

		if (latestBlock && latestBlock?.block) {
			const root = await casperService.getStateRootHash(latestBlock.block.hash);

			const balanceUref = await casperService.getAccountBalanceUrefByPublicKey(
				root,
				CLPublicKey.fromHex(publicKey),
			);

			//account balance from the last block
			const balanceBigNumber = await casperService.getAccountBalance(
				latestBlock.block.header.state_root_hash,
				balanceUref,
			);

			const actualBalance = ethers.utils.formatUnits(balanceBigNumber, 9);

			return actualBalance;
		} else {
			// This ensures we can jump to the casper client and use it to get the balance
			throw 'Block Not Found';
		}
	} catch (error) {
		const casperClient = new CasperClient(getEndpointByNetwork(network));

		return await casperClient
			.balanceOfByAccountHash(accountHash)
			.then((balanceBigNumber) => {
				const actualBalance = ethers.utils.formatUnits(balanceBigNumber, 9);

				return actualBalance;
			})
			.catch((_err) => {
				return '0';
			});
	}
};

export const getCsprBalance = (publicKey: string) => {
	// Due to issues when trying to load balances from the publicKey as opposed to the accountHash, we need to get the account hash instead. However, we have another issue which is code readability and trying to update everything to use the accountHash as opposed to the public key (publicKey). However, we need it so we will use it.

	const wallets: IWallet[] = retrieveData('wallets');

	const wallet = wallets.find(
		(wallet) => wallet.publicKey.toLowerCase() === publicKey.toLowerCase(),
	);

	if (wallet) {
		// window.api.send(
		// 	'accountCsprBalance',
		// 	JSON.stringify({
		// 		token: 'CSPR',
		// 		accountHash: wallet.accountHash,
		// 		publicKey: publicKey,
		// 		network: get(user)?.network || 'testnet',
		// 	}),
		// );
		const network = get(user)?.network || 'testnet';
		getBalance(wallet.accountHash, publicKey, network)
			.then((balance) => {
				parseBalanceResponse(
					JSON.stringify({
						token: 'CSPR',
						publicKey: publicKey,
						accountHash: wallet.accountHash,
						balance: balance,
						network: network,
					}),
				);
			})
			.catch((err) => err)
			.finally(() => {
				walletLoaders.update((_loader) => {
					_loader[publicKey] = null;
					return _loader;
				});

				tokenLoaders.update((_loader) => {
					_loader['CSPR'] = null;
					return _loader;
				});
			});
	}
};
