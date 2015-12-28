/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/*
WL.Logger.error("Creating event source");

WL.Server.createEventSource({
	name: "monitorDynamicStorageEventSource",
	poll: {
		interval: 60,
		onPoll: "monitorDynamicStorage"
	}
});
*/


function setDynamicStorage(regionName, WUIServer, CICSplexName ,iTimeStamp, strTimeStamp,
						   dsa_threshold, edsa_threshold, gdsa_threshold){


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
	
	WL.Logger.error("=== invoke Procedure ===");
	var response = WL.Server.invokeProcedure(invocationData);
	WL.Logger.error("=== response:" + JSON.stringify(response));
	
	var	dsa_status = 'unknown';
	var	edsa_status = 'unknown';
	var	gdsa_status = 'unknown';
	
	if (response.isSuccessful){
		WL.Logger.error("=== OK ===");
		
		var SQLparameter2 = [regionName, WUIServer, CICSplexName, iTimeStamp, strTimeStamp.toString(),
			                   response.dynamicStorage.cdsa.total_limit, dsa_threshold,
			                   response.dynamicStorage.cdsa.used, response.dynamicStorage.cdsa.allocated, response.dynamicStorage.cdsa.free,
			                   response.dynamicStorage.rdsa.used, response.dynamicStorage.rdsa.allocated, response.dynamicStorage.rdsa.free,
			                   response.dynamicStorage.sdsa.used, response.dynamicStorage.sdsa.allocated, response.dynamicStorage.sdsa.free,
			                   response.dynamicStorage.udsa.used, response.dynamicStorage.udsa.allocated, response.dynamicStorage.udsa.free,
			                   response.dynamicStorage.ecdsa.total_limit, edsa_threshold,
			                   response.dynamicStorage.ecdsa.used, response.dynamicStorage.ecdsa.allocated, response.dynamicStorage.ecdsa.free,
			                   response.dynamicStorage.erdsa.used, response.dynamicStorage.erdsa.allocated, response.dynamicStorage.erdsa.free,
			                   response.dynamicStorage.esdsa.used, response.dynamicStorage.esdsa.allocated, response.dynamicStorage.esdsa.free,
			                   response.dynamicStorage.eudsa.used, response.dynamicStorage.eudsa.allocated, response.dynamicStorage.eudsa.free,
			                   response.dynamicStorage.etdsa.used, response.dynamicStorage.etdsa.allocated, response.dynamicStorage.etdsa.free,
			                   response.dynamicStorage.gcdsa.total_limit, gdsa_threshold,
			                   response.dynamicStorage.gcdsa.used, response.dynamicStorage.gcdsa.allocated, response.dynamicStorage.gcdsa.free,              
			                   response.dynamicStorage.gsdsa.used, response.dynamicStorage.gsdsa.allocated, response.dynamicStorage.gsdsa.free,
			                   response.dynamicStorage.gudsa.used, response.dynamicStorage.gudsa.allocated, response.dynamicStorage.gudsa.free];

/*
		var SQLparameter = [regionName, WUIServer, CICSplexName, iTimeStamp, strTimeStamp.toString(),
			                   response.dynamicStorage.cdsa.total_limit, dsa_threshold];
		*/
		//WL.Logger.error("**** SQLparameter:" + SQLparameter);
		
		var invocationData2 = {
				adapter : 'SQL_DB01',
				procedure : 'insertStorageHistory',
				parameters : SQLparameter2
		};
		
		var response2 = WL.Server.invokeProcedure(invocationData2);
		WL.Logger.error("=== response2:" + JSON.stringify(response2));
		
		var is_dsa_sos = false;
		if (response.dynamicStorage.sosbelowline == "SOS"){
			is_dsa_sos = true;
		}
		var dsa_threshold_size = dsa_threshold * response.dynamicStorage.cdsa.total_limit / 100;
		var dsa_total_allocated = response.dynamicStorage.cdsa.allocated + 
								  response.dynamicStorage.rdsa.allocated +
								  response.dynamicStorage.sdsa.allocated +
								  response.dynamicStorage.udsa.allocated ;
		if (is_dsa_sos){
			dsa_status = "red";
		} else if (dsa_total_allocated > dsa_threshold_size) {
			dsa_status = "yellow";
		} else {
			dsa_status = "green";
		}
		
		var is_edsa_sos = false;
		if (response.dynamicStorage.sosaboveline == "SOS"){
			is_edsa_sos = true;
		}
		var edsa_threshold_size = edsa_threshold * response.dynamicStorage.ecdsa.total_limit / 100;
		var edsa_total_allocated = response.dynamicStorage.ecdsa.allocated + 
								  response.dynamicStorage.erdsa.allocated +
								  response.dynamicStorage.esdsa.allocated +
								  response.dynamicStorage.eudsa.allocated +
								  response.dynamicStorage.etdsa.allocated;
		
		if (is_edsa_sos){
			edsa_status = "red";
		} else if (edsa_total_allocated > edsa_threshold_size) {
			edsa_status = "yellow";
		} else {
			edsa_status = "green";
		}
		
		var is_gdsa_sos = false;
		if (response.dynamicStorage.sosabovebar == "SOS"){
			is_gdsa_sos = true;
		}
		var gdsa_threshold_size = gdsa_threshold * response.dynamicStorage.gcdsa.total_limit / 100;
		var gdsa_total_allocated = response.dynamicStorage.gcdsa.allocated + 
								  response.dynamicStorage.gsdsa.allocated +
								  response.dynamicStorage.gudsa.allocated ;
		
		
		if (response.dynamicStorage.gcdsa.total_limit == 0){
			gdsa_status = "unkown";
		} else if (is_gdsa_sos){
			gdsa_status = "red";
		} else if (gdsa_total_allocated > gdsa_threshold_size) {
			gdsa_status = "yellow";
		} else {
			gdsa_status = "green";
		}
			
		var SQLparameter3 = [regionName, WUIServer, CICSplexName, dsa_status, edsa_status, gdsa_status];
		
		
		var invocationData3 = {
				adapter : 'SQL_DB01',
				procedure : 'updateCICSRegionStatus',
				parameters : SQLparameter3
		};
		
		var response3 = WL.Server.invokeProcedure(invocationData3);
		WL.Logger.error("=== response3:" + JSON.stringify(response3));
		
		return response3;
		
	} else {
		
		WL.Logger.error("=== NG ===");
		var SQLparameter2 = [regionName, WUIServer, CICSplexName, iTimeStamp, strTimeStamp.toString(),
		                     0,0,
		                     0,0,0,
		                     0,0,0,
		                     0,0,0,
		                     0,0,0,
		                     0,0,
		                     0,0,0,
		                     0,0,0,
		                     0,0,0,
		                     0,0,0,
		                     0,0,0,
		                     0,0,
		                     0,0,0,
		                     0,0,0,
		                     0,0,0];

/*
		var SQLparameter = [regionName, WUIServer, CICSplexName, iTimeStamp, strTimeStamp.toString(),
			                   response.dynamicStorage.cdsa.total_limit, dsa_threshold];
		*/
		//WL.Logger.error("**** SQLparameter:" + SQLparameter);
		
		var invocationData2 = {
				adapter : 'SQL_DB01',
				procedure : 'insertStorageHistory',
				parameters : SQLparameter2
		};
		
		var response2 = WL.Server.invokeProcedure(invocationData2);
		WL.Logger.error("=== response2:" + JSON.stringify(response2));
		
		var SQLparameter3 = [regionName, WUIServer, CICSplexName, dsa_status, edsa_status, gdsa_status];
		
		WL.Logger.error("=== SQLparameter3:" + SQLparameter3 );
		
		var invocationData3 = {
				adapter : 'SQL_DB01',
				procedure : 'updateCICSRegionStatus',
				parameters : SQLparameter3
		};
		
		var response3 = WL.Server.invokeProcedure(invocationData3);
		WL.Logger.error("=== response3:" + JSON.stringify(response3));
		
		return response3;
		
	}
	

}

