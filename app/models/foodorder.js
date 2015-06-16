var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var statusArray = ['delivered','cancelled','not received','ordered'];

var FoodOrderSchema = new Schema({
	orderedBy:{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User'
	},
	orderedAt:{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Takeaway'
	},
	createdOn:{
		type: Date,
		default: Date.now,
		required: true
	},
	address:{
		type: String,
		required: true
	},
	foodItems:[{
		name:{
			type: String,
			required: true
		},
		price:{
			type: Number,
			required: true
		},
		quantity:{
			type: Number,
			required: true,
			default: 1
		}
	}],
	status:{
		type: String,
		required: true,
		enum: statusArray,
		default: statusArray[3]
	}
});