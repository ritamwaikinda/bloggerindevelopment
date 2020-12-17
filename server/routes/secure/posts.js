const router = require("express").Router();
const isAdmin = require("../../middleware/authorization/index"),
	{
		publishPosts,
		editPostById,
		deletePostById,
		deleteAllPosts,
		uploadImages,
	} = require("../../controllers/postController");

router.post("/entry", publishPosts);
router.patch("/article/:id", editPostById);
router.post("/images", uploadImages);
router.delete("/article/:id", deletePostById);
router.delete("/archives", isAdmin, deleteAllPosts);

module.exports = router;
