/*
- Data to store
- user
- wallets
- selectedWallet or wallet
- history (mapped object)
- stake information
- tokens

*/

export const saveData = (key: string, data: string) => {
	localStorage.setItem(key, data);
	return true;
};

export const retrieveData = (key: string) => {
	try {
		const data = JSON.parse(localStorage.getItem(key)!);
		return data;
	} catch (_err) {
		return null;
	}
};
