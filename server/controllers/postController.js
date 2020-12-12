const mongoose = require("mongoose");
const Post = require("../db/models/post");
const User = require("../db/models/user");
const cloudinary = require("cloudinary").v2;

//unsecured
exports.findPostById = async (req, res) => {
	const _id = req.params.id;
	if (!mongoose.Types.ObjectId.isValid(_id))
		return res.status(400).json({ message: "Invalid article!" });
	try {
		const post = await Post.findOne({ _id });
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
	User.findById(req.body.id)
		.populate("posts")
		.exec((err, user) => {
			if (err) {
				res.status(400).json({ error: err.message });
			} else {
				res.json(user.posts);
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
		const userPosts = await User.findOne(owner); /*or req.body.user*/
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

exports.getLastFivePosts = async (req, res) => {
	const lastFive = Post.find().skip(db.posts.count() - 5);
	return lastFive;
};
