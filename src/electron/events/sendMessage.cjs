const { BrowserWindow } = require('electron');

module.exports = (channel, data) => {
	BrowserWindow.getFocusedWindow()?.webContents.send(channel, data);
};
