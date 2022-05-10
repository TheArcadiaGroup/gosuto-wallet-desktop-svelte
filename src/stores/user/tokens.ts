import { writable } from 'svelte/store';

export const tokens = writable<IToken[]>([]);
export const sendTokenArr = writable<SendTokenArr[]>([]);
