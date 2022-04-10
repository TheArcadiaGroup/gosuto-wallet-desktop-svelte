import { writable } from 'svelte/store';

type UnknownObjectMap = {
	[key: string]: boolean;
};

export const walletLoaders = writable<UnknownObjectMap>({});
export const tokenLoaders = writable<UnknownObjectMap>({});
