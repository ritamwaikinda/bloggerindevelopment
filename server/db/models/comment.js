const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
	{
		member: {
			type: mongoose.Schema.Types.ObjectId,
			ref: User,
		},
		guest: {
			type: String,
			required: function () {
				return this.user === !user;
			}, // Only required if a equals '!user'
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

//do i need to .pre(save) a quick conditional user/anon id population?

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
