var path = require("path");

module.exports = {
	getSources : getSources
};

function getSources() {
	return [
		path.resolve(__dirname, "brickTypes")
	];
}