var path = require("path"), colors = require("colors");

var cb = require("codebricks");

cb.createEnvironment({
	definitions : [ path.resolve(__dirname, "lib/brickTypes") ]
}, function(err, env) {
	if (err) { console.error(JSON.stringify(err, null, 2).bold.red); } else {		
		console.log("TESTING...");
		
		if (true) {
		
			env.methods.BrickTypeDefinition.createBrick("codebricks.brickRepositories.fileSystem", function(err, repoBrick) {
				if (err) { console.error(JSON.stringify(err, null, 2).bold.red); } else {
					repoBrick.path = path.resolve(__dirname, "testBricks");
					repoBrick.get({ id : "httpServer1" }, function(err, brick) {
						if (err) { console.error(JSON.stringify(err, null, 2).bold.red); } else {
							brick.start({}, function(err) {
								if (err) { console.error(JSON.stringify(err, null, 2).bold.red); } else {
								}
							});
						}
					});
				}
			});
			
		} else {
		
			env.methods.BrickTypeDefinition.createBrick("codebricks.noodle.httpServer", function(err, serverBrick) {
				if (err) { console.error(JSON.stringify(err, null, 2).bold.red); } else {
					serverBrick.__.id = "httpServer1";
					serverBrick.port = 9123;
					serverBrick.start({}, function(err) {
						if (err) { console.error(JSON.stringify(err, null, 2).bold.red); } else {
							env.methods.BrickTypeDefinition.createBrick("codebricks.brickRepositories.fileSystem", function(err, repoBrick) {
								if (err) { console.error(JSON.stringify(err, null, 2).bold.red); } else {
									repoBrick.path = path.resolve(__dirname, "testBricks");
									repoBrick.save({ brick : serverBrick }, function(err) {
										if (err) { console.error(JSON.stringify(err, null, 2).bold.red); } else {
											console.log("BRICK SAVED");
										}
									});
								}
							});
						}
					});
				}
			});
			
		}
	}
});