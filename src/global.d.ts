/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

type dataFunc = (data: string) => void;

declare interface Window {
	api: {
		receive: (channel: MainReceiveChannels, dataFunc) => void;
		send: (channel: MainSendChannels, data: string) => void;
	};
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

interface HistoryObject {
	wallet: string;
	status: string;
	dateAndTime: string;
	amount: number;
	price: number;
	SwapData: SwapData;
	toAccount: string;
	fromAccount: string;
	cryptoUnit: string;
	currencyUnit: string;
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
}

interface IHistory {
	transactionType: 'send' | 'recieve' | 'stake' | 'initialStakeUnlock' | 'unstake' | 'claimReward';
	transactionInitiationDate: Date & { toDate: () => Date };
	recipientWalletName: string;
	recipientWalletAddress: string;
	senderWalletAddress: string;
	transactionTokenAmount: number;
	transactionUSDEquivalent: number;
	transactionFee: number;
	transactionHash: string;
	stakedDate: Date & { toDate: () => Date };
}

interface IValidator {
	validatorName: string;
	uptime: number;
	validatorCommission: number;
	votingPower: number;
	selfDelegation: number;
	delegationReturn: number;
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

interface IUser {
	name: string;
	email: string;
	avatar: string;
	wallets: IWallet[];
}

interface AppSettings {
	name: string;
	email: string;
	avatar: string;
}

interface ProfileSettings {
	walletName: string;
	walletAddress: string;
	publicKey: string;
	privateKey: string;
	currentPassword: string;
}

type MainSendChannels =
	| 'createWalletFromMnemonics'
	| 'createWalletFromFile'
	| 'generateMnemonics'
	| 'importWalletFromFile';
type MainReceiveChannels =
	| 'createWalletFromFileResponse'
	| 'createWalletFromMnemonicsResponse'
	| 'generateMnemonicsResponse'
	| 'importWalletFromFileResponse';
