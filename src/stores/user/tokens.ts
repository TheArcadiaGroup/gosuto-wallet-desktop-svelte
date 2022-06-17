import { writable } from 'svelte/store';

export const tokens = writable<{ [publicKey: string]: { mainnet: IToken[]; testnet: IToken[] } }>(
	{},
);
export const sendTokenArr = writable<SendTokenArr[]>([]);
export const mintingTokens = writable<{ [id: string]: { result: boolean; error: string | null } }>(
	{},
);
