const { app, BrowserWindow, screen, shell, Menu } = require('electron');
const path = require('path');
const serve = require('electron-serve');
const windowStateManager = require('electron-win-state').default;
// const electronLocalshortcut = require('electron-localshortcut');
const contextMenu = require('electron-context-menu');
const loadEvents = require('./events/index.cjs');
const { buildDarwinMenu, buildDefaultMenu } = require('./utils/buildMenu.cjs');
// const { createTitleBar } = require('./utils/titlebar.cjs');

const dev = process.env.NODE_ENV === 'development' || !app.isPackaged;
const port = process.env.PORT || 5173;
const serveURL = serve({ directory: '.' });

// if (dev) {
// 	try {
// 		require('electron-reloader')(module, {
// 			debug: true,
// 			watchRenderer: true,
// 		});
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

let mainWindow = null;

const createWindow = () => {
	const display = screen.getPrimaryDisplay();
	const dimensions = display.workAreaSize;

	const minWidth =
		parseInt(dimensions.width * 0.8) > 1280 ? parseInt(dimensions.width * 0.8) : 1280;
	const minHeight =
		parseInt(dimensions.height * 0.8) > 700 ? parseInt(dimensions.height * 0.8) : 700;

	let windowState = new windowStateManager({
		defaultWidth: minWidth,
		defaultHeight: minHeight,
	});

	mainWindow = new BrowserWindow({
		trafficLightPosition: {
			x: 17,
			y: 32,
		},
		backgroundColor: 'whitesmoke',
		width: windowState.width,
		height: windowState.height,
		minWidth: minWidth,
		minHeight: minHeight,
		x: windowState.x,
		y: windowState.y,
		frame: true, // remove this when creating custom app window
		webPreferences: {
			enableRemoteModule: true,
			contextIsolation: true,
			nodeIntegration: true,
			spellcheck: false,
			devTools: dev,
			preload: path.join(__dirname, 'preload/index.cjs'),
			webSecurity: false,
		},
		icon: path.join(__dirname, 'logo.icns'),
		// frame: false,
		// titleBarStyle: 'hidden',
		// autoHideMenuBar: true,
		// trafficLightPosition: { x: process.platform === 'darwin' ? 10 : 0, y: 5 },
	});

	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
		mainWindow.focus();
	});

	mainWindow.on('close', () => {});

	loadEvents();

	return mainWindow;
};

// ---- VITE ---
const loadVite = (port) => {
	mainWindow.loadURL(`http://localhost:${port}`).catch((e) => {
		console.log('Error loading URL, retrying', e);
		setTimeout(() => {
			loadVite(port);
		}, 200);
	});
};

const createMainWindow = () => {
	mainWindow = createWindow();
	mainWindow.once('close', () => {
		mainWindow = null;
	});

	if (dev) loadVite(port);
	else serveURL(mainWindow);

	if (dev) mainWindow.webContents.openDevTools();

	if (
		screen.getPrimaryDisplay().workAreaSize.width <= 1500 ||
		screen.getPrimaryDisplay().workAreaSize.height <= 800
	) {
		mainWindow.webContents.setZoomFactor(0.75);
	}

	contextMenu({
		showLookUpSelection: false,
		showSearchWithGoogle: false,
		showCopyImage: false,
		prepend: (defaultActions, params, browserWindow) =>
			process.platform === 'darwin'
				? buildDarwinMenu(app, shell, mainWindow, dev)
				: buildDefaultMenu(app, shell, mainWindow, dev),
	});

	const menu = Menu.buildFromTemplate(
		process.platform === 'darwin'
			? buildDarwinMenu(app, shell, mainWindow, dev)
			: buildDefaultMenu(app, shell, mainWindow, dev),
	);
	Menu.setApplicationMenu(menu);

	// createTitleBar(mainWindow);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// to make singleton instance
const gotTheLock = app.requestSingleInstanceLock(null);

if (!gotTheLock) {
	app.quit();
} else {
	app.on('second-instance', (event, commandLine, workingDirectory, additionalData) => {
		// Print out data received from the second instance.
		// console.log(additionalData);

		// Someone tried to run a second instance, we should focus our window.
		if (mainWindow) {
			if (mainWindow.isMinimized()) mainWindow.restore();
			mainWindow.focus();
		}
	});

	// Create mainWindow, load the rest of the app, etc...
	app.whenReady().then(() => {
		createMainWindow();
	});
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	// Here we are closing the app completely, not leaving it open
	// if (process.platform !== 'darwin') {
	app.quit();
	// }
});

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
