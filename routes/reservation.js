const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const { checkIfLoggedIn } = require('../middlewares');

const Reservation = require('../models/Reservation');

router.post('/:id/new', checkIfLoggedIn, async (req, res) => {
	const { spaceName, product, total, user, status } = req.body;
	try {
		const newReservation = await Reservation.create({
			spaceName,
			product,
			total,
			user,
			status,
		});
		res.status(200).json(newReservation);
	} catch (err) {
		res.json(err);
	}
});

router.get('/:id/all', checkIfLoggedIn, async (req, res) => {
	// separar status de confirmed y closed en el front, menos llamada a bbdd, + rapido
	// dejar un reservation find x user
	try {
		// const confirmReserv = await Reservation.find({ user: req.session.currentUser.id, status: 'confirmed' })
		// 	.populate('space')
		// 	.populate({ path: 'product', populate: [{ path: 'spaceName' }] });
		// const closedReserv = await Reservation.find({ user: req.session.currentUser.id, status: 'closed' })
		// 	.populate('space')
		// 	.populate({ path: 'product', populate: [{ path: 'spaceName' }] });
		// res.status(200).json(confirmReserv, closedReserv);
		const reservation = await Reservation.find();
		res.json(reservation);
	} catch (err) {
		res.json(err);
	}
});

router.get('/:id/details', checkIfLoggedIn, async (req, res) => {
	const { id } = req.params;

	try {
		const reservation = await Reservation.findById(id);
		res.status(200).json(reservation);
		// const dbReserv = await Reservation.findById(id).populate('space').populate('products.product');
		// const prices = [];
		// // next line para front as well, hacer calculo e component did mount
		// await dbReserv.products.forEach(item => prices.push(item.product.price * item.amount));
		// const total = await prices.reduce((acc, curr) => acc + curr); // esto va al front ?¿?¿?¿?¿?
		// res.status(200).json(dbReserv, total);
	} catch (err) {
		res.json(err);
	}
});

router.put('/:id/edit', checkIfLoggedIn, async (req, res) => {
	const { id } = req.params;
	const { spaceName, product, total, user, status } = req.body;
	try {
		await Reservation.findByIdAndUpdate(id, { spaceName, product, total, user, status });
		res.json({
			message: `Space with ${req.params.id} is updated successfully.`,
		});
	} catch (err) {
		res.json(err);
	}
});

router.delete('/:id/delete', checkIfLoggedIn, async (req, res) => {
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
