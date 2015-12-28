/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

var getCICSRegionListStatement = WL.Server.createSQLStatement("select * from CICSRegionList01");
function getCICSRegionList() {
	return WL.Server.invokeSQLStatement({
		preparedStatement : getCICSRegionListStatement,
		parameters : []
	});
}

var insertStorageHistoryStatement = WL.Server.createSQLStatement(
		  "insert into StorageHistory01(REGIONNAME, WUISERVER, CICSPLEXNAME, ITIMESTAMP, STRTIMESTAMP, " +
		                             "DSA_LIMIT, DSA_THRESHOLD," +
		                             "CDSA_USED, CDSA_ALLOCATED, CDSA_FREE," +
		                             "RDSA_USED, RDSA_ALLOCATED, RDSA_FREE," +
		                             "SDSA_USED, SDSA_ALLOCATED, SDSA_FREE," +
		                             "UDSA_USED, UDSA_ALLOCATED, UDSA_FREE," +
		                             "EDSA_LIMIT, EDSA_THRESHOLD," +
		                             "ECDSA_USED, ECDSA_ALLOCATED, ECDSA_FREE," +
		                             "ERDSA_USED, ERDSA_ALLOCATED, ERDSA_FREE," +
		                             "ESDSA_USED, ESDSA_ALLOCATED, ESDSA_FREE," +
		                             "EUDSA_USED, EUDSA_ALLOCATED, EUDSA_FREE," +
		                             "ETDSA_USED, ETDSA_ALLOCATED, ETDSA_FREE," +
		                             "GDSA_LIMIT, GDSA_THRESHOLD," +
		                             "GCDSA_USED, GCDSA_ALLOCATED, GCDSA_FREE," +
		                             "GSDSA_USED, GSDSA_ALLOCATED, GSDSA_FREE," +
		                             "GUDSA_USED, GUDSA_ALLOCATED, GUDSA_FREE" +
		                             ")" +
		                     " values(?,?,?,?,?," +
		                              "?,?," +
		                              "?,?,?," +
		                              "?,?,?," +
		                              "?,?,?," +
		                              "?,?,?," +
		                              "?,?," +
		                              "?,?,?," +
		                              "?,?,?," +
		                              "?,?,?," +
		                              "?,?,?," +
		                              "?,?,?," +
		                              "?,?," +
		                              "?,?,?," +
		                              "?,?,?," +
		                              "?,?,?)" );
function insertStorageHistory(regionName, WUIServer, CICSplexName, iTimeStamp, strTimeStamp,
		                   dsa_limit,dsa_threshold,
		                   cdsa_used,cdsa_allocated,cdsa_free,
		                   rdsa_used,rdsa_allocated,rdsa_free,
		                   sdsa_used,sdsa_allocated,sdsa_free,
		                   udsa_used,udsa_allocated,udsa_free,
		                   edsa_limit,edsa_threshold,
		                   ecdsa_used,ecdsa_allocated,ecdsa_free,
		                   erdsa_used,erdsa_allocated,erdsa_free,
		                   esdsa_used,esdsa_allocated,esdsa_free,
		                   eudsa_used,eudsa_allocated,eudsa_free,
		                   etdsa_used,etdsa_allocated,etdsa_free,
		                   gdsa_limit,gdsa_threshold,
		                   gcdsa_used,gcdsa_allocated,gcdsa_free,
		                   gsdsa_used,gsdsa_allocated,gsdsa_free,
		                   gudsa_used,gudsa_allocated,gudsa_free
		                   ) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : insertStorageHistoryStatement,
		parameters : [regionName,WUIServer,CICSplexName,iTimeStamp,strTimeStamp,
	                   dsa_limit,dsa_threshold,
	                   cdsa_used,cdsa_allocated,cdsa_free,
	                   rdsa_used,rdsa_allocated,rdsa_free,
	                   sdsa_used,sdsa_allocated,sdsa_free,
	                   udsa_used,udsa_allocated,udsa_free,
	                   edsa_limit,edsa_threshold,
	                   ecdsa_used,ecdsa_allocated,ecdsa_free,
	                   erdsa_used,erdsa_allocated,erdsa_free,
	                   esdsa_used,esdsa_allocated,esdsa_free,
	                   eudsa_used,eudsa_allocated,eudsa_free,
	                   etdsa_used,etdsa_allocated,etdsa_free,
	                   gdsa_limit,gdsa_threshold,
	                   gcdsa_used,gcdsa_allocated,gcdsa_free,
	                   gsdsa_used,gsdsa_allocated,gsdsa_free,
	                   gudsa_used,gudsa_allocated,gudsa_free]
	});
}


