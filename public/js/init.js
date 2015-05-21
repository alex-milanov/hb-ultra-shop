$(document).ready(function() {
	
	helpers.displayWithJade("#sidebar","views/sidebar.jade");

	Router
		.addRoute({
			"url": "/",
			"default": true,
			"callback": function(){
				helpers.displayWithJade("#content","views/home.jade");
			}
		})
		.addRoute({
			"url": "/product",
			"callback": function(){
				helpers.displayWithJade("#content","views/product.jade");
			}
		})
		.addRoute({
			"url": "/cart",
			"callback": function(){
				helpers.displayWithJade("#content","views/cart.jade");
			}
		})
		.addRoute({
			"url": "/login",
			"callback": function(){
				helpers.displayWithJade("#content","views/login.jade");
			}
		})
		.init();

})