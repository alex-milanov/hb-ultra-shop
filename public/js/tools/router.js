"use strict"

var Router = (function(){

	// url, callback, default, view, container
	var routes = [];



	var addRoute = function(route){
		routes.push(route)
		return this;
	}


	var routeChangeListeners = [];

	var addRouteChangeListener = function(_listener){
		routeChangeListeners.push(_listener);
	}

	var execRoute = function(urlChain,depth){
		var url = "/";
		var currentChain = urlChain.slice();
		if(depth>0){
			currentChain.splice(depth+1,urlChain.length-depth-1);
			var url = currentChain.join("/");
		}

		var currentStepPromise;

		routes.forEach(function(route){
			if(route.url === url){
				if(route.view && route.container){
					if(route.callback){
						currentStepPromise = function(){
							return route.callback(route.view, route.container);
						}
					} else {
						currentStepPromise = function(){
							return helpers.displayWithJade(route.container,route.view,{});
						}
					}
				} else if (route.callback){	
					return route.callback();
				}
			}
		})

		var nextStepsPromise;

		if(typeof urlChain[depth+1] !== "undefined"){
			nextStepsPromise = function(){
				console.log(urlChain,depth);
				return execRoute(urlChain,depth+1);
			}
		}

		if(nextStepsPromise){
			if(currentStepPromise){
				return currentStepPromise().then(nextStepsPromise);
			} 
			return nextStepsPromise();
		}

		return currentStepPromise();
	}

	var handleHashChange = function(){
		var url = location.hash.slice(1) || '/';

		var urlChain = (url === "/") ? [url] : url.split("/");

		routeChangeListeners.forEach(function(listener){
			listener(url, urlChain);
		})
		
		execRoute(urlChain, 0);
		
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
		addRouteChangeListener: addRouteChangeListener,
		init: init
	}

})()