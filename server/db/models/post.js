const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
	{
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
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
		comments: [
			{
				comment: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Comments",
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
