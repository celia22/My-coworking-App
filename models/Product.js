const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
	spaceName: {
		type: Schema.Types.ObjectId,
		ref: 'Space',
	},
	imageUrlProduct: String,
	price: Number,
	description: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
