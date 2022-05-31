import axios from 'axios';
import { CasperClient } from 'casper-js-sdk';
import { ethers } from 'ethers';
import { getEndpointByNetwork } from './casper';
import { retrieveData, saveData } from './dataStorage';
import { getCSPRUsdPrice } from './tokens';

const consumeHistoryData = async (
	historyResponse: TransferHistory,
	publicKey: string,
	accountHash: string,
	page = 1,
	network: 'mainnet' | 'testnet' = 'testnet',
	walletName = '',
) => {
	// Parse history response - transfer history
	const returnedHistory: HistoryResponse = {
		data: [],
		total: 0,
		page: 0,
		pageCount: 0,
		lastFetch: {
			transfersCount: 0,
			deploysCount: 0,
		},
	};

	returnedHistory.total = historyResponse.itemCount;
	returnedHistory.page = page;
	returnedHistory.pageCount = historyResponse.pageCount;

	await Promise.all(
		historyResponse.data.map(async (item) => {
			const casperClient = new CasperClient(getEndpointByNetwork(network));
			const deployResult = await casperClient.getDeploy(item.deployHash);
			const deploySession = deployResult[1].deploy.session;
			const txFee = +ethers.utils.formatUnits(
				deployResult[1].execution_results[0].result.Success?.cost.toString() ?? '1000000000',
				9,
			);

			// from txs
			const amount =
				(deploySession as any)['Transfer']?.args[0][1].parsed ||
				(deploySession as any)['ModuleBytes']?.args[1][1].parsed ||
				(deploySession as any)['StoredContractByHash']?.args[2][1].parsed;

			// TODO Improve checks here
			let method: TxType = 'send';
			let validator: null | string = null;

			let fromAccount = deployResult[0].header.account
				.toAccountHashStr()
				.replace('account-hash-', '');

			let toAccount = '';

			if ((deploySession as any)['Transfer'] || (deploySession as any)['ModuleBytes']) {
				// Check for send or receive
				if (fromAccount.toLowerCase() === accountHash.toLowerCase()) {
					method = 'send';

					if ((deploySession as any)['Transfer']) {
						if ((deploySession as any)['Transfer']?.args[1][0] === 'target') {
							// if its the current account, then its a receive transaction
							toAccount = (deploySession as any)['Transfer']?.args[1][1].parsed;
						}
					}

					if ((deploySession as any)['ModuleBytes']) {
						if ((deploySession as any)['ModuleBytes']?.args[1][0] === 'target') {
							// if its the current account, then its a receive transaction
							toAccount = (deploySession as any)['ModuleBytes']?.args[1][1].parsed;

							if (
								toAccount.toLowerCase() === accountHash.toLowerCase() ||
								toAccount.toLowerCase() === publicKey.toLowerCase()
							) {
								method = 'receive';
							}
						}
					}
				} else {
					method = 'receive';
					toAccount = accountHash;
				}
			} else if ((deploySession as any)['StoredContractByHash']) {
				// Check for delegate or undelegate
				validator =
					(deploySession as any)['StoredContractByHash']?.args[1][0] === 'validator'
						? (deploySession as any)['StoredContractByHash']?.args[1][1].parsed
						: null;
				if ((deploySession as any)['StoredContractByHash']?.entry_point === 'delegate') {
					method = 'stake';
					toAccount = validator!;
					fromAccount = accountHash;
				}
				if ((deploySession as any)['StoredContractByHash']?.entry_point === 'undelegate') {
					method = 'unstake';
					toAccount = accountHash;
					fromAccount = validator!;
				}
			}

			returnedHistory.data.push({
				accountHash: accountHash,
				transactionType: method,
				recipient: toAccount,
				sender: fromAccount,
				amount: +ethers.utils.formatUnits(amount, 9),
				deployHash: item.deployHash,
				blockHash: item.blockHash,
				transactionDate: new Date(item.timestamp),
				transactionFee: txFee,
				validator,
				error: item.errorMessage ?? null,
				swap: null,
				stake: null,
				walletName,
			});

			return item;
		}),
	);

	return returnedHistory;
};

