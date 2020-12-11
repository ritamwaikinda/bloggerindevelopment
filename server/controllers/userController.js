// exports.loginUser = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//       const user = await User.findByCredentials(email, password);
//       const token = await user.generateAuthToken();
//       res.cookie('jwt', token, {
//         httpOnly: true,
//         sameSite: 'Strict',
//         secure: process.env.NODE_ENV !== 'production' ? false : true
//       });
//       res.json(user);
//     } catch (e) {
//       console.log(e);
//       res.status(400).json({ error: e.toString() });
//     }
//   };

// exports.logoutUser = async (req, res) => {

// 	try {
// 		req.user.tokens = req.user.tokens.filter((token) => {
// 			return token.token !== req.cookies.jwt;
// 		});
// 		await req.user.save();
// 		res.clearCookie("jwt");
// 		res.json({ message: "logged out!" });
// return to home page/ login page
// 	} catch (error) {
// 		res.status(400).json({ error: error.message });
// 	}
// };