var insertTestStatement = WL.Server.createSQLStatement(
		  "insert into Test01(REGIONNAME, WUISERVER, CICSPLEXNAME, ITIMESTAMP, STRTIMESTAMP, " +
		                             "DSA_LIMIT, DSA_THRESHOLD" +
		                             ")" +
		                     " values(?,?,?,?,?," +
		                              "?,?" +
		                              ")" );
function insertTest(regionName, WUIServer, CICSplexName, iTimeStamp, strTimeStamp,
		                   dsa_limit,dsa_threshold
		                   ) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : insertTestStatement,
		parameters : [regionName,WUIServer,CICSplexName,iTimeStamp,strTimeStamp,
	                   dsa_limit,dsa_threshold]
	});
}


var updateCICSRegionStatusStatement = WL.Server.createSQLStatement("update CICSRegionList01 set dsa_status=?, edsa_status=?, gdsa_status=? "+
																   "where REGIONNAME=? and WUISERVER=? and CICSPLEXNAME=?");
var updateCICSRegionStatusStatement2 = WL.Server.createSQLStatement("update CICSRegionList01 set dsa_status=?, edsa_status=?, gdsa_status=? "+
																	"where REGIONNAME=? and WUISERVER is NULL and CICSPLEXNAME is NULL");
function updateCICSRegionStatus(regionName, WUIServer, CICSplexName, dsa_status, edsa_status, gdsa_status) {
	if ((WUIServer != null) && (CICSplexName != null)){
		return WL.Server.invokeSQLStatement({
			preparedStatement : updateCICSRegionStatusStatement,
			parameters : [dsa_status, edsa_status, gdsa_status, regionName, WUIServer, CICSplexName]
		});
	} else{
		return WL.Server.invokeSQLStatement({
			preparedStatement : updateCICSRegionStatusStatement2,
			parameters : [dsa_status, edsa_status, gdsa_status, regionName]
		});
	}
	
}




var getDSAHistoryStatement = WL.Server.createSQLStatement("select ITIMESTAMP, DSA_LIMIT, DSA_THRESHOLD," +
														          "CDSA_USED, CDSA_FREE," +
														          "RDSA_USED, RDSA_FREE," +
														          "SDSA_USED, SDSA_FREE," +
														          "UDSA_USED, UDSA_FREE " +
														          "from StorageHistory01 " +
														          "where REGIONNAME=? and WUISERVER=? and CICSPLEXNAME=? "+
														          "order by ITIMESTAMP ASC");
var getDSAHistoryStatement2 = WL.Server.createSQLStatement("select ITIMESTAMP, DSA_LIMIT, DSA_THRESHOLD," +
															        "CDSA_USED, CDSA_FREE," +
															        "RDSA_USED, RDSA_FREE," +
															        "SDSA_USED, SDSA_FREE," +
															        "UDSA_USED, UDSA_FREE " +
															        "from StorageHistory01 " +
															        "where REGIONNAME=? and WUISERVER is NULL and CICSPLEXNAME is NULL "+
															        "order by ITIMESTAMP ASC");
