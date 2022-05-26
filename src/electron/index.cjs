const { app, BrowserWindow } = require('electron');
const path = require('path');
const serve = require('electron-serve');
const windowStateManager = require('electron-win-state').default;
// const electronLocalshortcut = require('electron-localshortcut');
const contextMenu = require('electron-context-menu');
const loadEvents = require('./events/index.cjs');

const dev = process.env.NODE_ENV === 'development' || !app.isPackaged;
const port = process.env.PORT || 3000;
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

let mainWindow;

const createWindow = () => {
	let windowState = new windowStateManager({
		defaultWidth: 1300,
		defaultHeight: 850,
	});

	mainWindow = new BrowserWindow({
		trafficLightPosition: {
			x: 17,
			y: 32,
		},
		backgroundColor: 'whitesmoke',
		minWidth: 1300,
		minHeight: 850,
		width: windowState.width,
		height: windowState.height,
		x: windowState.x,
		y: windowState.y,
		frame: true, // remove this when creating custom app window
		webPreferences: {
			enableRemoteModule: true,
			contextIsolation: true,
			nodeIntegration: true,
			spellcheck: false,
			devTools: dev,
			// devTools: true,
			preload: path.join(__dirname, 'preload/index.cjs'),
			webSecurity: false,
		},
		icon: path.join(__dirname, 'logo.icns'),
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

contextMenu({
	showLookUpSelection: false,
	showSearchWithGoogle: false,
	showCopyImage: false,
	prepend: (defaultActions, params, browserWindow) => [
		{
			label: 'Make App 💻',
		},
	],
});

const createMainWindow = () => {
	mainWindow = createWindow();
	mainWindow.once('close', () => {
		mainWindow = null;
	});

	if (dev) loadVite(port);
	else serveURL(mainWindow);

	if (dev) mainWindow.openDevTools();

	// mainWindow.on('focus', (event) => {
	// 	electronLocalshortcut.register(
	// 		mainWindow,
	// 		['CommandOrControl+R', 'CommandOrControl+Shift+R', 'F5'],
	// 		() => {
	// 			console.log('Tried to reload');
	// 		},
	// 	);
	// });

	// mainWindow.on('blur', (event) => {
	// 	electronLocalshortcut.unregisterAll(mainWindow);
	// });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.on('ready', createMainWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
