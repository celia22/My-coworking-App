const express = require('express');
const { UnsupportedMediaType } = require('http-errors');
const mongoose = require('mongoose');

const router = express.Router();

const User = require('../models/User');

// testeado OK, pero no creo que haga falta
router.get('/all', async (req, res) => {
	try {
		User.find();
		await (allItems => {
			res.json(allItems);
		});
	} catch (err) {
		res.json(err);
	}
});

// testeado OK
router.get('/:id', async (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	try {
		User.findById(req.params.id);
		await (item => {
			res.status(200).json(item);
		});
	} catch (err) {
		res.json(err);
	}
});

//testeado OK
router.put('/:id', async (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	try {
		User.findByIdAndUpdate(req.params.id, req.body);
		await (() => {
			res.json({
				message: `User with ${req.params.id} is updated successfully.`,
			});
		});
	} catch (err) {
		res.json(err);
	}
});

// tested OK
router.delete('/:id', async (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	try {
		User.findByIdAndRemove(req.params.id, req.body);
		await (() => {
			res.json({
				message: `User with ${req.params.id} is removed successfully.`,
			});
		});
	} catch (err) {
		res.json(err);
	}
});

module.exports = router;
