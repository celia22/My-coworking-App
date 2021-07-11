const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Product = require('../models/Product');

router.post('/new', async (req, res) => {
	const { spaceName, imageUrlspace, city, owner } = req.body;
	try {
		const newProduct = await Product.create({
			spaceName: req.body.spaceName,
			imageUrlProduct: req.body.imageUrlProduct,
			price: req.body.city,
			description: req.body.owner,
		});
		res.json(newProduct);
	} catch (err) {
		res.json(err);
	}
});

//tested OK
router.get('/all', async (req, res) => {
	try {
		const product = await Product.find();
		res.json(product);
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
		const product = await Product.findById(req.params.id);
		res.status(200).json(product);
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
		await Product.findByIdAndUpdate(req.params.id, req.body);
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
		await Product.findByIdAndRemove(req.params.id, req.body);
		res.json({
			message: `Space with ${req.params.id} is removed successfully.`,
		});
	} catch (err) {
		res.json(err);
	}
});

module.exports = router;
