var http = require("http");
var cb = require("codebricks");


module.exports = new cb.internal.types.brickTypes.BrickTypeDefinition("HttpServer", "codebricks.noodle.httpServer", function(env, builder) {
	var self = this;
	self.server = builder.defineState({ isVolatile : true, defaultValue : null });

	self.something = {
		prop1 : builder.defineProperty({ type : "codebrick" }),
		prop2 : builder.defineProperty({ type : "string", mode : "hash", defaultValue : { "hash1": 1, "hash2" : true } }),
		deep : {
			deeper : {
				deepProp : builder.defineProperty({ type : "codebrick", mode : "hash" })
			}
		}		
	}
	
	self.port = builder.defineProperty({ type : "number", defaultValue : 8123 });
	self.handlers = builder.defineProperty({ type : "codebrick", mode : "array" });
	
	self.start = builder.defineMethod(start);
	
	function start(options, callback) {
		var server = http.createServer();
		server.listen(self.port, function(err) {
			if (err) { callback({ message : "Error starting HttpServer", error : err }); } else {
				console.log("HttpServer listening on port : "+ self.port);
				self.server.set(server, callback);
			}
		});
	}
});