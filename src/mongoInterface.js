const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
const mongo = {};
let bookPixelCollections = [];

const getCollections = () => {
	ipcRenderer.send('mongo-listCollections', '');
	return new Promise((resolve, reject) => {
		ipcRenderer.on('mongo-listCollections', (event, collections) => {
			bookPixelCollections = collections;
			resolve(collections);
		});
	})
}
mongo.getCollections = getCollections;

const getDocuments = (collection) => {
	ipcRenderer.send('mongo-getDocuments', collection);
	return new Promise((resolve, reject) => {
		ipcRenderer.on('mongo-getDocuments', (event, documents) => {
			resolve(documents);
		});
	})
}
mongo.getDocuments = getDocuments;


export default mongo;