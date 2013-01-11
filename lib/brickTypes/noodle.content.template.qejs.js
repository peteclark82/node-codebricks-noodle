var async = require("async"), ce = require("cloneextend");
var qejs = require("qejs");
var cb = require("codebricks");


module.exports = new cb.internal.types.brickTypes.BrickTypeDefinition("QEJSTemplate", "noodle.content.template.qejs", function(env, builder) {
	var self = this;
	
	self.templateSource = builder.defineProperty({ type : "codebrick" });
	self.placeholders = builder.defineProperty({ type : "codebrick", mode : "hash" });
	self.render = builder.defineMethod(render);
	
	function render(options, callback) {
		if (self.templateSource === undefined) {
			callback({ message : "No template source defined" });
		} else {
			getPlaceholdersContent(options, function(err, placeholdersContent) {
				self.templateSource.getBuffer({}, function(err, templateBuffer) {
					if (err) { callback(err); } else {
						var templateString = templateBuffer.toString();
						var template = qejs.compile(templateString);
						placeholdersContent.__ = {
							env : env
						};
						placeholdersContent.render = qejs.render;
						template(placeholdersContent).then(function(content) {
							callback(null, new Buffer(content));
						}, function(err) {
							callback({ message : "Error rendering template on brick : "+ self.__.id, error : err.toString() });
						});
					}
				});	
			});
		}
	}
	
	/* Private */
	function getPlaceholdersContent(options, callback) {
		var placeholdersContent = {};
		async.forEachSeries(Object.keys(self.placeholders || {}), function(placeholderName, nextPlaceholder) {						
			var placeholder = self.placeholders[placeholderName];
			var placeholderData = options.data[placeholderName];
			placeholder.getContent({ data : placeholderData }, function(err, content) {
				if (err) {nextPlaceholder(err);} else {
					placeholdersContent[placeholderName] = content;
					nextPlaceholder();
				}
			});
		}, function(err) {
			if (err) { callback(err); } else {
				callback(null, placeholdersContent);
			}
		});	
	}
});