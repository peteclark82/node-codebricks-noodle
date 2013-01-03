var http = require("http");
var cb = require("codebricks");


module.exports = new cb.internal.types.brickTypes.BrickTypeDefinition("HttpServer", "codebricks.noodle.httpServer", function(builder) {
	var self = this;
	self.server = builder.defineState({ isVolatile : true, defaultValue : null });

	self.port = builder.defineProperty({ type : "number", defaultValue : 8123 });
	
	self.handlers = builder.defineArrayProperty({ type : "codebrick" });
	
	self.start = builder.defineMethod(function(options, callback) {
		var server = http.createServer();
		server.listen(self.port, function(err) {
			if (err) { callback({ message : "Error starting HttpServer", error : err }); } else {
				console.log("HttpServer listening on port : "+ self.port);
				self.server.set(server, callback);
			}
		});
	});
});