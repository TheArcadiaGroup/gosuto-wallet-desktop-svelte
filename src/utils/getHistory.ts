import axios from 'axios';
import { CasperClient } from 'casper-js-sdk';
import { ethers } from 'ethers';
import { getCSPRUsdPrice } from './tokens';

const consumeHistoryData = async (
	historyResponse: TransferHistory,
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

			const method: TxStatus =
				(deploySession as any)['StoredContractByHash']?.entry_point === 'delegate'
					? 'stake'
					: item.fromAccount.toLowerCase() === accountHash.toLowerCase()
					? 'send'
					: 'receive';
			const validator =
				(deploySession as any)['StoredContractByHash']?.args[1][0] === 'validator'
					? (deploySession as any)['StoredContractByHash']?.args[1][1].parsed
					: null;

			returnedHistory.data.push({
				accountHash: accountHash,
				transactionType: method,
				recipient: item.toAccount,
				sender: item.fromAccount,
				amount: +ethers.utils.formatUnits(item.amount, 9),
				deployHash: item.deployHash,
				blockHash: item.blockHash,
				transactionDate: new Date(item.timestamp),
				transactionFee: txFee,
				validator,
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
	network: 'mainnet' | 'testnet' = 'testnet',
	page = 1,
	limit = 10,
) => {
	const res = (await axios.get(
		`https://event-store-api-clarity-${network}.make.services/accounts/${accountHash}/transfers?page=${page}&limit=${limit}`,
	)) as { data: TransferHistory };

	getCSPRUsdPrice();

	const response = await consumeHistoryData(res.data, accountHash, page, network);
	response.data = response.data.sort(
		(a, b) => b.transactionDate.getTime() - a.transactionDate.getTime(),
	);

	return response;
};
