const router = require("express").Router(),
	{
		findPostById,
		findAllPostsByUser,
	} = require("../../controllers/postController");

router.get("/article/:id", findPostById);
router.get("/user/archives", findAllPostsByUser);

module.exports = router;
