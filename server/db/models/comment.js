const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: User,
			required: true,
		},
		//can you do memberUser and anonUser? One has to be required: true? :/ better not
		text: {
			type: String,
			required: true,
			//set front-end//as a guest, your maximum character length is 20. Please register an account to enjoy full access to our comments section.
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
