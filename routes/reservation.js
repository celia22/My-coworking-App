const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const { checkIfLoggedIn } = require('../middlewares');

const Reservation = require('../models/Reservation');

router.post('/new', checkIfLoggedIn, async (req, res) => {
	const { spaceName, products, price, user, dates } = req.body;
	try {
		const newReservation = await Reservation.create({
			spaceName,
			products,
			price,
			user,
			// dates,
		});
		res.json(newReservation);
	} catch (err) {
		res.json(err);
	}
});

router.get('/all', checkIfLoggedIn, async (req, res) => {
	try {
		const confirmReserv = await Reservation.find({ user: req.session.currentUser.id, status: 'confirmed' })
			.populate('space')
			.populate({ path: 'product', populate: [{ path: 'spaceName' }] });
		const closedReserv = await Reservation.find({ user: req.session.currentUser.id, status: 'closed' })
			.populate('space')
			.populate({ path: 'product', populate: [{ path: 'spaceName' }] });
		res.json(confirmReserv, closedReserv);
	} catch (err) {
		res.json(err);
	}
});

router.get('/:id/details', checkIfLoggedIn, async (req, res) => {
	const { id } = req.params;

	try {
		const dbReserv = await Reservation.findById(id).populate('space').populate('products.product');
		const prices = [];
		await dbReserv.products.forEach(item => prices.push(item.product.price * item.amount));
		const total = await prices.reduce((acc, curr) => acc + curr);
		res.status(200).json(dbReserv, total);
	} catch (err) {
		res.json(err);
	}
});

router.put('/:id', checkIfLoggedIn, async (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}
	try {
		await Reservation.findByIdAndUpdate(req.params.id, req.body);
		res.json({
			message: `Space with ${req.params.id} is updated successfully.`,
		});
	} catch (err) {
		res.json(err);
	}
});

router.delete('/:id', checkIfLoggedIn, async (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}
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
