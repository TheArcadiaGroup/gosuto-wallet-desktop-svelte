/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

interface infoCategory {
	name: string;
	placeholder: string;
}

interface choiceCard {
	id: number;
	header: string;
	description: string;
	route: string;
	isSelected: boolean;
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
