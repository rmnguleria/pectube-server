var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema({
	text: {
		type: String,
		required: true
	} ,
	createdBy : {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User',
		required: true
	} ,
	posted : {
		type: Date,
		default: Date.now,
		required: true
	}
});

var PostSchema = new Schema({
	
	createdBy : {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User',
		required: true
	},

	createdOn : {
		type: Date, 
		default: Date.now,
		required: true
	},

	title : {
		type: String,
		required: true
	},

	content : {
		type: String ,
		required: true
	},

	club : {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Club'
	},

	comments : [
		commentSchema
	],

	edited : {
		type: Boolean ,
		default : false
	}
});

module.exports = mongoose.model('Post',PostSchema);