'use strict';

/**
 * Module dependencies.
 */
var fs = require('fs');

function walkerAsyncFast(path, filter, cb) {
	var depth = 0;
	(function listFiles(p) {
	  depth++;
		fs.readdir(p, function (err, files) {
			err || files.forEach(function (file) {
				file = p + sep + file;
				depth++;
				fs.stat(file, function (e, stat) {
					e || (stat.isDirectory() && listFiles(file));
					filter({file: file, stat: stat});
					(--depth < 1) && cb(err)
				})
			});
			(--depth < 1) && cb(err);
		});
	})(path)
}

// Walk function to recursively get files
var _walk = function(root, includeRegex, excludeRegex, removePath) {
	var output = [];
	var directories = [];

	// First read through files 
	fs.readdirSync(root).forEach(function(file) {
		var newPath = root + '/' + file;
		var stat = fs.statSync(newPath);

		if (stat.isFile()) {
			if (includeRegex.test(file) && (!excludeRegex || !excludeRegex.test(file))) {
				output.push(newPath.replace(removePath, ''));
			}
		} else if (stat.isDirectory()) {
			directories.push(newPath);
		}
	});

	// Then recursively add directories
	directories.forEach(function(directory) {
		output = output.concat(_walk(directory, includeRegex, excludeRegex, removePath));
	});

	return output;
};

/**
 * Exposing the walk function
 */
exports.walk = _walk;