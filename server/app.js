//call express, and create an express app
require("./db/config/index");

const express = require("express"),
	app = express();
const openRouter = require("./routes/open/index");
const guestRouter = require("./routes/open/posts");
const trollRouter = require("./routes/open/trollComments");
const userRouter = require("./routes/secure/users");
const postRouter = require("./routes/secure/posts");
const commentRouter = require("./routes/secure/comments");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const passport = require("./middleware/authentication/index");

// middleware that will let us read the json that we bring in.
//Turn it into an object, basically :)
app.use(express.json());

//Unauthenticated routes
app.use("/blog/", openRouter);
app.use("/blog/guest", guestRouter);
app.use("/blog/", trollRouter);

//then...middleware that will parse cookie :P
app.use(cookieParser());

//static
if (process.env.NODE_ENV === "production ") {
	app.use(express.static(path.resolve(__dirname, ",,", "client", "build")));
}
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "tmp/images",
	})
);

//middleware that will check token.... make sure you are legit to go on...
app.use("/blog", passport.authenticate("jwt", { session: false }));

//Authenticated Routes
app.use("/blog/account", userRouter);
app.use("/blog/posts", postRouter);
app.use("/blog/comments", commentRouter);

// Handle React routing, return all requests to React app
if (process.env.NODE_ENV === "production") {
	app.get("*", (request, response) => {
		response.sendFile(
			path.resolve(__dirname, "..", "client", "build", "index.html")
		);
	});
}

module.exports = app;
