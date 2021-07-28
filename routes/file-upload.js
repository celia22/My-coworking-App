const express = require('express');

const router = express.Router();

const uploadCloud = require('../configs/cloudinary.config');

router.post('/upload', uploadCloud.single('imgUrl'), (req, res, next) => {
	console.log('file is: ', req.file);
	try {
		res.json({ secure_url: req.file.path });
	} catch (err) {
		res.json(err);
	}
	// get secure_url from the file object and save it in the
	// variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
});

module.exports = router;

// TO UPLOAD ARRAY OF IMAGES, WORKS FROM POSTMAN, CHECK IN FRONT END IF POSSIBLE

// router.post('/upload', uploadCloud.array('imgUrl', 5), async (req, res, next) => {
// 	console.log('file is: ', req.file);
// 	try {
// 		const pictureFiles = req.files;
// 		const multiplePicturePromise = pictureFiles.map(picture => cloudinary.v2.uploader.upload(picture.path));
// 		const imageResponses = await Promise.all(multiplePicturePromise);
// 		res.json({ secure_url: imageResponses });
// 	} catch (err) {
// 		res.json(err);
// 	}
// 	// get secure_url from the file object and save it in the
// 	// variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
// });
