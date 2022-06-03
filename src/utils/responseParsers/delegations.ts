import { stakeCsprTracker, unStakeCsprTracker } from '$stores/activityLoaders';
import { ethers } from 'ethers';

export const parseDelegationResponse = (response: any, type: 'unstake' | 'stake' = 'stake') => {
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

		if (type === 'stake') {
			stakeCsprTracker.update((stakeTxs) => {
				if (response.id && stakeTxs[response.id]) {
					stakeTxs[response.id] = stakeTxs[response.id];
					stakeTxs[response.id]!.error = null;
					stakeTxs[response.id]!.fulfilled = true;
				}
				return stakeTxs;
			});
		} else {
			unStakeCsprTracker.update((unStakeTxs) => {
				if (response.id && unStakeTxs[response.id]) {
					unStakeTxs[response.id] = unStakeTxs[response.id];
					unStakeTxs[response.id]!.error = null;
					unStakeTxs[response.id]!.fulfilled = true;
				}
				return unStakeTxs;
			});
		}

		return returnObject;
	} else {
		if (type === 'stake') {
			stakeCsprTracker.update((stakeTxs) => {
				if (response.id && stakeTxs[response.id]) {
					stakeTxs[response.id] = stakeTxs[response.id];
					stakeTxs[response.id]!.error =
						response.message || 'Sorry, we encountered an error while trying to stake your tokens';
					stakeTxs[response.id]!.fulfilled = true;
				}
				return stakeTxs;
			});
		} else {
			unStakeCsprTracker.update((unStakeTxs) => {
				if (response.id && unStakeTxs[response.id]) {
					unStakeTxs[response.id] = unStakeTxs[response.id];
					unStakeTxs[response.id]!.error =
						response.message ||
						'Sorry, we encountered an error while trying to unstake your tokens';
					unStakeTxs[response.id]!.fulfilled = true;
				}
				return unStakeTxs;
			});
		}
	}
};

export default function () {
	// Delegate Response
	// window.api.receive('delegateResponse', (response: any) => {
	// 	parseDelegationResponse(response);
	// });
	// // Delegate Response
	// window.api.receive('undelegateResponse', (response: any) => {
	// 	// TODO: This approach has not been confirmed to work as it was just implemented directly with typescript and not on the electron side of things
	// 	parseDelegationResponse(response, 'unstake');
	// });
}
