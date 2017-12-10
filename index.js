var net = require('net');
var mysql = require('mysql');
var controller = require('./controller.js');

const PORT = 5000;
const ADDRESS = '127.0.0.1';
var timer;
var timeout = 5000;
var globaldata = "";

var server = net.createServer(function(c) {

  server.getConnections(function(error, count) {
    if (count == 1) {
      console.log('The server has 1 active connection.');
    } else {
      console.log('The server has ' + count + ' active connections.');
    }
  });

  c.on('connect', function() {
    console.log('client connected');
  });

  c.on('end', function() {
    console.log('client disconnected');
  });

  c.on('data', function(data) {
    console.log("Buffer says: " + data.toString());
    globaldata=globaldata+data.toString();
    console.log(globaldata);
    var datastring = data.toString();
    var newstring = new String("stop");
    // var newstring = new String("stop\r\n"); Used for testing purposes only
    if(datastring.valueOf() == newstring.valueOf()){
      console.log("Got out of stop")
      controller.heart_data(globaldata,function(err,heartdata){
        if(err)
        {
          console.log(err);
        }
        else{
          console.log("Successfully Connected to Heart");
          console.log(heartdata);
        }
      });
    }
  });

  c.on('error', function(err) {

    if (err.code == 'ENOTFOUND') {
      console.log('[ERROR] No devide found at this address.');
    }

    if (err.code == 'ECONNREFUSED') {
      console.log('[ERROR] Connection refused, please check the IP address.');
    }
  });
  //
  // time = setTimeOut(function() {
  //   console.log('[ERROR] The client has exceeded the timeout value: ' + timeout);
  //   return;
  // }, timeout);

  // server.listen(portNumber, function() {
  //   address = server.address();
  //   console.log('The server is bound on %s', address);
  // });
}).listen(PORT);

console.log("Server is listening on port 5000");
