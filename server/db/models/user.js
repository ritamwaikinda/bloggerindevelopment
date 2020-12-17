const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error("Email is invalid");
				}
			},
		},
		password: {
			type: String,
			required: true,
			trim: true,
			validate(value) {
				if (value.toLowerCase().includes("password")) {
					throw new Error("Password cannot be password");
				}
				if (value.length < 8) {
					throw new Error("Password must have 8 characters minimum.");
				}
			},
		},
		avatar: {
			type: String,
		},
		posts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Post",
			},
		],
		comments: [
			{
				comment: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Comments",
				},
			},
		],
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
		admin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamp: true,
	}
);

//critical
userSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();
	delete userObject.password;
	delete userObject.tokens;
	return userObject;
};

// hashtime
userSchema.pre("save", async function (next) {
	const user = this;
	if (user.isModified("password"))
		user.password = await bcrypt.hash(user.password, 8);
	next();
});

//token - take the user, add a jwt signature (id&name, envsecret, and expiry), pop into field, and save it.
userSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign(
		{
			_id: user._id.toString(),
			name: user.name,
		},
		process.env.JWT_SECRET,
		{ expiresIn: "24h" }
	);
	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;
};

//compare passwords using bcrypt
userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });
	if (!user) throw new Error("Invalid username or password");
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) throw new Error("Invalid username or password");
	return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
