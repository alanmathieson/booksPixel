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

// get keys from local text file
let oKeys;
fs.readFile( __dirname + '/config/keys.txt', function (err, data) {
	if (err) {log.warn('error on loading keys.txt', err)}
	oKeys = JSON.parse(data);
	log.info('oKeys', oKeys)
	connectMongo();
});

// set up communication between main and renderer
ipcMain.on('get-keys-object', (event, arg) => {
	event.reply('get-keys-object', oKeys)
})

// Mongo connection
const MongoClient = require('mongodb').MongoClient;
let db;
let bookCollections;

const connectMongo = () => {
	MongoClient.connect(oKeys.mongoURI, (err, client) => {
		err ? log.warn('error with Mongo', err) : log.warn('connected with Mongo');
		db = client.db('booksPixeldb');
		// get the list of collections
		db.listCollections().toArray((err, items) => {
			bookCollections = items;
		});
	}); 
}

ipcMain.on('mongo-listCollections', (event, collection) => {
	db.listCollections().toArray((err, items) => {
		bookCollections = items;
	});
	event.reply('mongo-listCollections', bookCollections);
})

ipcMain.on('mongo-getDocuments', (event, collection) => {
	let dbCollection = db.collection(collection);
	dbCollection.find({}).toArray((err, docs) => {
		event.reply('mongo-getDocuments', docs);
	});
})


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