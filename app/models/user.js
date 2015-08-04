var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//1 CCS 2 CTS 3 Admins 4 Users

var sexName = ['male', 'female', 'others'];
var typeUsers = ['ccs','cts','admin','user'];

var UserSchema = new Schema({
	Name: {
		type: String ,
		required: true
	},
	SID:  {
		type: String ,
		required: true
	},
	Hosteller: {
		type: Boolean,
		required: true
	},
	Sex : {
		type: String,
		enum: sexName,
		required: true
	},
	Clubs: [
		{type: mongoose.Schema.Types.ObjectId, ref: 'Club'}
	],
	MobileNo: {
		type: String,
		unique: true,
		required: true
	},
	Category: {
		type: String,
		enum: typeUsers,
		default: typeUsers[3],
		required: true
	},
	CreatedOn: {
		type: Date,
		default: Date.now,
		required: true
	},
	Verified: {
		type: Boolean,
		required: true,
		default: false
	}
});

module.exports = mongoose.model('User', UserSchema);