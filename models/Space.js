const mongoose = require('mongoose');

const { Schema } = mongoose;

const spaceSchema = new Schema(
	{
		spaceName: { type: String, required: true },
		spaceType: {
			type: String,
			enum: ['Desk', 'Room'],
			required: [true, 'SpaceType is required.'],
		},
		imgUrl: {
			type: [String],
			// required: [true, 'Image is required.'],
		},
		daily: { type: Number, required: true },
		weekly: { type: Number, required: true },
		monthly: { type: Number, required: true },
		city: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const Space = mongoose.model('Space', spaceSchema);

module.exports = Space;