function getDSAHistory(regionName, WUIServer, CICSplexName) {
	var response;
	
	var dsa_limit = [];
	
	var dsa_threshold_stacked = [];
	var cdsa_used_stacked = [];
	var cdsa_free_stacked = [];
	var rdsa_used_stacked = [];
	var rdsa_free_stacked = [];
	var sdsa_used_stacked = [];
	var sdsa_free_stacked = [];
	var udsa_used_stacked = [];
	var udsa_free_stacked = [];
	
	var dsa_threshold_original = [];
	var cdsa_used_original = [];
	var cdsa_free_original = [];
	var rdsa_used_original = [];
	var rdsa_free_original = [];
	var sdsa_used_original = [];
	var sdsa_free_original = [];
	var udsa_used_original = [];
	var udsa_free_original = [];
	
	var result;
	
	if ((WUIServer != null) && (CICSplexName != null)){
		response  = WL.Server.invokeSQLStatement({
								preparedStatement : getDSAHistoryStatement,
								parameters : [regionName, WUIServer, CICSplexName]
								});
	} else {
		response  = WL.Server.invokeSQLStatement({
								preparedStatement : getDSAHistoryStatement2,
								parameters : [regionName]
								});
	}
	

	if ((response.isSuccessful == true) && (response.resultSet)){
		//WL.Logger.error(">>>resultSet.length: " + JSON.stringify(response.resultSet.length));
		//WL.Logger.error(">>>resultSet[0]: " + JSON.stringify(response.resultSet[0]));
		for (var i=0; i < response.resultSet.length; i++){
			var item = response.resultSet[i];
			
			dsa_limit.push([item.ITIMESTAMP, item.DSA_LIMIT]);
			
			dsa_threshold_stacked.push([item.ITIMESTAMP, item.DSA_LIMIT * item.DSA_THRESHOLD / 100]);
			cdsa_used_stacked.push([item.ITIMESTAMP, item.CDSA_USED]);
			cdsa_free_stacked.push([item.ITIMESTAMP, item.CDSA_USED + item.CDSA_FREE]);
			rdsa_used_stacked.push([item.ITIMESTAMP, item.CDSA_USED + item.CDSA_FREE + item.RDSA_USED]);
			rdsa_free_stacked.push([item.ITIMESTAMP, item.CDSA_USED + item.CDSA_FREE + item.RDSA_USED + item.RDSA_FREE]);
			sdsa_used_stacked.push([item.ITIMESTAMP, item.CDSA_USED + item.CDSA_FREE + item.RDSA_USED + item.RDSA_FREE +
			                        				 item.SDSA_USED]);
			sdsa_free_stacked.push([item.ITIMESTAMP, item.CDSA_USED + item.CDSA_FREE + item.RDSA_USED + item.RDSA_FREE +
			                        				 item.SDSA_USED + item.SDSA_FREE]);
			udsa_used_stacked.push([item.ITIMESTAMP, item.CDSA_USED + item.CDSA_FREE + item.RDSA_USED + item.RDSA_FREE +
			                        				 item.SDSA_USED + item.SDSA_FREE + item.UDSA_USED]);
			udsa_free_stacked.push([item.ITIMESTAMP, item.CDSA_USED + item.CDSA_FREE + item.RDSA_USED + item.RDSA_FREE +
			                        				 item.SDSA_USED + item.SDSA_FREE + item.UDSA_USED + item.UDSA_FREE]);
			
			dsa_threshold_original.push([item.ITIMESTAMP, item.DSA_THRESHOLD]);
			cdsa_used_original.push([item.ITIMESTAMP, item.CDSA_USED]);
			cdsa_free_original.push([item.ITIMESTAMP, item.CDSA_FREE]);
			rdsa_used_original.push([item.ITIMESTAMP, item.RDSA_USED]);
			rdsa_free_original.push([item.ITIMESTAMP, item.RDSA_FREE]);
			sdsa_used_original.push([item.ITIMESTAMP, item.SDSA_USED]);
			sdsa_free_original.push([item.ITIMESTAMP, item.SDSA_FREE]);
			udsa_used_original.push([item.ITIMESTAMP, item.UDSA_USED]);
			udsa_free_original.push([item.ITIMESTAMP, item.UDSA_FREE]);
		}

		
		result = {"isSuccessful": true,
				  "result" : {"dsa_limit": dsa_limit,
					  		  "dsa_threshold": {"stacked": dsa_threshold_stacked, "original": dsa_threshold_original},
				  			  "cdsa_used": {"stacked": cdsa_used_stacked, "original": cdsa_used_original},
							  "cdsa_free": {"stacked": cdsa_free_stacked, "original": cdsa_free_original},
							  "rdsa_used": {"stacked": rdsa_used_stacked, "original": rdsa_used_original},
							  "rdsa_free": {"stacked": rdsa_free_stacked, "original": rdsa_free_original},
							  "sdsa_used": {"stacked": sdsa_used_stacked, "original": sdsa_used_original},
							  "sdsa_free": {"stacked": sdsa_free_stacked, "original": sdsa_free_original},
							  "udsa_used": {"stacked": udsa_used_stacked, "original": udsa_used_original},
							  "udsa_free": {"stacked": udsa_free_stacked, "original": udsa_free_original}
							 }					   
				  };
		return result;	

	} else {
		result = {"isSuccessful": false,
				  "result" : {}					   
				  };
		return result;
	}
	

}








var getStorageHistoryStatement = WL.Server.createSQLStatement("select ITIMESTAMP, DSA_LIMIT, DSA_THRESHOLD," +
														          "CDSA_USED, CDSA_FREE," +
														          "RDSA_USED, RDSA_FREE," +
														          "SDSA_USED, SDSA_FREE," +
														          "UDSA_USED, UDSA_FREE," +
														          "EDSA_LIMIT, EDSA_THRESHOLD," +
														          "ECDSA_USED, ECDSA_FREE," +
														          "ERDSA_USED, ERDSA_FREE," +
														          "ESDSA_USED, ESDSA_FREE," +
														          "EUDSA_USED, EUDSA_FREE," +
														          "ETDSA_USED, ETDSA_FREE," +
														          "GDSA_LIMIT, GDSA_THRESHOLD," +
														          "GCDSA_USED, GCDSA_FREE," +
														          "GSDSA_USED, GSDSA_FREE," +
														          "GUDSA_USED, GUDSA_FREE " +
														          "from StorageHistory01 " +
														          "where REGIONNAME=? and WUISERVER=? and CICSPLEXNAME=? "+
														          "order by ITIMESTAMP ASC");
