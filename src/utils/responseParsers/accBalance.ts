import { tokenLoaders, walletLoaders } from '$stores/dataLoaders';
import { csprPrice } from '$stores/tokens';
import { user } from '$stores/user';
import { wallets, selectedWallet } from '$stores/user/wallets';
import { getUserDelegatedAmount } from '$utils/casper';
import { saveData } from '$utils/dataStorage';
import { getCSPRUsdPrice } from '$utils/tokens';
import { get } from 'svelte/store';

const parseStakingData = (walletAddress: string, network: 'testnet' | 'mainnet' = 'testnet') => {
	getUserDelegatedAmount(walletAddress, network)
		.then((stakingData) => {
			const _wallets = get(wallets).map((wallet) => {
				if (wallet.walletAddress === walletAddress) {
					wallet.unclaimedRewards = stakingData.unclaimedRewards;
					wallet.stakedBalance = stakingData.stakedAmount;
				}
				return wallet;
			});
			wallets.set(_wallets);

			const thisWallet = get(selectedWallet);
			if (thisWallet && thisWallet.walletAddress === walletAddress) {
				thisWallet.unclaimedRewards = stakingData.unclaimedRewards;
				thisWallet.stakedBalance = stakingData.stakedAmount;
				selectedWallet.set(thisWallet);
				saveData('selectedWallet', JSON.stringify(thisWallet));
			}
		})
		.catch((error) => console.log(error));
};

const parseWalletDataGivenPrice = (
	response: any,
	csprPrice: {
		price: {
			usd: number;
			eur: number;
			jpy: number;
		};
		price_change: any;
	},
) => {
	const data = JSON.parse(response);

	// Only show results or parse them if the user is still on the same network, otherwise we'll have inaccurate balances
	if (data.network === get(user)?.network) {
		// TODO make this asynchronous and not to wait for the wallet info to load
		// This can be set individually to each wallet that its related to separately
		parseStakingData(data.walletAddress, data.network);

		const _wallets = get(wallets).map((wallet) => {
			if (wallet.walletAddress === data.walletAddress) {
				wallet.availableBalanceUSD = +data.balance * csprPrice.price[get(user)?.currency || 'usd'];
				wallet.availableBalance = +data.balance ?? 0; // returned as string
			}
			return wallet;
		});

		wallets.set(_wallets);
		saveData('wallets', JSON.stringify(_wallets));

		const thisWallet = get(selectedWallet);
		if (thisWallet && thisWallet.walletAddress === data.walletAddress) {
			thisWallet.availableBalanceUSD =
				+data.balance * csprPrice.price[get(user)?.currency || 'usd'];
			thisWallet.availableBalance = +data.balance ?? 0; // returned as string
			selectedWallet.set(thisWallet);
			saveData('selectedWallet', JSON.stringify(thisWallet));
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
};

export const parseBalanceResponse = (response: any) => {
	getCSPRUsdPrice()
		.then((csprPrice) => {
			parseWalletDataGivenPrice(response, csprPrice);
		})
		.catch((err) => {
			console.log(err);
			parseWalletDataGivenPrice(response, {
				price: get(csprPrice).price,
				price_change: get(csprPrice).price_change,
			});
		});
};

export default function () {
	// window.api.receive('accountCsprBalanceResponse', (response: any) => {
	// 	parseBalanceResponse(response);
	// });
}
