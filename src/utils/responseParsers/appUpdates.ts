import { appInfo, updaterMessage } from '$stores';

export default function () {
	window.api.receive('appUpdatesResponse', (dataRes: string) => {
		// Messages from updater
		const parsedData = JSON.parse(dataRes);

		console.log(parsedData);

		switch (parsedData?.action) {
			case 'APP_VERSION':
				appInfo.update((info) => {
					if (!info) {
						info = {
							version: parsedData?.data?.version,
							updatesReady: false,
						};
					} else {
						info = {
							...info,
							version: parsedData?.data?.version,
						};
					}
					return info;
				});
				break;
			case 'CHECK_UPDATES':
				if (parsedData?.error) {
					updaterMessage.set({
						message:
							"There was an error while checking for updates. We'll try again later at app restart",
						hasProgress: false,
						buttonMessage: 'OK',
					});
				}
				break;
			case 'DOWNLOAD_UPDATES':
				if (parsedData.message === 'ready') {
					appInfo.update((info) => {
						if (!info) {
							info = {
								version: null,
								updatesReady: true,
							};
						} else {
							info = {
								...info,
								updatesReady: true,
							};
						}
						return info;
					});
					updaterMessage.set({
						message: 'Update has downloaded and is ready for install. Install right now?',
						hasProgress: false,
						buttonMessage: 'Restart and Install',
						action: 'UPDATE_APP',
					});
				} else {
					updaterMessage.set({
						message: 'Update Download has Started',
						hasProgress: false,
						buttonMessage: 'OK',
					});
				}
				break;
			case 'UPDATE_APP':
				if (parsedData?.error) {
					updaterMessage.set({
						message:
							"There was an error trying to update the app. We'll try again later at app restart",
						hasProgress: false,
						buttonMessage: 'OK',
					});
				}
				break;
			default:
				break;
		}

		// updaterMessage.set(JSON.parse());
	});
}
