var FoodOrder = require('../models/foodorder');
var express = require('express');

var router = express.Router();

router.route('/')
	.post(function(req,res){
		var newOrder = new FoodOrder();

		newOrder.orderedBy = req.body.orderedBy;
		newOrder.orderedAt = req.body.orderedAt;
		newOrder.address = req.body.address;
		
	})