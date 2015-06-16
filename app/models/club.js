var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ClubSchema = new Schema({
	clubName : {
		type: String , 
		unique: true ,
		required: true
	},
	description : {
		type: String , 
		required: true
	},
	achievements : {
		type: [String] ,
		default: [] ,
		required: true
	},
	activities : {
		type: [String] ,
		default: [] ,
		required: true
	},
	createdOn : {
		type: Date , 
		default: Date.now ,
 		required: true
	},
	heads : [
	{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User' , 
		default: []
	}
	],
	members : [
	{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User' , 
		default: []
	}
	]
});

module.exports = mongoose.model('Club',ClubSchema);