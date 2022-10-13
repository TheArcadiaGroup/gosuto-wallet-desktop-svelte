import {
	isLedgerConnected,
	ledgerAccounts,
	ledgerError,
	loadingLedgerAccounts,
} from '$stores/ledger';
import { wallets } from '$stores/user/wallets';
import { get } from 'svelte/store';
import { parseDelegationResponse } from './delegations';
import { parseTransferData } from './transfers';
import _ from 'lodash-es';

function processLedgerResponse(jsonResponse: string) {
	const response = JSON.parse(jsonResponse);
	console.log(response);

	if (
		(response.error === 'not-connected' ||
			(response.error?.id && response.error?.id === 'ListenTimeout') ||
			(response.error?.name && response.error?.name === 'TransportError')) &&
		response.action !== 'UnStakeUsingLedger' &&
		response.action !== 'StakeUsingLedger' &&
		response.action !== 'SendCsprUsingLedger'
	) {
		isLedgerConnected.set(false);
		ledgerError.set(
			response.message ??
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
				fromIndex: get(ledgerAccounts)?.length > 0 ? get(ledgerAccounts)?.length : 0,
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
		const storedWallets = get(wallets);
		response.accounts?.map((acc: any) => {
			if (
				storedWallets.some(
					(wallet) => wallet.publicKey.toLowerCase() === acc.publicKey.toLowerCase(),
				)
			) {
				acc.exists = true;
			}

			return acc;
		});
		ledgerAccounts.set(
			_.uniqBy((get(ledgerAccounts) ?? []).concat(response.accounts), 'publicKey'),
		);
	}

	// Process Staking/Unstaking Responses
	if (
		response.action === 'UnStakeUsingLedger' ||
		response.action === 'StakeUsingLedger' ||
		response.action === 'SendCsprUsingLedger'
	) {
		switch (response.action) {
			case 'UnStakeUsingLedger':
				parseDelegationResponse(JSON.stringify(response), 'unstake');
				break;
			case 'StakeUsingLedger':
				parseDelegationResponse(JSON.stringify(response), 'stake');
				break;
			case 'SendCsprUsingLedger':
				parseTransferData(JSON.stringify(response));
				break;
		}
	}
}

export default async function () {
	window.api.receive('ledgerResponse', (response: string) => {
		processLedgerResponse(response);
	});
}
