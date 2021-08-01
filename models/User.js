const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
	{
		firstName: String,
		lastName: String,
		hashedPassword: { type: String, required: true, match: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/ },
		email: {
			type: String,
			required: [true, 'Email is required.'],
			unique: true,
			lowercase: true,
			trim: true,
			match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
		},
		city: String,
		role: {
			type: String,
			enum: ['admin', 'customer'],
			default: 'customer',
		},
		favSpaces: [{ type: Schema.Types.ObjectId, ref: 'Space' }],
	},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
	}
);

const User = mongoose.model('User', userSchema);

module.exports = User;