export const getSingleAccountHistory = async (
	accountHash: string,
	publicKey: string,
	network: 'mainnet' | 'testnet' = 'testnet',
	page = 1,
	limit = 20,
	walletName = '',
) => {
	let cachedHistory: { [key: string]: HistoryResponse } = retrieveData('history');

	const deployRes = (await axios.get(
		`https://event-store-api-clarity-${network}.make.services/accounts/${publicKey}/deploys?page=${page}&limit=${limit}`,
	)) as { data: TransferHistory };
	const transferRes = (await axios.get(
		`https://event-store-api-clarity-${network}.make.services/accounts/${accountHash}/transfers?page=${page}&limit=${limit}`,
	)) as { data: TransferHistory };

	getCSPRUsdPrice();

	const combinedArr = [
		...deployRes.data.data,
		...transferRes.data.data.filter(
			(item) => !deployRes.data.data.find((dItem) => dItem.deployHash === item.deployHash),
		),
	];
	const dataToParse = {
		...deployRes.data,
		data: combinedArr,
		pageCount: Math.max(deployRes.data.pageCount, transferRes.data.pageCount),
		total: Math.max(deployRes.data.itemCount, transferRes.data.itemCount),
		page,
		lastFetch: {
			transfersCount: transferRes.data.itemCount,
			deploysCount: deployRes.data.itemCount,
		},
	};

	// If the page counts are similar, the user has not done any new transactions, otherwise, we only fetch the new ones - that is, since the transactions and deploys are sorted from new ones first, we find the difference and fetch those then merge them with what we have on cache/local storage.
	if (cachedHistory) {
		if (cachedHistory[accountHash]) {
			// If data hasn't changed since the last time it was added
			if (
				cachedHistory[accountHash].lastFetch.transfersCount >=
					dataToParse.lastFetch.transfersCount &&
				cachedHistory[accountHash].lastFetch.deploysCount >= dataToParse.lastFetch.deploysCount &&
				cachedHistory[accountHash].page >= page
			) {
				return cachedHistory[accountHash];
			}
		}
	}

	// Initialize the cached history for the account
	if (!cachedHistory || !cachedHistory[accountHash]) {
		if (!cachedHistory) {
			cachedHistory = {};
		}

		cachedHistory[accountHash] = {
			pageCount: Math.max(deployRes.data.pageCount, transferRes.data.pageCount),
			total: Math.max(deployRes.data.itemCount, transferRes.data.itemCount),
			page,
			data: [],
			lastFetch: {
				transfersCount: transferRes.data.itemCount,
				deploysCount: deployRes.data.itemCount,
			},
		};
	}

	// Remove items that are already cached
	dataToParse.data.filter(
		(item) =>
			!cachedHistory[accountHash].data.some(({ deployHash }) => item.deployHash === deployHash),
	);
	// Code only runs when data does not match up - we need to prevent this function from being called if not necessary, so we only need to call it when necessary or for the items that need it
	const response = await consumeHistoryData(
		dataToParse,
		publicKey,
		accountHash,
		page,
		network,
		walletName,
	);

	// Add the items that have just been filtered and added in
	cachedHistory[accountHash] = {
		pageCount: Math.max(deployRes.data.pageCount, transferRes.data.pageCount),
		total: Math.max(deployRes.data.itemCount, transferRes.data.itemCount),
		page,
		lastFetch: {
			transfersCount: transferRes.data.itemCount,
			deploysCount: deployRes.data.itemCount,
		},
		data: [...cachedHistory[accountHash].data, ...response.data],
	};

	cachedHistory[accountHash].data = cachedHistory[accountHash].data.sort(
		(a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime(),
	);

	cachedHistory[accountHash].total = Math.max(
		cachedHistory[accountHash].total,
		cachedHistory[accountHash].data.length,
	);

	// Update the history cache
	saveData('history', JSON.stringify(cachedHistory));

	return cachedHistory[accountHash];
};
