var async = require("async"), ce = require("cloneextend");
var qejs = require("qejs");
var cb = require("codebricks");


module.exports = new cb.internal.types.brickTypes.BrickTypeDefinition("QEJSTemplate", "noodle.content.template.qejs", function(env, builder) {
	var self = this;
	
	self.templateSource = builder.defineProperty({ type : "codebrick" });
	self.placeHolders = builder.defineProperty({ type : "codebrick", mode : "array" });
	self.render = builder.defineMethod(render);
	
	function render(options, callback) {
		if (self.templateSource === undefined) {
			callback({ message : "No template source defined" });
		} else {
			self.templateSource.getBuffer({}, function(err, templateBuffer) {
				if (err) { callback(err); } else {
					var templateString = templateBuffer.toString();
					var template = qejs.compile(templateString);
					var data = {};
					
					async.forEachSeries(self.placeHolders || [], function(placeHolder, nextPlaceHolder) {						
						placeHolder.addValue({ input : options.data, output : data }, nextPlaceHolder);
					}, function(err) {
						if (err) { callback(err); } else {
							template(data).then(function(content) {
								callback(null, new Buffer(content));
							}, function(err) {
								callback({ message : "Error rendering template on brick : "+ self.__.id, error : err.toString() });
							});
						}
					});		
				}
			});		
		}
	}
});