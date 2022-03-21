import { writable } from 'svelte/store';

export const sidebarContent = writable<HistoryObject | null>(null);
