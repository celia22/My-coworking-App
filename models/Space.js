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
		services: [
			{
				product: {
					type: Schema.Types.ObjectId,
				},
				amount: {
					type: Number,
					default: 1,
				},
			},
		],
		price: [
			{
				duration: {
					type: String,
					enum: ['daily', 'weekly', 'monthly'],
					default: 'monthly',
				},
				price: {
					type: Number,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

const Space = mongoose.model('Space', spaceSchema);

module.exports = Space;
