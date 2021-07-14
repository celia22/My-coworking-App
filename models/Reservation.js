const mongoose = require('mongoose');

const { Schema } = mongoose;

const reservationSchema = new Schema(
	{
		spaceName: {
			type: Schema.Types.ObjectId,
			ref: 'Space',
		},
		product: {
			type: Schema.Types.ObjectId,
			ref: 'Product',
		},
		total: Number,
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		status: {
			type: String,
			enum: ['confirmed', 'closed'],
			default: 'confirmed',
		},
	},
	{
		timestamps: true,
	}
);

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
