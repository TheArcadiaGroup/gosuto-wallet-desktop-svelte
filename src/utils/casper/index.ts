import { ethers } from 'ethers';
import { retrieveData, saveData } from '$utils/dataStorage';
import { selectedWallet, wallets } from '$stores/user/wallets';
import { get } from 'svelte/store';
import { getValidatorPerformances, getValidatorProfiles } from './validatorData';
import { loadingStakes } from '$stores/user/stake';

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
		const { BalanceServiceByJsonRPC, CasperServiceByJsonRPC, CLPublicKey } = window.CasperSDK;

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

export const getValidatorWeight = async (
	publicKey: string,
	network: 'testnet' | 'mainnet' = 'testnet',
) => {
	// publicKey = '01b1126cfaf8f6df4209b5f4a88a5e3bb95f912c0307fa3e1d3e89a3946411b021'
	const { BalanceServiceByJsonRPC, CasperServiceByJsonRPC, CLPublicKey } = window.CasperSDK;

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
		// const startDate = new Date();
		// const rewardsSum = 0;
		// const currentPage = 1;
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
		const { BalanceServiceByJsonRPC, CasperServiceByJsonRPC, CLPublicKey } = window.CasperSDK;

		const casperService = new CasperServiceByJsonRPC(getEndpointByNetwork(network));
		const latestBlock = await casperService.getLatestBlockInfo();
		return latestBlock;
	} catch (error) {
		console.log(`ERROR ${error}`);
	}
};

export const getTotalStaked = async (network: 'testnet' | 'mainnet' = 'testnet') => {
	try {
		const { BalanceServiceByJsonRPC, CasperServiceByJsonRPC, CLPublicKey } = window.CasperSDK;

		const casperService = new CasperServiceByJsonRPC(getEndpointByNetwork(network));
		const validatorsInfo = await casperService.getValidatorsInfo();
		const validatorWeights = validatorsInfo.auction_state.era_validators[0].validator_weights;
		const sumOfWeights = validatorWeights.reduce((accumVariable, current) => {
			return accumVariable + parseInt(current.weight);
		}, 0);
		return sumOfWeights / 1e9;
	} catch (error) {}
};

export const fetchUserRewards = async (
	publicKey: string,
	network: 'testnet' | 'mainnet' = 'testnet',
	page = 1,
) => {
	return fetch(
		`https://event-store-api-clarity-${network}.make.services/delegators/${publicKey}/rewards?limit=100&page=${page}`,
	)
		.then((res) => res.json())
		.then((response) => {
			// If we have additional pages, fetch each recursively 100 per time adding to the result
			return response as {
				data: {
					eraId: number;
					publicKey: string;
					validatorPublicKey: string;
					amount: string;
					timestamp: string;
				}[];
				pageCount: number;
			};
		})
		.catch((_err) => {
			return null;
		});
};

