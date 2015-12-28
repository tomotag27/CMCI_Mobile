
function initMenu(){
	WL.Logger.debug("*** initMenu() ***");
	if (WL.Client.getLoginName("AdapterAuthRealm") != null)	 {
		$("#Menu_header_user").html("User: " + 
								    "<span class='span_normal span_italic'>" +
								    WL.Client.getLoginName("AdapterAuthRealm") +
								    "</span>"
								    );
	}
}

function invokeLogout(){
	WL.Logger.debug("*** invoke Logout ***");
	WL.Client.logout('AdapterAuthRealm',{
		onSuccess : WL.Client.reloadApp
	});
}

