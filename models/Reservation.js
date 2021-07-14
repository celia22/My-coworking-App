const mongoose = require('mongoose');

const { Schema } = mongoose;

const reservationSchema = new Schema(
	{
		spaceName: {
			type: Schema.Types.ObjectId,
			ref: 'Space',
		},
		products: [
			{
				product: {
					type: Schema.Types.ObjectId,
					ref: 'Product',
				},
				amount: {
					type: Number,
					default: 1,
				},
			},
		],
		price: Number,
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		dates: Date,
	},
	{
		timestamps: true,
	}
);

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
