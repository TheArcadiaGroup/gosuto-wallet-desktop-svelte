import { historyLoading, userHistory } from '$stores/user/history';
import axios from 'axios';
import { CasperClient } from 'casper-js-sdk';
import { ethers } from 'ethers';
import { getEndpointByNetwork } from './casper';
import { retrieveData, saveData } from './dataStorage';
import { getCSPRUsdPrice } from './tokens';

const consumeHistoryData = async (
	historyResponse: {
		data: {
			account: string;
			cost: string;
			errorMessage: string | null;
			status: string;
			deployHash: string;
			blockHash: string;
			timestamp: string;
		}[];
		pageCount: number;
		total: number;
		page: number;
		lastFetch: {
			transfersCount: number;
			deploysCount: number;
		};
	},
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

	returnedHistory.total = historyResponse.total;
	returnedHistory.page = page;
	returnedHistory.pageCount = historyResponse.pageCount;

	await Promise.all(
		historyResponse.data.map(async (item) => {
			const casperClient = new CasperClient(getEndpointByNetwork(network));
			const deployResult = await casperClient.getDeploy(item.deployHash);
			const deploySession = deployResult[1].deploy.session;
			const txFee = +ethers.utils.formatUnits(
				deployResult[1].execution_results[0].result.Success?.cost ??
					deployResult[1].execution_results[0].result.Failure?.cost ??
					'0',
				9,
			);

			const entry_point = (deploySession as any)['StoredContractByHash']?.entry_point;

			// from txs
			const amount =
				(deploySession as any)['Transfer']?.args.filter(
					(item: any) => item[0] === 'amount',
				)?.[0]?.[1]?.parsed ??
				(deploySession as any)['ModuleBytes']?.args.filter(
					(item: any) => item[0] === 'amount',
				)?.[0]?.[1]?.parsed ??
				(entry_point === 'delegate' || entry_point === 'undelegate'
					? (deploySession as any)['StoredContractByHash']?.args[2][1].parsed
					: '0');

			// TODO Improve checks here
			let method: TxType = 'send';
			let validatorPublicKey: null | string = null;

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
				if (entry_point === 'delegate') {
					validatorPublicKey =
						(deploySession as any)['StoredContractByHash']?.args[1][0] === 'validator'
							? (deploySession as any)['StoredContractByHash']?.args[1][1].parsed
							: null;
					method = 'stake';
					toAccount = validatorPublicKey!;
					fromAccount = accountHash;
				} else if (entry_point === 'undelegate') {
					validatorPublicKey =
						(deploySession as any)['StoredContractByHash']?.args[1][0] === 'validator'
							? (deploySession as any)['StoredContractByHash']?.args[1][1].parsed
							: null;
					method = 'unstake';
					toAccount = accountHash;
					fromAccount = validatorPublicKey!;
				} else {
					method = 'contract_call';
					toAccount = (deploySession as any)['StoredContractByHash'].hash;
					fromAccount = accountHash;
				}
			}

			returnedHistory.data.push({
				accountHash: accountHash,
				transactionType: method,
				recipient: toAccount,
				sender: fromAccount,
				amount: +ethers.utils.formatUnits(amount ?? '0', 9),
				deployHash: item.deployHash,
				blockHash: item.blockHash,
				transactionDate: new Date(item.timestamp),
				transactionFee: txFee,
				validatorPublicKey,
				error: item.errorMessage ?? null,
				swap: null,
				stake: null,
				contract_call: method === 'contract_call' ? entry_point : null,
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
	walletName = '',
) => {
	const limit = 100;
	let cachedHistory: {
		mainnet: { [key: string]: HistoryResponse };
		testnet: { [key: string]: HistoryResponse };
	} = retrieveData('history');

	// Return cached history first if any is present, then continue loading up the rest
	// We are returning the entire history for all accounts just in case we are on the all history page
	//  This also ensures accessing the history items is the same for the store and return value, that is historyItems[accountPublicKey]
	if (cachedHistory && cachedHistory[network]) {
		if (cachedHistory[network][publicKey]) {
			// If data hasn't changed since the last time it was added
			userHistory.set(cachedHistory);
		}
	}

	// Initialize Cache when its not present
	if (!cachedHistory) {
		cachedHistory = {
			mainnet: {},
			testnet: {},
		};
	}

	if (!cachedHistory[network]) {
		cachedHistory = {
			...cachedHistory,
			[network]: {},
		};
	}

	if (!cachedHistory[network][publicKey]) {
		// values are initialized to -1 to prevent clashes in checks below
		cachedHistory[network][publicKey] = {
			data: [],
			total: -1,
			page: -1,
			pageCount: -1,
			lastFetch: {
				transfersCount: -1,
				deploysCount: -1,
			},
		};
	}

	/*
		Master Loop Starts Here
		- This loop calls the api's several times until it reaches a point whereby the first item is no longer the most recent item
		- the most recent item in the history will always be the first item in the cached history
		- if cached history is null, then we do need to fetch everything
	*/
	let fetchedTxItems: TransferHistory['data'] = [];
	let fetchedDeployItems: TransferHistory['data'] = [];

	// We have to do two initial calls to the apis to find out how many pages there are

	const trialDeployRes = (await axios.get(
		`https://event-store-api-clarity-${network}.make.services/accounts/${publicKey}/deploys?page=1&limit=${limit}`,
	)) as { data: TransferHistory };
	const trialTransferRes = (await axios.get(
		`https://event-store-api-clarity-${network}.make.services/accounts/${accountHash}/transfers?page=1&limit=${limit}`,
	)) as { data: TransferHistory };

	const txPages = trialTransferRes.data.pageCount;
	const txTotal = trialTransferRes.data.itemCount;
	const deployPages = trialDeployRes.data.pageCount;
	const deployTotal = trialDeployRes.data.itemCount;

	// Fetch all items for both
	for (let i = 0; i < txPages; i++) {
		let page = i;

		// Number of items should be at least the minimum items on either transfers or deploys

		if (
			cachedHistory[network][publicKey].lastFetch.transfersCount === txTotal &&
			cachedHistory[network][publicKey].data.length >= Math.min(txTotal, deployTotal)
		) {
			break;
		}

		// Also called when the history has not been fetched the first time
		if (
			cachedHistory[network][publicKey].data.length < Math.min(txTotal, deployTotal) ||
			!cachedHistory[network][publicKey] ||
			cachedHistory[network][publicKey]?.lastFetch.transfersCount !== txTotal
		) {
			historyLoading.set(true);

			const transferRes = (await axios.get(
				`https://event-store-api-clarity-${network}.make.services/accounts/${accountHash}/transfers?page=${page}&limit=${limit}`,
			)) as { data: TransferHistory };
			fetchedTxItems = [...fetchedTxItems, ...transferRes.data.data];
			if (txPages === 1 || page === txPages) {
				cachedHistory[network][publicKey].lastFetch.transfersCount = txTotal;
			}
		} else {
			break;
		}
	}

	for (let i = 0; i < deployPages; i++) {
		let page = i;

		if (
			cachedHistory[network][publicKey].lastFetch.deploysCount === deployTotal &&
			cachedHistory[network][publicKey].data.length >= Math.min(txTotal, deployTotal)
		) {
			break;
		}

		// Also called when the history has not been fetched the first time
		if (
			cachedHistory[network][publicKey].data.length < Math.min(txTotal, deployTotal) ||
			cachedHistory[network][publicKey]?.lastFetch.deploysCount !== deployTotal ||
			!cachedHistory[network][publicKey]
		) {
			historyLoading.set(true);

			const deployRes = (await axios.get(
				`https://event-store-api-clarity-${network}.make.services/accounts/${publicKey}/deploys?page=${page}&limit=${limit}`,
			)) as { data: TransferHistory };

			fetchedDeployItems = [...fetchedDeployItems, ...deployRes.data.data];

			if (deployPages === 1 || page === deployPages) {
				cachedHistory[network][publicKey].lastFetch.deploysCount = deployTotal;
			}
		} else {
			break;
		}
	}

	getCSPRUsdPrice();

	// Combine the two arrays
	// when there is no deploy matching the transfer, then its added to the array
	const combinedArr = [
		...fetchedDeployItems,
		...fetchedTxItems.filter(
			(item) => !fetchedDeployItems.some((dItem) => dItem.deployHash === item.deployHash),
		),
	];

	const dataToParse = {
		data: combinedArr,
		pageCount: Math.ceil(combinedArr.length / 100),
		total: combinedArr.length,
		page: 1,
		lastFetch: {
			transfersCount: cachedHistory[network][publicKey].lastFetch.transfersCount,
			deploysCount: cachedHistory[network][publicKey].lastFetch.deploysCount,
		},
	};

	// Remove items that are already cached
	dataToParse.data.filter(
		(item) =>
			!cachedHistory[network][publicKey].data.some(
				({ deployHash }) => item.deployHash === deployHash,
			),
	);

	if (dataToParse.data.length > 0) {
		// Code only runs when data does not match up - we need to prevent this function from being called if not necessary, so we only need to call it when necessary or for the items that need it
		const response = await consumeHistoryData(
			dataToParse,
			publicKey,
			accountHash,
			dataToParse.page,
			network,
			walletName,
		);

		// Add the items that have just been filtered and added in
		cachedHistory[network][publicKey] = {
			pageCount: Math.ceil(combinedArr.length / 100),
			total: combinedArr.length,
			page: dataToParse.page,
			lastFetch: {
				transfersCount: cachedHistory[network][publicKey].lastFetch.transfersCount,
				deploysCount: cachedHistory[network][publicKey].lastFetch.deploysCount,
			},
			data: response.data, // this is all history so it can be safely returned here
		};

		cachedHistory[network][publicKey].data = cachedHistory[network][publicKey].data.sort(
			(a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime(),
		);
	}

	// Update the history cache
	saveData('history', cachedHistory);
	userHistory.set(cachedHistory);
	historyLoading.set(false);
};
