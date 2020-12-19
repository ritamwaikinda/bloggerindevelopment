const mongoose = require("mongoose");

const guestCommentSchema = new mongoose.Schema(
	{
		anonUser: {
			type: String,
			required: true,
		},
		post: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
		},
		text: {
			type: String,
			required: true,
		},
		//stretchgoal emojis
	},
	{
		timestamp: true,
	}
);

const GuestComment = mongoose.model("GuestComment", guestCommentSchema);
module.exports = GuestComment;
