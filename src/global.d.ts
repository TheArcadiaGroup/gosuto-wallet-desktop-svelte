/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="vite/client" />
import type { Moment } from 'moment';

interface ImportMetaEnv {
	readonly VITE_SEND_TX_FEE_PERCENTAGE: string;
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

import CoinGecko from 'coingecko-api';

type dataFunc = (data: string) => void;

declare global {
	interface Window {
		api: {
			receive: (channel: MainReceiveChannels, dataFunc) => void;
			send: (channel: MainSendChannels, data: string) => void;
			sendSync: (channel: MainSendChannels, data?: any) => any;
		};
		// CasperSDK: CasperSDKType;
		CoinGecko: typeof CoinGecko;
		moment: Moment;
	}

	interface infoCategory {
		name: string;
		placeholder: string;
	}

	interface NavIcon {
		id: number;
		active: boolean;
	}

	interface choiceCard {
		id: number;
		header: string;
		description: string;
		route: string;
		isSelected: boolean;
	}

	interface SeedWord {
		id: number;
		word: string;
		isEmpty: boolean;
	}

	interface SwapData {
		fromAmount: number;
		toAmount: number;
		fromPrice: number;
		toPrice: number;
		fromCryptoUnit: string;
		fromPriceUnit: string;
		toCryptoUnit: string;
		toPriceUnit: string;
	}

	interface ChartPrice {
		x: string;
		y: number;
	}

	interface HistoryResponse {
		data: IHistory[];
		total: number;
		page: number;
		pageCount: number;
	}

	interface WalletCreationData {
		walletName: string;
		walletAddress: string;
		accountHash: string;
		privateKey: string;
		seedPhrase: string | null;
		password: string;
	}

	interface IWallet {
		walletName: string;
		walletPassword: string;
		walletImage: string;
		seedPhrase: string[];
		availableBalanceUSD: number;
		availableBalance: number;
		stakedBalance: number;
		unclaimedRewards: number;
		walletTokens: IToken[];
		walletStakes: IStake[];
		walletHistory: IHistory[];
		walletAddress: string;
		accountHash: string;
		privateKey: string;
	}

	interface IToken {
		tokenName: string;
		tokenTicker: string;
		tokenAmountHeld: number;
		tokenAmountHeldUSD: number;
		limitedSupply: boolean;
		mintableSupply: boolean;
		shareToken: boolean;
		contractString: string;
		contractAddress: string;
		tokenPriceUSD: number;
		decimalsOfPrecision: number;
		walletAddress: string;
	}

	type TxStatus =
		| 'send'
		| 'swap'
		| 'receive'
		| 'stake'
		| 'initialStakeUnlock'
		| 'unstake'
		| 'claimReward';

	// TODO: RETHINK THE HISTORY OBJECT GIVEN THE DATA WE ARE GETTING BACK
	interface IHistory {
		transactionType: TxStatus;
		accountHash: string; // Account Hash
		recipient: string;
		sender: string;
		amount: number;
		blockHash: string;
		deployHash: string;
		transactionDate: Date;
		transactionFee: number;

		// Swap History
		swap: SwapData | null;

		// Stake
		stake: IStake | null;
	}

	interface IValidator {
		validatorName: string;
		validatorPosition: number;
		validatorCommission: number;
		delegationReturn: number;
		currentDelegators: number;
		currentStaked: number;
		totalValidators: number;
		validatorHash: string;
	}

	interface IStake {
		parentWallet: string;
		stakeAmount: number;
		unstakeDatetime: Date & { toDate: () => Date };
		//difference between stakeDate and reclamationDate
		unstakeCountdown: number;
		reclamationDate: Date & { toDate: () => Date };
		initialStakeDate: Date & { toDate: () => Date };
		rewardDate: Date & { toDate: () => Date };
		// difference between rewardDate and initialStakeDate
		rewardCountdown: number;
		reward: number;
		unlocked: number;
		stakePercent: number;
		parentWalletAddress: string;
	}

	type SupportedCurrencies = 'usd' | 'jpy' | 'eur';

	interface IUser {
		name: string;
		email: string;
		avatar: string;
		theme: 'dark' | 'light';
		network: 'mainnet' | 'testnet';
		currency: SupportedCurrencies; // defaults to usd
	}

	interface CSPRPrices {
		usd: number;
		jpy: number;
		eur: number;
	}

	interface ProfileSettings {
		walletName: string;
		walletAddress: string;
		publicKey: string;
		privateKey: string;
		currentPassword: string;
	}

	interface GetHistoryResponse {
		data: {
			transferId: string; //'1645471218404';
			deployHash: string; //'622c989fbca6e6041050d705980257c1207189a4ab4842d6a3847dff3f56c5f7';
			blockHash: string; //'febb0ee9e474aee90c49dd95d71db9cd43f7c49e9c89c6badc3f47f8b7683e5f';
			sourcePurse: string; //'uref-68413a99bdcf40c249c680dfdefb205f732cab789978b7bf4ef6f8a6165ada66-007';
			targetPurse: string; //'uref-cf76bf4a873d82181eb8f18a52cdfa651bcc44133f8a151b60a894f2f378034f-004';
			amount: string; //'2500000000';
			fromAccount: string; //'34b0394b11dc3ecb1bf6f26c9754aa2e9f38d7bec33003374b4b3fac8566c258';
			toAccount: string; //'a3e43d6224734448496738a31c27b942a1b41b7470de8eac2a0f7b1ddd609ba7';
			timestamp: string; //'2022-02-21T19:22:07.000Z'; => can be transformed to actual dates for sorting
		};
		pageCount: number;
		itemCount: number;
		pages: number[];
	}

	interface DBTokens {
		[key: string]: IToken[];
		global: IToken[];
	}

	interface SendTokenArr {
		[key: string]: any;
	}

	type MainSendChannels =
		| 'createWalletFromMnemonics'
		| 'createWalletFromFile'
		| 'generateMnemonics'
		| 'importWalletFromFile'
		| 'getHistory'
		| 'accountCsprBalance'
		| 'sendCSPRTokens'
		| 'selectProfileImage'
		| 'tokenBalance'
		| 'getValidators'
		| 'delegate'
		| 'undelegate'
		| 'openUrl';
	type MainReceiveChannels =
		| 'createWalletFromFileResponse'
		| 'createWalletFromMnemonicsResponse'
		| 'generateMnemonicsResponse'
		| 'importWalletFromFileResponse'
		| 'getHistoryResponse'
		| 'accountCsprBalanceResponse'
		| 'sendCSPRTokensResponse'
		| 'tokenBalanceResponse'
		| 'getValidatorsResponse'
		| 'delegateResponse'
		| 'undelegateResponse';
}
