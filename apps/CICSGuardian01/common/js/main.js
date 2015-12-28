function wlCommonInit(){

	/*
	 * Application is started in offline mode as defined by a connectOnStartup property in initOptions.js file.
	 * In order to begin communicating with Worklight Server you need to either:
	 * 
	 * 1. Change connectOnStartup property in initOptions.js to true. 
	 *    This will make Worklight framework automatically attempt to connect to Worklight Server as a part of application start-up.
	 *    Keep in mind - this may increase application start-up time.
	 *    
	 * 2. Use WL.Client.connect() API once connectivity to a Worklight Server is required. 
	 *    This API needs to be called only once, before any other WL.Client methods that communicate with the Worklight Server.
	 *    Don't forget to specify and implement onSuccess and onFailure callback functions for WL.Client.connect(), e.g:
	 *    
	 *    WL.Client.connect({
	 *    		onSuccess: onConnectSuccess,
	 *    		onFailure: onConnectFailure
	 *    });
	 *     
	 */
	
	// Common initialization code goes here
	
	WL.Logger.debug("-----begin wlCommonInit------");
	// 各ボタンがクリックされたときに呼ばれるメソッドを指定
	$('#button_logout').click(invokeLogout);
	$('#button_refreshCICSRegionList').click(getCICSRegionList);
	$('#button_refreshStorageCurrent').click(getStorageCurrent);
	$('#button_refreshStorageHistory').click(getStorageHistory);

	$('#button_resetDSALimit').click(resetDSALimit);
	$('#button_previewDSALimit').click(previewDSALimit);
	$('#button_changeDSALimit').click(showDSALimitConfirm);
	$('#Popup_DSALimitConfirm').bind('popupafterclose',invokeChangeDSALimit);
	
	$('#button_resetEDSALimit').click(resetEDSALimit);
	$('#button_previewEDSALimit').click(previewEDSALimit);
	$('#button_changeEDSALimit').click(showEDSALimitConfirm);
	$('#Popup_EDSALimitConfirm').bind('popupafterclose',invokeChangeEDSALimit);

	//$(document).on("pagebeforeshow", "#Page_CICSRegionList", initCICSRegionList);
	$(document).on("pageshow", "#Page_CICSRegionList", initCICSRegionList);
	$(document).on("pageshow", "#Page_StorageCurrent", initStorageCurrent);
	$(document).on("pageshow", "#Page_StorageHistory", initStorageHistory);
	$(document).on("pageshow", "#Page_ChangeDSALimit", initChangeDSALimit);
	$(document).on("pageshow", "#Page_ChangeEDSALimit", initChangeEDSALimit);
	
	//$(document).on("pageshow", "#Dialog_DSALimitConfirm", showDSALimitConfirm);

	$('#Tab_DSACurrent').click(displayDSACurrentField);
	$('#Tab_EDSACurrent').click(displayEDSACurrentField);
	$('#Tab_GDSACurrent').click(displayGDSACurrentField);
	
	$('#Tab_DSAHistory').click(displayDSAHistoryField);
	$('#Tab_EDSAHistory').click(displayEDSAHistoryField);
	//$('#Tab_GDSAHistory').click(displayGDSAHistoryField);

	//$("#div_slider_DSALimit").on("change", "#slider_DSALimit", updateAfterDSACurrentField);
	
	initMenu();
	
	WL.Logger.debug("-----end wlCommonInit------");
}


//Global Valiables
var regionList = null;
var regionListClassified = new Array();
var selectedRegion = null;

var storageCurrentTimeStamp = null;
var storageCurrent = null;
var strLoadTimeStamp = null;
var isLoadStorageCurrent = true; 
var isLoadStorageCurrentSuccess = false;

var storageHistory = null;
var isLoadStorageHistory = true;
var isLoadStorageHistorySuccess = false;

var activeStorageTab = null; // DSA or EDSA or GDSA

var isChangeDSALimitOK = false;

// Utilities

function addFigure(str) {
	var num = new String(str).replace(/,/g, "");
	while(num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
	return num;
} 

function removeBlank(str){
	if (str != null){
		return str.replace(/\s+/g, "");
	} else {
		return null;
	}
	
}

function date_format(num){
    return ( num < 10 ) ? '0' + num  : num;
};

function getTimeStamp(){
	var date = new Date();
	//var iTimeStamp = date.getTime();
	var strTimeStamp = date.getFullYear() + "/"
    	         + date_format(date.getMonth()+1) + "/"
    	         + date_format(date.getDate()) + "-" 
    	         + date_format(date.getHours()) + ":"
    	         + date_format(date.getMinutes()) + ":"
    	         + date_format(date.getSeconds());
	return strTimeStamp;
}



function recordStorageCurrent(){
	WL.Logger.debug("****** begin recordStorageCurrent*****");
	var regionName = removeBlank(selectedRegion.REGIONNAME);
	var CICSplexName = removeBlank(selectedRegion.CICSPLEXNAME);
	var WUIServer = removeBlank(selectedRegion.WUISERVER);
	var dsa_threshold = selectedRegion.DSA_THRESHOLD;
	var edsa_threshold = selectedRegion.EDSA_THRESHOLD;
	var gdsa_threshold = selectedRegion.GDSA_THRESHOLD;
	
	
	var HTTPadapterName = 'Local';
	var HTTPprocedure = 'setSingleRegionDynamicStorage';
	var HTTPparameter = [regionName, WUIServer, CICSplexName, dsa_threshold, edsa_threshold, gdsa_threshold];
		
	var invocationData = {
			adapter : HTTPadapterName,
			procedure : HTTPprocedure,
			parameters : HTTPparameter
		};	
	
	WL.Client.invokeProcedure(invocationData, {
		onSuccess : function(result) {
			WL.Logger.debug("SUCCESS: ", result);
			
		},
		onFailure : function(result) {
			WL.Logger.debug("FAIL: ", result);
		}
	});
	WL.Logger.debug("****** end recordStorageCurrent*****");
}
