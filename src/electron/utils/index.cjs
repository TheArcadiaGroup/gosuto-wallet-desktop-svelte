const { CasperClient, CasperServiceByJsonRPC } = require('casper-js-sdk');
const { mainnetApiUrl, testnetApiUrl } = require('../constants/index.cjs');

//Create Casper client and service to interact with Casper node.

module.exports = {
	getCasperClientAndService: (network = 'testnet') => {
		const casperService = new CasperServiceByJsonRPC(
			network === 'mainnet' ? mainnetApiUrl : testnetApiUrl,
		);

		const casperClient = new CasperClient(network === 'mainnet' ? mainnetApiUrl : testnetApiUrl);

		return { casperService, casperClient };
	},
};
