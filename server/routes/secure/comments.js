const router = require("express").Router();
const isAdmin = require("../../middleware/authorization/index"),
	{
		addComment,
		editComment,
		deleteCommentById,
		deleteAllComments,
	} = require("../../controllers/commentController");

// router.post("/article/:id/comments", addComment);
router.patch("/article/:id/comments/:id", editComment);

router.delete("/article/:id/comments/:id", deleteCommentById);
router.delete("/article/:id/comments", user.isAdmin, deleteAllComments);

module.exports = router;
