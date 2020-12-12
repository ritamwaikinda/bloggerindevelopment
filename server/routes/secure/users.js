const router = require("express").Router(),
	{
		getCurrentUser,
		logoutUser,
		uploadAvatar,
	} = require("../../controllers/userController");

// router.patch('/', editAccount);
router.get("/me", getCurrentUser);
router.post("/me/logout", logoutUser);
router.post("/me/avatar", uploadAvatar);
// router.delete('/', deleteAccount); /*admin*/
// router.delete('/', deleteBlog); /*admin*/

module.exports = router;
