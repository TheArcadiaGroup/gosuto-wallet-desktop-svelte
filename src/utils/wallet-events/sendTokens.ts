// Subscribe to wallet Sending events and listen until the Success or Failed  Response is returned
// We listen on a timer since I have not yet found a way to add event listeners directly to the blockchain calls

import { sendTokenTracker } from '$stores/activityLoaders';
import type { UnknownSendTokenObjectMap } from '$stores/activityLoaders';

const logicFunction = (sendTxs: UnknownSendTokenObjectMap) => {
	Object.keys(sendTxs).map((sendTxId) => {
		const sendTx = sendTxs[sendTxId];
		if (sendTx) {
			// Find a good alternative to setTimeout or setInterval - plus the user is already seeing their tokens being transferred on other sites, not sure if its necessary to do this on the app
		}
	});
};

export default function () {
	sendTokenTracker.subscribe((sendToken) => {
		logicFunction(sendToken);
	});
}
