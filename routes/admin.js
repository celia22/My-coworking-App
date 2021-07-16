const express = require('express');
// const mongoose = require('mongoose');

const router = express.Router();

// const User = require('../models/User');
const Space = require('../models/Space');
// const Product = require('../models/Product');

router.get('/main', async (req, res) => {
	const userId = req.session.currentUser.id;
	try {
		const space = await Space.find(userId);
		res.json(space);
	} catch (err) {
		res.json(err);
	}
});

module.exports = router;
