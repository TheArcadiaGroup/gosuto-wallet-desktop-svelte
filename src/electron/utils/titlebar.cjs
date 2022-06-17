const { setupTitlebar, attachTitlebarToWindow } = require('custom-electron-titlebar/main');
const { Menu } = require('electron');
const { buildDarwinMenu, buildDefaultMenu } = require('./buildMenu.cjs');

module.exports = {
	createTitleBar: (mainWindow, app, shell, dev) => {
		const menu = Menu.buildFromTemplate(
			process.platform === 'darwin'
				? buildDarwinMenu(app, shell, mainWindow, dev)
				: buildDefaultMenu(app, shell, mainWindow, dev),
		);
		Menu.setApplicationMenu(menu);

		setupTitlebar();
		attachTitlebarToWindow(mainWindow);
	},
};
