const apiUrl3 = 'http://34.66.154.252:7777/rpc';
const apiUrl2 = 'http://52.70.214.247:7777/rpc';
const apiUrl1 = 'http://mainnet.gosuto.io:7777/rpc';

const apiUrl = async () => {
	let api = '';
	for (let i = 0; i < Array(3).length; i++) {
		try {
			if (i === 0) {
				await fetch(apiUrl1)
					.then((res) => res.json())
					.then(() => {
						api = apiUrl1;
					})
					.catch((err) => {
						throw err;
					});
				if (api.trim()) {
					break;
				}
			} else if (i === 1) {
				await fetch(apiUrl2)
					.then((res) => res.json())
					.then(() => {
						api = apiUrl2;
					})
					.catch((err) => {
						throw err;
					});
				if (api.trim()) {
					break;
				}
			} else if (i === 2) {
				await fetch(apiUrl3)
					.then((res) => res.json())
					.then(() => {
						api = apiUrl3;
					})
					.catch((err) => {
						throw err;
					});
				if (api.trim()) {
					break;
				}
			}
		} catch (_err) {
			console.log(`RPC url${i + 1} Not Working`);
			continue;
		}
	}

	return api;
};

// todo: BETTER ERROR HANDLING

export const CasperService = async () => {
	// delay calling CasperServiceByJsonRPC when not in the window object
	const casperService = new window.CasperSDK.CasperServiceByJsonRPC(await apiUrl());
	return casperService;
};

export const CasperClient = async () => {
	// delay calling CasperServiceByJsonRPC when not in the window object
	const casperClient = new window.CasperSDK.CasperClient(await apiUrl());
	return casperClient;
};
