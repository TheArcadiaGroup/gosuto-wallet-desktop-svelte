// Customized HMR-safe stores
// Based off https://github.com/svitejs/svite/blob/ddec6b9/packages/playground/hmr/src/stores/hmr-stores.js
import { writable } from 'svelte/store';

let stores: Record<string, import('svelte/store').Writable<any>> = {};

export function getStore(id: string, initialValue: any) {
	return stores[id] || (stores[id] = writable(initialValue));
}

// preserve the store across HMR updates
if (import.meta?.hot) {
	if (import.meta.hot.data.stores) {
		stores = import.meta.hot.data.stores;
	}
	import.meta.hot.accept();
	import.meta.hot.dispose(() => {
		// @ts-ignore
		import.meta.hot.data.stores = stores;
	});
}
