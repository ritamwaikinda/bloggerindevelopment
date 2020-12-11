//call express, and create an express app
//then set variable names for all your route paths.
//i like to do it in order of open then secure

const express = require("express"),
	app = express();
const openRouter = require("./routes/open/index");
const guestRouter = require("./routes/open/posts");
const trollRouter = require("./routes/open/troll");
const userRouter = require("./routes/secure/users");
const postRouter = require("./routes/secure/posts");
const commentRouter = require("./routes/secure/comments");

// const passport = require("./middleware/authentication/index"),
// 	fileUpload = require("express-fileupload"),
// 	cookieParser = require("cookie-parser"),
// 	path = require("path");

// middleware that will let us read the json that we bring in.
//Turn it into an object, basically :)

app.use(express.json());

//Unauthenticated routes
app.use("/blog/", openRouter);
app.use("/blog/guest", guestRouter);
app.use("/blog/leaveacomment", trollRouter);

//then...middleware that will parse cookie :P
app.use(cookieParser());

//why static after middleware? shouldn't it be above unauth? above json even? maybe? oh well, i'm just a worker-bee lol
//directory-../../ ability lol jumping from one to other i think
if (process.env.NODE_ENV === "production ") {
	app.use(express.static(path.resolve(__dirname, ",,", "client", "build")));
}

//picture-grabbing
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "tmp/images",
	})
);

//middleware that will check token....
//anything to do with proving who you are based on that cookie
app.use("/blog", passport.authenticate("jwt", { session: false }));

//Authenticated Routes
app.use("/blog/account", userRouter);
app.use("/blog/posts", postRouter);
app.use("/blog/comments", commentRouter);

// Handle React routing, return all requests to React app
if (process.env.NODE_ENV === "production") {
	app.get("*", (req, res) => {
		res.sendFile(
			path.resolve(__dirname, "..", "client", "build", "index.html")
		);
	});
}

//

module.exports = app;
