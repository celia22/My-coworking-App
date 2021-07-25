const express = require('express');

const router = express.Router();
const { checkIfLoggedIn } = require('../middlewares');

const Reservation = require('../models/Reservation');
const User = require('../models/User');

router.post('/:id/new', checkIfLoggedIn, async (req, res) => {
	const { id } = req.params;
	const { space, cart, prices, totalAmount } = req.body;
	try {
		const dbUser = await User.findById(id);
		const newReservation = await Reservation.create({
			user: dbUser,
			space,
			cart,
			prices,
			totalAmount,
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
