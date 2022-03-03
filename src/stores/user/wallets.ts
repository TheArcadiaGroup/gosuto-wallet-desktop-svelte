import { writable } from 'svelte/store';

export const wallets = writable<IWallet[]>([]);
export const selectedWallet = writable<IWallet | null>(null);
