export const getCsprBalance = async (walletAddress: string) => {
	window.api.send(
		'accountTokenBalance',
		JSON.stringify({ token: 'CSPR', walletAddress: walletAddress }),
	);
};
