const router = require("express").Router(),
	{
		publishPosts,
		editPostById,
		deletePostById,
		deleteAllPosts,
	} = require("../../controllers/postController");

router.post("/entry", publishPosts); /*write and edit all blog posts*/
router.patch("/article/:id", editPostById);
router.post("/images", uploadImages);

router.delete("/article/:id", deletePostById); /*delete all blog posts*/
router.delete("/archives", deleteAllPosts);

module.exports = router;
