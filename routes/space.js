const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Space = require('../models/Space');

router.post('/new', async (req, res) => {
	const { spaceName, spaceType, imageUrlSpace, services, availableSpots, price } = req.body;
	try {
		const newSpace = await Space.create({
			spaceName,
			spaceType,
			imageUrlSpace,
			services,
			availableSpots,
			price,
		});
		res.json(newSpace);
	} catch (err) {
		res.json(err);
	}
});

//tested OK
router.get('/all', async (req, res) => {
	try {
		const space = await Space.find();
		res.json(space);
	} catch (err) {
		res.json(err);
	}
});

// testead OK
router.get('/:id', async (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}
	try {
		const space = await Space.findById(req.params.id);
		res.status(200).json(space);
	} catch (err) {
		res.json(err);
	}
});

//testead OK
router.put('/:id', async (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}
	try {
		await Space.findByIdAndUpdate(req.params.id, req.body);
		res.json({
			message: `Space with ${req.params.id} is updated successfully.`,
		});
	} catch (err) {
		res.json(err);
	}
});

//testead Ok
router.delete('/:id', async (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}
	try {
		await Space.findByIdAndRemove(req.params.id, req.body);
		res.json({
			message: `Space with ${req.params.id} is removed successfully.`,
		});
	} catch (err) {
		res.json(err);
	}
});

module.exports = router;
