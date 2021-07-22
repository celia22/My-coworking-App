const express = require('express');

const router = express.Router();
const { checkIfLoggedIn } = require('../middlewares');
const { isAdmin } = require('../middlewares');
const uploader = require('../configs/cloudinary.config');

const Space = require('../models/Space');

// tested OK
router.post('/new', isAdmin, uploader.array('imageUrlSpace', 4), async (req, res) => {
	const { spaceName, spaceType, imageUrlSpace, product, daily, weekly, monthly, city } = req.body;
	console.log(req.body);
	try {
		const newSpace = await Space.create({
			spaceName,
			spaceType,
			imageUrlSpace,
			product,
			// price: { daily, weekly, monthly },
			daily,
			weekly,
			monthly,
			city,
		});
		res.status(201).json(newSpace, { secure_url: req.file.path });
	} catch (err) {
		res.json(err);
	}
});

router.get('/all', checkIfLoggedIn, async (req, res) => {
	try {
		const space = await Space.find();
		res.json(space);
	} catch (err) {
		res.json(err);
	}
});

router.get('/:id/details', checkIfLoggedIn, async (req, res) => {
	try {
		const dbSpace = await Space.findById(req.params.id);
		res.status(200).json(dbSpace);
	} catch (err) {
		res.json(err);
	}
});

router.put('/:id/edit', isAdmin, uploader.array('imageUrlSpace'), isAdmin, async (req, res, next) => {
	const { id } = req.params;
	const { spaceName, spaceType, imageUrlSpace, product, daily, weekly, monthly, city } = req.body;
	try {
		await Space.findByIdAndUpdate(id, { spaceName, spaceType, imageUrlSpace, product, daily, weekly, monthly, city });
		if (!req.file) {
			next(new Error('No file uploaded!'));
			return;
		}
		res.json({
			message: `Space with ${req.params.id} is updated successfully.`,
			secure_url: req.file.path,
		});
	} catch (err) {
		res.json(err);
	}
});

router.delete('/:id/delete', isAdmin, async (req, res) => {
	const { id } = req.params;
	try {
		await Space.findByIdAndRemove(id, req.body);
		res.json({
			message: `Space with ${req.params.id} is removed successfully.`,
		});
	} catch (err) {
		res.json(err);
	}
});

module.exports = router;
