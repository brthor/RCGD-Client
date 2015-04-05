//Serve Client Page W/ Video

var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic('www')).listen(8080);

//Connect to the Control Server
var net = require('net')
var auth = require('rcgdauth')

var serverHost = '0.0.0.0'
var serverPort = 6969

var client = new net.Socket();
client.connect(serverPort, serverHost,function(){
	auth.authorize(client);
});

// No Data should be sent. Any data is an error, just close.
client.on('data', function(data) {
    
    console.log('DATA: ' + data);
    // Close the client socket completely
    client.destroy();
    
});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});

//Receive xBox Controller Events and forward to the server

var XboxController = require('xbox-controller');
var xbox = new XboxController;

xbox.on('a:press', function (key) {
  //console.log(key + ' press');
});

xbox.on('b:release', function (key) {
  //console.log(key+' release');
});

xbox.on('lefttrigger', function(position){
  //console.log('lefttrigger', position);
});

xbox.on('righttrigger', function(position){
  console.log('righttrigger', position);
  client.write({'id': 'throttle', 'value':position});
});

xbox.on('left:move', function(position){
  console.log('left:move', position);
  client.write({'id': 'turn', 'value':position});
});

xbox.on('right:move', function(position){
  //console.log('right:move', position);
});