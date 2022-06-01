import { stakeCsprTracker } from '$stores/activityLoaders';
import { ethers } from 'ethers';

export default function () {
	// Delegate Response
	window.api.receive('delegateResponse', (response: any) => {
		response = JSON.parse(response);
		const data = response.data;
		console.log(response);

		if (Array.isArray(data)) {
			const amountStaked = +data[1].deploy.session.StoredContractByHash.args[2][1].parsed; // Amount Sent

			// Get Value to Display
			const valueStakedInCspr = +ethers.utils.formatEther(
				ethers.utils.parseUnits(amountStaked.toString(), 9),
			);
			const walletAddress = data[1].deploy.header.account; // Wallet Address

			// TODO: TAKE THE 2.5% FEE INTO CONSIDERATION AS ITS CURRENTLY NOT BEING CONSIDERED

			const returnObject = {
				id: response.id,
				wallet: walletAddress,
				totalSent: valueStakedInCspr,
			};

			stakeCsprTracker.update((stakeTxs) => {
				if (response.id && stakeTxs[response.id]) {
					stakeTxs[response.id] = stakeTxs[response.id];
					stakeTxs[response.id]!.error = null;
					stakeTxs[response.id]!.fulfilled = true;
				}
				return stakeTxs;
			});

			return returnObject;
		} else {
			stakeCsprTracker.update((stakeTxs) => {
				if (response.id && stakeTxs[response.id]) {
					stakeTxs[response.id] = stakeTxs[response.id];
					stakeTxs[response.id]!.error =
						response.message || 'Sorry, we encountered an error while trying to stake your tokens';
					stakeTxs[response.id]!.fulfilled = true;
				}
				return stakeTxs;
			});
		}

		// TODO: ADD STAKE WAITING LOGIC - TO ENABLE BETTER REACTIVITY FOR UI
	});

	// Delegate Response
	window.api.receive('undelegateResponse', (response: any) => {
		console.log(JSON.parse(response));
	});
}
