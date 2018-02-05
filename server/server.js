var express = require("express");
var path = require("path");
var app = express();

//Serve Public folder
app.use(express.static(path.join(__dirname, "../public")));


//Start Server
app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server has started!");
});