
var fs = require("fs")

module.exports = function(app){


	// routes
	app.get('/', function (req, res) {
		res.render('index');
	})

	app.get('/admin/', function (req, res) {
		res.render('admin/index');
	})

	// listen for files: /product.html -> /views/product.jade
	app.get("/:fileName", function(req, res, next){
		if(req.params && req.params.fileName){
			var fileName = req.params.fileName.replace(".html","");

			// if jade file exists
			if(fs.existsSync(__dirname+"/../views/"+fileName+".jade")){
				res.render(fileName);
			// if post is in posts
			} else {
				next();
			}

		} else {
			next();
		}
	})


	app.post("/auth/login", function(req, res){
		console.log(req.body);
	})

	app.post("/auth/register", function(req, res){
		console.log(req.body);
	})

	app.post("/auth/logout", function(req, res){
		console.log(req.body);
	})


}
