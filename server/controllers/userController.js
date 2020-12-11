const User = require("../db/models/user");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2,

//unsecured
exports.loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findByCredentials(email, password);
		const token = await User.assignToken();
		res.cookie("jwt", token, {
			httpOnly: true,
			sameSite: "Strict",
			secure: process.env.NODE_ENV !== "production" ? false : true,
		});
		res.json(user);
	} catch (err) {
		console.log(err);
		res.status(400).json({ error: err.toString() });
	}
};

exports.createUser = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;
	try {
		const user = new User({
			firstName,
			lastName,
			email,
			password,
		});
		const token = await User.assignToken();
		res.cookie("jwt", token, {
			httpOnly: true,
			sameSite: "Strict",
			secure: process.env.NODE_ENV !== "production" ? false : true,
		});
		res.status(201).json(user);
	} catch (err) {
		res.status(400).json({ error: err.toString() });
	}
};

//secured
exports.logoutUser = async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => {
			return token.token !== req.cookies.jwt;
		});
		await req.user.save();
		res.clearCookie("jwt");
		res.json({ message: "logged out!" });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

exports.uploadAvatar = async (req, res) => {
try {
	const response = await cloudinary.uploader.upload(
		req.files.avatar.tempFilePath
	);
	req.user.avatar = response.secure_url;
	await req.user.save();
	res.json(response);
} catch (error) {
	res.status(400).json({ error: error.message });
}
};