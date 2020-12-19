const router = require("express").Router(),
	{
		addGuestComment,
		getAllCommentsByPost,
		getAllCommentsByUser,
	} = require("../../controllers/guestCommentController");

router.post("/article/:id/comments", addGuestComment);
router.get("/article/:id/comments", getAllCommentsByPost);
router.get("/:id/archives/comments", getAllCommentsByUser);
// router.get('/', findCommentById); /*find all comments*/ to reply? nah

module.exports = router;
