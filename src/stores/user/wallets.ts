import { writable } from 'svelte/store';
import { withPrevious } from 'svelte-previous';

export const wallets = writable<IWallet[]>([]);
// export const selectedWallet = writable<IWallet | null>(null);
export const [selectedWallet, previousSelectedWallet] = withPrevious<IWallet | null>(null);
