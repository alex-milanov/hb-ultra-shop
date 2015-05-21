
var Router = (function(){

	// url, callback, default
	var routes = [];

	var addRoute = function(route){
		routes.push(route)
		return this;
	}

	var handleHashChange = function(){
		url = location.hash.slice(1) || '/';
		routes.forEach(function(route){
			if(route.url == url){
				route.callback();
			}
		})
	}

	var init = function(){
		$(window).on("hashchange",handleHashChange);

		// trigger default route's callback
		if(location.hash === ""){
			routes.forEach(function(route){
				if(route.default === true){
					route.callback();
				}
			})
		} else {
			handleHashChange();
		}

	}

	return {
		addRoute: addRoute,
		init: init
	}

})()