// server.js

// BASE SETUP
// ======================================================

//import model files .. mongoose
var User = require('./app/models/user.js');

//call the packages we need
var express = require("express");	//call express
var app = express();	//define our app using express
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//connect to our database
mongoose.connect("mongodb://localhost:27017/users");

//configure app to use bodyParser
//this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 1337; //set our port

// ROUTES FOR OUR API
// ======================================================

var router = express.Router();

//middleware to use for all requests
router.use(function(req,res,next){
	//log (Do analytics for all request , do a common task like verification here)
	console.log("A request came:- ");
	next(); //make sure we go to the next routes and not stop here
});



// test route to make sure everything is working (accessed at GET http://ip_address/api/)
router.get("/",function(req,res){
	res.json({message: 'woohoo !!!!'});
});

//routes that end with /users
router.route('/users')
	//create a user POST http://ip/api/users
	.post(function(req,res){
		var newUser = new User();
		
		newUser.Name = req.body.Name;
		newUser.SID = req.body.SID;
		newUser.Hosteller = req.body.Hosteller;
		newUser.MobileNo = req.body.MobileNo;
		
		//check for any errors..
		newUser.save(function(err, user){
			if(err){
				res.send(err);
			}
			console.log("User created" + user);
			res.json(user);
		});
	})

	.get(function(req,res){
		User.find(function(err,users){
			if(err){
				res.send(err);
			}
			console.log("Listing users")
			res.json(users);
		})
	});

//routes that end in /users/:user_id
router.route('/users/:user_id')

	//get the user with that id (GET http://ip/api/users/:user_id)
	.get(function(req,res){
		User.findById(req.params.user_id,function(err,user){
			if(err){
				res.send(err);
			}
			res.json(user);
		});
	});


//REGISTER OUR ROUTES
//all of our routes will be prefixed with /api
app.use('/api',router);

//START THE SERVER
// ======================================================
app.listen(port);
console.log("Server running at port :- " + port);


