var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FoodItemSchema = new Schema({
	Name:{
		type: String,
		required: true
	},
	Price:{
		type: Number,
		required: true
	},
	Veg:{
		type: Boolean,
		default: true,
		required: true
	},
	Quantity:{
		type: Number,
		required: true,
		default: 1
	},
	modifiedOn:{
		type: Date,
		default: Date.now,
		required: true
	},
	Rating:{
		type: Number
	},
	Reviews:[String]
});

var TakeawaySchema = new Schema({
	Name:{
		type: String,
		required: true
	},
	MenuItems:[FoodItemSchema],
	open:{
		type: Boolean,
		default: false,
		required: true
	},
	closingTime:{
		type: Date
	}
});

module.exports = mongoose.model('Takeaway',TakeawaySchema);