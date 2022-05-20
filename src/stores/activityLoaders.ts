import { writable } from 'svelte/store';

interface SendTokenDetails {
	id: string;
	senderWallet: string;
	senderPrivateKey: string;
	recipientWallet: string;
	amount: number;
	network: 'testnet' | 'mainnet';
	error: string | null;
	fulfilled: boolean;
	token: string;
}

type UnknownObjectMap = {
	[key: string]: SendTokenDetails | null;
};

export const sendTokenTracker = writable<UnknownObjectMap>({});
