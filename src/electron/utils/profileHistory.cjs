const axios = require('axios');

module.exports = {
	getTransferHistory: async ({ accountHash, network = 'testnet', page = 1, limit = 10 }) => {
		/**
		 * accountHash: account hash
		 * page: number of page
		 * limit: size of page
		 */
		let res = await axios.get(
			`https://event-store-api-clarity-${network}.make.services/accounts/${accountHash}/transfers?page=${page}&limit=${limit}`,
		);

		return res.data;
		/**
		 * Return data type
		 * {
			"data": [
					{
							"transferId": "1645471218404",
							"deployHash": "622c989fbca6e6041050d705980257c1207189a4ab4842d6a3847dff3f56c5f7",
							"blockHash": "febb0ee9e474aee90c49dd95d71db9cd43f7c49e9c89c6badc3f47f8b7683e5f",
							"sourcePurse": "uref-68413a99bdcf40c249c680dfdefb205f732cab789978b7bf4ef6f8a6165ada66-007",
							"targetPurse": "uref-cf76bf4a873d82181eb8f18a52cdfa651bcc44133f8a151b60a894f2f378034f-004",
							"amount": "2500000000",
							"fromAccount": "34b0394b11dc3ecb1bf6f26c9754aa2e9f38d7bec33003374b4b3fac8566c258",
							"toAccount": "a3e43d6224734448496738a31c27b942a1b41b7470de8eac2a0f7b1ddd609ba7",
							"timestamp": "2022-02-21T19:22:07.000Z"
					}
			],
			"pageCount": 1,
			"itemCount": 2,
			"pages": []
		}
		 */
	},
};
