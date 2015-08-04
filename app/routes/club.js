var Club = require('../models/club');
var express = require('express');

var router = express.Router();

// ==============================================================
router.route('/')

	// create a new club
	.post(function(req,res){
		var newClub = new Club();

		if(typeof req.body.clubName != 'undefined')
			newClub.clubName = req.body.clubName;

		if(typeof req.body.description != 'undefined')
			newClub.description = req.body.description;

		if(typeof req.body.activities != 'undefined')
			newClub.activities = req.body.activities;

		if(typeof req.body.achievements != 'undefined')
			newClub.achievements = req.body.achievements;

		if(typeof req.body.heads != 'undefined')
			newClub.heads = req.body.heads;

		newClub.save(function(err,club){
			if(err){
				console.log("Error occured" + err);
				res.send(err);
			}else{
				console.log("New club created " + club);
				res.json(club);
			}
		});
	})

	// get all the clubs
	.get(function(req,res){
		Club.find('')
		.populate('members')
		.exec(function(err,clubs){
			if(err){
				res.send(err);
			}
			console.log("Listing clubs")
			res.json(clubs);
		});
	});

router.route('/fetchInfo')
	.get(function(req,res){
		Club.find('','clubName description activities achievements heads',function(err,clubs){
			if(err){
				res.send(err);
			}else{
				console.log("Fetching info about clubs");
				res.json(clubs);
			}
		});
	});

router.route('/:club_id')
	
	// fetch club with club_id
	.get(function(req,res){
		Club.findById(req.params.club_id,function(err,club){
			if(err){
				console.log('Error finding club ' + err);
				res.send(err);
			}
			res.json(club);
		});
	})

	// update club with club_id
	.put(function(req,res){
		Club.findById(req.params.club_id,function(err,oldClub){
			if(err){
				console.log("Error Occurred while fetching club" + err);
				res.send(err);
			}

			if(typeof req.body.clubName != 'undefined')
				oldClub.clubName = req.body.clubName;

			if(typeof req.body.description != 'undefined')
				oldClub.description = req.body.description;

			if(typeof req.body.activities != 'undefined')
				oldClub.activities = req.body.activities;

			if(typeof req.body.achievements != 'undefined')
				oldClub.achievements = req.body.achievements;

			if(typeof req.body.heads != 'undefined')
				oldClub.heads = req.body.heads;

			//check for any errors..
			oldClub.save(function(err, newClub){
				if(err){
					console.log("Error Occurred" + err);
					res.send(err);
				}
				else{
					console.log("Club updated" + newClub);
					res.json(newClub);
				}
			});
		});
	})

	// delete the club
	.delete(function(req,res){
		Club.findByIdAndRemove(req.params.club_id,function(err,club){
			if(err){
				console.log(err);
				res.send(err);
			}else{
				console.log("Club " + club.clubName + " deleted");
				res.send("Club deleted Successfully");
			}
		});
	});

module.exports = router;