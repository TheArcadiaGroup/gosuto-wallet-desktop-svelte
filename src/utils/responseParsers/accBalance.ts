import { tokenLoaders, walletLoaders, walletStakingBalances } from '$stores/dataLoaders';
import { csprPrice } from '$stores/tokens';
import { user } from '$stores/user';
import { wallets, selectedWallet } from '$stores/user/wallets';
import { getUserDelegatedAmount } from '$utils/casper';
import { saveData } from '$utils/dataStorage';
import { getCSPRUsdPrice } from '$utils/tokens';
import { get } from 'svelte/store';

const parseStakingData = (publicKey: string, network: 'testnet' | 'mainnet' = 'testnet') => {
	walletStakingBalances.update((_loader) => {
		_loader[publicKey] = new Date();
		return _loader;
	});
	getUserDelegatedAmount(publicKey, network)
		.then((stakingData) => {
			const _wallets = get(wallets).map((wallet) => {
				if (wallet.publicKey === publicKey) {
					wallet.unclaimedRewards[get(user)?.network ?? 'testnet'] = stakingData.unclaimedRewards;
					wallet.stakedBalance[get(user)?.network ?? 'testnet'] = stakingData.stakedAmount;
					wallet.stakingRewards[get(user)?.network ?? 'testnet'] = stakingData.stakingRewards;
				}
				return wallet;
			});
			wallets.set(_wallets);

			const thisWallet = get(selectedWallet);
			if (thisWallet && thisWallet.publicKey === publicKey) {
				thisWallet.unclaimedRewards[get(user)?.network ?? 'testnet'] = stakingData.unclaimedRewards;
				thisWallet.stakedBalance[get(user)?.network ?? 'testnet'] = stakingData.stakedAmount;
				thisWallet.stakingRewards[get(user)?.network ?? 'testnet'] = stakingData.stakingRewards;
				selectedWallet.set(thisWallet);
				saveData('selectedWallet', thisWallet);
			}
		})
		.catch((error) => console.log(error))
		.finally(() => {
			walletStakingBalances.update((_loader) => {
				_loader[publicKey] = null;
				return _loader;
			});
		});
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
		parseStakingData(data.publicKey, data.network);

		const _wallets = get(wallets).map((wallet) => {
			if (wallet.publicKey === data.publicKey) {
				wallet.availableBalanceUSD[get(user)?.network ?? 'testnet'] =
					+data.balance * csprPrice.price[get(user)?.currency || 'usd'];
				wallet.availableBalance[get(user)?.network ?? 'testnet'] = +data.balance ?? 0; // returned as string
			}
			return wallet;
		});

		wallets.set(_wallets);
		saveData('wallets', _wallets);

		const thisWallet = get(selectedWallet);
		if (thisWallet && thisWallet.publicKey === data.publicKey) {
			thisWallet.availableBalanceUSD[get(user)?.network ?? 'testnet'] =
				+data.balance * csprPrice.price[get(user)?.currency || 'usd'];
			thisWallet.availableBalance[get(user)?.network ?? 'testnet'] = +data.balance ?? 0; // returned as string
			selectedWallet.set(thisWallet);
			saveData('selectedWallet', thisWallet);
		}

		tokenLoaders.update((_loader) => {
			_loader['CSPR'] = null;
			return _loader;
		});

		walletLoaders.update((_loader) => {
			_loader[data.publicKey] = null;
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
