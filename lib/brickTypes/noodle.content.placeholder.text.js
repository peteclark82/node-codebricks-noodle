var cb = require("codebricks");


module.exports = new cb.internal.types.brickTypes.BrickTypeDefinition("PlaceHolderText", "noodle.content.placeholder.text", function(env, builder) {
	var self = this;
	
	self.name = builder.defineProperty({ type : "string" });
	self.defaultValue = builder.defineProperty({ type : "string" });
	self.addValue = builder.defineMethod(addValue);
	
	function addValue(options, callback) {
		var placeholderValue = options.input[self.name];
		if (placeholderValue === undefined) {
			placeholderValue = self.defaultValue;
		}
		options.output[self.name] = placeholderValue;
		callback();
	}
});