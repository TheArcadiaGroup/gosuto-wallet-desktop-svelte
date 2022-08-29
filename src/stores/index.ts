import { writable } from 'svelte/store';

export const isPollyfilling = writable(false);
export const updaterMessage = writable<AppUpdateComms | null>(null);
export const appInfo = writable<{ version: string | null; updatesReady: boolean } | null>(null);
