var net = require('net');
var mysql = require('mysql');

const PORT = 5000;
const ADDRESS = '127.0.0.1';
var timer;
var timeout = 5000;

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
    console.log(data);
    // var res = decoder.decodeBuffer(data);
    /* decode sensor data and insert to the database  */
  });

  c.on('error', function(err) {

    if (err.code == 'ENOTFOUND') {
      console.log('[ERROR] No devide found at this address.');
    }

    if (err.code == 'ECONNREFUSED') {
      console.log('[ERROR] Connection refused, please check the IP address.');
    }
  });

  time = setTimeOut(function() {
    console.log('[ERROR] The client has exceeded the timeout value: ' + timeout);
    return;
  }, timeout);

  // server.listen(portNumber, function() {
  //   address = server.address();
  //   console.log('The server is bound on %s', address);
  // });
}).listen(PORT);

console.log("Server is listening on port 5000");
