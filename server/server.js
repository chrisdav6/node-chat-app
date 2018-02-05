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
  
  socket.on("createMessage", function(message) {
    console.log("createMessage", message);
    io.emit("newMessage", {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });
  
  socket.on("disconnect", function() {
    console.log("User was disconnected");
  });
});

//Start Server
server.listen(port, function() {
  console.log("Server has started!");
});