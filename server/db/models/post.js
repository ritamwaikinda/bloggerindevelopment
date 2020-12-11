const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
	{
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			//set this so only blog owner can post.
		},
		title: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		images: [
			{
				image: {
					type: String,
				},
			},
		],
	},
	{
		timestamp: true,
	}
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
