const mongoose = require("mongoose");
const Comment = require("../db/models/comment");
const User = require("../db/models/user");
const Post = require("../db/models/post");

//secured
exports.addComment = async (req, res) => {
	const { user, text } = req.body;
	const post = req.params.id;
	console.log(req.body);
	try {
		const comment = new Comment({
			user,
			text,
			post,
		});
		await comment.save();
		const userComments = await User.findById(req.body.user);
		const postComments = await Post.findById(req.params.id);
		userComments.comments.push(comment);
		postComments.comments.push(comment);
		await userComments.save();
		await postComments.save();
		res.status(200).json({ message: "comment submitted" });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

exports.editComment = async (req, res) => {
	const edits = Object.keys(req.body);
	try {
		const comments = await Comment.findById(req.params.id);
		if (!comments)
			return res.status(404).json({ message: "comment not found" });
		edits.forEach((edit) => (comments[edit] = req.body[edit]));
		await comments.save();
		res.status(201).json(comments);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.deleteCommentById = async (req, res) => {
	const _id = req.params.id;
	try {
		const comment = await Comment.findByIdAndDelete({ _id });
		if (!comment) {
			return res.status(404).json({ message: "Comment not found!" });
		}
		await res.status(200).json({ message: "Comment Deleted!" });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

//meeeeeh... just try again later lol
exports.deleteAllComments = async (req, res) => {
	const { id } = req.params.id;
	console.log(req.params.id);
	if (!user.isAdmin) {
		console.log(user.isAdmin);
		return res.status(404).json({ message: "user unauthorized" });
	} else {
		try {
			const comments = await Comment.deleteMany({ post: req.params.id });
			const guestComments = await GuestComment.deleteMany({
				post: req.params.id,
			});
			if (!comments && !guestComments) {
				return res
					.status(404)
					.json({ message: "No comments found for this post" });
			}
			await res.status(200).json({
				message: "All comments have been deleted from this blog post.",
			});
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}
};

// 		if (!user.isAdmin)
// 			return res.status(404).json({ message: "user unauthorized" });
// 		const deleteComments = await comments.map(async (comment) => {
// 			await Comment.findByIdAndDelete(comment._id);
// 		});
// 		await Promise.all(deleteComments);
// 		res.status(200).json("All comments have been deleted from this blog post.");
// 	} catch (error) {
// 		res.status(400).json({ error: error.message });
// 	}
// };
