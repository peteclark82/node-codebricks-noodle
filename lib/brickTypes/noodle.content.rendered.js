var async = require("async"), ce = require("cloneextend");
var qejs = require("qejs");
var cb = require("codebricks");


module.exports = new cb.internal.types.brickTypes.BrickTypeDefinition("ContentRendered", "noodle.content.rendered", function(env, builder) {
	var self = this;
	
	self.template = builder.defineProperty({ type : "codebrick" });
	self.data = builder.defineProperty({ type : "string", mode : "hash", defaultValue : {} });
	self.getContent = builder.defineMethod(getContent);
	
	function getContent(options, callback) {
		if (self.template === undefined) {
			callback({ message : "No template defined" });
		} else {
			self.template.render({ data : self.data }, function(err, contentBuffer) {
				if (err) {
					callback({ message : "Error rendering content on brick : "+ self.__.id, error : err.toString() });
				} else {
					callback(null, contentBuffer);
				}
			});
		}
	}
});