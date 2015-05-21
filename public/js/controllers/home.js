"use strict"

var HomeCtrl = (function(){


	var container;
	var view;


	var menuEls = {
		"anon": [
			{
				url: "#/",
				title: "Home"
			},
			{
				url: "#/catalogue",
				title: "Catalogue"
			},
			{
				url: "#/auth/login",
				title: "Login"
			}
		],
		"admin": [
			{
				url: "#/admin",
				title: "Admin"
			},
			{
				url: "#/admin/categories",
				title: "Categories"
			},
			{
				url: "#/admin/products",
				title: "Products"
			},
			{
				url: "#/admin/users",
				title: "Users"
			},
			{
				url: "#/auth/logout",
				title: "Logout"
			}
		]
	}


	var init = function(_view, _container){

		container = _container;
		view = _view;

		var data = {
			menuEls: (Auth.isLoggedIn()) ? menuEls["admin"] : menuEls["anon"] 
		};

		return helpers.displayWithJade(container, view, data);
	}

	return {
		init: init
	};

}());