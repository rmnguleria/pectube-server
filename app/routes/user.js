var User = require('../models/user');
var Club = require('../models/club');
var express = require('express');

var router = express.Router();

// ROUTES CONCERNED WITH Create , Read OPERATIONS ON USERS

//routes that end with /users
router.route('/')
	//create a user POST http://ip/api/users
	.post(function(req,res){
		var newUser = new User();
		
		if(typeof req.body.Name != 'undefined')
			newUser.Name = req.body.Name;
		if(typeof req.body.SID != 'undefined')
			newUser.SID = req.body.SID;
		if(typeof req.body.Hosteller != 'undefined')
			newUser.Hosteller = req.body.Hosteller;
		if(typeof req.body.Sex != 'undefined')
			newUser.Sex = req.body.Sex;
		if(typeof req.body.Clubs != 'undefined')
			newUser.Clubs = req.body.Clubs;
		if(typeof req.body.MobileNo != 'undefined')
			newUser.MobileNo = req.body.MobileNo;
		if(typeof req.body.Verified != 'undefined')
			newUser.Verified = req.body.Verified;
		
		//check for any errors..
		newUser.save(function(err, user){
			if(err){
				res.send(err);
			}
			else{
				console.log("User created" + user);
				res.json(user);
			}
		});
	})

	.get(function(req,res){
		User.find(function(err,users){
			if(err){
				res.send(err);
			}
			else{
				console.log("Listing users")
				res.json(users);
			}
		})
	});

//routes that end in /users/:user_id
router.route('/:user_id')

	//get the user with that id (GET http://ip/api/users/:user_id)
	.get(function(req,res){
		User.findById(req.params.user_id,function(err,user){
			if(err){
				res.send(err);
			}else{
				res.json(user);
			}
		});
	})

	.put(function(req,res){
		User.findById(req.params.user_id, function(err,oldUser){
			if(err){
				res.send(err);
			}
			oldUser.Name = req.body.Name;
			oldUser.Hosteller = req.body.Hosteller;
			oldUser.Clubs = req.body.Clubs;

			oldUser.save(function(err,newUser){
				if(err){
					res.send(err);
				}
				res.json(newUser);
			});
		});
	});

router.route('/:user_id/joinclub/:club_id')
	.put(function(req,res){
		
		var guser = new User();

		Club.findById(req.params.club_id,function(err,club){
			if(err){
				res.send(err);
			}
		});
		
		User.findByIdAndUpdate(req.params.user_id,
			{$push: {Clubs: req.params.club_id}},
			function(err,user){
				if(err){
					res.send(err);
				}else{
					guser = user;
					console.log("Club added to user Object");
				}
			}
		);

		Club.findByIdAndUpdate(req.params.club_id,
			{$push: {members: req.params.user_id}},
			function(err,club){
				if(err){
					res.send(err);
				}else{
					console.log("User added to club ");
					res.json(guser);
				}
			}
		);
	});

router.route('/:user_id/leaveClub/:club_id')
	.put(function(req,res){
		Club.findById(req.params.club_id,function(err,club){
			if(err){
				console.log('Error finding club ' + err);
				res.send(err);
			}
		});

		// TODO :- We can use remove , it is an alias of pull . read mongoose docs.
		
		User.findByIdAndUpdate(req.params.user_id,
			{$pull: {Clubs: req.params.club_id}},
			function(err,user){
				if(err){
					res.send(err);
				}else{
					console.log("Club removed from user Object");
				}
			}
		);

		Club.findByIdAndUpdate(req.params.club_id,
			{$pull: {members: req.params.user_id}},
			function(err,club){
				if(err){
					res.send(err);
				}else{
					console.log("User removed from club ");
				}
			}
		);

	});

module.exports = router;

// http://localhost:1337/users/557e86d0f920b4c851000004/joinclub/557c6acfc7615f9617000002