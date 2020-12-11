const router = require("express").Router(),
	{
		findPostById,
		findAllPostsByUser,
	} = require("../../controllers/postController");

router.get(
	`/article/${req.body.id}`,
	findPostById
); /*find all blog posts, but use a search*/
router.get("/archives", findAllPostsByUser);

module.exports = router;
