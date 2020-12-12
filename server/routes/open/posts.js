const router = require("express").Router(),
	{
		findPostById,
		findAllPostsByUser,
		getLastFivePosts,
	} = require("../../controllers/postController");

router.get("/article/:id", findPostById);
router.get("/user/archives", findAllPostsByUser);
router.get("/latest", getLastFivePosts);

module.exports = router;
