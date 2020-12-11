const router = require("express").Router();
{} = require(/*insert module.exports paths*/);

router.post(`/article/${req.body.id}`, addComment); /*add and change all comments*/
router.patch(`/article/${req.body.id}`, editComment);

// router.get('/', findCommentById); /*find all comments*/
// router.get('/', findAllCommentsByUser);

router.delete(`/article/${req.body.id}`, deleteCommentById); /*delete all comments*/
//set admin priviledges??
// router.delete('/', deleteAllComments);

module.exports = router;
