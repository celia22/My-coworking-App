const mongoose = require('mongoose');

const { Schema } = mongoose;

const spaceSchema = new Schema(
	{
		spaceName: {
			type: String,
			required: [true, 'SpaceName is required.'],
		},
		spaceType: {
			type: String,
			enum: ['Desk', 'Room'],
			required: [true, 'SpaceType is required.'],
		},
		imageUrlSpace: {
			type: String,
			required: [true, 'Image is required.'],
		},
		price: {
			daily: Number,
			weekly: Number,
			monthly: Number,
		},
		// daily: {
		// 	type: Number,
		// 	required: [true, 'Daily price is required.'],
		// },
		// weekly: {
		// 	type: Number,
		// 	required: [true, 'Weekly price is required.'],
		// },
		// monthly: {
		// 	type: Number,
		// 	required: [true, 'Monthly price is required.'],
		// },

		city: {
			type: String,
			required: [true, 'City is required.'],
		},
	},
	{
		timestamps: true,
	}
);

const Space = mongoose.model('Space', spaceSchema);

module.exports = Space;
