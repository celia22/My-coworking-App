const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
	productPrice: Number,
	productDescription: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
