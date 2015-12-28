/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

function getDynamicStorageFiltered(CICSplexName, regionName) {
	
	regionName = regionName.replace(/\s+/g , "");
	CICSplexName = CICSplexName.replace(/\s+/g , "");
	
	var path1 = '/CICSSystemManagement/CICSDynamicStorageArea/' + CICSplexName +'/' + regionName;
	
	//WL.Logger.error(">>>path1:" + path1);
	
	var input1 = {
	    method : 'get',
	    returnedContentType : 'xml',
	    path : path1,
	    transformation : {
		    type : 'xslFile',
		    xslFile : 'filter_DynamicStorage.xsl'
	    }
	};
	
	var response1 = WL.Server.invokeHttp(input1);
	WL.Logger.error(">>>response1:" + JSON.stringify(response1));
	
	if (response1.isSuccessful && response1.dynamicStorage.cdsa) {
		var path2 = '/CICSSystemManagement/CICSRegion/' + CICSplexName +'/' + regionName;
		//WL.Logger.error(">>>path2:" + path2);
		
		var input2 = {
		    method : 'get',
		    returnedContentType : 'xml',
		    path : path2,
		    transformation : {
			    type : 'xslFile',
			    xslFile : 'filter_CICSRegion.xsl'
		    }
		};
		
		var response2 = WL.Server.invokeHttp(input2);
		WL.Logger.error(">>>response2:" + JSON.stringify(response2));
		
		if (response2.isSuccessful) {				
			response1.dynamicStorage.gcdsa.total_limit = response2.cicsRegion.memlimit;	
			response1.dynamicStorage.sosbelowline = response2.cicsRegion.sosbelowline;	
			response1.dynamicStorage.sosaboveline = response2.cicsRegion.sosaboveline;	
			response1.dynamicStorage.sosabovebar = response2.cicsRegion.sosabovebar;
			return response1;
		} 
		
	}
		
	var errorData = {'isSuccessful': false, 'response1': response1, 'response2': response2};
	return errorData;
}

function getCICSRegionFiltered(CICSplexName, regionName) {
	
	regionName = regionName.replace(/\s+/g , "");
	CICSplexName = CICSplexName.replace(/\s+/g , "");
	
	var path = '/CICSSystemManagement/CICSRegion/' + CICSplexName +'/' + regionName;
	
	var input = {
	    method : 'get',
	    returnedContentType : 'xml',
	    path : path,
	    transformation : {
		    type : 'xslFile',
		    xslFile : 'filter_CICSRegion.xsl'
	    }
	};
	
	return WL.Server.invokeHttp(input);
}

function updateDSALimit(CICSplexName, regionName, dsaLimit) {
	regionName = regionName.replace(/\s+/g , "");
	CICSplexName = CICSplexName.replace(/\s+/g , "");
	
	path = '/CICSSystemManagement/CICSDynamicStorageArea/'+ CICSplexName + '/' + regionName + '/?CRITERIA=((NAME==\'CDSA\'))';
	
	var request =
		'<request>' + 
		   '<update>' + 
		     '<attributes LIMIT="' + dsaLimit + '" />' +
		   '</update>' + 
		'</request>';
	
	//WL.Logger.error("path:" + path);
	//WL.Logger.error("request:" + request);
	var input = {
	    method : 'put',
	    returnedContentType : 'xml',
	    path : path,
	    body : {
		    content : request,
		    contentType : 'text/xml; charset=utf-8'
	    }
	};
	
	return WL.Server.invokeHttp(input);
}


function updateEDSALimit(CICSplexName, regionName, edsaLimit) {
	regionName = regionName.replace(/\s+/g , "");
	CICSplexName = CICSplexName.replace(/\s+/g , "");
	
	path = '/CICSSystemManagement/CICSDynamicStorageArea/'+ CICSplexName + '/' + regionName + '/?CRITERIA=((NAME==\'ECDSA\'))';
	
	var request =
		'<request>' + 
		   '<update>' + 
		     '<attributes LIMIT="' + edsaLimit + '" />' +
		   '</update>' + 
		'</request>';
	
	//WL.Logger.error("path:" + path);
	//WL.Logger.error("request:" + request);
	var input = {
	    method : 'put',
	    returnedContentType : 'xml',
	    path : path,
	    body : {
		    content : request,
		    contentType : 'text/xml; charset=utf-8'
	    }
	};
	
	return WL.Server.invokeHttp(input);
}