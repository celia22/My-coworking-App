const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
	// coworkingName: {
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'Coworking',
	// },
	imageUrlProduct: String,
	price: Number,
	description: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
