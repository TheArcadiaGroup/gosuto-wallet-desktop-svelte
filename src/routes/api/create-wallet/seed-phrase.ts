/** Handles a request with wallet data from the import wallet
 *  from seed phrase process and returns a created wallet  */
export async function post(params: any): Promise<any> {
	const walletData: WalletCreationData = await JSON.parse(params.body);

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
		walletAddress: (Math.random() + 1).toString(36).substring(7),
	};

	return {
		status: 200,
		body: JSON.stringify(newProfile),
	};
}
