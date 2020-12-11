const router = require("express").Router();
const isAdmin = require("../../middleware/authorization/index"),
	{
		publishPosts,
		editPostById,
		deletePostById,
		deleteAllPosts,
	} = require("../../controllers/postController");

router.post("/entry", publishPosts);
router.patch("/article/:id", editPostById);
router.post("/images", uploadImages);

router.delete("/article/:id", deletePostById);
router.delete("/archives", user.isAdmin, deleteAllPosts);

module.exports = router;
