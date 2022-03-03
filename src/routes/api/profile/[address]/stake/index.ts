//DEV
const wallet = {
	name: 'wallet-1',
	publicKey: '0x9f98e01d2fn89hc9cgqc24ed7',
};
let stakeArray: IStake[] = Array(10).fill({
	parentWallet: wallet.name,
	stakeAmount: 420,
	unstakeDatetime: new Date(2021, 11, 17),
	unstakeCountdown: Math.abs(new Date(2020, 12, 17) - new Date(2019, 11, 17)),
	reclamationDate: new Date(2020, 12, 17),
	initialStakeDate: new Date(2019, 11, 17),
	rewardDate: new Date(2022, 11, 17),
	rewardCountdown: Math.abs(new Date(2022, 11, 17) - new Date(2019, 11, 17)),
	reward: 420,
	unlocked: 84,
	stakePercent: 0.8,
	parentWalletAddress: wallet.publicKey,
});
stakeArray.push({
	parentWallet: 'wallet-2',
	stakeAmount: 420,
	unstakeDatetime: new Date(2021, 11, 17),
	unstakeCountdown: Math.abs(new Date(2020, 12, 17) - new Date(2019, 11, 17)),
	reclamationDate: new Date(2020, 12, 17),
	initialStakeDate: new Date(2019, 11, 17),
	rewardDate: new Date(2022, 11, 17),
	rewardCountdown: Math.abs(new Date(2022, 11, 17) - new Date(2019, 11, 17)),
	reward: 420,
	unlocked: 84,
	stakePercent: 0.8,
	parentWalletAddress: wallet.publicKey,
});

export async function post(query): Promise<any> {
	let address = await query.body;
	let transactions = stakeArray;
	//dev//
	let data = transactions.filter((transaction) => transaction.parentWallet == address);
	return {
		status: 200,
		body: JSON.stringify(data),
	};
}
