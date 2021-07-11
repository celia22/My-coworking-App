const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Space = require('../models/Space');

// tested OK
// router.post('/new', (req, res) => {
// 	const { spaceName, imageUrlspace, city, owner } = req.body;
// 	Space.create({
// 		spaceName: req.body.spaceName,
// 		imageUrlSpace: req.body.imageUrlspace,
// 		city: req.body.city,
// 		owner: req.body.owner,
// 		//owner: req.user._id, // <== !!!
// 	})
// 		.then(response => {
// 			res.json(response);
// 		})
// 		.catch(err => {
// 			res.json(err);
// 		});
// });

router.post('/new', async (req, res) => {
	const { spaceName, imageUrlSpace, city, owner } = req.body;
	try {
		const newSpace = await Space.create({
			spaceName,
			imageUrlSpace,
			city,
			owner,
			//owner: req.user._id, // <== !!!
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
