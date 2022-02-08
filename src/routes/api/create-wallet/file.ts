/** Handles a request with wallet data from the import wallet file process and returns a wallet  */
export async function post(params: any): Promise<any> {
	const walletData: { walletName: string; walletAdress: string } = await JSON.parse(params.body);

	const newProfile: IWallet = {
		walletName: walletData.walletName,
		walletPassword: '',
		walletImage: '',
		seedPhrase: [],
		availableBalanceUSD: 0.0,
		stakedBalance: 0.0,
		unclaimedRewards: 0.0,
		walletTokens: [[]],
		walletStakes: [[]],
		walletHistory: [[]],
		walletAddress: walletData.walletAdress,
	};

	return {
		status: 200,
		body: JSON.stringify(newProfile),
	};
}
