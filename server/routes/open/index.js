const router = require("express").Router(),
	{
		createUser,
		loginUser,
		findUserById,
		// requestPasswordReset,
		// passwordRedirect
	} = require("../../controllers/userController");

router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/user:id", findUserById);
// router.get('/password', requestPasswordReset);
// router.get('/password/:token', passwordRedirect);

module.exports = router;
