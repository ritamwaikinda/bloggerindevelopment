const mongoose = require("mongoose");
const Comment = require("../db/models/comment");
const User = require("../db/models/user");
const Post = require("../db/models/post");

//unsecured
exports.addComment = async (req, res) => {
	const { user, text, post } = req.body;
	console.log(req.params.id);
	try {
		const comment = new Comment({
			user,
			text,
			post,
		});
		await comment.save();
		const postComments = await Post.findById(req.params.id);
		postComments.comments.push(comment);
		await postComments.save();
		const userComments = await User.findOne(postComments.owner);
		userComments.comments.push(comment);
		await userComments.save();
		res.status(200).json({ message: "comment submitted" });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

//secured
exports.editComment = async (req, res) => {
	const edits = Object.keys(req.body);
	try {
		const comments = await Comment.findById(id);
		if (!comment) return res.status(404).json({ message: "comment not found" });
		edits.forEach((edit) => (comments[edit] = req.body[edit]));
		await comment.save();
		res.status(201).json(comment);
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

exports.deleteAllComments = async (comments = []) => {
	const deleteComments = comments.map(async (comment) => {
		await Comment.findByIdAndDelete(comment._id);
	});
	await Promise.all(deleteComments);
};

exports.getAllCommentsByPost = async (req, res) => {
	Post.findById(req.body.id)
		.populate("comments")
		.exec((err, user) => {
			if (err) {
				res.status(400).json({ error: err.message });
			} else {
				res.json(user.posts);
			}
		});
};

exports.getAllCommentsByUser = async (req, res) => {
	User.findById(req.body.id)
		.populate("comments")
		.exec((err, user) => {
			if (err) {
				res.status(400).json({ error: err.message });
			} else {
				res.json(user.comments);
			}
		});
};
