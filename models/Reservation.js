const mongoose = require('mongoose');

const { Schema } = mongoose;

const reservationSchema = new Schema(
	{
		space: {
			type: Schema.Types.ObjectId,
			ref: 'Space',
		},
		cart: {
			type: [Schema.Types.ObjectId],
			ref: 'Product',
		},
		prices: [Number],
		totalAmount: Number,
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		// status: {
		// 	type: String,
		// 	enum: ['confirmed', 'closed'],
		// 	default: 'confirmed',
		// },
	},
	{
		timestamps: true,
	}
);

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
