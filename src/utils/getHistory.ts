import axios from 'axios';
import { ethers } from 'ethers';

interface TransferHistory {
	pageCount: number;
	itemCount: number;
	pages: {
		number: number;
		url: string; // Specific url route to get this page's data. However, the domain and network is not included
	}[];
	data: {
		transferId: string; // Number in string format
		deployHash: string;
		blockHash: string;
		sourcePurse: string;
		targetPurse: string;
		amount: string; //Number in string format
		fromAccount: string; // Account Hash
		toAccount: string; // Account Hash
		timestamp: string; // ISODate
	}[];
}

const consumeHistoryData = (historyResponse: TransferHistory, accountHash: string, page = 1) => {
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

	historyResponse.data.map((item) => {
		returnedHistory.data.push({
			accountHash: accountHash,
			transactionType:
				item.fromAccount.toLowerCase() === accountHash.toLowerCase() ? 'send' : 'receive',
			recipient: item.toAccount,
			sender: item.fromAccount,
			amount: +ethers.utils.formatUnits(item.amount, 9),
			deployHash: item.deployHash,
			blockHash: item.blockHash,
			transactionDate: new Date(item.timestamp),
			swap: null,
		});

		return item;
	});

	return returnedHistory;
};

export const getSingleAccountHistory = async (
	accountHash: string,
	network = 'testnet',
	page = 1,
	limit = 10,
) => {
	const res = (await axios.get(
		`https://event-store-api-clarity-${network}.make.services/accounts/${accountHash}/transfers?page=${page}&limit=${limit}`,
	)) as { data: TransferHistory };

	const response = consumeHistoryData(res.data, accountHash, page);

	return response;
};
