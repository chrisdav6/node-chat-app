var express = require("express");
var path = require("path");
var http = require("http");
var socketIO = require("socket.io");
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

//Serve Public folder
app.use(express.static(path.join(__dirname, "../public")));

//Set Port
var port = process.env.PORT || 8080;

//Configure IO
io.on("connection", function(socket) {
  console.log("New User Connected!");
  
  socket.emit("newMessage", {
    from: "Chris",
    text: "My New Message",
    createdAt: 1030
  });
  
  socket.on("createMessage", function(newMessage) {
    console.log("createMessage", newMessage);
  });
  
  socket.on("disconnect", function() {
    console.log("User was disconnected");
  });
});

//Start Server
server.listen(port, function() {
  console.log("Server has started!");
});