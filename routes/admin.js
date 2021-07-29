const express = require('express');

const router = express.Router();
const { isAdmin } = require('../middlewares');
const Space = require('../models/Space');

router.get('/', isAdmin, async (req, res) => {
	const userId = req.session.currentUser.id;
	try {
		const space = await Space.find(userId);
		res.json(space);
	} catch (err) {
		res.json(err);
	}
});

module.exports = router;
