function initStorageCurrent(){
	if (WL.Client.getLoginName("AdapterAuthRealm") != null)	 {
		$("#StorageCurrent_header_user").html("User: " + 
											    "<span class='span_normal span_italic'>" +
											    WL.Client.getLoginName("AdapterAuthRealm") +
											    "</span>"
											    );
	}
	
	var regionName = removeBlank(selectedRegion.REGIONNAME);
	var CICSplexName = removeBlank(selectedRegion.CICSPLEXNAME);
	//var WUIServer = removeBlank(selectedRegion.WUISERVER);
	var sysId = removeBlank(selectedRegion.SYSID);
	var MVSSysName = removeBlank(selectedRegion.MVSSYSNAME);

	$('#StorageCurrent_header_regionName').text(regionName);
	$('#StorageCurrent_header_sysId').text(sysId);
	$('#StorageCurrent_header_CICSPlexName').text(CICSplexName);
	$('#StorageCurrent_header_MVSSysName').text(MVSSysName);
	
	
	if (isLoadStorageCurrent) {
		getStorageCurrent();
		isLoadStorageCurrent = false;
	} else {
		switch(activeStorageTab){
			case 'DSA':
				displayDSACurrentField();
				break;
			case 'EDSA':
				displayEDSACurrentField();
				break;
			case 'GDSA':
				displayGDSACurrentField();
				break;
			default:
				displayDSACurrentField();
		}
	}
	

}

function getStorageCurrent(){
	WL.Logger.debug("****** begin getStorageCurrent*****");
	//WL.Logger.debug("*** selected region:" + JSON.stringify(selectedRegion));

	var regionName = removeBlank(selectedRegion.REGIONNAME);
	var CICSplexName = removeBlank(selectedRegion.CICSPLEXNAME);
	var WUIServer = removeBlank(selectedRegion.WUISERVER);
	//var sysId = removeBlank(selectedRegion.SYSID);
	//var MVSSysName = removeBlank(selectedRegion.MVSSYSNAME);
	
	storageCurrentTimeStamp = getTimeStamp();
	$('#StorageCurrent_header_refreshTime').html("Refresh Time: " + 
												    "<span class='span_normal span_italic'>" +
												    storageCurrentTimeStamp +
												    "</span>"
												    );
	
	var HTTPadapterName;
	var HTTPparameter = [];
	
	if (WUIServer != null){
		HTTPadapterName = 'HTTP_' + WUIServer + '_CMCI';
		WL.Logger.debug("HTTPadapterName="+ HTTPadapterName);
		HTTPparameter = [CICSplexName, regionName];
	} else {
		HTTPadapterName = 'HTTP_' + regionName + '_CMCI';
		WL.Logger.debug("HTTPadapterName="+ HTTPadapterName);
		HTTPparameter = [regionName, regionName];
	}
		
	var invocationData = {
			adapter : HTTPadapterName,
			procedure : 'getDynamicStorageFiltered',
			parameters : HTTPparameter
		};
	
	//var dynamicStorage = null;
	
	WL.Client.invokeProcedure(invocationData, {
		onSuccess : function(result) {
			//busy.hide();
			WL.Logger.debug("Profile loaded SUCCESS: ", result);
			if (result.invocationResult.dynamicStorage.cdsa) {
				// プロファイル情報の取得に成功した場合
				//WL.Logger.debug(">>>invocationResult.dsa:",result.invocationResult.dsa);
				storageCurrent = result.invocationResult.dynamicStorage;
				WL.Logger.debug(">>>storageCurrent: " , storageCurrent);
				isLoadStorageCurrentSuccess = true;
				//WL.Logger.debug(">>>dsaData.cdsa.used: " , this.dsaData.cdsa.used);
				//this.profile.itemNum = itemNum;	
				switch(activeStorageTab){
					case 'DSA':
						displayDSACurrentField();
						break;
					case 'EDSA':
						displayEDSACurrentField();
						break;
					case 'GDSA':
						displayGDSACurrentField();
						break;
					default:
						displayDSACurrentField();
				}
							  				
							
			} else {
				// プロファイル情報の取得に失敗した場合
				WL.Logger.debug(">>>Error: ", result.invocationResult);
				isLoadStorageCurrentSuccess = false;
				switch(activeStorageTab){
					case 'DSA':
						displayDSACurrentField();
						break;
					case 'EDSA':
						displayEDSACurrentField();
						break;
					case 'GDSA':
						displayGDSACurrentField();
						break;
					default:
						displayDSACurrentField();
				}
								
			}

		},
		onFailure : function(result) {
			//busy.hide();
			WL.Logger.debug("Profile loaded FAILURE: ", result);
			//alert("Profile loaded FAILURE: " + JSON.stringify(result));
			isLoadStorageCurrentSuccess = false;
			
			switch(activeStorageTab){
				case 'DSA':
					displayDSACurrentField();
					break;
				case 'EDSA':
					displayEDSACurrentField();
					break;
				case 'GDSA':
					displayGDSACurrentField();
					break;
				default:
					displayDSACurrentField();
			}

		}
	});
	
	WL.Logger.debug("****** end getDSACurrent*****");
}


function StorageHistoryIcon_onClick(tab) {
	WL.Logger.debug("*** StorageHistoryIcon_onClick() ***");

	isLoadStorageHistory = true;
	activeStorageTab = tab;
	WL.Logger.debug(">>>activeStorageTab:" + activeStorageTab);
	$.mobile.changePage("#Page_StorageHistory",{ transition: "none"});
}
