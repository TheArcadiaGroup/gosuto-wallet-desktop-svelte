//DEV
const wallet = {
	name: 'wallet-1',
	publicKey: '0x9f98e01d2...4ed7',
};
let stakeArray = Array(10).fill({
	name: wallet?.name,
	elapsedSeconds: 20,
	fullSeconds: 69,
	staked: 420,
	unlocked: 69,
});
stakeArray.push({
	name: 'wallet-2',
	elapsedSeconds: 69,
	fullSeconds: 96,
	staked: 240,
	unlocked: 96,
});

export async function post(query): Promise<any> {
	let address = await query.body;
	let transactions = stakeArray;
	//dev
	let data = transactions.filter((transaction) => transaction.name == address);
	return {
		status: 200,
		body: JSON.stringify(data),
	};
}
