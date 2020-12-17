const router = require("express").Router(),
	{
		findPostById,
		findAllPostsByUser,
		getLastFivePosts,
	} = require("../../controllers/postController");

router.get("/article/:id", findPostById);
router.get("/archives/user/:id", findAllPostsByUser);
router.get("/latest", getLastFivePosts);

module.exports = router;
