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

export const prepWalletBeforeSaving = (wallet: IWallet) => {
	if (wallet && !wallet.walletPassword.isEncrypted) {
		wallet.walletPassword = {
			password: encryptPassword(wallet.walletPassword.password),
			isEncrypted: true,
		};
	}
	return wallet;
};

export const prepWalletBeforeLoading = (wallet: IWallet) => {
	if (wallet && typeof wallet.walletPassword === 'string') {
		wallet.walletPassword = {
			isEncrypted: false,
			password: decryptPassword(wallet.walletPassword),
		};
	}

	if (wallet && !wallet.walletPassword.isEncrypted) {
		wallet.walletPassword = {
			password: encryptPassword(wallet.walletPassword.password),
			isEncrypted: true,
		};
	}
	return wallet;
};

export const saveData = (key: string, data: any) => {
	// localStorage.setItem(key, JSON.stringify(data));
	if (key === 'selectedWallet') {
		data = prepWalletBeforeSaving(data as IWallet);
	}

	if (key === 'wallets') {
		data = data.map((item: IWallet) => prepWalletBeforeSaving(item));
	}

	window.api.send(
		'saveData',
		JSON.stringify({
			key: key,
			data: data,
		}),
	);
	return true;
};

export const retrieveData = (key: string) => {
	try {
		// const data = JSON.parse(localStorage.getItem(key)!);
		let data = window.api.sendSync('retrieveData', key);

		if (key === 'selectedWallet') {
			data = prepWalletBeforeLoading(data as IWallet);
		}

		if (key === 'wallets') {
			data = data.map((item: IWallet) => prepWalletBeforeLoading(item));
		}

		return data;
	} catch (_err) {
		return null;
	}
};
