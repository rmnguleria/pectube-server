// BASE SETUP
// ========================================================

//call the packages we need
var express = require("express");	//call express
var app = express();	//define our app using express
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


//import routing files .. mongoose
var userRoutes = require('./app/routes/user');
var clubRoutes = require('./app/routes/club');
var postRoutes = require('./app/routes/post');

//connect to our database
mongoose.connect("mongodb://localhost:27017/TestDB3");


//configure app to use bodyParser
//this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port = 1337; //set our port


var router = express.Router();

//middleware to use for all requests
router.use(function(req,res,next){
	//log (Do analytics for all request , do a common task like verification here)
	var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	console.log("A request came:- " + fullUrl);
	next(); //make sure we go to the next routes and not stop here
});

// test route to make sure everything is working (accessed at GET http://ip_address/api/)
router.get("/",function(req,res){
	res.json({message: 'woohoo !!!!'});
});


//REGISTER OUR ROUTES
//all of our routes will be prefixed with /api
app.use('/',router);
app.use('/users',userRoutes);
app.use('/posts',postRoutes);
app.use('/clubs',clubRoutes);



//START THE SERVER
// ======================================================
app.listen(port);
console.log("Server running at port :- " + port);