function date_format(num){
    return ( num < 10 ) ? '0' + num  : num;
}

function monitorDynamicStorage(){
	regionName='CT51S4A1';
	
	WL.Logger.error('**********begin monitor**********');
	
	var invocationData = {
			adapter : 'SQL_DB01',
			procedure : 'getCICSRegionList'
		};	
	
	var response = WL.Server.invokeProcedure(invocationData);
	WL.Logger.error("*** response:" + JSON.stringify(response));
	
	if (response.isSuccessful){
		date = new Date();
		var iTimeStamp = date.getTime();
		var strTimeStamp = date.getFullYear() + '/'
				        + date_format(date.getMonth()+1) + '/'
				        + date_format(date.getDate()) + '-'
				        + date_format(date.getHours()) + ':'
				        + date_format(date.getMinutes()) + ':'
				        + date_format(date.getSeconds());
		
		var regionList = response.resultSet;
		var i;
		for (i = 0; i < regionList.length; i++) {
		//for (i = 7; i < 8; i++) {
			WL.Logger.error("*** regionList[" + i + "]: " + JSON.stringify(regionList[i]));
			setDynamicStorage(regionList[i].REGIONNAME, regionList[i].WUISERVER, regionList[i].CICSPLEXNAME,
					          iTimeStamp, strTimeStamp,
					          regionList[i].DSA_THRESHOLD, regionList[i].EDSA_THRESHOLD, regionList[i].GDSA_THRESHOLD);
			
		}
	} else {
		WL.Logger.error('**********ERROR**********');
	}
	
	WL.Logger.error('**********end monitor**********');
	

	return response;
}


function setSingleRegionDynamicStorage(regionName, WUIServer, CICSplexName, dsa_threshold, edsa_threshold, gdsa_threshold){
	
	WL.Logger.error('**********begin setSingleRegionDynamicStorage()**********');

		date = new Date();
		var iTimeStamp = date.getTime();
		var strTimeStamp = date.getFullYear() + '/'
				        + date_format(date.getMonth()+1) + '/'
				        + date_format(date.getDate()) + '-'
				        + date_format(date.getHours()) + ':'
				        + date_format(date.getMinutes()) + ':'
				        + date_format(date.getSeconds());
		

		var response = setDynamicStorage(regionName, WUIServer, CICSplexName,
					          iTimeStamp, strTimeStamp,
					          dsa_threshold, edsa_threshold, gdsa_threshold);
			
	
	WL.Logger.error('**********end setSingleRegionDynamicStorage()**********');
	
	return response;
}


