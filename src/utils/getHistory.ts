import axios from 'axios';
import { CasperClient } from 'casper-js-sdk';
import { ethers } from 'ethers';
import { getCSPRUsdPrice } from './tokens';

const consumeHistoryData = async (
	historyResponse: TransferHistory,
	publicKey: string,
	accountHash: string,
	page = 1,
	network: 'mainnet' | 'testnet' = 'testnet',
) => {
	// Parse history response - transfer history
	const returnedHistory: HistoryResponse = {
		data: [],
		total: 0,
		page: 0,
		pageCount: 0,
	};

	returnedHistory.total = historyResponse.itemCount;
	returnedHistory.page = page;
	returnedHistory.pageCount = historyResponse.pageCount;

	await Promise.all(
		historyResponse.data.map(async (item) => {
			const casperClient = new CasperClient('http://testnet.gosuto.io:7777/rpc');
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
) => {
	const deployRes = (await axios.get(
		`https://event-store-api-clarity-${network}.make.services/accounts/${publicKey}/deploys?page=${page}&limit=${limit}`,
	)) as { data: TransferHistory; pageCount: number; itemCount: number };
	const transferRes = (await axios.get(
		`https://event-store-api-clarity-${network}.make.services/accounts/${accountHash}/transfers?page=${page}&limit=${limit}`,
	)) as { data: TransferHistory; pageCount: number; itemCount: number };

	getCSPRUsdPrice();

	const dataToParse = {
		...deployRes.data,
		data: [
			...deployRes.data.data,
			...transferRes.data.data.filter(
				(item) => !deployRes.data.data.find((dItem) => dItem.deployHash === item.deployHash),
			),
		],
		pageCount: Math.max(deployRes.pageCount, transferRes.pageCount),
	};

	const response = await consumeHistoryData(dataToParse, publicKey, accountHash, page, network);
	response.data = response.data.sort(
		(a, b) => b.transactionDate.getTime() - a.transactionDate.getTime(),
	);

	return response;
};
