//mocks => arreglos que simulan el funcionamiento de inserts y selects de BD
//const list = [];
const db = require('mongoose'); 
const Model = require('./model');
const configParam = require('../../config')

const USER = encodeURIComponent(configParam.config.dbUser);
const PASSWORD = encodeURIComponent(configParam.config.dbPassword);
const DB_NAME = configParam.config.dbName;
const DB_HOST = configParam.config.dbHost;
//const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`;
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

db.Promise = global.Promise;
//db.connect('mongodb+srv://user:user1234@cluster0-kjwqd.mongodb.net/telegrom?retryWrites=true&w=majority', {
db.connect(MONGO_URI, {
		useNewUrlParser:true,
		useUnifiedTopology: true
});
console.log('[db] Conectada con exito');

function addMessage(message){
	//list.push(message);
	const myMessage = new Model(message);
	myMessage.save();
	console.log(myMessage);
}

async function getMessage(filterUser){
	let filter= {};
	if(filterUser !== null ){
		filter= {user: filterUser}
	}
	const messages = await Model.find(filter);
	return messages;
	
	/*
	//Búsqueda por el nombre ignorando mayúsculas o minúsculas
	//Mongo puede utilizar Regular Expressions para realizar búsquedas y en estas es posible indicarle que busque “case-insensitive”. Esto se logra con el flag “i” que vemos en el código. Este código se traduce a: /usuario/i
	let userFilter={};
	if(filterUser){
		userFilter.user = new RegExp(filterUser, "i");
	}
	const messages = await Model.find(userFilter);
	return messages;
	*/
}

async function updateText( id, message){
	const foundMessage = await Model.findOne({
			_id: id
	});
	foundMessage.message = message;
	const newMessage = await foundMessage.save();
	return newMessage
}

function removeMessage(id){
	return Model.deleteOne({
		_id: id
	});
}

module.exports = {
	add: addMessage,
	list: getMessage,
	updateText: updateText,
	remove: removeMessage,
}