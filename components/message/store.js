//mocks => arreglos que simulan el funcionamiento de inserts y selects de BD
//const list = [];
const db = require('mongoose'); 
const Model = require('./model');
db.Promise = global.Promise;
db.connect('mongodb+srv://user:user1234@cluster0-kjwqd.mongodb.net/telegrom?retryWrites=true&w=majority', {
    useNewUrlParser:true,
});
console.log('[db] Conectada con exito');

function addMessage(message){
	//list.push(message);
	const myMessage = new Model(message);
	myMessage.save();
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
module.exports = {
	add: addMessage,
	list: getMessage,
	updateText: updateText,
	//update:
	//delete:
}