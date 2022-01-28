import { writable } from 'svelte/store';

export const navItems = writable(
	Array(7)
		.fill(0)
		.map((_, i) => ({ id: i, active: false } as NavIcon)),
);
