/** Handles a request with wallet data from the wallet creation process and returns a wallet  */
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
		walletTokens: [[]],
		walletStakes: [[]],
		walletHistory: [[]],
		walletAddress: '',
	};

	return {
		status: 200,
		body: JSON.stringify(newProfile),
	};
}
