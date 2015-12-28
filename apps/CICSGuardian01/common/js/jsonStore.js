

STORAGE = {};
var collectionName = 'authInfo';

function initStorage(){
	WL.Logger.debug("===== begin initStorage =====");
	var collections ={};
	collections[collectionName]={};
	collections[collectionName].serchFields = {userId: 'string'};
	var options = {
			password: 'secret'
	};
	WL.JSONStore.init(collections, options)
	.fail(function(errorObject){
		WL.Logger.error("JSONStore の初期化に失敗しました： " + errorObject);
	});
	WL.Logger.debug("===== end initStorage =====");
}

function putData(key, value){
	WL.Logger.debug("===== begin putData =====");
	var id = 1;
	value.key = key;
	
	var document = {
			_id: 1,
			json: value
	};
	var options = {};
	
	WL.JSONStore.get(collectionName).findById(id)
	.then(function (arrayResults) {
		WL.Logger.debug("*** arrayResults:", arrayResults);
		if (arrayResults.length > 0){
			WL.Logger.debug("*** JSONStore: replace data  ***");
			
			WL.JSONStore.get(collectionName).replace(document, options)
			.then(function () {
				WL.Logger.debug("*** replace success:" , value);
			})
			.fail(function (errorObject) {
				WL.Logger.debug("*** replace fail" , value);
			});
		} else{
			WL.Logger.debug("*** JSONStore: add data ***");
			WL.JSONStore.get(collectionName).add(value,options)
			.then(function(){
				WL.Logger.debug("*** add success:" , value);
			})
			.fail(function(errorObject){
				WL.Logger.debug("*** add fail" , value);
			});
		}
	  
	})
	.fail(function (errorObject) {
		WL.Logger.debug("*** JSONStore: add data ***");
		WL.JSONStore.get(collectionName).add(value,options)
		.then(function(){
			WL.Logger.debug("*** add success:" , value);
		})
		.fail(function(errorObject){
			WL.Logger.debug("*** add fail" , value);
		});
	});
	
	WL.Logger.debug("===== end putData =====");
	
}

function getData(){

	WL.Logger.debug("===== begin getData =====");

	var id = 1;
	
	WL.Logger.debug("*** JSONStore find ***");
	WL.JSONStore.get(collectionName).findById(id)
	.then(function (arrayResults) {
		WL.Logger.debug("*** find success:", arrayResults);
		return arrayResults;
	})
	.fail(function (errorObject) {
		WL.Logger.debug("*** find fail:", errorObject);
		return null;
	});
}
