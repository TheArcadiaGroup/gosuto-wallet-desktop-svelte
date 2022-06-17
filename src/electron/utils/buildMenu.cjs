module.exports = {
	buildDarwinMenu: (app, shell, mainWindow, dev) => {
		const subMenuAbout = {
			label: 'Gosuto',
			submenu: [
				{
					label: 'About Gosuto',
					selector: 'orderFrontStandardAboutPanel:',
				},
				{ type: 'separator' },
				// { label: 'Services', submenu: [] },
				{ type: 'separator' },
				{
					label: 'Hide Gosuto',
					accelerator: 'Command+H',
					selector: 'hide:',
				},
				{
					label: 'Hide Others',
					accelerator: 'Command+Shift+H',
					selector: 'hideOtherApplications:',
				},
				{ label: 'Show All', selector: 'unhideAllApplications:' },
				{ type: 'separator' },
				{
					label: 'Quit',
					accelerator: 'Command+Q',
					click: () => {
						app.quit();
					},
				},
			],
		};
		const subMenuEdit = {
			label: 'Edit',
			submenu: [
				{ label: 'Undo', accelerator: 'Command+Z', selector: 'undo:' },
				{ label: 'Redo', accelerator: 'Shift+Command+Z', selector: 'redo:' },
				{ type: 'separator' },
				{ label: 'Cut', accelerator: 'Command+X', selector: 'cut:' },
				{ label: 'Copy', accelerator: 'Command+C', selector: 'copy:' },
				{ label: 'Paste', accelerator: 'Command+V', selector: 'paste:' },
				{
					label: 'Select All',
					accelerator: 'Command+A',
					selector: 'selectAll:',
				},
			],
		};
		const subMenuViewDev = {
			label: 'View',
			submenu: [
				{
					label: 'Reload',
					accelerator: 'Command+R',
					click: () => {
						mainWindow.webContents.reload();
					},
				},
				{
					label: 'Toggle Full Screen',
					accelerator: 'Ctrl+Command+F',
					click: () => {
						mainWindow.setFullScreen(!mainWindow.isFullScreen());
					},
				},
				{
					label: 'Toggle Developer Tools',
					accelerator: 'Alt+Command+I',
					click: () => {
						mainWindow.webContents.openDevTools({ mode: 'detach' });
					},
				},
			],
		};
		const subMenuViewProd = {
			label: 'View',
			submenu: [
				{
					label: 'Toggle Full Screen',
					accelerator: 'Ctrl+Command+F',
					click: () => {
						mainWindow.setFullScreen(!mainWindow.isFullScreen());
					},
				},
			],
		};
		const subMenuWindow = {
			label: 'Window',
			submenu: [
				{
					label: 'Minimize',
					accelerator: 'Command+M',
					selector: 'performMiniaturize:',
				},
				{ label: 'Close', accelerator: 'Command+W', selector: 'performClose:' },
				{ type: 'separator' },
				{ label: 'Bring All to Front', selector: 'arrangeInFront:' },
			],
		};
		const subMenuHelp = {
			label: 'Help',
			submenu: [
				{
					label: 'Learn More',
					click() {
						shell.openExternal('https://www.gosutowallet.com/');
					},
				},
			],
		};

		const subMenuView = dev ? subMenuViewDev : subMenuViewProd;

		return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp];
	},

	buildDefaultMenu: (app, shell, mainWindow, dev) => {
		const templateDefault = [
			{
				label: '&File',
				submenu: [
					// {
					// 	label: '&Open',
					// 	accelerator: 'Ctrl+O',
					// },
					{
						label: '&Close',
						accelerator: 'Ctrl+W',
						click: () => {
							mainWindow.close();
						},
					},
				],
			},
			{
				label: '&View',
				submenu: dev
					? [
							{
								label: '&Reload',
								accelerator: 'Ctrl+R',
								click: () => {
									mainWindow.webContents.reload();
								},
							},
							{
								label: 'Toggle &Full Screen',
								accelerator: 'F11',
								click: () => {
									mainWindow.setFullScreen(!mainWindow.isFullScreen());
								},
							},
							{
								label: 'Toggle &Developer Tools',
								accelerator: 'Alt+Ctrl+I',
								click: () => {
									mainWindow.webContents.openDevTools({ mode: 'detach' });
								},
							},
					  ]
					: [
							{
								label: 'Toggle &Full Screen',
								accelerator: 'F11',
								click: () => {
									mainWindow.setFullScreen(!mainWindow.isFullScreen());
								},
							},
					  ],
			},
			{
				label: 'Help',
				submenu: [
					{
						label: 'Learn More',
						click() {
							shell.openExternal('https://www.gosutowallet.com/');
						},
					},
				],
			},
		];

		return templateDefault;
	},
};
