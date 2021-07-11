const mongoose = require('mongoose');

const { Schema } = mongoose;

const reservationSchema = new Schema(
	{
		coworking: {
			type: Schema.Types.ObjectId,
			ref: 'Coworking',
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
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
