const router = require("express").Router(),
	{
		createUser,
		loginUser,
		// requestPasswordReset,
		// passwordRedirect
	} = require("../../controllers/userController");

router.post("/signup", createUser);
router.post("/login", loginUser);
// router.get('/password', requestPasswordReset);
// router.get('/password/:token', passwordRedirect);

module.exports = router;