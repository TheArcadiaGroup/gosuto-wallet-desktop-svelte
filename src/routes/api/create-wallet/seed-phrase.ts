/** Handles a request with wallet data from the wallet creation process and returns a wallet  */
export async function post(params: any): Promise<any> {
	const walletData: WalletCreationData = await JSON.parse(params.body);

	if (
		walletData.walletName &&
		walletData.password &&
		walletData.walletAddress &&
		walletData.seedPhrase.length > 0 &&
		walletData.accountHash &&
		walletData.privateKey
	) {
		const newProfile: IWallet = {
			walletName: walletData.walletName,
			walletPassword: walletData.password,
			walletImage: '',
			seedPhrase: walletData.seedPhrase.split(' '),
			availableBalanceUSD: 0.0,
			stakedBalance: 0.0,
			unclaimedRewards: 0.0,
			walletTokens: [],
			walletStakes: [],
			walletHistory: [],
			//random test address
			walletAddress: walletData.walletAddress,
			accountHash: walletData.accountHash,
			privateKey: walletData.privateKey,
		};

		return {
			status: 200,
			body: JSON.stringify(newProfile),
		};
	} else {
		return {
			status: 200,
			body: JSON.stringify(null),
		};
	}
}
