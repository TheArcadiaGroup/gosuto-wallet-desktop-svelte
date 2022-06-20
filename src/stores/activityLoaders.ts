import { writable } from 'svelte/store';

interface SendTokenDetails {
	id: string;
	senderWallet: string;
	senderPrivateKey: string;
	recipientPublicKey: string;
	amount: string;
	network: 'testnet' | 'mainnet';
	error: string | null;
	fulfilled: boolean;
	token: string;
}

interface StakeCSPRDetails {
	id: string;
	publicKey: string;
	accountHash: string;
	privateKey: string;
	validatorPublicKey: string;
	amount: number;
	network: 'testnet' | 'mainnet';
	error: string | null;
	fulfilled: boolean;
}

export type UnknownSendTokenObjectMap = {
	[key: string]: SendTokenDetails | null;
};

export type UnknownStakeCSPRObjectMap = {
	[key: string]: StakeCSPRDetails | null;
};

export const sendTokenTracker = writable<UnknownSendTokenObjectMap>({});
export const stakeCsprTracker = writable<UnknownStakeCSPRObjectMap>({});
export const unStakeCsprTracker = writable<UnknownStakeCSPRObjectMap>({});
