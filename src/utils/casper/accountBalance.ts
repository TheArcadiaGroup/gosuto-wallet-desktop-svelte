import { getCSPRUsdPrice } from '$utils/tokens';
import { CasperService } from '.';

export const accountCsprBalance = async (walletAddress: string) => {
	const publicKey = walletAddress;
	try {
		console.log(publicKey);
		const casperService = await CasperService();
		console.log(casperService);
		const latestBlock = await casperService.getLatestBlockInfo();
		console.log('last block', latestBlock);
		const root = await casperService.getStateRootHash(latestBlock.block.hash);

		const balanceUref = await casperService.getAccountBalanceUrefByPublicKey(
			root,
			window.CasperSDK.CLPublicKey.fromHex(publicKey),
		);

		//account balance from the last block
		const balance = await casperService.getAccountBalance(
			latestBlock.block.header.state_root_hash,
			balanceUref,
		);

		const currentPriceInUsd = await getCSPRUsdPrice();

		return {
			balance: balance.toString(),
			balanceInUsd: currentPriceInUsd * balance,
			tokenPriceInUsd: currentPriceInUsd,
		};
	} catch (error) {
		console.log(error);
		const currentPriceInUsd = await getCSPRUsdPrice();

		return {
			balance: 0,
			balanceInUsd: 0,
			tokenPriceInUsd: currentPriceInUsd,
		};
	}
};
