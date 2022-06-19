/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="vite/client" />
/// <reference types="casper-js-sdk" />
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
		CasperSDK: typeof import('casper-js-sdk');
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
		lastFetch: {
			transfersCount: number;
			deploysCount: number;
		};
	}

	interface IWallet {
		walletName: string;
		walletPassword: string;
		walletImage: string;
		seedPhrase: string[];
		availableBalanceUSD: { mainnet: number; testnet: number };
		availableBalance: { mainnet: number; testnet: number };
		stakedBalance: {
			// using this approach since this tends to come in later after the balance
			mainnet: number;
			testnet: number;
		};
		unclaimedRewards: {
			// using this approach since this tends to come in later after the balance
			mainnet: number;
			testnet: number;
		};
		walletTokens: {
			mainnet: IToken[];
			testnet: IToken[];
		};
		walletStakes: {
			mainnet: IStake[];
			testnet: IStake[];
		};
		// walletHistory: IHistory[];
		publicKey: string;
		accountHash: string;
		privateKey: string;
		algorithm: 'ed25519' | 'secp256k1';
	}

	interface IToken {
		tokenName: string;
		tokenTicker: string;
		tokenAmountHeld: number; // no need to store different sets of these as each token is limited to its network either testnet or mainnet
		tokenAmountHeldUSD: number; // no need to store different sets of these as each token is limited to its network either testnet or mainnet
		shareToken: boolean; // share between wallets not networks
		contractHash: string; // must never start with hash
		tokenPriceUSD: number;
		decimals: number;
	}

	type TxType =
		| 'send'
		| 'swap'
		| 'receive'
		| 'stake'
		| 'initialStakeUnlock'
		| 'unstake'
		| 'claimReward'
		| 'contract_call'
		| 'WASM deploy';

	// TODO: RETHINK THE HISTORY OBJECT GIVEN THE DATA WE ARE GETTING BACK
	interface IHistory {
		transactionType: TxType;
		accountHash: string; // Account Hash
		recipient: string;
		sender: string;
		amount: number;
		blockHash: string;
		deployHash: string;
		transactionDate: Date;
		transactionFee: number;
		validatorPublicKey: string | null; // only present in stake operations
		error: string | null;
		walletName: string;
		contract_call: string | null;

		// Swap History
		swap: SwapData | null;

		// Stake
		stake: IStake | null;
	}

	interface IValidator {
		delegationRate: number;
		selfStakeAmount: number;
		totalStaked: number;
		currentDelegators: number;
		publicKey: string;
		accountHash: string;
		performance: number;
		profile: {
			is_active: boolean;
			name: string;
			description: string;
			website: string | null;
		} | null;
	}

	interface IStake {
		validatorPublicKey: string; // validator public key
		walletName: string;
		stakeAmount: number;
		initialStakeDate: Date;
		latestRewardDate: Date;
		reward: number;
		// unlocked: number;
		personalStakeWeight: number; // percentage of user stake on validator
		publicKey: string;
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
		price_change: number;
		price: { usd: number; jpy: number; eur: number };
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

	interface TransferHistory {
		pageCount: number;
		itemCount: number;
		pages: {
			number: number;
			url: string; // Specific url route to get this page's data. However, the domain and network is not included
		}[];
		data: {
			account: string; // public key
			cost: string; // tx fee in string format
			errorMessage: string | null;
			status: string; // mostly executed
			deployHash: string;
			blockHash: string;
			timestamp: string; // ISODate
		}[];
	}

	interface DBTokens {
		[publicKey: string]: {
			mainnet: IToken[];
			testnet: IToken[];
		};
		// global: IToken[];
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
		| 'getValidators'
		| 'delegate'
		| 'undelegate'
		| 'openUrl'
		| 'exportWalletCertificate'
		| 'encryption'
		| 'saveData'
		| 'retrieveData'
		| 'deployErc20Contract'
		| 'erc20TokenBalance'
		| 'sendErc20Tokens'
		| 'getErc20TokenDetails';
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
		| 'undelegateResponse'
		| 'encryptionResponse'
		| 'deployErc20ContractResponse'
		| 'erc20TokenBalanceResponse'
		| 'sendErc20TokensResponse'
		| 'getErc20TokenDetailsResponse';
}
