var exports = module.exports = {};

exports.authorize(sock){
	sock.write('c');
}