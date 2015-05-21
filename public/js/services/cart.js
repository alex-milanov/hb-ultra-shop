"use strict"

var Cart = (function(){

	var items = [];

	var getItems = function(){
		return items;
	}

	var addItem = function(item){
		items.push(item)
	}

	return {
		getItems: getItems,
		addItem: addItem
	}

})()