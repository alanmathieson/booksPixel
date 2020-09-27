const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
const mongo = {};
const bookPixelCollections = [];

ipcRenderer.send('mongo-listCollections', '');
ipcRenderer.on('mongo-listCollections', (event, collections) => {
	bookPixelCollections = collections;
});


const getCollections = () => {
	return bookPixelCollections;
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