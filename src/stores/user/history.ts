import { writable } from 'svelte/store';

// Need to make modifications to make sure this works on the all history page
// We just need to make the userHistory central to the user address, so every address can access its history
type UserHistory = {
	[key: string]: HistoryResponse | null; // key in this case is the user's wallet address or public key
};
export const userHistory = writable<UserHistory | null>(null);
export const historyLoading = writable(false);
