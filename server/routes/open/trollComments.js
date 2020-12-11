const router = require("express").Router(),
	{
		addComment,
		getAllCommentsByPost,
		getAllCommentsByUser,
	} = require("../../controllers/commentController");

router.post("/article/:id/comments/:id", addComment);
router.get("/article/:id/comments", getAllCommentsByPost);
router.get("/user/archives/comments", getAllCommentsByUser);
// router.get('/', findCommentById); /*find all comments*/ to reply? nah

module.exports = router;
