import { writable } from 'svelte/store';

export const tokens = writable<{ mainnet: IToken[]; testnet: IToken[] }>({
	mainnet: [],
	testnet: [],
});
export const sendTokenArr = writable<SendTokenArr[]>([]);
export const mintingToken = writable<boolean>(false);
export const mintingTokenError = writable<string>('');
