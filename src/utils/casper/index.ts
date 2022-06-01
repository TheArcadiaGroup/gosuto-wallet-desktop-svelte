import { BalanceServiceByJsonRPC, CasperServiceByJsonRPC, CLPublicKey } from 'casper-js-sdk';
import { ethers } from 'ethers';
import CoinGecko from 'coingecko-api';
import { retrieveData, saveData } from '$utils/dataStorage';
import { selectedWallet, wallets } from '$stores/user/wallets';
import { get } from 'svelte/store';

export const getEndpointByNetwork = (network: 'testnet' | 'mainnet' = 'testnet') => {
	if (network === 'mainnet') {
		return 'http://mainnet.gosuto.io:7777/rpc';
	}
	return 'http://testnet.gosuto.io:7777/rpc';
};

export const getAccountBalance = async (
	publicKey: string,
	latestBlockHash: string,
	network: 'testnet' | 'mainnet' = 'testnet',
) => {
	try {
		const casperService = new CasperServiceByJsonRPC(getEndpointByNetwork(network));
		const balanceService = new BalanceServiceByJsonRPC(casperService);
		const balance = await balanceService.getAccountBalance(
			latestBlockHash,
			CLPublicKey.fromHex(publicKey),
		);

		//   if (Number.isNaN(parseFloat(parseInt(balance) / 1e9))) return 0;
		//   return parseFloat(parseInt(balance) / 1e9);

		return +ethers.utils.formatUnits(balance!, 9);
	} catch (error) {
		return 0;
	}
};

export const getWalletBalancesSum = async (
	publicKeys: string[],
	network: 'testnet' | 'mainnet' = 'testnet',
) => {
	try {
		const latestBlockHash = await getLatestBlockInfo();

		let sum = 0;
		if (latestBlockHash && latestBlockHash.block) {
			for (let index = 0; index < publicKeys.length; index++) {
				try {
					const element = publicKeys[index];
					sum += await getAccountBalance(element, latestBlockHash.block.hash, network);
				} catch (error) {
					console.log('ERROR');
				}
			}
		}
		return sum;
	} catch (error) {}
};

export const getTotalStakedSum = async (
	publicKeys: string[],
	network: 'testnet' | 'mainnet' = 'testnet',
) => {
	try {
		let sum = 0;
		for (let index = 0; index < publicKeys.length; index++) {
			try {
				const element = publicKeys[index];
				const response = await getUserDelegatedAmount(element);
				if (response) {
					sum += response.stakedAmount;
				}
			} catch (error) {}
		}
		return sum;
	} catch (error) {}
};

export const getValidatorWeight = async (
	publicKey: string,
	network: 'testnet' | 'mainnet' = 'testnet',
) => {
	// publicKey = '01b1126cfaf8f6df4209b5f4a88a5e3bb95f912c0307fa3e1d3e89a3946411b021'
	try {
		const eraValidators = (
			await new CasperServiceByJsonRPC(getEndpointByNetwork(network)).getValidatorsInfo()
		).auction_state.era_validators[0].validator_weights;
		for (let index = 0; index < eraValidators.length; index++) {
			const element = eraValidators[index];
			if (element.public_key == publicKey) {
				return +element.weight / 1e9;
			}
		}
		return 0;
	} catch (error) {}
};

export const getValidatorRewards = async (
	publicKey: string,
	network: 'testnet' | 'mainnet' = 'testnet',
) => {
	// publicKey = '01b1126cfaf8f6df4209b5f4a88a5e3bb95f912c0307fa3e1d3e89a3946411b021'

	try {
		let rewardsSum = 0;
		let currentPage = 1;
		let url = `https://event-store-api-clarity-${network}.make.services/validators/${publicKey}/rewards?with_amounts_in_currency_id=1&page=${currentPage}&limit=100`;
		let response = await fetch(url);
		let jsonResponse = await response.json();
		for (let index = 0; index < jsonResponse.data.length; index++) {
			const element = jsonResponse.data[index];
			rewardsSum += element.amount;
		}
		while (jsonResponse.pageCount > currentPage) {
			currentPage++;
			url = `https://event-store-api-clarity-${network}.make.services/validators/${publicKey}/rewards?with_amounts_in_currency_id=1&page=${currentPage}&limit=100`;
			response = await fetch(url);
			jsonResponse = await response.json();
			for (let index = 0; index < jsonResponse.data.length; index++) {
				const element = jsonResponse.data[index];
				rewardsSum += element.amount;
			}
		}
		return rewardsSum / 1e9;
	} catch (error) {}
};

export const getDelegatorRewards = async (
	publicKey: string,
	network: 'testnet' | 'mainnet' = 'testnet',
) => {
	// publicKey = '01b1126cfaf8f6df4209b5f4a88a5e3bb95f912c0307fa3e1d3e89a3946411b021'

	try {
		const startDate = new Date();
		const rewardsSum = 0;
		const currentPage = 1;
		const url = `https://event-store-api-clarity-${network}.make.services/delegators/${publicKey}/total-rewards`;
		const response = await fetch(url);
		const jsonResponse = await response.json();
		return parseFloat(jsonResponse.data) / 1e9;
	} catch (error) {
		console.log('error = ', error);
		return 0;
	}
};

