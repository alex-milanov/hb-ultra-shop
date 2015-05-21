"use strict"

var Auth = (function(){

	var loggedIn = false;

	var adminRoutes;

	var isLoggedIn = function(){
		return loggedIn;
	}

	var logIn = function(){
		loggedIn = true;
	}

	var logOut = function(){
		loggedIn = false;
	}

	var init = function(_adminRoutes){
		var adminRoutes = _adminRoutes;
		Router.addRouteChangeListener(function(url){
			if(!loggedIn && adminRoutes.indexOf(url)>-1){
				location.hash = "#/";
			}
		})
	}

	return {
		isLoggedIn: isLoggedIn,
		logIn: logIn,
		logOut: logOut,
		init: init
	}

})()