const sendMessage = (channel: MainSendChannels, data: string) => {
	window.api.send(channel, data);
};

// Function used to send messages to the main process but has checks to make sure only authorized channels are sent over.
export const sendMessageToMain = (channel: MainSendChannels, data: string) => {
	switch (channel) {
		case 'createWallet':
			sendMessage(channel, data);
		case 'createWalletFromFile':
			sendMessage(channel, data);
		default:
			return;
	}
};
