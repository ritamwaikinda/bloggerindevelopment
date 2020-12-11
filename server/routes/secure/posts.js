const router = require("express").Router(),
	{
		publishPosts,
		editPostById,
		deletePostById,
		deleteAllPosts,
	} = require("../../controllers/postController");

router.post("/entry", publishPosts); /*write and edit all blog posts*/
router.patch(`/article/${req.body.id}`, editPostById);

router.delete(
	`/article/${req.body.id}`,
	deletePostById
); /*delete all blog posts*/
router.delete("/archives", deleteAllPosts);

module.exports = router;
