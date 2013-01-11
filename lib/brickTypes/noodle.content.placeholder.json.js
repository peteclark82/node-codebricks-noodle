var cb = require("codebricks");


module.exports = new cb.internal.types.brickTypes.BrickTypeDefinition("PlaceHolderJson", "noodle.content.placeholder.json", function(env, builder) {
	var self = this;
	
	self.defaultValue = builder.defineProperty({ type : "json" });
	self.getContent = builder.defineMethod(getContent);
	
	function getContent(options, callback) {
		var placeholderValue = options.data || self.defaultValue;
		callback(null, placeholderValue);
	}
});