var cb = require("codebricks");


module.exports = new cb.internal.types.brickTypes.BrickTypeDefinition("PlaceHolderText", "noodle.content.placeholder.text", function(env, builder) {
	var self = this;
	
	self.defaultValue = builder.defineProperty({ type : "string" });
	self.render = builder.defineMethod(render);
	
	function render(options, callback) {
		var placeholderValue = options.data || self.defaultValue;
		callback(null, placeholderValue);
	}
});