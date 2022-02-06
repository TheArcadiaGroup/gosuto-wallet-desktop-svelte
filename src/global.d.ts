/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

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
	seedPhrase: string;
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
	walletTokens: [IToken[]];
	walletStakes: [IStake[]];
	walletHistory: [IHistory[]];
	walletAddress: string;
}

interface IToken {
	tokenName: string;
	tokenTicker: string;
	tokenAmountHeld: number;
	tokenAmountHeldUSD: number;
	limitedSupply: boolean;
	mintableSupply: boolean;
	contractString: string;
	contractAddress: string;
	tokenPriceUSD: number;
	decimalsOfPrecision: int;
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

interface IStake {
	parentWallet: string;
	stakeAmount: number;
	unstakeDatetime: Date & { toDate: () => Date };
	//difference between stakeDate and reclamationDate, int?
	unstakeCountdown: int;
	reclamationDate: Date & { toDate: () => Date };
	initialStakeDate: Date & { toDate: () => Date };
	rewardDate: Date & { toDate: () => Date };
	// difference between rewardDate and initialStakeDate, int?
	rewardCountdown: int;
	reward: number;
	stakePercent: number;
	parentWalletAddress: string;
}
