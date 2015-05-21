"use strict"

// crud

var CategoriesCtrl = (function(){


	var container;
	var view;

	var categoryRes = new Resource("/api/categories");

	var list = function(){
		return categoryRes.query().then(function(result){
			
			var data = {
				categories: result.list
			};

			return helpers.displayWithJade(container, view, data);	
		})
	}

	var reset = function(){
		$('#categories-form').trigger("reset");
		$('#categories-form').find("[name=_id]").val("");
	}

	var edit = function(id){
		categoryRes.view(id).then(function(data){
			Object.keys(data).forEach(function(field){
				var formElement = $("[name="+field+"]");
				formElement.val(data[field]);
			})			
		})
	}

	var save = function(data){
		
		var id = data._id || "";
		delete(data._id);

		// if id update
		if(id !== ""){
			
			categoryRes.update(id, data)
				.then(function(){
					console.log("Updated Successfuly!")
					list();
				})
		// else create
		} else {
			categoryRes.create(data)
				.then(function(){
					console.log("Created Successfuly!")
					list();
				})
		}

	}

	var remove = function(id){
		categoryRes.delete(id).then(function(){
			console.log("Deleted "+id+" successfuly!");
			list();
		})
	}

	var init = function(_view, _container){

		container = _container;
		view = _view;

		$(container).unbind();

		$(container).on("submit", "#categories-form",function(event){
			var data = helpers.getDataFromForm($(this));
			save(data);
			event.preventDefault();
		})

		$(container).on("click", ".action-reset",function(event){
			reset();
		})

		$(container).on("click", ".action-delete", function(){
			var id = $(this).data("id");
			remove(id);
		})

		$(container).on("click", ".action-edit", function(){
			var id = $(this).data("id");
			edit(id);
		})

		return list();
	}

	return {
		list: list,
		reset: reset,
		edit: edit,
		save: save,
		remove: remove,
		init: init
	};

}());