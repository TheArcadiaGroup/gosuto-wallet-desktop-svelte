import { writable } from 'svelte/store';

export const sidebarContent = writable<IHistory | null>(null);
