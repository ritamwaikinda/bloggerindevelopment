const mongoose = require("mongoose");

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
		posts: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
		},
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

//things we want to do: everything important when putting things into the database, and taking things out of the database
//delete hashed password and tokens when coming from database
//give token & check tokens each time
//encrypt password when initialized and/or changed in order to keep it safe
//add cloudinary...

//critical
userSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();
	//const userObject = user.this.toObject();?
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
userSchema.methods.assignToken = async function () {
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

const User = mongoose.model("User", userSchema);
module.exports = User;
