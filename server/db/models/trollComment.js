const mongoose = require("mongoose");

const criticSchema = new mongoose.Schema(
	{
		guestName: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
	},
	{
		timestamp: true,
	}
);

const Critic = mongoose.model("Critic", criticSchema);
module.exports = Critic;

//is there a way to refactor this so the required can be switched off? ==> then consolidated with comment model??