var getStorageHistoryStatement2 = WL.Server.createSQLStatement("select ITIMESTAMP, DSA_LIMIT, DSA_THRESHOLD," +
															        "CDSA_USED, CDSA_FREE," +
															        "RDSA_USED, RDSA_FREE," +
															        "SDSA_USED, SDSA_FREE," +
															        "UDSA_USED, UDSA_FREE," +
															        "EDSA_LIMIT, EDSA_THRESHOLD," +
															        "ECDSA_USED, ECDSA_FREE," +
															        "ERDSA_USED, ERDSA_FREE," +
															        "ESDSA_USED, ESDSA_FREE," +
															        "EUDSA_USED, EUDSA_FREE," +
															        "ETDSA_USED, ETDSA_FREE," +
															        "GDSA_LIMIT, GDSA_THRESHOLD," +
															        "GCDSA_USED, GCDSA_FREE," +
															        "GSDSA_USED, GSDSA_FREE," +
															        "GUDSA_USED, GUDSA_FREE " +
															        "from StorageHistory01 " +
															        "where REGIONNAME=? and WUISERVER is NULL and CICSPLEXNAME is NULL "+
															        "order by ITIMESTAMP ASC");
function getStorageHistory(regionName, WUIServer, CICSplexName) {
	var response;
	
	var dsa_limit = [];
	var dsa_threshold_stacked = [];
	var cdsa_used_stacked = [];
	var cdsa_free_stacked = [];
	var rdsa_used_stacked = [];
	var rdsa_free_stacked = [];
	var sdsa_used_stacked = [];
	var sdsa_free_stacked = [];
	var udsa_used_stacked = [];
	var udsa_free_stacked = [];
	var dsa_threshold_original = [];
	var cdsa_used_original = [];
	var cdsa_free_original = [];
	var rdsa_used_original = [];
	var rdsa_free_original = [];
	var sdsa_used_original = [];
	var sdsa_free_original = [];
	var udsa_used_original = [];
	var udsa_free_original = [];
	
	var edsa_limit = [];
	var edsa_threshold_stacked = [];
	var ecdsa_used_stacked = [];
	var ecdsa_free_stacked = [];
	var erdsa_used_stacked = [];
	var erdsa_free_stacked = [];
	var esdsa_used_stacked = [];
	var esdsa_free_stacked = [];
	var eudsa_used_stacked = [];
	var eudsa_free_stacked = [];
	var etdsa_used_stacked = [];
	var etdsa_free_stacked = [];
	var edsa_threshold_original = [];
	var ecdsa_used_original = [];
	var ecdsa_free_original = [];
	var erdsa_used_original = [];
	var erdsa_free_original = [];
	var esdsa_used_original = [];
	var esdsa_free_original = [];
	var eudsa_used_original = [];
	var eudsa_free_original = [];
	var etdsa_used_original = [];
	var etdsa_free_original = [];
	
	var gdsa_limit = [];
	var gdsa_threshold_stacked = [];
	var gcdsa_used_stacked = [];
	var gcdsa_free_stacked = [];
	var gsdsa_used_stacked = [];
	var gsdsa_free_stacked = [];
	var gudsa_used_stacked = [];
	var gudsa_free_stacked = [];
	var gdsa_threshold_original = [];
	var gcdsa_used_original = [];
	var gcdsa_free_original = [];
	var gsdsa_used_original = [];
	var gsdsa_free_original = [];
	var gudsa_used_original = [];
	var gudsa_free_original = [];
	
	var result;
	
	if ((WUIServer != null) && (CICSplexName != null)){
		response  = WL.Server.invokeSQLStatement({
								preparedStatement : getStorageHistoryStatement,
								parameters : [regionName, WUIServer, CICSplexName]
								});
	} else {
		response  = WL.Server.invokeSQLStatement({
								preparedStatement : getStorageHistoryStatement2,
								parameters : [regionName]
								});
	}
	

	if ((response.isSuccessful == true) && (response.resultSet)){
		//WL.Logger.error(">>>resultSet.length: " + JSON.stringify(response.resultSet.length));
		//WL.Logger.error(">>>resultSet[0]: " + JSON.stringify(response.resultSet[0]));
		for (var i=0; i < response.resultSet.length; i++){
			
			var item = response.resultSet[i];
			
			dsa_limit.push([item.ITIMESTAMP, item.DSA_LIMIT]);	
			dsa_threshold_stacked.push([item.ITIMESTAMP, item.DSA_LIMIT * item.DSA_THRESHOLD / 100]);
			cdsa_used_stacked.push([item.ITIMESTAMP, item.CDSA_USED]);
			cdsa_free_stacked.push([item.ITIMESTAMP, item.CDSA_USED + item.CDSA_FREE]);
			rdsa_used_stacked.push([item.ITIMESTAMP, item.CDSA_USED + item.CDSA_FREE + item.RDSA_USED]);
			rdsa_free_stacked.push([item.ITIMESTAMP, item.CDSA_USED + item.CDSA_FREE + item.RDSA_USED + item.RDSA_FREE]);
			sdsa_used_stacked.push([item.ITIMESTAMP, item.CDSA_USED + item.CDSA_FREE + item.RDSA_USED + item.RDSA_FREE +
			                        				 item.SDSA_USED]);
			sdsa_free_stacked.push([item.ITIMESTAMP, item.CDSA_USED + item.CDSA_FREE + item.RDSA_USED + item.RDSA_FREE +
			                        				 item.SDSA_USED + item.SDSA_FREE]);
			udsa_used_stacked.push([item.ITIMESTAMP, item.CDSA_USED + item.CDSA_FREE + item.RDSA_USED + item.RDSA_FREE +
			                        				 item.SDSA_USED + item.SDSA_FREE + item.UDSA_USED]);
			udsa_free_stacked.push([item.ITIMESTAMP, item.CDSA_USED + item.CDSA_FREE + item.RDSA_USED + item.RDSA_FREE +
			                        				 item.SDSA_USED + item.SDSA_FREE + item.UDSA_USED + item.UDSA_FREE]);
			dsa_threshold_original.push([item.ITIMESTAMP, item.DSA_THRESHOLD]);
			cdsa_used_original.push([item.ITIMESTAMP, item.CDSA_USED]);
			cdsa_free_original.push([item.ITIMESTAMP, item.CDSA_FREE]);
			rdsa_used_original.push([item.ITIMESTAMP, item.RDSA_USED]);
			rdsa_free_original.push([item.ITIMESTAMP, item.RDSA_FREE]);
			sdsa_used_original.push([item.ITIMESTAMP, item.SDSA_USED]);
			sdsa_free_original.push([item.ITIMESTAMP, item.SDSA_FREE]);
			udsa_used_original.push([item.ITIMESTAMP, item.UDSA_USED]);
			udsa_free_original.push([item.ITIMESTAMP, item.UDSA_FREE]);
			
			edsa_limit.push([item.ITIMESTAMP, item.EDSA_LIMIT]);	
			edsa_threshold_stacked.push([item.ITIMESTAMP, item.EDSA_LIMIT * item.EDSA_THRESHOLD / 100]);
			ecdsa_used_stacked.push([item.ITIMESTAMP, item.ECDSA_USED]);
			ecdsa_free_stacked.push([item.ITIMESTAMP, item.ECDSA_USED + item.ECDSA_FREE]);
			erdsa_used_stacked.push([item.ITIMESTAMP, item.ECDSA_USED + item.ECDSA_FREE + item.ERDSA_USED]);
			erdsa_free_stacked.push([item.ITIMESTAMP, item.ECDSA_USED + item.ECDSA_FREE + item.ERDSA_USED + item.ERDSA_FREE]);
			esdsa_used_stacked.push([item.ITIMESTAMP, item.ECDSA_USED + item.ECDSA_FREE + item.ERDSA_USED + item.ERDSA_FREE +
			                        				  item.ESDSA_USED]);
			esdsa_free_stacked.push([item.ITIMESTAMP, item.ECDSA_USED + item.ECDSA_FREE + item.ERDSA_USED + item.ERDSA_FREE +
			                        				  item.ESDSA_USED + item.ESDSA_FREE]);
			eudsa_used_stacked.push([item.ITIMESTAMP, item.ECDSA_USED + item.ECDSA_FREE + item.ERDSA_USED + item.ERDSA_FREE +
			                        				  item.ESDSA_USED + item.ESDSA_FREE + item.EUDSA_USED]);
			eudsa_free_stacked.push([item.ITIMESTAMP, item.ECDSA_USED + item.ECDSA_FREE + item.ERDSA_USED + item.ERDSA_FREE +
			                        				  item.ESDSA_USED + item.ESDSA_FREE + item.EUDSA_USED + item.EUDSA_FREE]);
			etdsa_used_stacked.push([item.ITIMESTAMP, item.ECDSA_USED + item.ECDSA_FREE + item.ERDSA_USED + item.ERDSA_FREE +
                   				  					  item.ESDSA_USED + item.ESDSA_FREE + item.EUDSA_USED + item.EUDSA_FREE + item.ETDSA_USED]);
			etdsa_free_stacked.push([item.ITIMESTAMP, item.ECDSA_USED + item.ECDSA_FREE + item.ERDSA_USED + item.ERDSA_FREE +
                   				  					  item.ESDSA_USED + item.ESDSA_FREE + item.EUDSA_USED + item.EUDSA_FREE + item.ETDSA_USED + item.ETDSA_FREE]);
			edsa_threshold_original.push([item.ITIMESTAMP, item.EDSA_THRESHOLD]);
			ecdsa_used_original.push([item.ITIMESTAMP, item.ECDSA_USED]);
			ecdsa_free_original.push([item.ITIMESTAMP, item.ECDSA_FREE]);
			erdsa_used_original.push([item.ITIMESTAMP, item.ERDSA_USED]);
			erdsa_free_original.push([item.ITIMESTAMP, item.ERDSA_FREE]);
			esdsa_used_original.push([item.ITIMESTAMP, item.ESDSA_USED]);
			esdsa_free_original.push([item.ITIMESTAMP, item.ESDSA_FREE]);
			eudsa_used_original.push([item.ITIMESTAMP, item.EUDSA_USED]);
			eudsa_free_original.push([item.ITIMESTAMP, item.EUDSA_FREE]);
			etdsa_used_original.push([item.ITIMESTAMP, item.ETDSA_USED]);
			etdsa_free_original.push([item.ITIMESTAMP, item.ETDSA_FREE]);
			
			gdsa_limit.push([item.ITIMESTAMP, item.GDSA_LIMIT]);	
			gdsa_threshold_stacked.push([item.ITIMESTAMP, item.GDSA_LIMIT * item.GDSA_THRESHOLD / 100]);
			gcdsa_used_stacked.push([item.ITIMESTAMP, item.GCDSA_USED]);
			gcdsa_free_stacked.push([item.ITIMESTAMP, item.GCDSA_USED + item.GCDSA_FREE]);
			gsdsa_used_stacked.push([item.ITIMESTAMP, item.GCDSA_USED + item.GCDSA_FREE + item.GSDSA_USED]);
			gsdsa_free_stacked.push([item.ITIMESTAMP, item.GCDSA_USED + item.GCDSA_FREE + item.GSDSA_USED + item.GSDSA_FREE]);
			gudsa_used_stacked.push([item.ITIMESTAMP, item.GCDSA_USED + item.GCDSA_FREE + item.GSDSA_USED + item.GSDSA_FREE + item.GUDSA_USED]);
			gudsa_free_stacked.push([item.ITIMESTAMP, item.GCDSA_USED + item.GCDSA_FREE + item.GSDSA_USED + item.GSDSA_FREE + item.GUDSA_USED + item.GUDSA_FREE]);
			gdsa_threshold_original.push([item.ITIMESTAMP, item.GDSA_THRESHOLD]);
			gcdsa_used_original.push([item.ITIMESTAMP, item.GCDSA_USED]);
			gcdsa_free_original.push([item.ITIMESTAMP, item.GCDSA_FREE]);
			gsdsa_used_original.push([item.ITIMESTAMP, item.GSDSA_USED]);
			gsdsa_free_original.push([item.ITIMESTAMP, item.GSDSA_FREE]);
			gudsa_used_original.push([item.ITIMESTAMP, item.GUDSA_USED]);
			gudsa_free_original.push([item.ITIMESTAMP, item.GUDSA_FREE]);
		}

		//WL.Logger.error("--- flag1");
		//WL.Logger.error(">>>edsa_limit:" + JSON.stringify(edsa_limit));
		
		result = {"isSuccessful": true,
				  "result" : {"dsa_limit": dsa_limit,
					  		  "dsa_threshold": {"stacked": dsa_threshold_stacked, "original": dsa_threshold_original},
				  			  "cdsa_used": {"stacked": cdsa_used_stacked, "original": cdsa_used_original},
							  "cdsa_free": {"stacked": cdsa_free_stacked, "original": cdsa_free_original},
							  "rdsa_used": {"stacked": rdsa_used_stacked, "original": rdsa_used_original},
							  "rdsa_free": {"stacked": rdsa_free_stacked, "original": rdsa_free_original},
							  "sdsa_used": {"stacked": sdsa_used_stacked, "original": sdsa_used_original},
							  "sdsa_free": {"stacked": sdsa_free_stacked, "original": sdsa_free_original},
							  "udsa_used": {"stacked": udsa_used_stacked, "original": udsa_used_original},
							  "udsa_free": {"stacked": udsa_free_stacked, "original": udsa_free_original},
							  "edsa_limit": edsa_limit,
					  		  "edsa_threshold": {"stacked": edsa_threshold_stacked, "original": edsa_threshold_original},
				  			  "ecdsa_used": {"stacked": ecdsa_used_stacked, "original": ecdsa_used_original},
							  "ecdsa_free": {"stacked": ecdsa_free_stacked, "original": ecdsa_free_original},
							  "erdsa_used": {"stacked": erdsa_used_stacked, "original": erdsa_used_original},
							  "erdsa_free": {"stacked": erdsa_free_stacked, "original": erdsa_free_original},
							  "esdsa_used": {"stacked": esdsa_used_stacked, "original": esdsa_used_original},
							  "esdsa_free": {"stacked": esdsa_free_stacked, "original": esdsa_free_original},
							  "eudsa_used": {"stacked": eudsa_used_stacked, "original": eudsa_used_original},
							  "eudsa_free": {"stacked": eudsa_free_stacked, "original": eudsa_free_original},
							  "etdsa_used": {"stacked": etdsa_used_stacked, "original": etdsa_used_original},
							  "etdsa_free": {"stacked": etdsa_free_stacked, "original": etdsa_free_original},
							  "gdsa_limit": gdsa_limit,
					  		  "gdsa_threshold": {"stacked": gdsa_threshold_stacked, "original": gdsa_threshold_original},
				  			  "gcdsa_used": {"stacked": gcdsa_used_stacked, "original": gcdsa_used_original},
							  "gcdsa_free": {"stacked": gcdsa_free_stacked, "original": gcdsa_free_original},
							  "gsdsa_used": {"stacked": gsdsa_used_stacked, "original": gsdsa_used_original},
							  "gsdsa_free": {"stacked": gsdsa_free_stacked, "original": gsdsa_free_original},
							  "gudsa_used": {"stacked": gudsa_used_stacked, "original": gudsa_used_original},
							  "gudsa_free": {"stacked": gudsa_free_stacked, "original": gudsa_free_original}
							 }					   
				  };
		//WL.Logger.error("--- flag2");
		return result;	

	} else {
		result = {"isSuccessful": false,
				  "result" : {}					   
				  };
		return result;
	}
	

}





