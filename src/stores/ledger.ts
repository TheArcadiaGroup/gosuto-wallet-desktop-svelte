import { writable } from 'svelte/store';

export const connectingToLedger = writable(false);
export const isLedgerConnected = writable(false);
export const loadingLedgerAccounts = writable(false);
export const ledgerAccounts = writable<
	{ index: number; publicKey: string; balance: number; accountHash: string }[] | null
>(null);
export const ledgerError = writable<null | string>(null);
export const selectedLedgerAccount = writable<{
	index: number;
	publicKey: string;
	accountHash: string;
	balance: number;
} | null>(null);
