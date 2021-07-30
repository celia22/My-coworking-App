const express = require('express');

const router = express.Router();
const { checkIfLoggedIn } = require('../middlewares');
// const { isAdmin } = require('../middlewares');

const Reservation = require('../models/Reservation');
const User = require('../models/User');
// const Product = require('../models/Product');

router.post('/new', checkIfLoggedIn, async (req, res) => {
	const { _id } = req.session.currentUser;
	const { spaces, products, totalAmount } = req.body;
	try {
		// const dbUser = await User.findById(_id);
		const newReservation = await Reservation.create({
			user: _id,
			spaces,
			products,
			totalAmount,
		});
		res.status(200).json(newReservation);
	} catch (err) {
		res.json(err);
	}
});

router.get('/all', checkIfLoggedIn, async (req, res) => {
	const { _id } = req.session.currentUser;
	try {
		const currentUser = await User.findById(_id);
		if (currentUser.role === 'admin') {
			const reservation = await Reservation.find().populate('products').populate('spaces');
			res.json(reservation);
		} else {
			const reservation = await Reservation.find({ user: _id }).populate('products').populate('spaces');
			res.json(reservation);
		}
	} catch (err) {
		res.json(err);
	}
});

// router.get('/all', isAdmin, async (req, res) => {
// 	try {
// 		const reservation = await Reservation.find().populate('product');
// 		res.json(reservation);
// 	} catch (err) {
// 		res.json(err);
// 	}
// });

router.get('/:id/details', checkIfLoggedIn, async (req, res) => {
	const { id } = req.params;
	try {
		const reservation = await Reservation.findById(id);
		res.status(200).json(reservation);
	} catch (err) {
		res.json(err);
	}
});

router.put('/:id/edit', checkIfLoggedIn, async (req, res) => {
	const { id } = req.params;
	const { space, cart, prices, user, status, totalAmount } = req.body;
	try {
		await Reservation.findByIdAndUpdate(id, { space, cart, prices, user, status, totalAmount });
		res.json({
			message: `Space with ${req.params.id} is updated successfully.`,
		});
	} catch (err) {
		res.json(err);
	}
});

router.delete('/:id/delete', checkIfLoggedIn, async (req, res) => {
	try {
		await Reservation.findByIdAndRemove(req.params.id, req.body);
		res.json({
			message: `Space with ${req.params.id} is removed successfully.`,
		});
	} catch (err) {
		res.json(err);
	}
});

module.exports = router;
