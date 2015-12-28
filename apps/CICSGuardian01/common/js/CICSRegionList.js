function initCICSRegionList(){
	if (WL.Client.getLoginName("AdapterAuthRealm") != null)	 {
		$("#CICSRegionList_header_user").html("User: " + 
											    "<span class='span_normal span_italic'>" +
											    WL.Client.getLoginName("AdapterAuthRealm") +
											    "</span>"
											    );
	}	
	
	getCICSRegionList();
		
}

function getCICSRegionList(){
	WL.Logger.debug("*** getCICSRegionList() ***");
	$("#CICSRegionList").empty();
	regionListClassified = [];
		
	
	var strTimeStamp = getTimeStamp();
	$("#CICSRegionList_header_refreshTime").html("Refresh Time: " + 
												    "<span class='span_normal span_italic'>" +
												    strTimeStamp +
												    "</span>"
												    );
		
	//var regionList = null;
	var invocationData = {
			adapter : 'SQL_DB01',
			procedure : 'getCICSRegionList'
		};	
	
	WL.Client.invokeProcedure(invocationData, {
		onSuccess : function(result) {
			//busy.hide();
			//WL.Logger.debug("Profile loaded SUCCESS: ", result);
			regionList = result.invocationResult.resultSet;
			WL.Logger.debug(">>>regionList: " , regionList);
			WL.Logger.debug(">>>regionList.length:",regionList.length);
			// listviewへデータを埋め込み
			var i;
			var green_count = 0,
				yellow_count = 0,
				red_count = 0,
				unknown_count = 0;
			var item;
			var strMVSSYSNAME;
			for (i = 0; i < regionList.length; i++) {
				item = regionList[i];
				
				strMVSSYSNAME = removeBlank(item.MVSSYSNAME.toString());
				//WL.Logger.debug(">>>>>strMVSSYSNAME:" + strMVSSYSNAME);
				
				if (strMVSSYSNAME in regionListClassified){
					regionListClassified[strMVSSYSNAME].push(item);
					//WL.Logger.debug(">>>>>regionListClassified1: ", regionListClassified[strMVSSYSNAME]);
				} else {
					regionListClassified[strMVSSYSNAME] = [item];
					//WL.Logger.debug(">>>>>regionListClassified2: ", regionListClassified[strMVSSYSNAME]);
				}		

			}

			for (key in regionListClassified){
				//WL.Logger.debug(">>>>> key:" + key);
				//WL.Logger.debug(">>>>> subList:" + JSON.stringify(regionListClassified[key]));
				var subList = regionListClassified[key];
				$("#CICSRegionList").append('<li data-role="list-divider"> ' + key + '</li>');
				for (i = 0; i < subList.length; i++) {
					item = subList[i];
					var status_file = null;
					var dsa_status  = removeBlank(item.DSA_STATUS);
					var edsa_status = removeBlank(item.EDSA_STATUS);
					var gdsa_status = removeBlank(item.GDSA_STATUS);
					var total_status = "unknown";
					if (dsa_status == "red" || edsa_status == "red" || gdsa_status == "red"){
						total_status = "red";
					} else if (dsa_status == "yellow" || edsa_status == "yellow" || gdsa_status == "yellow"){
						total_status = "yellow";
					} else if (dsa_status == "gren" || edsa_status == "green" || gdsa_status == "green"){
						total_status = "green";
					}
					
					switch(total_status){
						case "green" : 
							status_file = 'status_green.png'; 
							green_count = green_count + 1;
							break;
						case "yellow" : 
							status_file = 'status_yellow.png'; 
							yellow_count = yellow_count + 1;
							break;
						case "red" : 
							status_file = 'status_red.png'; 
							red_count = red_count + 1;
							break;
						default :         
							status_file = 'status_unknown.png';
							unknown_count = unknown_count + 1;
							break;
					}
					$("#CICSRegionList").append('<li>' + 
					'<a href="#" onclick="CICSRegionList_onClick(\'' + key + '\',\'' + i + '\');">' + 
					   '<img src="images/' + status_file + '" class="ui-li-icon"/> ' + 
					   '<p class="wordbreak">' +
					   	'<b>' + item.REGIONNAME + '</b> <br/>'+
					     item.TYPE + ' / ' + item.CICSPLEXNAME + ' / ' + item.DESCRIPTION + 
					   '</p>' + 
					'</a></li>');
				}
				// listviewの表示を更新
				$("#CICSRegionList").listview("refresh");
				
				
				$("#CICSRegionList_header_region_count").text(regionList.length);
				$("#CICSRegionList_header_green_count").text(green_count);
				$("#CICSRegionList_header_yellow_count").text(yellow_count);
				$("#CICSRegionList_header_red_count").text(red_count);
				$("#CICSRegionList_header_unknown_count").text(unknown_count);
				
			}
		},
		onFailure : function(result) {
			//busy.hide();
			WL.Logger.debug("Profile loaded FAILURE: ", result);
			//alert("Profile loaded FAILURE: " + JSON.stringify(result));
		}
	});
	

}


function CICSRegionList_onClick(key, index) {
	WL.Logger.debug("*** CICSRgionList_onClick() ***");
	WL.Logger.debug(">>>index:",index);
	//selectedRegion = regionList[index];
	selectedRegion = regionListClassified[key][index];
	WL.Logger.debug(">>>selectedRegion:",selectedRegion);
	isLoadStorageCurrent = true;
	activeStorageTab = 'DSA';
	$.mobile.changePage("#Page_StorageCurrent",{ transition: "none"});
}
