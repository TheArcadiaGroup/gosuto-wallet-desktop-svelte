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
		} else if ('importWalletFile') {
			const options = {
				title: 'Select your private key',
				defaultPath: app.getPath('downloads'),
				buttonLabel: 'Upload',
				// Restricting the user to only Text Files.
				filters: [
					{
						name: 'Private Key File',
						extensions: ['pem', 'cer'],
					},
				],
				// Specifying the File Selector Property
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

	writeFile: (writeType, walletName, fileContents) => {
		if (writeType === 'exportWalletCertificate') {
			const options = {
				title: 'Save file',
				defaultPath: path.join(app.getPath('documents'), walletName),
				buttonLabel: 'Save',

				filters: [
					{ name: 'pem', extensions: ['pem'] },
					{ name: 'cer', extensions: ['cer'] },
					{ name: 'All Files', extensions: ['*'] },
				],
			};

			return dialog
				.showSaveDialog(browserWindow, options)
				.then(({ filePath }) => {
					fs.writeFileSync(filePath, fileContents, 'utf-8');
					return true;
				})
				.catch((err) => {
					throw err;
				});
		}
	},
};
