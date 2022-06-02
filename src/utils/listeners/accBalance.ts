import { tokenLoaders, walletLoaders } from '$stores/dataLoaders';
import { user } from '$stores/user';
import { wallets, selectedWallet } from '$stores/user/wallets';
import { getUserDelegatedAmount } from '$utils/casper';
import { saveData } from '$utils/dataStorage';
import { getCSPRUsdPrice } from '$utils/tokens';
import { get } from 'svelte/store';

export default function () {
	window.api.receive('accountCsprBalanceResponse', async (data: any) => {
		const csprPrice = await getCSPRUsdPrice();
		data = JSON.parse(data);

		// Only show results or parse them if the user is still on the same network, otherwise we'll have inaccurate balances
		if (data.network === get(user)?.network) {
			// TODO make this asynchronous and not to wait for the wallet info to load
			const stakingData = await getUserDelegatedAmount(
				data.walletAddress,
				data.network,
				data.accountHash,
			);

			const _wallets = get(wallets).map((wallet) => {
				if (wallet.walletAddress === data.walletAddress) {
					wallet.availableBalanceUSD =
						+data.balance * csprPrice.price[get(user)?.currency || 'usd'];
					wallet.availableBalance = +data.balance ?? 0; // returned as string
					wallet.unclaimedRewards = stakingData.unclaimedRewards;
					wallet.stakedBalance = stakingData.stakedAmount;
				}
				return wallet;
			});
			wallets.set(_wallets);

			const thisWallet = get(selectedWallet);
			if (thisWallet && thisWallet.walletAddress === data.walletAddress) {
				thisWallet.availableBalanceUSD =
					+data.balance * csprPrice.price[get(user)?.currency || 'usd'];
				thisWallet.availableBalance = +data.balance ?? 0; // returned as string

				thisWallet.unclaimedRewards = stakingData.unclaimedRewards;
				thisWallet.stakedBalance = stakingData.stakedAmount;
				selectedWallet.set(thisWallet);
				saveData('selectedProfile', JSON.stringify(thisWallet));
			}

			tokenLoaders.update((_loader) => {
				_loader['CSPR'] = null;
				return _loader;
			});

			walletLoaders.update((_loader) => {
				_loader[data.walletAddress] = null;
				return _loader;
			});
		}

		return +data;
	});
}
