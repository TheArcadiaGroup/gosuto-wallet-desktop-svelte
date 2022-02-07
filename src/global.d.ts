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
