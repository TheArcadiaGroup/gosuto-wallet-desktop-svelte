const { dialog, app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

const browserWindow = BrowserWindow.getFocusedWindow();

module.exports = {
	readFileUsingDialog: (file, encoding = 'utf8') => {
		if (file === 'profileImage') {
			const options = {
				title: `Account Profile`,
				defaultPath: app.getPath('pictures'),
				filters: [
					{
						name: 'Image',
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
						const extTypeMap = {
							'.png': 'image/png',
							'.gif': 'image/gif',
							'.jpg': 'image/jpeg',
							'.jpeg': 'image/jpeg',
							'.bm': 'image/bmp',
							'.bmp': 'image/bmp',
							'.webp': 'image/webp',
							'.ico': 'image/x-icon',
							'.svg': 'image/svg+xml',
						};

						const image = fs.readFileSync(res.filePaths[0]);
						const contentType = extTypeMap[path.extname(file)] || 'image/jpeg';
						return `data:${contentType};base64,${image.toString('base64')}`;
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
