import { writable } from 'svelte/store';

export const user = writable<IUser | null>(null);
