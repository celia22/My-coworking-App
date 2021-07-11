const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema(
	{
		firstName: String,
		lastName: String,
		username: { type: String, required: true, unique: true },
		hashedPassword: { type: String, required: true },
		email: {
			type: String,
			required: [true, 'Email is required.'],
			unique: true,
			lowercase: true,
			trim: true,
			match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
		},
		city: String,
		// role: {
		// 	type: String,
		// 	enum: ['owner', 'customer'],
		// 	default: 'customer',
		// },
	},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
	}
);

const User = model('User', userSchema);

module.exports = User;

// const mongoose = require('mongoose');

// const { Schema } = mongoose;

// const userSchema = new Schema(
// 	{
// 		username: { type: String, required: true, unique: true },
// 		hashedPassword: { type: String, required: true },
// 	},
// 	{
// 		timestamps: {
// 			createdAt: 'created_at',
// 			updatedAt: 'updated_at',
// 		},
// 	}
// );

// const User = mongoose.model('User', userSchema);

// module.exports = User;
