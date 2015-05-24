var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//1 CCS 2 CTS 3 Admins 4 Users

var UserSchema = new Schema({
	Name: String,
	SID: String,
	Hosteller: Boolean,
	Clubs: {type: [String], default:["PEC"]},
	MobileNo: {type: String, unique: true},
	Category: {type: Number, default: 4},
	CreatedOn: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', UserSchema);