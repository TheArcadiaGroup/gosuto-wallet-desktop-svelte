import { sendTokenTracker } from '$stores/activityLoaders';
import { ethers } from 'ethers';

export const parseTransferData = (response: any) => {
	// The response in this case can be a simple string which is the deploy hash that can be used to track the transaction
	response = JSON.parse(response) as { id: string; data: any };
	const data = response.data;

	if (Array.isArray(data)) {
		// Its the deploy Object returned
		// Get the address
		const gasFees = +data[1].deploy.payment.ModuleBytes.args[0][1].parsed; // Transaction Fee/Gas
		const amtSent = +data[1].deploy.session.Transfer.args[0][1].parsed; // Amount Sent

		// Get Value to Display
		const valueSent = +ethers.utils.formatEther(
			ethers.utils.parseUnits((amtSent - gasFees).toString(), 9),
		);
		const walletAddress = data[1].deploy.session.Transfer.args[1][1].parsed; // Wallet Address

		// TODO: TAKE THE 2.5% FEE INTO CONSIDERATION AS ITS CURRENTLY NOT BEING CONSIDERED

		const returnObject = {
			id: response.id,
			wallet: walletAddress,
			gasFees,
			totalSent: amtSent,
			receivedByRecipient: valueSent,
		};

		sendTokenTracker.update((transactions) => {
			if (response.id && transactions[response.id]) {
				transactions[response.id] = transactions[response.id];
				transactions[response.id]!.error = null;
				transactions[response.id]!.fulfilled = true;
			}
			return transactions;
		});

		return returnObject;
	} else {
		// Definitely an error occurred

		sendTokenTracker.update((transactions) => {
			if (response.id && transactions[response.id]) {
				transactions[response.id] = transactions[response.id];
				transactions[response.id]!.error =
					response.message || 'Sorry, we encountered an error while trying to send your tokens';
				transactions[response.id]!.fulfilled = true;
			}
			return transactions;
		});
		return response.message || 'Sorry, we encountered an error while trying to send your tokens';
	}
};

export default function () {
	// window.api.receive('sendCSPRTokensResponse', (response: any) => {
	// 	parseTransferData(response);
	// });
}
