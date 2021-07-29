const express = require('express');

const router = express.Router();

const { isAdmin } = require('../middlewares');
const { checkIfLoggedIn } = require('../middlewares');

const Product = require('../models/Product');

router.post('/new', isAdmin, async (req, res) => {
	const { productPrice, productDescription } = req.body;
	try {
		const newProduct = await Product.create({
			productPrice,
			productDescription,
		});
		res.json(newProduct);
	} catch (err) {
		res.json(err);
	}
});

router.get('/all', checkIfLoggedIn, async (req, res) => {
	try {
		const product = await Product.find();
		res.json(product);
	} catch (err) {
		res.json(err);
	}
});

router.get('/:id/details', checkIfLoggedIn, async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		res.status(200).json(product);
	} catch (err) {
		res.json(err);
	}
});

router.put('/:id/edit', isAdmin, async (req, res) => {
	const { id } = req.params;
	const { productPrice, productDescription } = req.body;
	try {
		await Product.findByIdAndUpdate(id, { productPrice, productDescription });
		res.json({
			message: `Space with ${req.params.id} is updated successfully.`,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete('/:id/delete', isAdmin, async (req, res) => {
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
