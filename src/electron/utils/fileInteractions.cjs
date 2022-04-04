const { dialog, app, BrowserWindow } = require('electron');
const fs = require('fs');
const { generateFromFile } = require('./createWallet.cjs');

const browserWindow = BrowserWindow.getFocusedWindow();

module.exports = {
	readFileUsingDialog: (file, encoding = 'utf8') => {
		if (file === 'profileImage') {
			const options = {
				title: `Account Profile`,
				defaultPath: app.getPath('pictures'),
				filters: [
					{
						name: 'image(png, jpeg, jpg)*',
						extentions: ['jpg', 'jpeg', 'png', 'gif'],
					},
				],
				properties: ['openFile', 'dontAddToRecent'],
			};

			return dialog
				.showOpenDialog(browserWindow, options)
				.then((res) => {
					if (res.canceled) {
						return;
					} else if (res.filePaths.length > 0) {
						return fs.readFileSync(res.filePaths[0].toString('base64'));
					}
				})
				.catch((err) => {
					//Return error to client
					console.log('ERROR: ', err);
					return null;
				});
		} else if ('walletFile') {
			const options = {
				title: `Import From Secret Key File`,
				defaultPath: app.getPath('documents'),
				filters: [
					{
						name: 'pem*',
						extentions: ['cert', 'cer', 'crt', 'pem'],
					},
				],
				properties: ['openFile', 'dontAddToRecent'],
			};

			return dialog
				.showOpenDialog(browserWindow, options)
				.then((res) => {
					if (res.canceled) {
						return;
					} else if (res.filePaths.length > 0) {
						return fs.readFileSync(res.filePaths[0], { encoding: encoding });
					}
				})
				.catch((err) => {
					//Return error to client
					console.log('ERROR: ', err);
					return null;
				});
		}
	},

	writeFile: () => {},
};
