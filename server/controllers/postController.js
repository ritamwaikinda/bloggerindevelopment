const mongoose = require("mongoose");
const Post = require("../db/models/post");
const User = require("../db/models/user");
const cloudinary = require("cloudinary").v2;

//unsecured
exports.findPostById = async (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id))
		return res.status(400).json({ message: "Invalid article!" });
	try {
		const post = await Post.findById(req.params.id);
		if (!post)
			return res.status(400).json({
				message: "Article not found. Please try again in a few minutes.",
			});
		res.status(200).json(post);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.findAllPostsByUser = async (req, res) => {
	User.findById(req.params.id)
		.populate("posts")
		.exec((err, user) => {
			if (err) {
				res.status(400).json({ error: err.message });
			} else {
				res.json(user);
				// console.log(user.posts[1].title); **this will populate just the title
			}
		});
};

//secured
exports.publishPosts = async (req, res) => {
	const { owner, title, text } = req.body;
	console.log(req.body);
	try {
		const post = new Post(req.body);
		await post.save();
		const userPosts = await User.findById(req.body.owner); /*or req.body.user*/
		userPosts.posts.push(post);
		await userPosts.save();
		res
			.status(200)
			.json({ message: "Congratulatons! Your article has been posted" });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

exports.uploadImages = async (req, res) => {
	try {
		const response = await cloudinary.uploader.upload(
			req.files.images.tempFilePath
		);
		req.post.images = response.secure_url;
		await req.post.save();
		res.json(response);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.editPostById = async (req, res) => {
	const updates = Object.keys(req.body);
	try {
		const post = await Post.findOne({
			_id: req.params.id,
		});
		if (!post) return res.status(404).json({ message: "Article not found!" });
		updates.forEach((update) => (post[update] = req.body[update]));
		await post.save();
		res.status(200).json(post);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.deletePostById = async (req, res) => {
	console.log(req.body);
	try {
		const post = await Post.findOneAndDelete({ _id: req.params.id });
		if (!post) return res.status(404).json({ message: "Article not found!" });
		res.status(200).json({ message: "Article deleted!" });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.deleteAllPosts = async (posts = []) => {
	const deletePosts = posts.map(async (post) => {
		await Post.findByIdAndDelete(post._id);
	});
	await Promise.all(deletePosts);
};

//~~~~~~~~~~~~~~~
exports.deleteAllPostsByUser = async (req, res) => {
	User.findByIdAndDelete(req.params.id)
		.populate("posts")
		.exec((err, user) => {
			if (err) {
				res.status(400).json({ error: err.message });
			} else {
				res.json(user);
				// console.log(user.posts[1].title); **this will populate just the title
			}
		});
};

exports.getLastFivePosts = async (req, res) => {
	const lastFive = await Post.find();
	if (lastFive.length >= 6) {
		sendMeBack = lastFive.slice(lastFive.length - 6);
		res.status(200).json(sendMeBack);
	} else if (!lastFive) {
		res.status(400).json("No recent blogs");
	} else {
		res.status(200).json(lastFive);
	}
};
