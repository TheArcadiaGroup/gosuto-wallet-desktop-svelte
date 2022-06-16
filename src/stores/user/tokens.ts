import { writable } from 'svelte/store';

export const tokens = writable<{ mainnet: IToken[]; testnet: IToken[] }>({
	mainnet: [],
	testnet: [],
});
export const sendTokenArr = writable<SendTokenArr[]>([]);
export const mintingTokens = writable<{ [id: string]: { result: boolean; error: string | null } }>(
	{},
);
