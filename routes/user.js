const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const User = require('../models/User');

// testeado OK, pero no creo que haga falta
router.get('/all', async (req, res) => {
	try {
		const user = await User.find();
		res.json(user);
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
		const user = await User.findById(req.params.id);
		res.status(200).json(user);
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
		await User.findByIdAndUpdate(req.params.id, req.body);
		res.json({
			message: `User with ${req.params.id} is updated successfully.`,
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
		await User.findByIdAndRemove(req.params.id, req.body);
		res.json({ message: `User with ${req.params.id} is removed successfully.` });
	} catch (err) {
		res.json(err);
	}
});

module.exports = router;