/*************************** for TEST ***********************/
function getDSAHistory_bk(regionName, WUIServer, CICSplexName) {
	var response;
	var dsa_limit_data = [];
	var dsa_threshold_data = [];
	var cdsa_used_data = [];
	var cdsa_free_data = [];
	var rdsa_used_data = [];
	var rdsa_free_data = [];
	var sdsa_used_data = [];
	var sdsa_free_data = [];
	var udsa_used_data = [];
	var udsa_free_data = [];
	var result;
	
	
	if ((WUIServer != null) && (CICSplexName != null)){
		response  = WL.Server.invokeSQLStatement({
			preparedStatement : getDSAHistoryStatement,
			parameters : [regionName, WUIServer, CICSplexName]
		});
		if ((response.isSuccessful == true) && (response.resultSet)){
			//WL.Logger.error(">>>resultSet.length: " + JSON.stringify(response.resultSet.length));
			//WL.Logger.error(">>>resultSet[0]: " + JSON.stringify(response.resultSet[0]));
			for (var i=0; i < response.resultSet.length; i++){
				var item = response.resultSet[i];
				dsa_limit_data.push([item.ITIMESTAMP, item.DSA_LIMIT]);
				dsa_threshold_data.push([item.ITIMESTAMP, item.DSA_THRESHOLD]);
				cdsa_used_data.push([item.ITIMESTAMP, item.CDSA_USED]);
				cdsa_free_data.push([item.ITIMESTAMP, item.CDSA_FREE]);
				rdsa_used_data.push([item.ITIMESTAMP, item.RDSA_USED]);
				rdsa_free_data.push([item.ITIMESTAMP, item.RDSA_FREE]);
				sdsa_used_data.push([item.ITIMESTAMP, item.SDSA_USED]);
				sdsa_free_data.push([item.ITIMESTAMP, item.SDSA_FREE]);
				udsa_used_data.push([item.ITIMESTAMP, item.UDSA_USED]);
				udsa_free_data.push([item.ITIMESTAMP, item.UDSA_FREE]);
			}

			
			result = {"isSuccessful": true,
					  "result" : {"dsa_limit": dsa_limit_data,
						  		  "dsa_threshold": dsa_threshold_data,
					  			  "cdsa_used": cdsa_used_data,
								  "cdsa_free": cdsa_free_data,
								  "rdsa_used": rdsa_used_data,
								  "rdsa_free": rdsa_free_data,
								  "sdsa_used": sdsa_used_data,
								  "sdsa_free": sdsa_free_data,
								  "udsa_used": udsa_used_data,
								  "udsa_free": udsa_free_data }					   
					  };
			return result;	

		}
		result = {"isSuccessful": false,
				  "result" : {}					   
				  };
	}else{
		return WL.Server.invokeSQLStatement({
			preparedStatement : getDSAHistoryStatement2,
			parameters : [regionName]
		});
	}
}

