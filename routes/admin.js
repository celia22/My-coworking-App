const express = require('express');
// const mongoose = require('mongoose');

const router = express.Router();
const { isAdmin } = require('../middlewares');

// const User = require('../models/User');
// const Space = require('../models/Space');
// const Product = require('../models/Product');

// no hace el redirect
router.get('/admin', isAdmin, (req, res) => {
	res.status(200).json({
		message: 'Welcome to admin page',
	});
});

module.exports = router;
