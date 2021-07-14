const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Reservation = require('../models/Reservation');

router.post('/new', async (req, res) => {
	const { spaceName, products, price, user, dates } = req.body;
	try {
		const newReservation = await Reservation.create({
			spaceName,
			products,
			price,
			user,
			dates,
		});
		res.json(newReservation);
	} catch (err) {
		res.json(err);
	}
});

// tested OK
router.get('/all', async (req, res) => {
	try {
		const reserv = await Reservation.find();
		res.json(reserv);
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
		const reserv = await Reservation.findById(req.params.id);
		res.status(200).json(reserv);
	} catch (err) {
		res.json(err);
	}
});

// testead OK
router.put('/:id', async (req, res) => {
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

// testead Ok
router.delete('/:id', async (req, res) => {
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
