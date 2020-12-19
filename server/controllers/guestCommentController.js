const mongoose = require("mongoose");
const GuestComment = require("../db/models/guestComment");
const Post = require("../db/models/post");
const User = require("../db/models/user");
const Comments = require("../db/models/comment");

//unsecured
exports.addGuestComment = async (req, res) => {
	const { text, post, anonUser } = req.body;
	console.log(req.body);
	try {
		const guestComment = new GuestComment({
			text,
			post,
			anonUser,
		});
		await guestComment.save();
		const postComments = await Post.findById(req.params.id);
		postComments.comments.push(guestComment);
		await postComments.save();
		res.status(200).json({ message: "comment submitted" });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

exports.getAllCommentsByPost = async (req, res) => {
	// const id = req.params.id;
	try {
		const post = await Post.findById(req.params.id).populate("comment").exec();
		console.log(post.comments.text);
		res.status(200).json(post);
	} catch (error) {
		console.log(error);
		res.status(400).json("Please try again...");
	}
};

// const id = req.params.id;
// try {
// 	const post = await Post.findById(req.params.id)
// 	.populate("comments")
// 	.exec((err, post) => {
// 	// if (!post) {
// 	// 	return res.status(404).json({ message: "Comment not found!" });
// 	// } else {
// 	await res.status(200).json({ message: "Comment Deleted!" });
// }} catch (error) {
// 	res.status(400).json({ error: error.message });
// }

exports.getAllCommentsByUser = async (req, res) => {
	try {
		console.log(req.params.id);
		const user = await User.findOne({ _id: req.params.id })
			.populate({
				path: "comments",
				// options: {
				// 	limit: 3,
				// }
				/* only bring back 3 so as not to wear down by populating potentially hundreds */
				select: "text user post _id",
				populate: [
					{
						path: "post",
						select: "title",
					},
					{
						path: "user",
						select: "firstName lastName avatar",
					},
				],
			})
			.exec(function (err, user) {
				if (err)
					return res
						.status(400)
						.json({ message: "Please try again shortly...!" });
				res.status(200).json(user.comments);
				// console.log(user.comments.post);
			});
	} catch (error) {
		console.log(error);
		res.status(400).json("Please try again...");
	}
};
