let profileData: IWallet = {
	walletName: '',
	walletPassword: '',
	walletImage: '',
	seedPhrase: [],
	availableBalanceUSD: 0.0,
	stakedBalance: 0.0,
	unclaimedRewards: 0.0,
	walletTokens: [],
	walletStakes: [],
	walletHistory: [],
	walletAddress: '',
};

/** Accepts profile data and saves them */
export async function post(params: any): Promise<any> {
	profileData = await JSON.parse(params.body);

	return {
		status: 200,
	};
}

/** returns profile data */
export async function get(params: any): Promise<any> {
	return {
		status: 200,
		body: JSON.stringify(profileData),
	};
}
