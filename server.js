const app = require("./server/app");

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`Express is listening on port ${PORT}`);
});
