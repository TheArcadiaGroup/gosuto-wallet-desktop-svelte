import { writable } from 'svelte/store';

/** An array of items representing the 7 Navbar icons */
export const navItems = writable(
	Array(7)
		.fill(0)
		.map((_, i) => ({ id: i, active: false } as NavIcon)),
);
