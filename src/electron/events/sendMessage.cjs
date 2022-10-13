const { BrowserWindow } = require('electron');

module.exports = (channel, data) => {
	return BrowserWindow.getAllWindows()?.map((window) => {
		window.webContents.send(channel, data);
		return window;
	});
	// return BrowserWindow.getFocusedWindow()?.webContents.send(channel, data);
};
