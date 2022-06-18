const { setupTitlebar, attachTitlebarToWindow } = require('custom-electron-titlebar/main');

module.exports = {
	createTitleBar: (mainWindow) => {
		setupTitlebar();
		attachTitlebarToWindow(mainWindow);
	},
};
