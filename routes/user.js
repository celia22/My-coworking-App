const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const { checkIfLoggedIn } = require('../middlewares');

const User = require('../models/User');
const Space = require('../models/Space');
const Product = require('../models/Product');

router.get('/main', checkIfLoggedIn, async (req, res) => {
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
		res.json(user);
	} catch (err) {
		res.json(err);
	}
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findById(id);
		res.status(200).json(user);
	} catch (err) {
		res.json(err);
	}
});

router.put('/:id/edit', async (req, res) => {
	const { id } = req.params;
	const { email, password, firstName, lastName, city } = req.body;
	try {
		await User.findByIdAndUpdate(id, email, password, firstName, lastName, city);
		res.json({
			message: `User with ${id} is updated successfully.`,
		});
	} catch (err) {
		res.json(err);
	}
});

router.delete('/:id/delete', async (req, res) => {
	const { id } = req.params;
	try {
		await User.findByIdAndRemove(id, req.body);
		res.json({ message: `User with ${id} is removed successfully.` });
	} catch (err) {
		res.json(err);
	}
});

module.exports = router;
