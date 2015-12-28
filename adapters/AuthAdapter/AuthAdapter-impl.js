
function onAuthRequired(headers, errorMessage){
	errorMessage = errorMessage ? errorMessage : null;
	
	return {
		authRequired: true,
		errorMessage: errorMessage
	};
}

function submitAuthentication(userId, password){
	WL.Logger.error("***** begin submitAuthentication ****");
	
	var response = getUserInfo(userId, password);
	if ((response.isSuccessful) && (response.resultSet.length > 0 )){
		WL.Logger.error("***** user/password: OK ****");
		var userIdentity = {
				userId: response.resultSet[0].USERID,
				displayName: response.resultSet[0].DISPLAYNAME, 
				attributes: {
					foo: "bar"
				}
		};
		
		WL.Server.setActiveUser("AdapterAuthRealm", userIdentity);
		
		return { 
			authRequired: false 
		};
	}
		
	WL.Logger.error("***** user/password: NG ****");

	return onAuthRequired(null, "Invalid login credentials");
}

function onLogout(){
	WL.Server.setActiveUser("AdapterAuthRealm", null);
	WL.Logger.debug("Logged out");
}


function Sleep( T ){ 
	WL.Logger.error("***** begin Sleep ****");
	   var d1 = new Date().getTime(); 
	   var d2 = new Date().getTime(); 
	   while( d2 < d1+1000*T ){    //T秒待つ 
	       d2=new Date().getTime(); 
	   } 
	   WL.Logger.error("***** end Sleep ****");
	   return; 
} 

var setEncryptionStatement = WL.Server.createSQLStatement("set encryption password = ?");
var getUserInfoStatement = WL.Server.createSQLStatement("select USERID, DISPLAYNAME from UserTable01 where USERID=? and PASSWORD=encrypt(?)");
function getUserInfo(userid, password) {
	//WL.Logger.error("***** begin getUserInfo ****");
	//WL.Logger.error("***** 1st SQL ****");
	WL.Server.invokeSQLStatement({
		preparedStatement : setEncryptionStatement,
		parameters : ['cicsgurdian']
	});
	
	//Sleep(20);
	
	//WL.Logger.error("***** 2nd SQL ****");
	return WL.Server.invokeSQLStatement({
		preparedStatement : getUserInfoStatement,
		parameters : [userid, password]
	});
}



var getUserInfoStatement_bk = WL.Server.createSQLStatement("select USERID, DISPLAYNAME from UserTable01 where USERID=? and PASSWORD=?");
function getUserInfo_bk(userId, password) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : getUserInfoStatement_bk,
		parameters : [userId, password]
	});
}

function test(userId, password) {
	var response = getUserInfo(userId, password);
	WL.Logger.error("***response:" + JSON.stringify(response));
	WL.Logger.error("***length:" + response.resultSet.length);
	if ((response.isSuccessful) && (response.resultSet.length >=0 )){
		return response.resultSet[0];
	}
	return {'isSuccessful': false};
}

