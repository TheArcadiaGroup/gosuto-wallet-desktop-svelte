const { BrowserWindow } = require('electron');

module.exports = (channel, data) => {
	return BrowserWindow.getFocusedWindow()?.webContents.send(channel, data);
};
