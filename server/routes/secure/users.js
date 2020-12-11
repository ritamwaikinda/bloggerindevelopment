const router = require("express").Router(),
	{ logoutUser } = require("../../controllers/userController");

// router.patch('/', editAccount);
router.post("/me/logout", logoutUser);
// router.delete('/', deleteAccount); /*admin*/
// router.delete('/', deleteBlog); /*admin*/

module.exports = router;
