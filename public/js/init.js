$(document).ready(function() {
	
	helpers.displayWithJade("#sidebar","views/sidebar.jade");

	Router
		.addRoute({
			"url": "/",
			"default": true,
			"view": "views/home.jade",
			"container": "#container"
		})
		.addRoute({
			"url": "/cart",
			"view": "views/cart.jade",
			"container": "#content"
		})
		.addRoute({
			"url": "/admin",
			"view": "views/admin/home.jade",
			"container": "#content"
		})
		.addRoute({
			"url": "/admin/products",
			"view": "views/admin/products.jade",
			"container": "#admin",
			"callback": ProductsCtrl.init
		})
		.addRoute({
			"url": "/admin/categories",
			"view": "views/admin/categories.jade",
			"container": "#admin",
			"callback": CategoriesCtrl.init
		})
		.addRoute({
			"url": "/admin/users",
			"view": "views/admin/users.jade",
			"container": "#admin",
			"callback": UsersCtrl.init
		})
		.init();
//				helpers.displayWithJade("#content","views/admin/home.jade");

		// .addRoute({
		// 	"url": "/admin/categories",
		// 	"callback": CategoriesCtrl.init
		// })
		// .addRoute({
		// 	"url": "/admin/users",
		// 	"callback": UsersCtrl.init
		// })
		
		// .addRoute({
		// 	"url": "/login",
		// 	"callback": function(){
		// 		helpers.displayWithJade("#content","views/login.jade");
		// 	}
		// })

})