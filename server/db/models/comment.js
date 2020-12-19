const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
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
//do i need to pre-save a conditional member/guest generateAuthment id population?
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
