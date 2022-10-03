import {
	isLedgerConnected,
	ledgerAccounts,
	ledgerError,
	loadingLedgerAccounts,
} from '$stores/ledger';
import { get } from 'svelte/store';

function processLedgerResponse(jsonResponse: string) {
	const response = JSON.parse(jsonResponse);

	console.log(response);
	if (
		response.error === 'not-connected' ||
		(response.error?.id && response.error?.id === 'ListenTimeout') ||
		(response.error?.name && response.error?.name === 'TransportError')
	) {
		isLedgerConnected.set(false);
		ledgerError.set(
			'Please Make Sure Your Ledger is Unlocked and Casper App is Active/Open Before Proceeding',
		);
		return;
	}

	if (response.nextAction === 'FiveAccounts') {
		loadingLedgerAccounts.set(true);
		window.api.send(
			'ledger',
			JSON.stringify({
				action: 'FiveAccounts',
				network: response.network ?? 'testnet',
			}),
		);
		return;
	}

	// Process the Data
	if (response.action === 'FiveAccounts') {
		if ((response.accounts?.length ?? 0) > 0) {
			isLedgerConnected.set(true);
			loadingLedgerAccounts.set(false);
		}
		ledgerAccounts.set((get(ledgerAccounts) ?? []).concat(response.accounts));
		console.log(get(ledgerAccounts));
	}
}

export default async function () {
	window.api.receive('ledgerResponse', (response: string) => {
		processLedgerResponse(response);
	});
}
