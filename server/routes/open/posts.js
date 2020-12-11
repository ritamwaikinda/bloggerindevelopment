const router = require("express").Router(),
	{
		findPostById,
		findUserById,
		findAllPostsByUser,
	} = require("../../controllers/postController");

router.get("/article/:id", findPostById);
router.get("/user/", findUserById);
router.get("/user/archives", findAllPostsByUser);

module.exports = router;
