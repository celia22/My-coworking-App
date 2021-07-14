const express = require('express');
// const mongoose = require('mongoose');

const router = express.Router();
const { isAdmin } = require('../middlewares');

// const User = require('../models/User');
const Space = require('../models/Space');
// const Product = require('../models/Product');

router.get('/spaces', async (req, res) => {
	const userId = req.session.currentUser.id;
	try {
		const space = await Space.find(userId);
		res.json(space);
	} catch (err) {
		res.json(err);
	}
});

module.exports = router;
