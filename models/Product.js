const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const productSchema = new Schema({
	coworkingName: {
		type: Schema.Types.ObjectId,
		ref: 'Coworking',
	},
	imageUrlProduct: String,
	price: Number,
	description: String,
});

const Product = model('Product', productSchema);

module.exports = Product;
