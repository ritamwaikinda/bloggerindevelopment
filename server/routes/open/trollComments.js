const router = require("express").Router(),
	{ addComment } = require("../../controllers/commentController");

router.post("/article/:id", addComment); /*add and change all comments*/
// router.patch('/', editComment);

// router.delete('/', deleteCommentById); is this possible without login?/*delete all comments*/
// router.delete('/', deleteAllComments);

module.exports = router;
