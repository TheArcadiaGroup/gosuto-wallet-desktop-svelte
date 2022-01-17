/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

interface infoCategory {
	name: string;
	placeholder: string;
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

interface StakePosition {
	unstaked: boolean;
	walletName: string;
	stakedAmount: number;
	unlockedAmount: number;
	percentage: number;
	stakedOn: string;
	unstakedOn: string;
	unlockedOn: string;
	rewardOn: string;
	reclaimOn: string;
	timeOne: string;
	timeTwo: string;
	totalTimeUntilReward: string;

interface ChartPrice {
	x: string;
	y: number;
}
