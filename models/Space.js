const mongoose = require('mongoose');

const { Schema } = mongoose;

const spaceSchema = new Schema(
	{
		spaceName: String,
		spaceType: {
			type: String,
			enum: ['desk', 'room'],
		},
		imageUrlSpace: String,
		// services: [
		// 	{
		// 		product: {
		// 			type: Schema.Types.ObjectId,
		// 		},
		// 	},
		// ],
		products: {
			coffeeAndPastries: Number,
			extraLargeDesktop: Number,
			extraDesktop: Number,
			fruit: Number,
			extraScreen: Number,
			wifi: Number,
			ergonomicChair: Number,
			appleKeyboard: Number,
			appleMagicMouse: Number,
		},
		price: {
			daily: Number,
			weekly: Number,
			monthly: Number,
		},
	},
	{
		timestamps: true,
	}
);

const Space = mongoose.model('Space', spaceSchema);

module.exports = Space;
