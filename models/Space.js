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
		price: {
			daily: Number,
			weekly: Number,
			monthly: Number,
		},
		city: String,
	},
	{
		timestamps: true,
	}
);

const Space = mongoose.model('Space', spaceSchema);

module.exports = Space;
