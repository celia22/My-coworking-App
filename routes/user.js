const express = require('express');

const router = express.Router();
const { checkIfLoggedIn } = require('../middlewares');

const User = require('../models/User');

router.get('/main', checkIfLoggedIn, async (req, res) => {
	try {
		const dbUser = await User.findById(req.session.currentUser.id);
		res.json({ dbUser });
	} catch (err) {
		res.json(err);
	}
});

// router.get('/menu', checkIfLoggedIn, async (req, res) => {
// 	try {
// 		const dbUser = await User.findById(req.session.currentUser.id);
// 		res.json({ dbUser });
// 	} catch (err) {
// 		res.json(err);
// 	}
// });

router.get('/favourites', checkIfLoggedIn, async (req, res) => {
	const { _id } = req.session.currentUser;
	try {
		const dbUser = await User.findById(_id).populate('favSpaces');
		res.json(dbUser.favSpaces);
	} catch (err) {
		res.json(err);
	}
});

router.get('/all', async (req, res) => {
	try {
		const user = await User.find();
		res.json(user);
	} catch (err) {
		res.json(err);
	}
});

router.get('/:id/details', async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findById(id);
		res.status(200).json(user);
	} catch (err) {
		res.json(err);
	}
});

router.put('/:id/update-profile', async (req, res) => {
	const { id } = req.params;
	const { email, password, firstName, lastName, city } = req.body;
	try {
		await User.findByIdAndUpdate(id, { email, password, firstName, lastName, city }, { new: true });
		res.json({
			message: `User with ${id} is updated successfully.`,
		});
	} catch (err) {
		res.json(err);
	}
});

router.delete('/:id/delete', async (req, res) => {
	const { id } = req.params;
	try {
		await User.findByIdAndRemove(id, req.body);
		res.json({ message: `User with ${id} is removed successfully.` });
	} catch (err) {
		res.json(err);
	}
});

module.exports = router;
