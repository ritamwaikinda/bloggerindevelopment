const User = require("../db/models/user");

//unsecured
exports.loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await user.findByCredentials(email, password);
		const token = await user.assignToken();
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
		const token = await user.assignToken();
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