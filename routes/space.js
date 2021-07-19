const express = require('express');

const router = express.Router();
const { checkIfLoggedIn } = require('../middlewares');
const { isAdmin } = require('../middlewares');

const Space = require('../models/Space');
const User = require('../models/User');

// tested OK
router.post('/new', async (req, res) => {
	const {
		spaceName,
		spaceType,
		imageUrlSpace,
		price: { daily, weekly, monthly },
		city,
	} = req.body;
	//	const userId = req.session.currentUser.id;
	try {
		const newSpace = await Space.create({
			spaceName,
			spaceType,
			imageUrlSpace,
			price: { daily, weekly, monthly },
			city,
		});
		// if (newSpace) {
		// 	await User.findByIdAndUpdate(userId, { role: 'admin' });
		// } else {
		// 	res.status(500).json();
		// }
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

router.get('/:id/details', checkIfLoggedIn, async (req, res) => {
	try {
		const dbSpace = await Space.findById(req.params.id);
		res.status(200).json(dbSpace);
	} catch (err) {
		res.json(err);
	}
});

router.put('/:id/edit', isAdmin, async (req, res) => {
	const { id } = req.params;
	const {
		spaceName,
		spaceType,
		imageUrlSpace,
		price: { daily, weekly, monthly },
		city,
	} = req.body;
	try {
		await Space.findByIdAndUpdate(id, { spaceName, spaceType, imageUrlSpace, price: { daily, weekly, monthly }, city });
		res.json({
			message: `Space with ${req.params.id} is updated successfully.`,
		});
	} catch (err) {
		res.json(err);
	}
});

router.delete('/:id/delete', isAdmin, async (req, res) => {
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
