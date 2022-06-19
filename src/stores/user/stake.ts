import { writable } from 'svelte/store';

export const validators = writable<IValidator[]>([]);
export const loadingValidators = writable(false);
export const loadingStakes = writable(false);
