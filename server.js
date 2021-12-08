const http = require("http");
const port = process.env.PORT || 5000;
const app = require("./app");

const server = http.createServer(app);
app.listen(port, () => console.log("Running Server at " + port));
