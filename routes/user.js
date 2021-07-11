const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const User = require('../models/User');

// testeado
// router.post('/new', (req, res) => {
// 	const { username, imageUrluser, city, owner } = req.body;
// 	User.create({
// 		firstName: req.body.firstName,
// 		lastName: req.body.lastName,
// 		username: req.body.username,
// 		city: req.body.city,
// 		password: req.body.password,
// 		role: req.body.role,
// 		//owner: req.user._id, // <== !!!
// 	})
// 		.then(response => {
// 			res.json(response);
// 		})
// 		.catch(err => {
// 			res.json(err);
// 		});
// });

// testeado OK, pero no creo que haga falta
router.get('/all', (req, res) => {
	User.find()
		.then(allItems => {
			res.json(allItems);
		})
		.catch(err => {
			res.json(err);
		});
});

// testeado OK
router.get('/:id', (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	User.findById(req.params.id)
		.then(item => {
			res.status(200).json(item);
		})
		.catch(error => {
			res.json(error);
		});
});

//testeado OK
router.put('/:id', (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	User.findByIdAndUpdate(req.params.id, req.body)
		.then(() => {
			res.json({
				message: `User with ${req.params.id} is updated successfully.`,
			});
		})
		.catch(error => {
			res.json(error);
		});
});

// tested OK
router.delete('/:id', (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	User.findByIdAndRemove(req.params.id)
		.then(() => {
			res.json({
				message: `user with ${req.params.id} is removed successfully.`,
			});
		})
		.catch(error => {
			res.json(error);
		});
});

module.exports = router;
