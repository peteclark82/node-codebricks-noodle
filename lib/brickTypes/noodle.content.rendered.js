var async = require("async"), ce = require("cloneextend");
var qejs = require("qejs");
var cb = require("codebricks");


module.exports = new cb.internal.types.brickTypes.BrickTypeDefinition("ContentRendered", "noodle.content.rendered", function(env, builder) {
	builder.implements(
		{ type : "codebricks.data.IDataProvider" }
	);
	
	var self = this;
		
	self.template = builder.defineProperty({ type : "codebrick" });
	self.data = builder.defineProperty({ type : "codebrick", mode : "hash", defaultValue : {} });
	self.getData = builder.defineMethod(getData);
		
	function getData(options, callback) {
		if (self.template === undefined) {
			callback({ message : "No template defined" });
		} else {
			var data = {};
			async.forEachSeries(Object.keys(self.data), function(dataItemName, nextDataItem) {
				var dataItem = self.data[dataItemName];
				dataItem.getData({}, function(err, value) {
					if (err) {nextDataItem({ message : "Error getting data item : "+ dataItemName, error : err });} else {
						data[dataItemName] = value;
						nextDataItem();
					}
				});
			}, function(err) {
				if (err) {callback(err);} else {
					self.template.render({ data : data }, function(err, contentBuffer) {
						if (err) {
							callback({ message : "Error rendering content on brick : "+ self.__.id, error : err });
						} else {
							callback(null, contentBuffer);
						}
					});
				}
			});
		}
	}
});