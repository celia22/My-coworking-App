const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Space = require('../models/space');

// tested OK
router.post('/new', (req, res) => {
	const { spaceName, imageUrlspace, city, owner } = req.body;
	Space.create({
		spaceName: req.body.spaceName,
		imageUrlSpace: req.body.imageUrlspace,
		city: req.body.city,
		owner: req.body.owner,
		//owner: req.user._id, // <== !!!
	})
		.then(response => {
			res.json(response);
		})
		.catch(err => {
			res.json(err);
		});
});

//tested OK
router.get('/all', (req, res) => {
	Space.find()
		.then(allItems => {
			res.json(allItems);
		})
		.catch(err => {
			res.json(err);
		});
});

// testead OK
router.get('/:id', (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Space.findById(req.params.id)
		.then(item => {
			res.status(200).json(item);
		})
		.catch(error => {
			res.json(error);
		});
});

//testead OK
router.put('/:id', (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Space.findByIdAndUpdate(req.params.id, req.body)
		.then(() => {
			res.json({
				message: `Project with ${req.params.id} is updated successfully.`,
			});
		})
		.catch(error => {
			res.json(error);
		});
});

//testead OK
router.delete('/:id', (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Space.findByIdAndRemove(req.params.id)
		.then(() => {
			res.json({
				message: `Space with ${req.params.id} is removed successfully.`,
			});
		})
		.catch(error => {
			res.json(error);
		});
});

module.exports = router;
