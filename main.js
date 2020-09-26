// this is 'server side' where we are running node
const {dialog, app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const {autoUpdater} = require('electron-updater');
const fs = require('fs');
const log = require('electron-log');

// some libraries to help with webpack reload and context menu
require('electron-reload')(__dirname);
require('electron-context-menu')();

// get assets path - it's different for development and production
const assetsPath = app.isPackaged ? path.join(process.resourcesPath) : ".";

// set file path for logging
// ?????

let oKeys;
fs.readFile( __dirname + '/config/keys.txt', function (err, data) {
	if (err) {log.warn('error on loading keys.txt', err)}
	oKeys = data.toString();
	log.warn(oKeys);
});

// set up communication between main and renderer
ipcMain.on('get-keys-object', (event, arg) => {
	event.reply('get-keys-object', oKeys)
})

// check for updates
// autoUpdater.on('update-downloaded', (info) => {
// 	const dialogOpts = {
// 		title: 'Application Update',
// 		message: 'Updates downloaded, application will update on restart...',
// 		buttons: ['Close']
// 	}
// 	dialog.showMessageBox(dialogOpts, (response) => {
// 		if (response === 0) {
// 			setImmediate(() => autoUpdater.quitAndInstall())
// 		}
// 	});
// });

// autoUpdater.on('error', (error) => {
// 	dialog.showErrorBox('Error: ', error == null ? "unknown" : (error.stack || error).toString())
// });

// We are now going to create our first renderer
let mainWindow;
app.on('ready', () => {
	autoUpdater.checkForUpdatesAndNotify();
	mainWindow = new BrowserWindow({
		width: 1600, 
		height: 1200,
		webPreferences: {
			nodeIntegration: true
		}
	});
	mainWindow.loadURL(path.join('file://', __dirname, './html/index.html'));
});