/*
 * COPYRIGHT LICENSE: This information contains sample code provided in source code form. You may copy, modify, and distribute
 * these sample programs in any form without payment to IBM® for the purposes of developing, using, marketing or distributing
 * application programs conforming to the application programming interface for the operating platform for which the sample code is written.
 * Notwithstanding anything to the contrary, IBM PROVIDES THE SAMPLE SOURCE CODE ON AN "AS IS" BASIS AND IBM DISCLAIMS ALL WARRANTIES,
 * EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, ANY IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, SATISFACTORY QUALITY,
 * FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND ANY WARRANTY OR CONDITION OF NON-INFRINGEMENT. IBM SHALL NOT BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR OPERATION OF THE SAMPLE SOURCE CODE.
 * IBM HAS NO OBLIGATION TO PROVIDE MAINTENANCE, SUPPORT, UPDATES, ENHANCEMENTS OR MODIFICATIONS TO THE SAMPLE SOURCE CODE.
 */
var adapterAuthRealmChallengeHandler = WL.Client.createChallengeHandler("AdapterAuthRealm");

adapterAuthRealmChallengeHandler.isCustomResponse = function(response) {
	WL.Logger.debug("***** begin Auth isCustomRespone ****");
	if (!response || !response.responseJSON	|| response.responseText === null) {
		return false;
	}
	if (typeof(response.responseJSON.authRequired) !== 'undefined'){
		return true;
	} else {
		return false;
	}
	WL.Logger.debug("***** end Auth isCustomRespone ****");
};

adapterAuthRealmChallengeHandler.handleChallenge = function(response){
	WL.Logger.debug("***** begin ChallengeHandler ****");
	var authRequired = response.responseJSON.authRequired;

	if (authRequired == true){
		WL.Logger.debug("***** authRequired: true*");
		
		//initStorage();
		//var authData = getData();
		//WL.Logger.debug("*** return form getData:", authData);
		
		$("#AppDiv").hide();
		$("#AuthDiv").show();
		
		$("#AuthPassword").empty();
		$("#AuthMessage").empty();
		
		/*
		if (authData != null){
			
			$("#AuthPassword").val(authData.json.userId);
			$("#AuthMessage").val(authData.json.password);
		} else {
			$("#AuthPassword").empty();
			$("#AuthMessage").empty();
		}
		*/
		
		
		if (response.responseJSON.errorMessage)
	    	$("#AuthMessage").html(response.responseJSON.errorMessage);
		
	} else if (authRequired == false){
		WL.Logger.debug("***** authRequired: false*");
		$("#AppDiv").show();
		$("#AuthDiv").hide();
		adapterAuthRealmChallengeHandler.submitSuccess();
		
	}
	
	WL.Logger.debug("***** end ChallengeHandler ****");
};


$("#AuthSubmitButton").bind('click', function () {
	var userId = $("#AuthUserId").val();
	var password = $("#AuthPassword").val();

	var invocationData = {
		adapter : "AuthAdapter",
		procedure : "submitAuthentication",
		parameters : [ userId, password ]
	};
	
	var authData = {
			userId : userId,
			password : password
	};
	//putData(userId, authData);
	

	adapterAuthRealmChallengeHandler.submitAdapterAuthentication(invocationData, {});
	
});

$("#AuthCancelButton").bind('click', function () {
	$("#AppDiv").show();
	$("#AuthDiv").hide();
	adapterAuthRealmChallengeHandler.submitFailure();
});
