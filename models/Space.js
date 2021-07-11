const mongoose = require('mongoose');

const { Schema } = mongoose;

const spaceSchema = new Schema(
	{
		spaceName: String,
		spaceType: String,
		imageUrlspace: String,
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
		price: Number,
		// owner: { type: Schema.Types.ObjectId, ref: "User" },
	},
	{
		timestamps: true,
	}
);

const Space = mongoose.model('Space', spaceSchema);

module.exports = Space;