export const getLatestBlockInfo = async (network: 'testnet' | 'mainnet' = 'testnet') => {
	try {
		const casperService = new CasperServiceByJsonRPC(getEndpointByNetwork(network));
		const latestBlock = await casperService.getLatestBlockInfo();
		return latestBlock;
	} catch (error) {
		console.log(`ERROR ${error}`);
	}
};

export const getTotalStaked = async (network: 'testnet' | 'mainnet' = 'testnet') => {
	try {
		const casperService = new CasperServiceByJsonRPC(getEndpointByNetwork(network));
		const validatorsInfo = await casperService.getValidatorsInfo();
		const validatorWeights = validatorsInfo.auction_state.era_validators[0].validator_weights;
		const sumOfWeights = validatorWeights.reduce((accumVariable, current) => {
			return accumVariable + parseInt(current.weight);
		}, 0);
		return sumOfWeights / 1e9;
	} catch (error) {}
};

export const getCasperMarketInformation = async () => {
	try {
		const casperInformation = await new CoinGecko().coins.fetch('casper-network', {});
		const price = casperInformation.data.market_data.current_price.usd;
		const casperTotalSupply = casperInformation.data.market_data.total_supply;
		const casperCirculatingSupply = casperInformation.data.market_data.circulating_supply;
		const casperPriceChangePercentage24h = (casperInformation.data.market_data as any)
			.price_change_percentage_24h_in_currency;
		return {
			price,
			casperTotalSupply,
			casperCirculatingSupply,
			casperPriceChangePercentage24h,
		};
	} catch (error) {
		console.log('getCasperMarketInformation Error : ', error);
	}
};

export const getUserDelegatedAmount = async (
	publicKey: string,
	network: 'testnet' | 'mainnet' = 'testnet',
) => {
	// publicKey = '01b1126cfaf8f6df4209b5f4a88a5e3bb95f912c0307fa3e1d3e89a3946411b021'

	try {
		const casperService = new CasperServiceByJsonRPC(getEndpointByNetwork(network));
		const validatorsInfo = await casperService.getValidatorsInfo();
		const stakingOperations: {
			validator: string;
			delegationRate: number;
			selfStake: number;
			stakedAmount: number;
			validatorWeight: number;
		}[] = [];
		const eraValidators = validatorsInfo.auction_state.era_validators[0];
		const { bids } = validatorsInfo.auction_state;
		let stakedAmount = 0;

		bids.forEach((bid) => {
			const { delegators } = bid.bid;
			// TODO: Since we are only interested in one item (one validator), we can just find that one and leave the rest
			for (let index = 0; index < delegators.length; index++) {
				const delegator = delegators[index];
				if (delegator.public_key == publicKey) {
					console.log(delegator);
					const validatorWeight =
						+eraValidators.validator_weights.filter(
							(validator) => validator.public_key === bid.public_key,
						)[0].weight / 1e9;

					stakingOperations.push({
						validator: bid.public_key,
						delegationRate: bid.bid.delegation_rate,
						selfStake: +bid.bid.staked_amount / 1e9,
						stakedAmount: +delegator.staked_amount / 1e9,
						validatorWeight,
					});
					stakedAmount += +delegator.staked_amount / 1e9;
				}
			}
		});

		const unclaimedRewards = await getDelegatorRewards(publicKey, network);

		// PollyFill Staking Data
		const dbWallets: IWallet[] = retrieveData('wallets') || [];
		// Filter through the wallets finding the wallet we need and add the data to it
		dbWallets.map((wallet) => {
			if (wallet.walletAddress === publicKey) {
				wallet.walletStakes = stakingOperations.map((item) => ({
					validator: item.validator, // validator public key
					walletName: wallet.walletName,
					stakeAmount: item.stakedAmount,
					initialStakeDate: new Date(),
					latestRewardDate: new Date(),
					// difference between rewardDate and initialStakeDate
					rewardCountdown: 100,
					reward: 90,
					// unlocked: number,
					personalStakeWeight: item.stakedAmount / item.validatorWeight, // percentage of user stake on validator
					publicKey: publicKey,
				}));

				if (publicKey === get(selectedWallet)?.walletAddress) {
					const selWallet = get(selectedWallet);
					if (selWallet) {
						selWallet.walletStakes = wallet.walletStakes;
						selectedWallet.update(() => selWallet);
						saveData('selectedProfile', JSON.stringify(selWallet));
					}
				}
			}
			return wallet;
		});

		saveData('wallets', JSON.stringify(dbWallets));

		return { stakedAmount, unclaimedRewards, stakingOperations };
	} catch (error) {
		console.log('error =', error);
		return { stakedAmount: 0, unclaimedRewards: 0, stakingOperations: [] };
	}
};

export const getValidatorByDeploy = async (
	deployHash: string,
	network: 'testnet' | 'mainnet' = 'testnet',
) => {
	let sess = null;
	try {
		const casperService = new CasperServiceByJsonRPC(getEndpointByNetwork(network));
		const deploy = (await casperService.getDeployInfo(deployHash)).deploy;

		const session = deploy.session;
		sess = deploy;
		return (session as any).ModuleBytes
			? (session as any).ModuleBytes?.args[2][1]?.parsed
			: (session as any).StoredContractByHash
			? (session as any).StoredContractByHash?.args[1][1]?.parsed
			: '';
	} catch (error) {
		console.log('error in get validator = ', error, sess);
		return '';
	}
};
