var Post = require('../models/post');
var User = require('../models/user');
var express = require('express');

var router = express.Router();

// TODO :- Change name of this model to notifications.

// ROUTES CONCERNED WITH Create , Read , Update , Delete OPERATIONS ON POSTS IN A CLUB
router.route('/')
	
	// create a new post 
	.post(function(req,res){
		var newPost = new Post();

		newPost.createdBy = req.body.userPostedId;
		newPost.title = req.body.postTitle;
		newPost.content = req.body.postContent;
		newPost.club = req.body.club_id;

		//check for any errors..
		newPost.save(function(err, post){
			if(err){
				console.log("Error Occurred" + err);
				res.send(err);
			}
			else{
				console.log("Post created" + post);
				res.json(post);
			}
		});
	})

	// get all the posts
	.get(function(req,res){
		Post.find(function(err,posts){
			if(err){
				console.log("Error Occurred" + err);
				res.send(err);
			}else{
				console.log("Sending list of posts");
				res.json(posts);
			}
		});
	});


// ROUTES CONCERNED WITH Read , Update Operations on Post with post_id
router.route('/:post_id')
	// get the post with post_id
	.get(function(req,res){
		Post.findById(req.params.post_id,function(err,post){
			if(err){
				console.log("Error Occurred while fetching post" + err);
				res.send(err);
			}
			else{
				console.log("Post retrieved " + post);
				res.json(post);
			}
		});
	})

	// update the post with post_id
	.put(function(req,res){
		Post.findById(req.params.post_id,function(err,oldPost){
			if(err){
				console.log("Error Occurred while fetching post" + err);
				res.send(err);
			}
			if(typeof req.body.postTitle != 'undefined')
				oldPost.title = req.body.postTitle;
			if(typeof req.body.postContent != 'undefined')
				oldPost.content = req.body.postContent;
			//check for any errors..
			oldPost.save(function(err, newPost){
				if(err){
					console.log("Error Occurred" + err);
					res.send(err);
				}
				else{
					console.log("Post updated" + newPost);
					res.json(newPost);
				}
			});
		});
	});

router.route('/:post_id/addcomment/:user_id')
	.put(function(req,res){
		User.findById(req.params.user_id,function(err,user){
			if(err){
				console.log("Failed to find user");
				res.send(err);
			}
		});

		Post.findById(req.params.post_id,'comments',function(err,post){
			if(err){
				console.log("Failed to fetch post");
				res.send(err);
			}else{
				
				if(typeof req.body.text === 'undefined' || req.body.text.length == 0){
					res.send("Empty Comment not allowed"); 
				}

				post.comments.push({
					text: req.body.text,
					createdBy: req.params.user_id
				});

				post.save(function(err,post){
					if(err){
						console.log("Failed to save comment into post");
						res.send(err);
					}else{
						console.log("Comment saved successfully");
						res.json(post);
					}
				});
			}
		});
	});

router.route('/:post_id/removecomment/:user_id/:comment_id')
	.put(function(req,res){
		
		User.findById(req.params.user_id,function(err,user){
			if(err){
				console.log("Failed to find user");
				res.send(err);
			}
		});

		Post.findByIdAndUpdate(req.params.post_id,
			{$pull: {comments: req.params.comment_id}},
			function(err,post){
				if(err){
					console.log("Failed to remove comment");
					res.send(err);
				}else{
					console.log("Post updated successfully");
					res.json(post);
				}
			}
		});
	});


module.exports = router;