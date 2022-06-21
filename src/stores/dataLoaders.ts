import { writable } from 'svelte/store';

type UnknownObjectMap = {
	[key: string]: Date | null;
};

export const walletLoaders = writable<UnknownObjectMap>({});
export const walletStakingBalances = writable<UnknownObjectMap>({});
export const tokenLoaders = writable<UnknownObjectMap>({});
