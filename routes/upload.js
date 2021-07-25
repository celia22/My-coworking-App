const express = require('express');

const router = express.Router();

// include CLOUDINARY:
const uploadCloud = require('../configs/cloudinary.config');

router.post('/', uploadCloud.any('img_url'), (req, res, next) => {
	try {
		res.json({ img_url: req.file.path });
	} catch (err) {
		res.json(err);
	}
	// get secure_url from the file object and save it in the
	// variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
});

module.exports = router;
