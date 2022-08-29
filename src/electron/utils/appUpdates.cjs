const { app } = require('electron');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

log.transports.file.level = 'info';
autoUpdater.logger = log;
const rs = 'https://gosuto-updater.vercel.app';
const url = `${rs}/update/${process.platform}/${app.getVersion()}`;

autoUpdater.setFeedURL(url);
autoUpdater.checkForUpdatesAndNotify();
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

module.exports = {
	appVersion: function () {
		return { data: autoUpdater.currentVersion, error: null, message: 'App Version' };
	},
	checkUpdates: async function () {
		try {
			const result = await autoUpdater.checkForUpdates();
			console.log('check updates result: ', result);
			return {
				data: result,
				error: null,
				message: 'Successfully checked for update.',
			};
		} catch (error) {
			console.log('check for updates error: ', error);
			return {
				data: null,
				error: error,
				message: 'There was an error checking for update',
			};
		}
	},
	downloadUpdate: async function () {
		try {
			// Want this to continue in the background
			autoUpdater.downloadUpdate();
			return {
				data: 'Checking for update',
				error: null,
				message: 'Successfully started update download',
			};
		} catch (error) {
			console.log('download update error: ', error);
			return {
				data: null,
				error: error,
				message: 'Failed to download app update. Please try again later',
			};
		}
	},
	updateApp: async function () {
		try {
			return autoUpdater.quitAndInstall();
		} catch (error) {
			return {
				data: null,
				error: error,
				message: 'Error while trying to upadate app',
			};
		}
	},
};
