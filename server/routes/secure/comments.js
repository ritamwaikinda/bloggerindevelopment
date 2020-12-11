const router = require("express").Router(),
	{
		addComment,
		editComment,
		deleteCommentById,
	} = require("../../controllers/commentController");

router.post("/article/:id", addComment); /*add and change all comments*/
router.patch("/article/:id", editComment);

// router.get('/', findCommentById); /*find all comments*/
// router.get('/', findAllCommentsByUser);

router.delete("/article/:id", deleteCommentById); /*delete all comments*/
//set admin priviledges??
// router.delete('/', deleteAllComments);

module.exports = router;
