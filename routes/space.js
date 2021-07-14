const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const { checkIfLoggedIn } = require('../middlewares');

const Space = require('../models/Space');
const User = require('../models/User');
const Product = require('../models/Product');

// tested OK
router.post('/new', checkIfLoggedIn, async (req, res) => {
	const { spaceName, spaceType, imageUrlSpace, services, availableSpots, price } = req.body;
	const userId = req.session.currentUser.id;
	try {
		const newSpace = await Space.create({
			spaceName,
			spaceType,
			imageUrlSpace,
			services,
			price,
		});
		if (newSpace) {
			await User.findByIdAndUpdate(userId, { role: 'admin' });
		} else {
			res.status(500).json();
		}
		res.json(newSpace);
	} catch (err) {
		res.json(err);
	}
});

router.get('/all', checkIfLoggedIn, async (req, res) => {
	try {
		const space = await Space.find();
		res.json(space);
	} catch (err) {
		res.json(err);
	}
});

router.get('/:id', checkIfLoggedIn, async (req, res) => {
	try {
		const dbSpace = await Space.findById(req.params.id);
		const dbProducts = await Product.find({ spaceName: dbSpace });
		res.status(200).json(dbSpace, dbProducts);
	} catch (err) {
		res.json(err);
	}
});

router.put('/:id', checkIfLoggedIn, async (req, res) => {
	const { id } = req.params;
	const { spaceName, spaceType, imageUrlSpace, services, availableSpots, price } = req.body;
	try {
		await Space.findByIdAndUpdate(id, spaceName, spaceType, imageUrlSpace, services, availableSpots, price);
		res.json({
			message: `Space with ${req.params.id} is updated successfully.`,
		});
	} catch (err) {
		res.json(err);
	}
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		await Space.findByIdAndRemove(id, req.body);
		res.json({
			message: `Space with ${req.params.id} is removed successfully.`,
		});
	} catch (err) {
		res.json(err);
	}
});

module.exports = router;