function getDSAHistory_bk2(regionName, WUIServer, CICSplexName) {
	var response;
	var dsa_limit_data = [];
	var dsa_threshold_data = [];
	var cdsa_used_data = [];
	var cdsa_free_data = [];
	var rdsa_used_data = [];
	var rdsa_free_data = [];
	var sdsa_used_data = [];
	var sdsa_free_data = [];
	var udsa_used_data = [];
	var udsa_free_data = [];
	var result;
	
	
	if ((WUIServer != null) && (CICSplexName != null)){
		response  = WL.Server.invokeSQLStatement({
			preparedStatement : getDSAHistoryStatement,
			parameters : [regionName, WUIServer, CICSplexName]
		});
		if ((response.isSuccessful == true) && (response.resultSet)){
			WL.Logger.error(">>>resultSet.length: " + JSON.stringify(response.resultSet.length));
			WL.Logger.error(">>>resultSet[0]: " + JSON.stringify(response.resultSet[0]));
			for (var i=0; i < response.resultSet.length; i++){
				var item = response.resultSet[i];
				var stacked_cdsa_used = item.CDSA_USED;
				var stacked_cdsa_free = item.CDSA_FREE + stacked_cdsa_used;
				var stacked_rdsa_used = item.RDSA_USED + stacked_cdsa_free;
				var stacked_rdsa_free = item.RDSA_FREE + stacked_rdsa_used;
				var stacked_sdsa_used = item.SDSA_USED + stacked_rdsa_free;
				var stacked_sdsa_free = item.SDSA_FREE + stacked_sdsa_used;
				var stacked_udsa_used = item.UDSA_USED + stacked_sdsa_free;
				var stacked_udsa_free = item.UDSA_FREE + stacked_udsa_used;
				
				dsa_limit_data.push([item.ITIMESTAMP, item.DSA_LIMIT]);
				dsa_threshold_data.push([item.ITIMESTAMP, item.DSA_LIMIT * item.DSA_THRESHOLD / 100]);
				
				cdsa_used_data.push([item.ITIMESTAMP, stacked_cdsa_used]);
				cdsa_free_data.push([item.ITIMESTAMP, stacked_cdsa_free]);
				rdsa_used_data.push([item.ITIMESTAMP, stacked_rdsa_used]);
				rdsa_free_data.push([item.ITIMESTAMP, stacked_rdsa_free]);
				sdsa_used_data.push([item.ITIMESTAMP, stacked_sdsa_used]);
				sdsa_free_data.push([item.ITIMESTAMP, stacked_sdsa_free]);
				udsa_used_data.push([item.ITIMESTAMP, stacked_udsa_used]);
				udsa_free_data.push([item.ITIMESTAMP, stacked_udsa_free]);
			}
			WL.Logger.error(">>>cdsa_used_data: " + JSON.stringify(cdsa_used_data));
			WL.Logger.error(">>>cdsa_free_data: " + JSON.stringify(cdsa_free_data));
			WL.Logger.error(">>>rdsa_used_data: " + JSON.stringify(rdsa_used_data));
			WL.Logger.error(">>>rdsa_free_data: " + JSON.stringify(rdsa_free_data));
			WL.Logger.error(">>>sdsa_used_data: " + JSON.stringify(sdsa_used_data));
			WL.Logger.error(">>>sdsa_free_data: " + JSON.stringify(sdsa_free_data));
			WL.Logger.error(">>>udsa_used_data: " + JSON.stringify(udsa_used_data));
			WL.Logger.error(">>>udsa_free_data: " + JSON.stringify(udsa_free_data));
			
			result = {"isSuccessful": true,
					  "result" : {"dsa_limit": dsa_limit_data,
						  		  "dsa_threshold": dsa_threshold_data,
					  			  "cdsa_used": cdsa_used_data,
								  "cdsa_free": cdsa_free_data,
								  "rdsa_used": rdsa_used_data,
								  "rdsa_free": rdsa_free_data,
								  "sdsa_used": sdsa_used_data,
								  "sdsa_free": sdsa_free_data,
								  "udsa_used": udsa_used_data,
								  "udsa_free": udsa_free_data }					   
					  };
			return result;	

		}
		result = {"isSuccessful": false,
				  "result" : {}					   
				  };
	}else{
		return WL.Server.invokeSQLStatement({
			preparedStatement : getDSAHistoryStatement2,
			parameters : [regionName]
		});
	}
}



