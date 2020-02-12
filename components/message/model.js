const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
	//_id : String,
	user: String,
	message: {
			type: String,
			required:[ true, 'Debe escribir un mensaje']
	},
	date: Date,
});

const model = mongoose.model('messages', mySchema);
module.exports = model;