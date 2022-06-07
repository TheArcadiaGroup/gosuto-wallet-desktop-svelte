/*
- Data to store
- user
- wallets
- selectedWallet or wallet
- history (mapped object)
- stake information
- tokens

*/

export const checkIfEncryptionIsAvailable = () => {
	const canEncrypt =
		JSON.parse(
			window.api.sendSync(
				'encryption',
				JSON.stringify({
					method: 'check',
				}),
			),
		)?.data ?? false;

	return canEncrypt;
};

export const encryptPrvKey = (privateKey: string) => {
	if (checkIfEncryptionIsAvailable()) {
		const encryptedPrvkey =
			JSON.parse(
				window.api.sendSync(
					'encryption',
					JSON.stringify({
						method: 'encrypt',
						stringToEncrypt: privateKey,
					}),
				),
			)?.data ?? privateKey;

		return encryptedPrvkey;
	}
	return privateKey;
};

export const encryptPassword = (password: string) => {
	if (checkIfEncryptionIsAvailable()) {
		const encryptedPassword =
			JSON.parse(
				window.api.sendSync(
					'encryption',
					JSON.stringify({
						method: 'encrypt',
						stringToEncrypt: password,
					}),
				),
			)?.data ?? password;

		return encryptedPassword;
	}
	return password;
};

export const decryptPrvKey = (encryptedPrivateKey: string) => {
	if (checkIfEncryptionIsAvailable()) {
		const decryptedPrvkey =
			JSON.parse(
				window.api.sendSync(
					'encryption',
					JSON.stringify({
						method: 'decrypt',
						stringToDecrypt: encryptedPrivateKey,
					}),
				),
			)?.data ?? encryptedPrivateKey;

		return decryptedPrvkey;
	}
	return encryptedPrivateKey;
};

export const decryptPassword = (encryptedPassword: string) => {
	if (checkIfEncryptionIsAvailable()) {
		const decryptedPassword =
			JSON.parse(
				window.api.sendSync(
					'encryption',
					JSON.stringify({
						method: 'decrypt',
						stringToDecrypt: encryptedPassword,
					}),
				),
			)?.data ?? encryptedPassword;

		return decryptedPassword;
	}
	return encryptedPassword;
};

export const saveData = (key: string, data: any) => {
	localStorage.setItem(key, JSON.stringify(data));
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
