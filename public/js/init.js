$(document).ready(function() {
	
	helpers.displayWithJade("#sidebar","views/sidebar.jade");

	Router
		.addRoute({
			"url": "/",
			"default": true,
			"view": "views/home.jade",
			"container": "body",
			"callback": HomeCtrl.init
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
			"callback": AdminProductsCtrl.init
		})
		.addRoute({
			"url": "/admin/categories",
			"view": "views/admin/categories.jade",
			"container": "#admin",
			"callback": AdminCategoriesCtrl.init
		})
		.addRoute({
			"url": "/admin/users",
			"view": "views/admin/users.jade",
			"container": "#admin",
			"callback": AdminUsersCtrl.init
		})
		.addRoute({
			"url": "/auth/login",
			"callback": function(){
				Auth.logIn();
				location.hash = "#/admin/products"
			}
		})
		.addRoute({
			"url": "/auth/logout",
			"callback": function(){
				Auth.logOut();
				location.hash = "#/"
			}
		})
		.init();


		Auth.init([
			"/admin",
			"/admin/users",
			"/admin/categories"
		])
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