export const filterUserRewards = async (
	publicKey: string,
	network: 'testnet' | 'mainnet' = 'testnet',
) => {
	try {
		let page = 1;
		const response = await fetchUserRewards(publicKey, network);
		let data = response?.data ?? [];

		if (response) {
			while (response.pageCount > page) {
				if (page === response.pageCount) {
					break;
				}

				const res2 = await fetchUserRewards(publicKey, network);
				if (res2) {
					data = [...data, ...res2.data];
				} else {
					break;
				}
				page += 1;
			}
		}

		const resObject: { [key: string]: { amount: number; lastRewardDate: Date } } = {};

		data.map((item) => {
			if (resObject[item.validatorPublicKey]) {
				resObject[item.validatorPublicKey] = {
					amount: resObject[item.validatorPublicKey].amount + +item.amount,
					lastRewardDate: resObject[item.validatorPublicKey].lastRewardDate,
				};
			} else {
				resObject[item.validatorPublicKey] = {
					amount: +item.amount,
					lastRewardDate: new Date(item.timestamp),
				};
			}
		});

		return resObject;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getNetworkValidators = async (network: 'testnet' | 'mainnet' = 'testnet') => {
	const { CasperServiceByJsonRPC, CLPublicKey } = window.CasperSDK;

	try {
		const casperService = new CasperServiceByJsonRPC(getEndpointByNetwork(network));
		const validatorsInfo = await casperService.getValidatorsInfo();
		// const eraValidators = validatorsInfo.auction_state.era_validators[0];

		// Data appears to be always two blocks behind
		const era = ((await casperService.getLatestBlockInfo()).block?.header.era_id ?? 2) - 2;
		const { bids } = validatorsInfo.auction_state;

		const validators: IValidator[] = [];

		bids.forEach((bid) => {
			// Only show active validators
			if (!(bid.bid as any).inactive) {
				let totalStaked = 0;
				bid.bid.delegators.forEach((item) => {
					totalStaked += +item.staked_amount;
				});

				validators.push({
					delegationRate: bid.bid.delegation_rate / 100 ?? 0, // in percentage
					selfStakeAmount: +bid.bid.staked_amount / 1e9 ?? 0,
					totalStaked: (totalStaked + +bid.bid.staked_amount) / 1e9,
					currentDelegators: bid.bid.delegators.length,
					publicKey: bid.public_key,
					accountHash: CLPublicKey.fromHex(bid.public_key)
						.toAccountHashStr()
						.replace('account-hash-', ''),
					performance: 0,
					profile: null,
				});
			}
		});

		const performances = await getValidatorPerformances(
			validators.map((item) => item.publicKey),
			era,
			network,
		);

		const profiles = await getValidatorProfiles(
			validators.map((item) => item.accountHash),
			network,
		);

		return validators.map((val) => {
			val = {
				...val,
				performance: performances[val.publicKey] ?? 0,
				profile: profiles[val.accountHash] ?? null,
			};

			return val;
		});
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const getUserDelegatedAmount = async (
	publicKey: string,
	network: 'testnet' | 'mainnet' = 'testnet',
) => {
	const { BalanceServiceByJsonRPC, CasperServiceByJsonRPC, CLPublicKey } = window.CasperSDK;

	// publicKey = '01b1126cfaf8f6df4209b5f4a88a5e3bb95f912c0307fa3e1d3e89a3946411b021'
	loadingStakes.set(true);
	try {
		const casperService = new CasperServiceByJsonRPC(getEndpointByNetwork(network));
		const validatorsInfo = await casperService.getValidatorsInfo();
		const stakingOperations: {
			validatorPublicKey: string;
			delegationRate: number;
			selfStake: number;
			stakedAmount: number;
			reward: number;
			latestRewardDate: Date;
			recentStake: Date;
			validatorWeight: number;
		}[] = [];
		const eraValidators = validatorsInfo.auction_state.era_validators[0];
		const { bids } = validatorsInfo.auction_state;
		let stakedAmount = 0;
		let stakingRewards = 0;

		const userRewardsBreakdown = await filterUserRewards(publicKey, network);

		bids.forEach((bid) => {
			const { delegators } = bid.bid;
			// TODO: Since we are only interested in one item (one validator), we can just find that one and leave the rest
			for (let index = 0; index < delegators.length; index++) {
				const delegator = delegators[index];
				if (delegator.public_key == publicKey) {
					const validatorWeight =
						+eraValidators.validator_weights.filter(
							(validator) => validator.public_key === bid.public_key,
						)[0]?.weight / 1e9 ?? 0;

					const history: {
						mainnet: { [key: string]: HistoryResponse };
						testnet: { [key: string]: HistoryResponse };
					} = retrieveData('history');

					const lastStakeTx =
						history?.[network]?.[publicKey]?.data?.find(
							(item) => item.validatorPublicKey === bid.public_key,
						) ?? null;

					stakingOperations.push({
						validatorPublicKey: bid.public_key,
						delegationRate: bid.bid.delegation_rate,
						selfStake: +bid.bid.staked_amount / 1e9,
						stakedAmount: +delegator.staked_amount / 1e9,
						reward: (userRewardsBreakdown?.[bid.public_key]?.amount ?? 0) / 1e9 ?? 0,
						latestRewardDate: userRewardsBreakdown?.[bid.public_key]?.lastRewardDate ?? new Date(),
						recentStake: lastStakeTx?.transactionDate || new Date(),
						validatorWeight,
					});
					stakedAmount += +delegator.staked_amount / 1e9;
					stakingRewards += (userRewardsBreakdown?.[bid.public_key]?.amount ?? 0) / 1e9 ?? 0;
				}
			}
		});

		const unclaimedRewards = await getDelegatorRewards(publicKey, network);

		// PollyFill Staking Data
		const dbWallets: IWallet[] = retrieveData('wallets') || [];
		// Filter through the wallets finding the wallet we need and add the data to it
		dbWallets.map((wallet) => {
			if (wallet.publicKey === publicKey) {
				wallet.walletStakes[network] = stakingOperations.map((item) => ({
					validatorPublicKey: item.validatorPublicKey, // validator public key
					walletName: wallet.walletName,
					stakeAmount: item.stakedAmount,
					initialStakeDate: item.recentStake,
					latestRewardDate: item.latestRewardDate,
					reward: item.reward,
					personalStakeWeight: item.stakedAmount / item.validatorWeight, // percentage of user stake on validator
					publicKey: publicKey,
				}));

				if (publicKey === get(selectedWallet)?.publicKey) {
					const selWallet = get(selectedWallet);
					if (selWallet) {
						selWallet.walletStakes = wallet.walletStakes;
						selectedWallet.update(() => selWallet);
						saveData('selectedWallet', selWallet);
					}
				}
			}
			return wallet;
		});

		saveData('wallets', dbWallets);
		wallets.set(dbWallets);

		return { stakedAmount, unclaimedRewards, stakingOperations, stakingRewards };
	} catch (error) {
		console.log('error =', error);
		return { stakedAmount: 0, unclaimedRewards: 0, stakingOperations: [], stakingRewards: 0 };
	} finally {
		loadingStakes.set(false);
	}
};

export const getValidatorByDeploy = async (
	deployHash: string,
	network: 'testnet' | 'mainnet' = 'testnet',
) => {
	const { CasperServiceByJsonRPC } = window.CasperSDK;

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
