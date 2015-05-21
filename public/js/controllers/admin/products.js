"use strict"

// crud

var ProductsCtrl = (function(){

	var productRes = new Resource("/api/products");

	var list = function(){
		return productRes.query().then(function(result){
			var container = $("#content");
			var tplName = "views/admin/products.jade"
			var data = {
				products: result.list
			};

			return helpers.displayWithJade(container, tplName, data);	
		})
	}

	var reset = function(){
		$('#products-form').trigger("reset");
		$('#products-form').find("[name=_id]").val("");
	}
	
	var edit = function(id){
		productRes.view(id).then(function(data){
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
			
			productRes.update(id, data)
				.then(function(){
					console.log("Updated Successfuly!")
					list();
				})
		// else create
		} else {
			productRes.create(data)
				.then(function(){
					console.log("Created Successfuly!")
					list();
				})
		}

	}

	var remove = function(id){
		productRes.delete(id).then(function(){
			console.log("Deleted "+id+" successfuly!");
			list();
		})
	}

	var init = function(){

		$("#content").unbind();

		$("#content").on("submit", "#products-form",function(event){
			var data = helpers.getDataFromForm($(this));
			save(data);
			event.preventDefault();
		})

		$("#content").on("click", ".action-reset",function(event){
			reset();
		})

		$("#content").on("click", ".action-delete", function(){
			var id = $(this).data("id");
			remove(id);
		})

		$("#content").on("click", ".action-edit", function(){
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
