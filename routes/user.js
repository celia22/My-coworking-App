const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const { checkIfLoggedIn } = require('../middlewares');
const { isAdmin } = require('../middlewares');

const User = require('../models/User');
const Space = require('../models/Space');
const Product = require('../models/Product');

router.get('/main', isAdmin, checkIfLoggedIn, async (req, res) => {
	try {
		const dbUser = await User.findById(req.session.currentUser.id);
		const dbSpaces = await Space.find();
		const dbProducts = await Product.find();
		res.json({ dbUser, dbSpaces, dbProducts });
	} catch (err) {
		res.json(err);
	}
});

router.get('/all', async (req, res) => {
	try {
		const user = await User.find();
		console.log('Users', user);
		res.json(user);
	} catch (err) {
		res.json(err);
	}
});

router.get('/:id', async (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	try {
		const user = await User.findById(req.params.id);
		res.status(200).json(user);
	} catch (err) {
		res.json(err);
	}
});

router.put('/:id', async (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	try {
		await User.findByIdAndUpdate(req.params.id, req.body);
		res.json({
			message: `User with ${req.params.id} is updated successfully.`,
		});
	} catch (err) {
		res.json(err);
	}
});

router.delete('/:id', async (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	try {
		await User.findByIdAndRemove(req.params.id, req.body);
		res.json({ message: `User with ${req.params.id} is removed successfully.` });
	} catch (err) {
		res.json(err);
	}
});

module.exports = router;
