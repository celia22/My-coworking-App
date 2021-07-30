const mongoose = require('mongoose');

const { Schema } = mongoose;

const reservationSchema = new Schema(
	{
		spaces: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Space',
			},
		],
		products: [
			{
				type: [Schema.Types.ObjectId],
				ref: 'Product',
			},
		],
		// cart: {
		// 	type: [Schema.Types.ObjectId],
		// 	ref: 'Product',
		// },
		// prices: [Number],
		// totalAmount: Number,
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		totalAmount: {
			type: Number,
		},
		// status: {
		// 	type: String,
		// 	enum: ['confirmed', 'closed'],
		// 	default: 'confirmed',
		// },
	},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
	}
);

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
