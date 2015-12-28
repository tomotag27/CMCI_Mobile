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
	
	WL.Logger.debug("-----wlCommonInit------");
	// 各ボタンがクリックされたときに呼ばれるメソッドを指定
	//$('#getDynamicStorage').click(getDynamicStorage);
	$('#CICSRegionList_refresh').click(getCICSRegionList);
	//$('#CurrentDynamicStorage_refresh').click(getDynamicStorage);
	$('#DSACurrent_refresh').click(getDSACurrent);
	$('#EDSACurrent_refresh').click(getEDSACurrent);
	$('#DSAHistory_refresh').click(getDSAHistory);
	
	$('#button_logout').click(invokeLogout);
	
/*	
	$('a[href=#Page_CurrentDynamicStorage]').click(function() {
		WL.Logger.debug("********** #Page_CurrentDynamicStorage clicked **********");
	    var regionName0 = $('#regionName0').val(); 
	    WL.Logger.debug(">>>regionName0:" + regionName0);
	    $('#Page_CurrentDynamicStorage').data('regionName0', regionName0);
	});
*/	
	//$(document).on("pagebeforeshow", "#Page_CICSRegionList", getCICSRegionList);
	//$(document).on("pageshow", "#Page_Memu", initMenu);
	
	$(document).on("pagebeforeshow", "#Page_CICSRegionList", getCICSRegionList);
	//$(document).on("pageshow", "#Page_CurrentDynamicStorage", getDynamicStorage);
	$(document).on("pageshow", "#Page_DSACurrent", getDSACurrent);
	$(document).on("pageshow", "#Page_EDSACurrent", getEDSACurrent);
	$(document).on("pageshow", "#Page_DSAHistory", getDSAHistory);
	
	initMenu();

}


//var dsaData = null;
var regionList = null;
var regionListClassified = new Array();
var selectedRegion = null;


function invokeLogout(){
	WL.Logger.debug("*** invoke Logout ***");
	WL.Client.logout('AdapterAuthRealm',{
		onSuccess : WL.Client.reloadApp
	});
}


function initMenu(){
	WL.Logger.debug("*** initMenu() ***");
	if (WL.Client.getLoginName("AdapterAuthRealm") != null)	 {
		$("#Menu_header_user").text(WL.Client.getLoginName("AdapterAuthRealm"));
	}
}


function CICSRegionList_onClick(key, index) {
	WL.Logger.debug("*** CICSRgionList_onClick() ***");
	WL.Logger.debug(">>>index:",index);
	//selectedRegion = regionList[index];
	selectedRegion = regionListClassified[key][index];
	WL.Logger.debug(">>>selectedRegion:",selectedRegion);
	$.mobile.changePage("#Page_DSACurrent");
}

function getCICSRegionList(){
	WL.Logger.debug("*** getCICSRegionList() ***");
	$("#CICSRegionList").empty();
	regionListClassified = [];
	
	//WL.Logger.debug(">>> LoginName:" , WL.Client.getLoginName("AdapterAuthRealm"));
	//WL.Logger.debug(">>> UserName:" , WL.Client.getUserName("AdapterAuthRealm"));
	//WL.Logger.debug(">>> displayName:", WL.Client.getUserInfo("AdapterAuthRealm","displayName"));
	
	if (WL.Client.getLoginName("AdapterAuthRealm") != null)	 {
		$("#CICSRegionList_header_user").text(WL.Client.getLoginName("AdapterAuthRealm"));
	}		
	
	
	var date = new Date();
	//var iTimeStamp = date.getTime();
	var strTimeStamp = date.getFullYear() + "/"
    	         + date_format(date.getMonth()) + "/"
    	         + date_format(date.getDay()) + "-" 
    	         + date_format(date.getHours()) + ":"
    	         + date_format(date.getMinutes()) + ":"
    	         + date_format(date.getSeconds());
	$('#CICSRegionList_header_refreshTime').text(strTimeStamp);
	
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
				strMVSSYSNAME = JSON.stringify(item.MVSSYSNAME);
				// remove "
				strMVSSYSNAME = strMVSSYSNAME.replace(/"/g , "");
				// remove blank
				strMVSSYSNAME = strMVSSYSNAME.replace(/\s+/g , "");
				//WL.Logger.debug(">>>>>strMVSSYSNAME:" + strMVSSYSNAME);
				
				if (strMVSSYSNAME in regionListClassified){
					regionListClassified[strMVSSYSNAME].push(item);
					//WL.Logger.debug(">>>>>regionListClassified1: ", regionListClassified[strMVSSYSNAME]);
				} else {
					regionListClassified[strMVSSYSNAME] = [item];
					//WL.Logger.debug(">>>>>regionListClassified2: ", regionListClassified[strMVSSYSNAME]);
				}		
				/*
				var status_file = null;
				switch(item.STATUS){
					case "green   " : 
						status_file = 'status_green.gif'; 
						green_count = green_count + 1;
						break;
					case "yellow  " : 
						status_file = 'status_yellow.gif'; 
						yellow_count = yellow_count + 1;
						break;
					case "red     " : 
						status_file = 'status_red.gif'; 
						red_count = red_count + 1;
						break;
					default :         
						status_file = 'status_unknown.gif';
						unknown_count = unknown_count + 1;
						break;
				}
				$("#CICSRegionList").append('<li>' + 
				'<a href="#" onclick="CICSRegionList_onClick(\'' + i + '\');">' + 
				   '<img src="images/' + status_file + '" class="ui-li-icon"/> ' + 
				   '<p class="wordbreak">' +
				   	'<b>' + item.REGIONNAME + '</b> <br/>'+
				     item.TYPE + ' / ' + item.CICSPLEXNAME + ' / ' + item.DESCRIPTION + 
				   '</p>' + 
				'</a></li>');
				*/
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
							status_file = 'status_green.gif'; 
							green_count = green_count + 1;
							break;
						case "yellow" : 
							status_file = 'status_yellow.gif'; 
							yellow_count = yellow_count + 1;
							break;
						case "red" : 
							status_file = 'status_red.gif'; 
							red_count = red_count + 1;
							break;
						default :         
							status_file = 'status_unknown.gif';
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
				
				/*
				$("#region_count").text("# of Regions: " + regionList.length);
				$("#region_status_count").text("Green: " + green_count +
						   					   " , Yellow: " + yellow_count + 
						   					   " , Red: " + red_count +
						   					   " , Unknown: " + unknown_count);
				*/
				
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


function drawDSACurrent(cdsa_used,cdsa_free,
						rdsa_used,rdsa_free,
						sdsa_used,sdsa_free,
						udsa_used,udsa_free,
						dsa_total_free, dsa_total_limit,
						dsa_threshold){
	$("#graphDSACurrent").empty();
	WL.Logger.debug("****** begin drawDSACurrent*****");
	var container = document.getElementById("graphDSACurrent");
    var	cdsa_used_data = [[cdsa_used, 0]],
        cdsa_free_data = [[cdsa_free, 0]],
    	rdsa_used_data = [[rdsa_used, 0]],
        rdsa_free_data = [[rdsa_free, 0]],
    	sdsa_used_data = [[sdsa_used, 0]],
        sdsa_free_data = [[sdsa_free, 0]],
    	udsa_used_data = [[udsa_used, 0]],
        udsa_free_data = [[udsa_free, 0]],
        dsa_total_free_data = [[dsa_total_free, 0]];

    var dsa_threshold_data = [[dsa_threshold, -1], [dsa_threshold, 1]];
    
    WL.Logger.debug(">>> dsa_threshold: " + dsa_threshold);
    WL.Logger.debug(">>> dsa_total_free: " + dsa_total_free);
    WL.Logger.debug(">>> dsa_total_limit: " + dsa_total_limit);
    
    var default_show = true,
    	default_stacked = true,
    	default_horizontal = true,
    	default_barWidth = 1.5,
    	default_lineWidth = 1,
    	default_shadowSize = 0.1,
    	cdsa_color = "#ffff66",
    	rdsa_color = "#cc66cc",
    	sdsa_color = "#ffcc00",
    	udsa_color = "#6666cc",
    	dsa_total_free_color = "#777777",
    	default_background_color = "#333333",
    	default_tick_color = "#eeeeee",
    	default_used_Opacity = 1,
    	default_free_Opacity = 0.5,
    	dsa_threshold_color = "#ffff00";
    	
    var cdsa_used_bar = {
            data: cdsa_used_data,
            bars: {
                    color: cdsa_color,
                    fillColor: cdsa_color,
                    fillOpacity: default_used_Opacity,
    	            show: default_show,
    	            stacked: default_stacked,
    	            horizontal: default_horizontal,
    	            barWidth: default_barWidth,
    	            lineWidth: default_lineWidth,
    	            shadowSize: default_shadowSize
                }
        };
    	var cdsa_free_bar = {
                data: cdsa_free_data,
                 bars: {
                    color: cdsa_color,
                    fillColor: cdsa_color,
                    fillOpacity: default_free_Opacity,
     	            show: default_show,
     	            stacked: default_stacked,
     	            horizontal: default_horizontal,
     	            barWidth: default_barWidth,
     	            lineWidth: default_lineWidth,
     	            shadowSize: default_shadowSize
                    }
        };
    	var rdsa_used_bar = {
                data: rdsa_used_data,
                 bars: {
                    color: rdsa_color,
                    fillColor: rdsa_color,
                    fillOpacity: default_used_Opacity,
     	            show: default_show,
     	            stacked: default_stacked,
     	            horizontal: default_horizontal,
     	            barWidth: default_barWidth,
     	            lineWidth: default_lineWidth,
     	            shadowSize: default_shadowSize
                    }
        };
    	var rdsa_free_bar = {
                data: rdsa_free_data,
                 bars: {
                    color: rdsa_color,
                    fillColor: rdsa_color,
                    fillOpacity: default_free_Opacity,
      	            show: default_show,
      	            stacked: default_stacked,
      	            horizontal: default_horizontal,
      	            barWidth: default_barWidth,
      	            lineWidth: default_lineWidth,
      	            shadowSize: default_shadowSize
                 }
        };
    	var sdsa_used_bar = {
                data: sdsa_used_data,
                 bars: {
                    color: sdsa_color,
                    fillColor: sdsa_color,
                    fillOpacity: default_used_Opacity,
      	            show: default_show,
      	            stacked: default_stacked,
      	            horizontal: default_horizontal,
      	            barWidth: default_barWidth,
      	            lineWidth: default_lineWidth,
      	            shadowSize: default_shadowSize
                 }
        };
        var sdsa_free_bar = {
               data: sdsa_free_data,
               bars: {
                   color: sdsa_color,
                   fillColor: sdsa_color,
                   fillOpacity: default_free_Opacity,
     	           show: default_show,
     	           stacked: default_stacked,
     	           horizontal: default_horizontal,
     	           barWidth: default_barWidth,
     	           lineWidth: default_lineWidth,
     	           shadowSize: default_shadowSize
                }
        };
        var udsa_used_bar = {
               data: udsa_used_data,
               bars: {
                   color: udsa_color,
                   fillColor: udsa_color,
                   fillOpacity: default_used_Opacity,
     	           show: default_show,
     	           stacked: default_stacked,
     	           horizontal: default_horizontal,
     	           barWidth: default_barWidth,
     	           lineWidth: default_lineWidth,
     	           shadowSize: default_shadowSize
                }
        };
        var udsa_free_bar = {
                data: udsa_free_data,
                bars: {
                    color: udsa_color,
                    fillColor: udsa_color,
                    fillOpacity: default_free_Opacity,
      	            show: default_show,
      	            stacked: default_stacked,
      	            horizontal: default_horizontal,
      	            barWidth: default_barWidth,
      	            lineWidth: default_lineWidth,
      	            shadowSize: default_shadowSize
                 }
        };   
        var dsa_total_free_bar = {
                data: dsa_total_free_data,
                bars: {
                    color: dsa_total_free_color,
                    fillColor: dsa_total_free_color,
                    fillOpacity: default_used_Opacity,
      	            show: default_show,
      	            stacked: default_stacked,
      	            horizontal: default_horizontal,
      	            barWidth: default_barWidth,
      	            lineWidth: default_lineWidth,
      	            shadowSize: default_shadowSize
                 }
        }; 
        var dsa_threshold_line = {
        		data: dsa_threshold_data,
        		lines: {
        			color: dsa_threshold_color,
                    show: true,
                    fill: false,
                    fillOpacity: 0.5
        		}
        			
        };
    	var options ={
    	        legend: {
    	            show: false,
    	            backgroundColor: default_background_color,
    	            backgroundOpacity: 1
    	        },
    	        grid: {
    	            backgroundColor: default_background_color,
    	            verticalLines: false,
    	            horizontalLines: false
    	        },
    	        xaxis:{
    	          showLabels: true,
    	          color: default_tick_color,
    	          min: 0,
    	          max: dsa_total_limit
    	          
    	        },
    	        yaxis: {
    	          showLabels: false,
    	          min: -1,
    	          max: 1
    	        }
    	};
    	
    	Flotr.draw(container, [ cdsa_used_bar, cdsa_free_bar, 
    	                        rdsa_used_bar, rdsa_free_bar,
    	                        sdsa_used_bar, sdsa_free_bar,
    	                        udsa_used_bar, udsa_free_bar,
    	                        dsa_total_free_bar,
    	                        dsa_threshold_line ],  options);
    	
    	WL.Logger.debug("****** end drawDSACurrent*****");
}

function drawEDSACurrent(ecdsa_used,ecdsa_free,
						 erdsa_used,erdsa_free,
						 esdsa_used,esdsa_free,
						 eudsa_used,eudsa_free,
						 etdsa_used,etdsa_free,
						 edsa_total_free, edsa_total_limit,
						 edsa_threshold){
	$("#graphEDSACurrent").empty();
	WL.Logger.debug("****** begin drawEDSACurrent*****");
	var container = document.getElementById("graphEDSACurrent");
	var	ecdsa_used_data = [[ecdsa_used, 0]],
		ecdsa_free_data = [[ecdsa_free, 0]],
		erdsa_used_data = [[erdsa_used, 0]],
		erdsa_free_data = [[erdsa_free, 0]],
		esdsa_used_data = [[esdsa_used, 0]],
		esdsa_free_data = [[esdsa_free, 0]],
		eudsa_used_data = [[eudsa_used, 0]],
		eudsa_free_data = [[eudsa_free, 0]],
		etdsa_used_data = [[etdsa_used, 0]],
		etdsa_free_data = [[etdsa_free, 0]],
		edsa_total_free_data = [[edsa_total_free, 0]];
	
	var edsa_threshold_data = [[edsa_threshold, -1], [edsa_threshold, 1]];
	WL.Logger.debug(">>> edsa_threshold: " + edsa_threshold);
	WL.Logger.debug(">>> edsa_total_free: " + edsa_total_free);
	WL.Logger.debug(">>> edsa_total_limit: " + edsa_total_limit);
	
	var default_show = true,
		default_stacked = true,
		default_horizontal = true,
		default_barWidth = 1.5,
		default_lineWidth = 1,
		default_shadowSize = 0.1,
		ecdsa_color = "#ffff66",
		erdsa_color = "#cc66cc",
		esdsa_color = "#ffcc00",
		eudsa_color = "#6666cc",
		etdsa_color = "#cc6666",
		edsa_total_free_color = "#777777",
    	default_background_color = "#333333",
    	default_tick_color = "#eeeeee",
		default_used_Opacity = 1,
		default_free_Opacity = 0.5,
		edsa_threshold_color = "#ffff00";
	
	var ecdsa_used_bar = {
		data: ecdsa_used_data,
		bars: {
		    color: ecdsa_color,
		    fillColor: ecdsa_color,
		    fillOpacity: default_used_Opacity,
		    show: default_show,
		    stacked: default_stacked,
		    horizontal: default_horizontal,
		    barWidth: default_barWidth,
		    lineWidth: default_lineWidth,
		    shadowSize: default_shadowSize
		}
	};
	var ecdsa_free_bar = {
		data: ecdsa_free_data,
		bars: {
		    color: ecdsa_color,
		    fillColor: ecdsa_color,
		    fillOpacity: default_free_Opacity,
		     show: default_show,
		     stacked: default_stacked,
		     horizontal: default_horizontal,
		     barWidth: default_barWidth,
		     lineWidth: default_lineWidth,
		     shadowSize: default_shadowSize
	    }
	};
	var erdsa_used_bar = {
		data: erdsa_used_data,
		bars: {
		    color: erdsa_color,
		    fillColor: erdsa_color,
		    fillOpacity: default_used_Opacity,
		     show: default_show,
		     stacked: default_stacked,
		     horizontal: default_horizontal,
		     barWidth: default_barWidth,
		     lineWidth: default_lineWidth,
		     shadowSize: default_shadowSize
	    }
	};
	var erdsa_free_bar = {
		data: erdsa_free_data,
		bars: {
		    color: erdsa_color,
		    fillColor: erdsa_color,
		    fillOpacity: default_free_Opacity,
		      show: default_show,
		      stacked: default_stacked,
		      horizontal: default_horizontal,
		      barWidth: default_barWidth,
		      lineWidth: default_lineWidth,
		      shadowSize: default_shadowSize
		}
	};
	var esdsa_used_bar = {
		data: esdsa_used_data,
		bars: {
		    color: esdsa_color,
		    fillColor: esdsa_color,
		    fillOpacity: default_used_Opacity,
		      show: default_show,
		      stacked: default_stacked,
		      horizontal: default_horizontal,
		      barWidth: default_barWidth,
		      lineWidth: default_lineWidth,
		      shadowSize: default_shadowSize
	 }
	};
	var esdsa_free_bar = {
		data: esdsa_free_data,
		bars: {
		   color: esdsa_color,
		   fillColor: esdsa_color,
		   fillOpacity: default_free_Opacity,
		    show: default_show,
		    stacked: default_stacked,
		    horizontal: default_horizontal,
		    barWidth: default_barWidth,
		    lineWidth: default_lineWidth,
		    shadowSize: default_shadowSize
		}
	};
	var eudsa_used_bar = {
		data: eudsa_used_data,
		bars: {
		   color: eudsa_color,
		   fillColor: eudsa_color,
		   fillOpacity: default_used_Opacity,
		    show: default_show,
		    stacked: default_stacked,
		    horizontal: default_horizontal,
		    barWidth: default_barWidth,
		    lineWidth: default_lineWidth,
		    shadowSize: default_shadowSize
		}
	};
	var eudsa_free_bar = {
		data: eudsa_free_data,
		bars: {
		    color: eudsa_color,
		    fillColor: eudsa_color,
		    fillOpacity: default_free_Opacity,
		      show: default_show,
		      stacked: default_stacked,
		      horizontal: default_horizontal,
		      barWidth: default_barWidth,
		      lineWidth: default_lineWidth,
		      shadowSize: default_shadowSize
		}
	};   
	var etdsa_used_bar = {
		data: etdsa_used_data,
		bars: {
			   color: etdsa_color,
			   fillColor: etdsa_color,
			   fillOpacity: default_used_Opacity,
			    show: default_show,
			    stacked: default_stacked,
			    horizontal: default_horizontal,
			    barWidth: default_barWidth,
			    lineWidth: default_lineWidth,
			    shadowSize: default_shadowSize
		}
	};
	var etdsa_free_bar = {
		data: etdsa_free_data,
		bars: {
			    color: etdsa_color,
			    fillColor: etdsa_color,
			    fillOpacity: default_free_Opacity,
			      show: default_show,
			      stacked: default_stacked,
			      horizontal: default_horizontal,
			      barWidth: default_barWidth,
			      lineWidth: default_lineWidth,
			      shadowSize: default_shadowSize
		 }
	}; 
	var edsa_total_free_bar = {
		data: edsa_total_free_data,
		bars: {
		    color: edsa_total_free_color,
		    fillColor: edsa_total_free_color,
		    fillOpacity: default_used_Opacity,
		      show: default_show,
		      stacked: default_stacked,
		      horizontal: default_horizontal,
		      barWidth: default_barWidth,
		      lineWidth: default_lineWidth,
		      shadowSize: default_shadowSize
		}
	}; 
	var edsa_threshold_line = {
		data: edsa_threshold_data,
		lines: {
			color: edsa_threshold_color,
		    show: true,
		    fill: false,
		    fillOpacity: 0.5
	}
		
	};
	var options ={
		legend: {
		    show: true,
		    backgroundColor: default_background_color,
		    backgroundOpacity: 0.5
		},
		grid: {
		    backgroundColor: default_background_color,
		    verticalLines: false,
		    horizontalLines: false
		},
		xaxis:{
		  showLabels: true,
		  color: default_tick_color,
		  min: 0,
		  max: edsa_total_limit
		  
		},
		yaxis: {
		  showLabels: false,
		  min: -1,
		  max: 1
		}
	};
	
	Flotr.draw(container, [ ecdsa_used_bar, ecdsa_free_bar, 
	                        erdsa_used_bar, erdsa_free_bar,
	                        esdsa_used_bar, esdsa_free_bar,
	                        eudsa_used_bar, eudsa_free_bar,
	                        etdsa_used_bar, etdsa_free_bar,
	                        edsa_total_free_bar,
	                        edsa_threshold_line ],  options);
	
	WL.Logger.debug("****** end drawEDSACurrent*****");
}

function drawDSAHistory_bk(cdsa_used_data, cdsa_free_data,
					    rdsa_used_data, rdsa_free_data,
					    sdsa_used_data, sdsa_free_data,
					    udsa_used_data, udsa_free_data
					    ){
	$("#graphDSAHistory").empty();
	WL.Logger.debug("****** begin drawDSAHistory*****");
	var container = document.getElementById("graphDSAHistory");
	
	WL.Logger.debug("*** cdsa_used_data:" , cdsa_used_data);
	WL.Logger.debug("*** cdsa_free_data:" , cdsa_free_data);
	WL.Logger.debug("*** rdsa_used_data:" , rdsa_used_data);
	WL.Logger.debug("*** rdsa_free_data:" , rdsa_free_data);
	WL.Logger.debug("*** sdsa_used_data:" , sdsa_used_data);
	WL.Logger.debug("*** sdsa_free_data:" , sdsa_free_data);
	WL.Logger.debug("*** udsa_used_data:" , udsa_used_data);
	WL.Logger.debug("*** udsa_free_data:" , udsa_free_data);

	/*
	cdsa_used_data = [[1397465639807,100],[1397467893963,200],[1397468014460,300],[1397468511266,200],[1397468885393,500]];
	cdsa_free_data = [[1397465639807,200],[1397467893963,100],[1397468014460,400],[1397468511266,100],[1397468885393,600]];
	rdsa_used_data = [[1397465639807,300],[1397467893963,200],[1397468014460,500],[1397468511266,200],[1397468885393,500]];
	rdsa_free_data = [[1397465639807,100],[1397467893963,100],[1397468014460,400],[1397468511266,100],[1397468885393,600]];
	sdsa_used_data = [[1397465639807,200],[1397467893963,200],[1397468014460,300],[1397468511266,200],[1397468885393,500]];
	sdsa_free_data = [[1397465639807,300],[1397467893963,100],[1397468014460,200],[1397468511266,100],[1397468885393,600]];
	udsa_used_data = [[1397465639807,100],[1397467893963,200],[1397468014460,100],[1397468511266,200],[1397468885393,500]];
	udsa_free_data = [[1397465639807,200],[1397467893963,100],[1397468014460,300],[1397468511266,100],[1397468885393,600]];
*/
/*
	cdsa_used_data = [[1397465639807,323584],[1397467893963,423584],[1397468014460,323584],[1397468511266,423584],[1397468885393,323584]];
	cdsa_free_data = [[1397465639807,300704],[1397467893963,200704],[1397468014460,300704],[1397468511266,200704],[1397468885393,300704]];
	rdsa_used_data = [[1397465639807,212992],[1397467893963,312992],[1397468014460,212992],[1397468511266,312992],[1397468885393,212992]];
	rdsa_free_data = [[1397465639807,59152],[1397467893963,49152],[1397468014460,59152],[1397468511266,49152],[1397468885393,59152]];
	sdsa_used_data = [[1397465639807,8192],[1397467893963,9192],[1397468014460,8192],[1397468511266,9192],[1397468885393,8192]];
	sdsa_free_data = [[1397465639807,353952],[1397467893963,253952],[1397468014460,353952],[1397468511266,253952],[1397468885393,353952]];
	udsa_used_data = [[1397465639807,20000],[1397467893963,10000],[1397468014460,20000],[1397468511266,10000],[1397468885393,20000]];
	udsa_free_data = [[1397465639807,2048576],[1397467893963,1048576],[1397468014460,2048576],[1397468511266,1048576],[1397468885393,2048576]];
*/
/*	
	cdsa_used_data = [[1397465639807,323584],[1397467893963,323584],[1397468014460,323584],[1397468511266,323584],[1397468885393,323584]];
	cdsa_free_data = [[1397465639807,200704],[1397467893963,200704],[1397468014460,200704],[1397468511266,200704],[1397468885393,200704]];
	rdsa_used_data = [[1397465639807,212992],[1397467893963,212992],[1397468014460,212992],[1397468511266,212992],[1397468885393,212992]];
	rdsa_free_data = [[1397465639807,49152],[1397467893963,49152],[1397468014460,49152],[1397468511266,49152],[1397468885393,49152]];
	sdsa_used_data = [[1397465639807,8192],[1397467893963,8192],[1397468014460,8192],[1397468511266,8192],[1397468885393,8192]];
	sdsa_free_data = [[1397465639807,253952],[1397467893963,253952],[1397468014460,253952],[1397468511266,253952],[1397468885393,253952]];
	udsa_used_data = [[1397465639807,0],[1397467893963,0],[1397468014460,0],[1397468511266,0],[1397468885393,0]];
	udsa_free_data = [[1397465639807,1048576],[1397467893963,1048576],[1397468014460,1048576],[1397468511266,1048576],[1397468885393,1048576]];
*/
	
	// *** NG ***
/*
	cdsa_used_data = [[1397465639807, 200],
	   	              [1397467893963, 100],
	   	              [1397468014460, 400],
	   	              [1397468511266, 100],
	   	              [1397468885393, 200]];
	cdsa_free_data = [[1397465639807, 200],
	   	              [1397467893963, 100],
	   	              [1397468014460, 400],
	   	              [1397468511266, 100],
	   	              [1397468885393, 200]];
	rdsa_used_data = [[1397465639807, 200],
	   	              [1397467893963, 100],
	   	              [1397468014460, 400],
	   	              [1397468511266, 500],
	   	              [1397468885393, 300]];
	rdsa_free_data = [[1397465639807, 200],
	                  [1397467893963, 100],
	                  [1397468014460, 400],
	                  [1397468511266, 100],
	                  [1397468885393, 200]];
	sdsa_used_data = [[1397465639807, 100],
	                  [1397467893963, 200],
	                  [1397468014460, 300],
	                  [1397468511266, 300],
	                  [1397468885393, 100]];
	sdsa_free_data = [[1397465639807, 200],
	                  [1397467893963, 100],
	                  [1397468014460, 400],
	                  [1397468511266, 100],
	                  [1397468885393, 200]];
	udsa_used_data = [[1397465639807, 100],
	                  [1397467893963, 500],
	                  [1397468014460, 200],
	                  [1397468511266, 100],
	                  [1397468885393, 200]];
	udsa_free_data = [[1397465639807, 200],
	                  [1397467893963, 100],
	                  [1397468014460, 400],
	                  [1397468511266, 100],
	                  [1397468885393, 200]];
*/
	/*
	cdsa_used_data = [[0, 200],
	   	              [5, 100],
	   	              [8, 400],
	   	              [9, 100],
	   	              [11, 200]];
	cdsa_free_data = [[0, 200],
	   	              [5, 100],
	   	              [8, 400],
	   	              [9, 100],
	   	              [11, 200]];
	rdsa_used_data = [[0, 200],
	   	              [5, 100],
	   	              [8, 400],
	   	              [9, 500],
	   	              [11, 300]];
	rdsa_free_data = [[0, 200],
	                  [5, 100],
	                  [8, 400],
	                  [9, 100],
	                  [11, 200]];
	sdsa_used_data = [[0, 100],
	                  [5, 200],
	                  [8, 300],
	                  [9, 300],
	                  [11, 100]];
	sdsa_free_data = [[0, 200],
	                  [5, 100],
	                  [8, 400],
	                  [9, 100],
	                  [11, 200]];
	udsa_used_data = [[0, 100],
	                  [5, 500],
	                  [8, 200],
	                  [9, 100],
	                  [11, 200]];
	udsa_free_data = [[0, 200],
	                  [5, 100],
	                  [8, 400],
	                  [9, 100],
	                  [11, 200]];
	                  */
	// ***OK***
/*		cdsa_used_data = [[0, 200],
	   	              [1, 100],
	   	              [2, 400],
	   	              [3, 100],
	   	              [4, 200]];
	cdsa_free_data = [[0, 200],
	   	              [1, 100],
	   	              [2, 400],
	   	              [3, 100],
	   	              [4, 200]];
	rdsa_used_data = [[0, 200],
	   	              [1, 100],
	   	              [2, 400],
	   	              [3, 500],
	   	              [4, 300]];
	rdsa_free_data = [[0, 200],
	                  [1, 100],
	                  [2, 400],
	                  [3, 100],
	                  [4, 200]];
	sdsa_used_data = [[0, 100],
	                  [1, 200],
	                  [2, 300],
	                  [3, 300],
	                  [4, 100]];
	sdsa_free_data = [[0, 200],
	                  [1, 100],
	                  [2, 400],
	                  [3, 100],
	                  [4, 200]];
	udsa_used_data = [[0, 100],
	                  [1, 500],
	                  [2, 200],
	                  [3, 100],
	                  [4, 200]];
	udsa_free_data = [[0, 200],
	                  [1, 100],
	                  [2, 400],
	                  [3, 100],
	                  [4, 200]];*/

	var dsa_threshold_data = [[dsa_threshold, -1], [dsa_threshold, 1]];

	WL.Logger.debug(">>> dsa_threshold: " + dsa_threshold);
	WL.Logger.debug(">>> dsa_total_free: " + dsa_total_free);
	WL.Logger.debug(">>> dsa_total_limit: " + dsa_total_limit);

	
	var default_show = true,
		default_stacked = true,
		default_horizontal = true,
		default_barWidth = 1.5,
		default_lineWidth = 1,
		default_shadowSize = 0.1,
		cdsa_color = "#ffff66",
		rdsa_color = "#cc66cc",
		sdsa_color = "#ffcc00",
		udsa_color = "#6666cc",
		dsa_total_free_color = "#777777",
		default_background_color = "#333333",
		default_tick_color = "#eeeeee",
		default_used_Opacity = 0.5,
		default_free_Opacity = 0.5,
		dsa_threshold_color = "#ffff00";

	var cdsa_used_line = {
			data: cdsa_used_data,
			lines: {
				color: cdsa_color,
				show: true,
				stacked: true,
				fill: true,
				fillBorder: false,
				fillColor: cdsa_color,
				fillOpacity: default_used_Opacity
			}
	};
	
	var cdsa_free_line = {
			data: cdsa_free_data,
			lines: {
				color: cdsa_color,
				show: true,
				stacked: true,
				fill: true,
				fillBorder: false,
				fillColor: cdsa_color,
				fillOpacity: default_free_Opacity
			}
	};
	
	var rdsa_used_line = {
			data: rdsa_used_data,
			lines: {
				color: rdsa_color,
				show: true,
				stacked: true,
				fill: true,
				fillBorder: false,
				fillColor: rdsa_color,
				fillOpacity: default_used_Opacity
			}
	};
	
	var rdsa_free_line = {
			data: rdsa_free_data,
			lines: {
				color: rdsa_color,
				show: true,
				stacked: true,
				fill: true,
				fillBorder: false,
				fillColor: rdsa_color,
				fillOpacity: default_free_Opacity
			}
	};
	
	var sdsa_used_line = {
			data: sdsa_used_data,
			lines: {
				color: sdsa_color,
				show: true,
				stacked: true,
				fill: true,
				fillBorder: false,
				fillColor: sdsa_color,
				fillOpacity: default_used_Opacity
			}
	};
	
	var sdsa_free_line = {
			data: sdsa_free_data,
			lines: {
				color: sdsa_color,
				show: true,
				stacked: true,
				fill: true,
				fillBorder: false,
				fillColor: sdsa_color,
				fillOpacity: default_free_Opacity
			}
	};

	var udsa_used_line = {
			data: udsa_used_data,
			lines: {
				color: udsa_color,
				show: true,
				stacked: true,
				fill: true,
				fillBorder: false,
				fillColor: udsa_color,
				fillOpacity: default_used_Opacity
			}
	};
			
	var udsa_free_line = {
			data: udsa_free_data,
			lines: {
				color: udsa_color,
				show: true,
				stacked: true,
				fill: true,
				fillBorder: false,
				fillColor: udsa_color,
				fillOpacity: default_free_Opacity
			}
	};

	var options ={
			legend: {
				show: false,
				backgroundColor: default_background_color,
				backgroundOpacity: 1
			},
			grid: {
				backgroundColor: default_background_color,
				verticalLines: false,
				horizontalLines: false
			},
			xaxis:{
				showLabels: true,
				color: default_tick_color,
				//min: 0,
				mode: 'time',
				//max: dsa_total_limit
			},
			yaxis: {
				showLabels: true,
				min: 0,
				//max: 1
			}
			/*
	        mouse: {
	            track: true,
	            relative: true
	        }*/
	};

	Flotr.draw(container, [ cdsa_used_line,  
	                        cdsa_free_line,
	                        rdsa_used_line,
	                        rdsa_free_line,
	                        sdsa_used_line, 
	                        sdsa_free_line,
	                        udsa_used_line,
	                        udsa_free_line
	                        ],  options);

	WL.Logger.debug("****** end drawDSAHistory*****");
}

function drawDSAHistory_bk2(cdsa_used_data, cdsa_free_data,
					    rdsa_used_data, rdsa_free_data,
					    sdsa_used_data, sdsa_free_data,
					    udsa_used_data, udsa_free_data,
					    dsa_total_free_data, dsa_threshold_data
					    ){
	$("#graphDSAHistory").empty();
	WL.Logger.debug("****** begin drawDSAHistory2*****");
	var container = document.getElementById("graphDSAHistory");
	
	WL.Logger.debug("*** cdsa_used_data:" , cdsa_used_data);
	WL.Logger.debug("*** cdsa_free_data:" , cdsa_free_data);
	WL.Logger.debug("*** rdsa_used_data:" , rdsa_used_data);
	WL.Logger.debug("*** rdsa_free_data:" , rdsa_free_data);
	WL.Logger.debug("*** sdsa_used_data:" , sdsa_used_data);
	WL.Logger.debug("*** sdsa_free_data:" , sdsa_free_data);
	WL.Logger.debug("*** udsa_used_data:" , udsa_used_data);
	WL.Logger.debug("*** udsa_free_data:" , udsa_free_data);


	WL.Logger.debug(">>> dsa_threshold: " + dsa_threshold);
	WL.Logger.debug(">>> dsa_total_free: " + dsa_total_free);
	WL.Logger.debug(">>> dsa_total_limit: " + dsa_total_limit);

	
	var default_show = true,
		default_stacked = true,
		default_horizontal = true,
		default_barWidth = 1.5,
		default_lineWidth = 1,
		default_shadowSize = 0.1,
		cdsa_used_color = "#ffff66",
		cdsa_free_color = "#888855",
		rdsa_used_color = "#cc66cc",
		rdsa_free_color = "#885588",
		sdsa_used_color = "#ffcc00",
		sdsa_free_color = "#887700",
		udsa_used_color = "#6666cc",
		udsa_free_color = "#555588",
		dsa_total_free_color = "#777777",
		default_background_color = "#333333",
		default_tick_color = "#eeeeee",
		default_used_Opacity = 1,
		default_free_Opacity = 1,
		dsa_threshold_color = "#ffff00",
		default_isStacked = false;

	var cdsa_used_line = {
			data: cdsa_used_data,
			lines: {
				color: cdsa_used_color,
				show: true,
				stacked: default_isStacked,
				fill: true,
				fillBorder: false,
				fillColor: cdsa_used_color,
				fillOpacity: default_used_Opacity
			},
	        points: {
	            show: true,
	            radius: 2,
	            lineWidth: 1,
	            color: cdsa_used_color,
	            fill: true,
	            fillColor: cdsa_used_color, 
	            fillOpacity: 1
	        }
	};
	
	var cdsa_free_line = {
			data: cdsa_free_data,
			lines: {
				color: cdsa_free_color,
				show: true,
				stacked: default_isStacked,
				fill: true,
				fillBorder: false,
				fillColor: cdsa_free_color,
				fillOpacity: default_free_Opacity
			},
	        points: {
	            show: true,
	            radius: 2,
	            lineWidth: 1,
	            color: cdsa_free_color,
	            fill: true,
	            fillColor: cdsa_free_color, 
	            fillOpacity: 1
	        }
	};
	
	var rdsa_used_line = {
			data: rdsa_used_data,
			lines: {
				color: rdsa_used_color,
				show: true,
				stacked: default_isStacked,
				fill: true,
				fillBorder: false,
				fillColor: rdsa_used_color,
				fillOpacity: default_used_Opacity
			},
	        points: {
	            show: true,
	            radius: 2,
	            lineWidth: 1,
	            color: rdsa_used_color,
	            fill: true,
	            fillColor: rdsa_used_color, 
	            fillOpacity: 1
	        }
	};
	
	var rdsa_free_line = {
			data: rdsa_free_data,
			lines: {
				color: rdsa_free_color,
				show: true,
				stacked: default_isStacked,
				fill: true,
				fillBorder: false,
				fillColor: rdsa_free_color,
				fillOpacity: default_free_Opacity
			},
			points: {
	            show: true,
	            radius: 2,
	            lineWidth: 1,
	            color: rdsa_free_color,
	            fill: true,
	            fillColor: rdsa_free_color, 
	            fillOpacity: 1
	        }
	};
	
	var sdsa_used_line = {
			data: sdsa_used_data,
			lines: {
				color: sdsa_used_color,
				show: true,
				stacked: default_isStacked,
				fill: true,
				fillBorder: false,
				fillColor: sdsa_used_color,
				fillOpacity: default_used_Opacity
			},
	        points: {
	            show: true,
	            radius: 2,
	            lineWidth: 1,
	            color: sdsa_used_color,
	            fill: true,
	            fillColor: sdsa_used_color, 
	            fillOpacity: 1
	        }
	};
	
	var sdsa_free_line = {
			data: sdsa_free_data,
			lines: {
				color: sdsa_free_color,
				show: true,
				stacked: default_isStacked,
				fill: true,
				fillBorder: false,
				fillColor: sdsa_free_color,
				fillOpacity: default_free_Opacity
			},
	        points: {
	            show: true,
	            radius: 2,
	            lineWidth: 1,
	            color: sdsa_free_color,
	            fill: true,
	            fillColor: sdsa_free_color, 
	            fillOpacity: 1
	        }
	};

	var udsa_used_line = {
			data: udsa_used_data,
			lines: {
				color: udsa_used_color,
				show: true,
				stacked: default_isStacked,
				fill: true,
				fillBorder: false,
				fillColor: udsa_used_color,
				fillOpacity: default_used_Opacity
			},
	        points: {
	            show: true,
	            radius: 2,
	            lineWidth: 1,
	            color: udsa_used_color,
	            fill: true,
	            fillColor: udsa_used_color, 
	            fillOpacity: 1
	        }
	};
			
	var udsa_free_line = {
			data: udsa_free_data,
			lines: {
				color: udsa_free_color,
				show: true,
				stacked: default_isStacked,
				fill: true,
				fillBorder: false,
				fillColor: udsa_free_color,
				fillOpacity: default_free_Opacity
			},
	        points: {
	            show: true,
	            radius: 2,
	            lineWidth: 1,
	            color: udsa_free_color,
	            fill: true,
	            fillColor: udsa_free_color, 
	            fillOpacity: 1
	        }
	};
	
	var dsa_total_free_line = {
			data: dsa_total_free_data,
			lines: {
				color: dsa_total_free_color,
				show: true,
				stacked: default_isStacked,
				fill: true,
				fillBorder: false,
				fillColor: dsa_total_free_color,
				fillOpacity: default_free_Opacity
			},
	        points: {
	            show: false
	        }
	};
	
	var dsa_threshold_line = {
			data: dsa_threshold_data,
			lines: {
				color: dsa_threshold_color,
				show: true,
				stacked: default_isStacked,
				fill: false,
				//fillBorder: false,
				//fillColor: dsa_total_free_color,
				//fillOpacity: default_free_Opacity
			},
	        points: {
	            show: false
	        }
	};

	var options ={
			legend: {
				show: false,
				backgroundColor: default_background_color,
				backgroundOpacity: 1
			},
			grid: {
				backgroundColor: default_background_color,
				verticalLines: false,
				horizontalLines: false
			},
			xaxis:{
				showLabels: true,
				color: default_tick_color,
				//min: 0,
				mode: 'time',
				//max: dsa_total_limit
			},
			yaxis: {
				showLabels: true,
				min: 0,
				//max: 1
			},
			
	        mouse: {
	            track: true,
	            relative: true,
                position: 'nw',
				//sensibility: 1, 
				//trackDecimals: 2,
				trackFormatter: function(obj){ 
                  var d = new Date(obj.x-0);               
                  return d.toLocaleTimeString() +'/' + obj.y; 
                  //return obj.x +'/' + obj.y; 
                }
	        }
	};


    function drawGraph(opts) {

        // Clone the options, so the 'options' variable always keeps intact.
        o = Flotr._.extend(Flotr._.clone(options), opts || {});
        
        $("#graphDSAHistory").empty();
        // Return a new graph.
        return  Flotr.draw(container, [ dsa_total_free_line,
	                        udsa_free_line,
	                        udsa_used_line,
	                        sdsa_free_line,
	                        sdsa_used_line,
	                        rdsa_free_line,
	                        rdsa_used_line,
	                        cdsa_free_line,
	                        cdsa_used_line,
	                        dsa_threshold_line
	                        ],  o);
    }
    
    graph = drawGraph();
    
    Flotr.EventAdapter.observe(container, 'flotr:select', function(area) {
        // Draw selected area
    	var new_options = {
    			legend: {
    				show: false,
    				backgroundColor: default_background_color,
    				backgroundOpacity: 1
    			},
    			grid: {
    				backgroundColor: default_background_color,
    				verticalLines: false,
    				horizontalLines: false
    			},
    			xaxis:{
    				showLabels: true,
    				color: default_tick_color,
    				//min: 0,
    				mode: 'time',
    				//max: dsa_total_limit
                    min: area.x1,
                    max: area.x2,
    			},
    			yaxis: {
    				showLabels: true,
    				min: 0,
    				//max: 1
    			},
    			
    	        mouse: {
    	            track: true,
    	            relative: true,
                    position: 'nw',
    				//sensibility: 1, 
    				//trackDecimals: 2,
    				trackFormatter: function(obj){ 
                      var d = new Date(obj.x-0);               
                      return d.toLocaleTimeString() +'/' + obj.y; 
                      //return obj.x +'/' + obj.y; 
                    }
    	        }
    	};
        graph = drawGraph(new_options);
            
    });
    
    // When graph is clicked, draw the graph with default area.
    Flotr.EventAdapter.observe(container, 'flotr:click', function() {
        graph = drawGraph();
    });

	WL.Logger.debug("****** end drawDSAHistory*****");
}


function updateDSAHistoryData(iTimeStamp, dsa_limit, dsa_threshold,
							  cdsa_used, cdsa_free,
							  rdsa_used, rdsa_free,
							  sdsa_used, sdsa_free,
							  udsa_used, udsa_free
							  ){
	
	WL.Logger.debug("*** begin updateDSAHistoryData ***");
	
	WL.Logger.debug("***cdsa_used:" , cdsa_used);
	WL.Logger.debug("***cdsa_used:" , cdsa_free);
	
	var cdsa_allocated = cdsa_used + cdsa_free;
	var rdsa_allocated = rdsa_used + rdsa_free;
	var sdsa_allocated = sdsa_used + sdsa_free;
	var udsa_allocated = udsa_used + udsa_free;
	
	WL.Logger.debug("***cdsa_allocated:" , cdsa_allocated);
	
	var dsa_total_free = dsa_limit - (cdsa_allocated + rdsa_allocated + sdsa_allocated + udsa_allocated);
	
	var dsa_total_used = cdsa_used + rdsa_used + sdsa_used + udsa_used;
	var dsa_total_allocated = cdsa_allocated + rdsa_allocated + sdsa_allocated + udsa_allocated;
	
	var dsa_threshold_size = dsa_threshold * dsa_limit / 100;
	WL.Logger.debug("***dsa_threshold:", dsa_threshold);
	WL.Logger.debug("***dsa_limit:", dsa_limit);
	WL.Logger.debug("***dsa_threshold_size:", dsa_threshold_size);
	
	var dsa_total_used_ratio = Math.round(100 * dsa_total_used / dsa_limit);
	var dsa_total_allocated_ratio = Math.round(100 * dsa_total_allocated / dsa_limit);
	var dsa_total_free_ratio = Math.round(100 * dsa_total_free / dsa_limit);
	var cdsa_used_ratio      = Math.round(100 * cdsa_used / dsa_limit);
	var cdsa_allocated_ratio = Math.round(100 * cdsa_allocated / dsa_limit);
	var rdsa_used_ratio      = Math.round(100 * rdsa_used / dsa_limit);
	var rdsa_allocated_ratio = Math.round(100 * rdsa_allocated / dsa_limit);
	var sdsa_used_ratio      = Math.round(100 * sdsa_used / dsa_limit);
	var sdsa_allocated_ratio = Math.round(100 * sdsa_allocated / dsa_limit);
	var udsa_used_ratio      = Math.round(100 * udsa_used/ dsa_limit);
	var udsa_allocated_ratio = Math.round(100 * udsa_allocated / dsa_limit);
	
	WL.Logger.debug("***get hoistory_date");
	var history_date = new Date(iTimeStamp-0); 
	var history_strTimeStamp = history_date.getFullYear() + "/"
    					+ date_format(history_date.getMonth()) + "/"
    					+ date_format(history_date.getDay()) + "-" 
    					+ date_format(history_date.getHours()) + ":"
    					+ date_format(history_date.getMinutes()) + ":"
    					+ date_format(history_date.getSeconds());
	WL.Logger.debug("***hoistory_date:", history_date);
	WL.Logger.debug("***hoistory_strTimeStamp:" + history_strTimeStamp);
	
	$('#history_dsa_time_stamp').text("Time: "+ history_strTimeStamp);
	$('#history_dsa_total_limit').text("DSA Limit: "+ addFigure(dsa_limit) + " bytes");
	$('#history_dsa_threshold').text("Threshold: " + dsa_threshold + "%   (" + addFigure(dsa_threshold_size) + " bytes)");
	$('#history_dsa_total_used').text(addFigure(dsa_total_used) + " bytes (" + dsa_total_used_ratio + "%)");
	$('#history_dsa_total_allocated').text(addFigure(dsa_total_allocated) + " bytes (" + dsa_total_allocated_ratio + "%)");
	$('#history_cdsa_used').text(addFigure(cdsa_used) + " bytes (" + cdsa_used_ratio + "%)");
	$('#history_cdsa_allocated').text(addFigure(cdsa_allocated) + " bytes (" + cdsa_allocated_ratio + "%)");
	$('#history_rdsa_used').text(addFigure(rdsa_used) + " bytes (" + rdsa_used_ratio + "%)");
	$('#history_rdsa_allocated').text(addFigure(rdsa_allocated) + " bytes (" + rdsa_allocated_ratio + "%)");
	$('#history_sdsa_used').text(addFigure(sdsa_used) + " bytes (" + sdsa_used_ratio + "%)");
	$('#history_sdsa_allocated').text(addFigure(sdsa_allocated) + " bytes (" + sdsa_allocated_ratio + "%)");
	$('#history_udsa_used').text(addFigure(udsa_used) + " bytes (" + udsa_used_ratio + "%)");
	$('#history_udsa_allocated').text(addFigure(udsa_allocated) + " bytes (" + udsa_allocated_ratio + "%)");
	$('#history_dsa_total_free').text(addFigure(dsa_total_free) + " bytes (" + dsa_total_free_ratio + "%)");
	
	WL.Logger.debug("*** end updateDSAHistoryData ***");
}

function drawDSAHistory(dsa_limit, dsa_threshold,
						cdsa_used, cdsa_free,
					    rdsa_used, rdsa_free,
					    sdsa_used, sdsa_free,
					    udsa_used, udsa_free					    
					    ){
	$("#graphDSAHistory").empty();
	WL.Logger.debug("****** begin drawDSAHistory2*****");
	var container = document.getElementById("graphDSAHistory");
	
	WL.Logger.debug("*** cdsa_used.stacked:" , cdsa_used.stacked);
	WL.Logger.debug("*** cdsa_free.stacked:" , cdsa_free.stacked);
	WL.Logger.debug("*** rdsa_used.stacked:" , rdsa_used.stacked);
	WL.Logger.debug("*** rdsa_free.stacked:" , rdsa_free.stacked);
	WL.Logger.debug("*** sdsa_used.stacked:" , sdsa_used.stacked);
	WL.Logger.debug("*** sdsa_free.stacked:" , sdsa_free.stacked);
	WL.Logger.debug("*** udsa_used.stacked:" , udsa_used.stacked);
	WL.Logger.debug("*** udsa_free.stacked:" , udsa_free.stacked);


	WL.Logger.debug(">>> dsa_threshold: " , dsa_threshold);
	WL.Logger.debug(">>> dsa_limit: " , dsa_limit);
	
	var record_length = dsa_limit.length;
	

	var default_show = true,
		default_stacked = true,
		default_horizontal = true,
		default_barWidth = 1.5,
		default_lineWidth = 1,
		default_shadowSize = 0.1,
		cdsa_used_color = "#ffff66",
		cdsa_free_color = "#888855",
		rdsa_used_color = "#cc66cc",
		rdsa_free_color = "#885588",
		sdsa_used_color = "#ffcc00",
		sdsa_free_color = "#887700",
		udsa_used_color = "#6666cc",
		udsa_free_color = "#555588",
		dsa_total_free_color = "#777777",
		default_background_color = "#333333",
		default_tick_color = "#eeeeee",
		default_used_Opacity = 1,
		default_free_Opacity = 1,
		dsa_threshold_color = "#ffff00",
		default_isStacked = false;

	var cdsa_used_line = {
			data: cdsa_used.stacked,
			lines: {
				color: cdsa_used_color,
				show: true,
				stacked: default_isStacked,
				fill: true,
				fillBorder: false,
				fillColor: cdsa_used_color,
				fillOpacity: default_used_Opacity
			},
	        points: {
	            show: true,
	            radius: 2,
	            lineWidth: 1,
	            color: cdsa_used_color,
	            fill: true,
	            fillColor: cdsa_used_color, 
	            fillOpacity: 1
	        }
	};
	
	var cdsa_free_line = {
			data: cdsa_free.stacked,
			lines: {
				color: cdsa_free_color,
				show: true,
				stacked: default_isStacked,
				fill: true,
				fillBorder: false,
				fillColor: cdsa_free_color,
				fillOpacity: default_free_Opacity
			},
	        points: {
	            show: true,
	            radius: 2,
	            lineWidth: 1,
	            color: cdsa_free_color,
	            fill: true,
	            fillColor: cdsa_free_color, 
	            fillOpacity: 1
	        }
	};
	
	var rdsa_used_line = {
			data: rdsa_used.stacked,
			lines: {
				color: rdsa_used_color,
				show: true,
				stacked: default_isStacked,
				fill: true,
				fillBorder: false,
				fillColor: rdsa_used_color,
				fillOpacity: default_used_Opacity
			},
	        points: {
	            show: true,
	            radius: 2,
	            lineWidth: 1,
	            color: rdsa_used_color,
	            fill: true,
	            fillColor: rdsa_used_color, 
	            fillOpacity: 1
	        }
	};
	
	var rdsa_free_line = {
			data: rdsa_free.stacked,
			lines: {
				color: rdsa_free_color,
				show: true,
				stacked: default_isStacked,
				fill: true,
				fillBorder: false,
				fillColor: rdsa_free_color,
				fillOpacity: default_free_Opacity
			},
			points: {
	            show: true,
	            radius: 2,
	            lineWidth: 1,
	            color: rdsa_free_color,
	            fill: true,
	            fillColor: rdsa_free_color, 
	            fillOpacity: 1
	        }
	};
	
	var sdsa_used_line = {
			data: sdsa_used.stacked,
			lines: {
				color: sdsa_used_color,
				show: true,
				stacked: default_isStacked,
				fill: true,
				fillBorder: false,
				fillColor: sdsa_used_color,
				fillOpacity: default_used_Opacity
			},
	        points: {
	            show: true,
	            radius: 2,
	            lineWidth: 1,
	            color: sdsa_used_color,
	            fill: true,
	            fillColor: sdsa_used_color, 
	            fillOpacity: 1
	        }
	};
	
	var sdsa_free_line = {
			data: sdsa_free.stacked,
			lines: {
				color: sdsa_free_color,
				show: true,
				stacked: default_isStacked,
				fill: true,
				fillBorder: false,
				fillColor: sdsa_free_color,
				fillOpacity: default_free_Opacity
			},
	        points: {
	            show: true,
	            radius: 2,
	            lineWidth: 1,
	            color: sdsa_free_color,
	            fill: true,
	            fillColor: sdsa_free_color, 
	            fillOpacity: 1
	        }
	};

	var udsa_used_line = {
			data: udsa_used.stacked,
			lines: {
				color: udsa_used_color,
				show: true,
				stacked: default_isStacked,
				fill: true,
				fillBorder: false,
				fillColor: udsa_used_color,
				fillOpacity: default_used_Opacity
			},
	        points: {
	            show: true,
	            radius: 2,
	            lineWidth: 1,
	            color: udsa_used_color,
	            fill: true,
	            fillColor: udsa_used_color, 
	            fillOpacity: 1
	        }
	};
			
	var udsa_free_line = {
			data: udsa_free.stacked,
			lines: {
				color: udsa_free_color,
				show: true,
				stacked: default_isStacked,
				fill: true,
				fillBorder: false,
				fillColor: udsa_free_color,
				fillOpacity: default_free_Opacity
			},
	        points: {
	            show: true,
	            radius: 2,
	            lineWidth: 1,
	            color: udsa_free_color,
	            fill: true,
	            fillColor: udsa_free_color, 
	            fillOpacity: 1
	        }
	};
	
	var dsa_total_free_line = {
			data: dsa_limit,
			lines: {
				color: dsa_total_free_color,
				show: true,
				stacked: default_isStacked,
				fill: true,
				fillBorder: false,
				fillColor: dsa_total_free_color,
				fillOpacity: default_free_Opacity
			},
	        points: {
	            show: false
	        }
	};
	
	var dsa_threshold_line = {
			data: dsa_threshold.stacked,
			lines: {
				color: dsa_threshold_color,
				show: true,
				stacked: default_isStacked,
				fill: false,
				//fillBorder: false,
				//fillColor: dsa_total_free_color,
				//fillOpacity: default_free_Opacity
			},
	        points: {
	            show: false
	        }
	};
	


	var options ={
			legend: {
				show: false,
				backgroundColor: default_background_color,
				backgroundOpacity: 1
			},
			grid: {
				backgroundColor: default_background_color,
				verticalLines: false,
				horizontalLines: false
			},
			xaxis:{
				showLabels: true,
				color: default_tick_color,
				//min: 0,
				max: dsa_limit[record_length-1][0] + ((dsa_limit[record_length-1][0] - dsa_limit[0][0]) * 0.05),
				mode: 'time',
				timeMode: 'local',				
			},
			yaxis: {
				showLabels: true,
				min: 0,
				//max: 1
			},
			
	        mouse: {
	            track: true,
	            relative: true,
                position: 'nw',
				//sensibility: 1, 
				//trackDecimals: 2,
				trackFormatter: function(obj){ 
				  WL.Logger.debug("***graph object.index", obj.index);
				  WL.Logger.debug("***cdsa_used.stacked[obj.index]:",cdsa_used.stacked[obj.index]);
				  WL.Logger.debug("***cdsa_used.stacked[obj.index][1]:",cdsa_used.stacked[obj.index][1]);
				  updateDSAHistoryData(obj.x, dsa_limit[obj.index][1], dsa_threshold.original[obj.index][1],
						  			   cdsa_used.original[obj.index][1], cdsa_free.original[obj.index][1],
						    		   rdsa_used.original[obj.index][1], rdsa_free.original[obj.index][1],
						    		   sdsa_used.original[obj.index][1], sdsa_free.original[obj.index][1],
						    		   udsa_used.original[obj.index][1], udsa_free.original[obj.index][1]
						    		   );
                  var date = new Date(obj.x-0);               
                  return date.toLocaleTimeString() +'/' + obj.y; 
                  //return obj.x +'/' + obj.y; 
                }
	        }
	};

    function drawGraph(focus_data) {
    	
    	var focus_line = {
    			data: focus_data,
    			lines:{
    				show: true,
    				color: "#cccccc",
    				fill: false				
    			},
    			points: {
    	            show: false
    	        }
    	};

        $("#graphDSAHistory").empty();
        // Return a new graph.
        return  Flotr.draw(container, [ dsa_total_free_line,
                	                    udsa_free_line,
            	                        udsa_used_line,
            	                        sdsa_free_line,
            	                        sdsa_used_line,
            	                        rdsa_free_line,
            	                        rdsa_used_line,
            	                        cdsa_free_line,
            	                        cdsa_used_line,
            	                        dsa_threshold_line,
            	                        focus_line
            	                        ],  options);
    }
    

	var xmax = dsa_limit[record_length-1][0];
	var ymax = dsa_limit[record_length-1][1];
	var focus_data = [[xmax, 0], [xmax, ymax]];
	WL.Logger.debug("*** focus_data:", focus_data);    
    graph = drawGraph(focus_data);
	
      var index = dsa_limit.length - 1;
	  updateDSAHistoryData(dsa_limit[index][0], dsa_limit[index][1], dsa_threshold.original[index][1],
			   			   cdsa_used.original[index][1], cdsa_free.original[index][1],
				   		   rdsa_used.original[index][1], rdsa_free.original[index][1],
				   		   sdsa_used.original[index][1], sdsa_free.original[index][1],
				   		   udsa_used.original[index][1], udsa_free.original[index][1]
				   		   );
	  
	    Flotr.EventAdapter.observe(container, 'flotr:click', function(obj) {
	        
	    	WL.Logger.debug("*** flotr:click, obj:",obj);
	    	var nearest_index = 0;
	    	var nearest_time1 = dsa_limit[0][0];
	    	var nearest_time2 = dsa_limit[0][0];
	    	var i;
	    	for (i = 1; i < dsa_limit.length; i++){
	    		if (dsa_limit[i][0] > obj.x ) {
	    			nearest_time1 = dsa_limit[i-1][0];
	    			nearest_time2 = dsa_limit[i][0];
	    			break;
	    		}
	    	}
	    	if ((obj.x - nearest_time1) < (nearest_time2 - obj.x)){
	    		nearest_index = i-1;
	    	} else {
	    		nearest_index = i;
	    	}
	    	WL.Logger.debug("*** nearest_index:", nearest_index);
	    	var selected_x = dsa_limit[nearest_index][0];
	    	focus_data = [[selected_x, 0], [selected_x, ymax]];	
	    	
	    	graph = drawGraph(focus_data);
	    	index = nearest_index;
	    	updateDSAHistoryData(dsa_limit[index][0], dsa_limit[index][1], dsa_threshold.original[index][1],
		   			   cdsa_used.original[index][1], cdsa_free.original[index][1],
			   		   rdsa_used.original[index][1], rdsa_free.original[index][1],
			   		   sdsa_used.original[index][1], sdsa_free.original[index][1],
			   		   udsa_used.original[index][1], udsa_free.original[index][1]
			   		   );	    	
	    });
	WL.Logger.debug("****** end drawDSAHistory*****");
}



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


/*
function clearDynamicStorageField(){
	$("#graphDSACurrent").empty();
	$("#graphEDSACurrent").empty();
	$("#graphGDSACurrent").empty();
	
	var default_message = "unknown";
	
	$('#dsa_total_limit').text("DSA Limit: "+ default_message);
	$('#dsa_threshold').text("Threshold: " + default_message);
	$('#dsa_total_used').text(default_message);
	$('#dsa_total_allocated').text(default_message);
	$('#cdsa_used').text(default_message);
	$('#cdsa_allocated').text(default_message);
	$('#rdsa_used').text(default_message);
	$('#rdsa_allocated').text(default_message);
	$('#sdsa_used').text(default_message);
	$('#sdsa_allocated').text(default_message);
	$('#udsa_used').text(default_message);
	$('#udsa_allocated').text(default_message);
	$('#dsa_total_free').text(default_message);
	
	$('#edsa_total_limit').text("EDSA Limit: "+ default_message);
	$('#edsa_threshold').text("Threshold: " + default_message);
	$('#edsa_total_used').text(default_message);
	$('#edsa_total_allocated').text(default_message);
	$('#ecdsa_used').text(default_message);
	$('#ecdsa_allocated').text(default_message);
	$('#erdsa_used').text(default_message);
	$('#erdsa_allocated').text(default_message);
	$('#esdsa_used').text(default_message);
	$('#esdsa_allocated').text(default_message);
	$('#eudsa_used').text(default_message);
	$('#eudsa_allocated').text(default_message);
	$('#etdsa_used').text(default_message);
	$('#etdsa_allocated').text(default_message);
	$('#edsa_total_free').text(default_message);
	
	$('#gdsa_total_limit').text("GDSA Limit: "+ default_message);
	$('#gdsa_threshold').text("Threshold: " + default_message);
	$('#gdsa_total_used').text(default_message);
	$('#gdsa_total_allocated').text(default_message);
	$('#gcdsa_used').text(default_message);
	$('#gcdsa_allocated').text(default_message);
	$('#gsdsa_used').text(default_message);
	$('#gsdsa_allocated').text(default_message);
	$('#gudsa_used').text(default_message);
	$('#gudsa_allocated').text(default_message);
	$('#gdsa_total_free').text(default_message);
}
*/

function clearDSACurrentField(){
	$("#graphDSACurrent").empty();
	
	var default_message = "unknown";
	
	$('#dsa_total_limit').text("DSA Limit: "+ default_message);
	$('#dsa_threshold').text("Threshold: " + default_message);
	$('#dsa_total_used').text(default_message);
	$('#dsa_total_allocated').text(default_message);
	$('#cdsa_used').text(default_message);
	$('#cdsa_allocated').text(default_message);
	$('#rdsa_used').text(default_message);
	$('#rdsa_allocated').text(default_message);
	$('#sdsa_used').text(default_message);
	$('#sdsa_allocated').text(default_message);
	$('#udsa_used').text(default_message);
	$('#udsa_allocated').text(default_message);
	$('#dsa_total_free').text(default_message);
}

function clearEDSACurrentField(){
	$("#graphEDSACurrent").empty();
	
	var default_message = "unknown";
		
	$('#edsa_total_limit').text("EDSA Limit: "+ default_message);
	$('#edsa_threshold').text("Threshold: " + default_message);
	$('#edsa_total_used').text(default_message);
	$('#edsa_total_allocated').text(default_message);
	$('#ecdsa_used').text(default_message);
	$('#ecdsa_allocated').text(default_message);
	$('#erdsa_used').text(default_message);
	$('#erdsa_allocated').text(default_message);
	$('#esdsa_used').text(default_message);
	$('#esdsa_allocated').text(default_message);
	$('#eudsa_used').text(default_message);
	$('#eudsa_allocated').text(default_message);
	$('#etdsa_used').text(default_message);
	$('#etdsa_allocated').text(default_message);
	$('#edsa_total_free').text(default_message);
	
}

function clearGDSACurrentField(){
	$("#graphGDSACurrent").empty();
	
	var default_message = "unknown";
	
	$('#gdsa_total_limit').text("GDSA Limit: "+ default_message);
	$('#gdsa_threshold').text("Threshold: " + default_message);
	$('#gdsa_total_used').text(default_message);
	$('#gdsa_total_allocated').text(default_message);
	$('#gcdsa_used').text(default_message);
	$('#gcdsa_allocated').text(default_message);
	$('#gsdsa_used').text(default_message);
	$('#gsdsa_allocated').text(default_message);
	$('#gudsa_used').text(default_message);
	$('#gudsa_allocated').text(default_message);
	$('#gdsa_total_free').text(default_message);
}


/*
function getDynamicStorage(){
	WL.Logger.debug("****** begin getDynamicStorage*****");
	WL.Logger.debug("*** selected region:" + JSON.stringify(selectedRegion));
	//var regionName = $('#Page_CurrentDynamicStorage').data('regionName0');
	var regionName = removeBlank(selectedRegion.REGIONNAME);
	var CICSplexName = removeBlank(selectedRegion.CICSPLEXNAME);
	var WUIServer = removeBlank(selectedRegion.WUISERVER);
	var sysId = removeBlank(selectedRegion.SYSID);
	var MVSSysName = removeBlank(selectedRegion.MVSSYSNAME);
	var dsa_threshold = selectedRegion.DSA_THRESHOLD;
	var edsa_threshold = selectedRegion.EDSA_THRESHOLD;
	var gdsa_threshold = selectedRegion.GDSA_THRESHOLD;
	
	if (WL.Client.getLoginName("AdapterAuthRealm") != null)	 {
		$("#CurrentDynamicStorage_header_user").text(WL.Client.getLoginName("AdapterAuthRealm"));
	}
	
	WL.Logger.debug("regionName=" + regionName);
	WL.Logger.debug("CICSplexName="+ CICSplexName);
	WL.Logger.debug("WUIServer="+ WUIServer);
	
	$('#CurrentDynamicStorage_header_regionName').text(regionName);
	$('#CurrentDynamicStorage_header_sysId').text(sysId);
	$('#CurrentDynamicStorage_header_CICSPlexName').text(CICSplexName);
	$('#CurrentDynamicStorage_header_MVSSysName').text(MVSSysName);
	
	var date = new Date();
	//var iTimeStamp = date.getTime();
	var strTimeStamp = date.getFullYear() + "/"
    	         + date_format(date.getMonth()) + "/"
    	         + date_format(date.getDay()) + "-" 
    	         + date_format(date.getHours()) + ":"
    	         + date_format(date.getMinutes()) + ":"
    	         + date_format(date.getSeconds());
	$('#CurrentDynamicStorage_header_refreshTime').text(strTimeStamp);
	
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
	
	WL.Client.invokeProcedure(invocationData, {
		onSuccess : function(result) {
			//busy.hide();
			WL.Logger.debug("Profile loaded SUCCESS: ", result);
			if (result.invocationResult.dynamicStorage.cdsa) {
				// プロファイル情報の取得に成功した場合
				//WL.Logger.debug(">>>invocationResult.dsa:",result.invocationResult.dsa);
				dynamicStorage = result.invocationResult.dynamicStorage;
				WL.Logger.debug(">>>dynamicStorage: " , dynamicStorage);
				//WL.Logger.debug(">>>dsaData.cdsa.used: " , this.dsaData.cdsa.used);
				//this.profile.itemNum = itemNum;
				
				WL.Logger.debug(">>>update text field");
				
				var dsa_total_limit = dynamicStorage.cdsa.total_limit;
				//var dsa_total_allocated = this.dynamicStorage.cdsa.total_allocated;
				var dsa_total_allocated = dynamicStorage.cdsa.allocated +
										  dynamicStorage.rdsa.allocated +
										  dynamicStorage.sdsa.allocated +
										  dynamicStorage.udsa.allocated;
				var dsa_total_used = dynamicStorage.cdsa.used +
									 dynamicStorage.rdsa.used +
									 dynamicStorage.sdsa.used +
									 dynamicStorage.udsa.used;
				var dsa_total_free = dsa_total_limit - dsa_total_allocated;
				var dsa_threshold_size = dsa_threshold * dsa_total_limit / 100;
				
				var dsa_total_used_ratio = Math.round(100 * dsa_total_used / dsa_total_limit);
				var dsa_total_allocated_ratio = Math.round(100 * dsa_total_allocated / dsa_total_limit);
				var dsa_total_free_ratio = Math.round(100 * dsa_total_free / dsa_total_limit);
				var cdsa_used_ratio      = Math.round(100 * dynamicStorage.cdsa.used / dsa_total_limit);
				var cdsa_allocated_ratio = Math.round(100 * dynamicStorage.cdsa.allocated / dsa_total_limit);
				var rdsa_used_ratio      = Math.round(100 * dynamicStorage.rdsa.used / dsa_total_limit);
				var rdsa_allocated_ratio = Math.round(100 * dynamicStorage.rdsa.allocated / dsa_total_limit);
				var sdsa_used_ratio      = Math.round(100 * dynamicStorage.sdsa.used / dsa_total_limit);
				var sdsa_allocated_ratio = Math.round(100 * dynamicStorage.sdsa.allocated / dsa_total_limit);
				var udsa_used_ratio      = Math.round(100 * dynamicStorage.udsa.used/ dsa_total_limit);
				var udsa_allocated_ratio = Math.round(100 * dynamicStorage.udsa.allocated / dsa_total_limit);
				
				$('#dsa_total_limit').text("DSA Limit: "+ addFigure(dsa_total_limit) + " bytes");
				$('#dsa_threshold').text("Threshold: " + dsa_threshold + "%   (" + addFigure(dsa_threshold_size) + " bytes)");
				$('#dsa_total_used').text(addFigure(dsa_total_used) + " bytes (" + dsa_total_used_ratio + "%)");
				$('#dsa_total_allocated').text(addFigure(dsa_total_allocated) + " bytes (" + dsa_total_allocated_ratio + "%)");
				$('#cdsa_used').text(addFigure(dynamicStorage.cdsa.used) + " bytes (" + cdsa_used_ratio + "%)");
				$('#cdsa_allocated').text(addFigure(dynamicStorage.cdsa.allocated) + " bytes (" + cdsa_allocated_ratio + "%)");
				$('#rdsa_used').text(addFigure(dynamicStorage.rdsa.used) + " bytes (" + rdsa_used_ratio + "%)");
				$('#rdsa_allocated').text(addFigure(dynamicStorage.rdsa.allocated) + " bytes (" + rdsa_allocated_ratio + "%)");
				$('#sdsa_used').text(addFigure(dynamicStorage.sdsa.used) + " bytes (" + sdsa_used_ratio + "%)");
				$('#sdsa_allocated').text(addFigure(dynamicStorage.sdsa.allocated) + " bytes (" + sdsa_allocated_ratio + "%)");
				$('#udsa_used').text(addFigure(dynamicStorage.udsa.used) + " bytes (" + udsa_used_ratio + "%)");
				$('#udsa_allocated').text(addFigure(dynamicStorage.udsa.allocated) + " bytes (" + udsa_allocated_ratio + "%)");
				$('#dsa_total_free').text(addFigure(dsa_total_free) + " bytes (" + dsa_total_free_ratio + "%)");
				//this.populateForm();
				
				//drawGraph1();
				
				drawDSACurrent(dynamicStorage.cdsa.used, dynamicStorage.cdsa.free,
							   dynamicStorage.rdsa.used, dynamicStorage.rdsa.free,
							   dynamicStorage.sdsa.used, dynamicStorage.sdsa.free,
							   dynamicStorage.udsa.used, dynamicStorage.udsa.free,
							   dsa_total_free, dsa_total_limit, dsa_threshold_size);
							  
				var edsa_total_limit = dynamicStorage.ecdsa.total_limit;
				var edsa_total_allocated = dynamicStorage.ecdsa.allocated +
				  						   dynamicStorage.erdsa.allocated +
				  						   dynamicStorage.esdsa.allocated +
				  						   dynamicStorage.eudsa.allocated +
				  						   dynamicStorage.etdsa.allocated;
				var edsa_total_used = dynamicStorage.ecdsa.used +
									  dynamicStorage.erdsa.used +
									  dynamicStorage.esdsa.used +
									  dynamicStorage.eudsa.used +
									  dynamicStorage.etdsa.used;
				var edsa_total_free = edsa_total_limit - edsa_total_allocated;
				var edsa_threshold_size = edsa_threshold * edsa_total_limit / 100;
				
				var edsa_total_used_ratio = Math.round(100 * edsa_total_used / edsa_total_limit);
				var edsa_total_allocated_ratio = Math.round(100 * edsa_total_allocated / edsa_total_limit);
				var edsa_total_free_ratio = Math.round(100 * edsa_total_free / edsa_total_limit);
				var ecdsa_used_ratio      = Math.round(100 * dynamicStorage.ecdsa.used / edsa_total_limit);
				var ecdsa_allocated_ratio = Math.round(100 * dynamicStorage.ecdsa.allocated / edsa_total_limit);
				var erdsa_used_ratio      = Math.round(100 * dynamicStorage.erdsa.used / edsa_total_limit);
				var erdsa_allocated_ratio = Math.round(100 * dynamicStorage.erdsa.allocated / edsa_total_limit);
				var esdsa_used_ratio      = Math.round(100 * dynamicStorage.esdsa.used / edsa_total_limit);
				var esdsa_allocated_ratio = Math.round(100 * dynamicStorage.esdsa.allocated / edsa_total_limit);
				var eudsa_used_ratio      = Math.round(100 * dynamicStorage.eudsa.used/ edsa_total_limit);
				var eudsa_allocated_ratio = Math.round(100 * dynamicStorage.eudsa.allocated / edsa_total_limit);
				var etdsa_used_ratio      = Math.round(100 * dynamicStorage.etdsa.used/ edsa_total_limit);
				var etdsa_allocated_ratio = Math.round(100 * dynamicStorage.etdsa.allocated / edsa_total_limit);
				
				
				$('#edsa_total_limit').text("EDSA Limit: "+ addFigure(edsa_total_limit) + " bytes");
				$('#edsa_threshold').text("Threshold: " + edsa_threshold + "%   (" + addFigure(edsa_threshold_size) + " bytes)");
				$('#edsa_total_used').text(addFigure(edsa_total_used) + " bytes (" + edsa_total_used_ratio + "%)");
				$('#edsa_total_allocated').text(addFigure(edsa_total_allocated) + " bytes (" + edsa_total_allocated_ratio + "%)");
				$('#ecdsa_used').text(addFigure(dynamicStorage.ecdsa.used) + " bytes (" + ecdsa_used_ratio + "%)");
				$('#ecdsa_allocated').text(addFigure(dynamicStorage.ecdsa.allocated) + " bytes (" + ecdsa_allocated_ratio + "%)");
				$('#erdsa_used').text(addFigure(dynamicStorage.erdsa.used) + " bytes (" + erdsa_used_ratio + "%)");
				$('#erdsa_allocated').text(addFigure(dynamicStorage.erdsa.allocated) + " bytes (" + erdsa_allocated_ratio + "%)");
				$('#esdsa_used').text(addFigure(dynamicStorage.esdsa.used) + " bytes (" + esdsa_used_ratio + "%)");
				$('#esdsa_allocated').text(addFigure(dynamicStorage.esdsa.allocated) + " bytes (" + esdsa_allocated_ratio + "%)");
				$('#eudsa_used').text(addFigure(dynamicStorage.eudsa.used) + " bytes (" + eudsa_used_ratio + "%)");
				$('#eudsa_allocated').text(addFigure(dynamicStorage.eudsa.allocated) + " bytes (" + eudsa_allocated_ratio + "%)");
				$('#etdsa_used').text(addFigure(dynamicStorage.eudsa.used) + " bytes (" + etdsa_used_ratio + "%)");
				$('#etdsa_allocated').text(addFigure(dynamicStorage.eudsa.allocated) + " bytes (" + etdsa_allocated_ratio + "%)");
				$('#edsa_total_free').text(addFigure(edsa_total_free) + " bytes (" + edsa_total_free_ratio + "%)");
				
				drawEDSACurrent(dynamicStorage.ecdsa.used, dynamicStorage.ecdsa.free,
								dynamicStorage.erdsa.used, dynamicStorage.erdsa.free,
								dynamicStorage.esdsa.used, dynamicStorage.esdsa.free,
								dynamicStorage.eudsa.used, dynamicStorage.eudsa.free,
								dynamicStorage.etdsa.used, dynamicStorage.etdsa.free,
								edsa_total_free, edsa_total_limit, edsa_threshold_size);
				
							
			} else {
				// プロファイル情報の取得に失敗した場合
				WL.Logger.debug(">>>Error: ", result.invocationResult);
				clearDynamicStorageField();
				
			}

		},
		onFailure : function(result) {
			//busy.hide();
			WL.Logger.debug("Profile loaded FAILURE: ", result);
			//alert("Profile loaded FAILURE: " + JSON.stringify(result));
			clearDynamicStorageField();
		}
	});
	
	WL.Logger.debug("****** end getDynamicStorage*****");
}


*/





function getDSACurrent(){
	WL.Logger.debug("****** begin getDSACurrent*****");
	WL.Logger.debug("*** selected region:" + JSON.stringify(selectedRegion));
	//var regionName = $('#Page_CurrentDynamicStorage').data('regionName0');
	var regionName = removeBlank(selectedRegion.REGIONNAME);
	var CICSplexName = removeBlank(selectedRegion.CICSPLEXNAME);
	var WUIServer = removeBlank(selectedRegion.WUISERVER);
	var sysId = removeBlank(selectedRegion.SYSID);
	var MVSSysName = removeBlank(selectedRegion.MVSSYSNAME);
	var dsa_threshold = selectedRegion.DSA_THRESHOLD;
	var edsa_threshold = selectedRegion.EDSA_THRESHOLD;
	var gdsa_threshold = selectedRegion.GDSA_THRESHOLD;
	
	if (WL.Client.getLoginName("AdapterAuthRealm") != null)	 {
		$("#DSACurrent_header_user").text(WL.Client.getLoginName("AdapterAuthRealm"));
	}
	
	WL.Logger.debug("regionName=" + regionName);
	WL.Logger.debug("CICSplexName="+ CICSplexName);
	WL.Logger.debug("WUIServer="+ WUIServer);
	
	$('#DSACurrent_header_regionName').text(regionName);
	$('#DSACurrent_header_sysId').text(sysId);
	$('#DSACurrent_header_CICSPlexName').text(CICSplexName);
	$('#DSACurrent_header_MVSSysName').text(MVSSysName);
	
	var date = new Date();
	//var iTimeStamp = date.getTime();
	var strTimeStamp = date.getFullYear() + "/"
    	         + date_format(date.getMonth()) + "/"
    	         + date_format(date.getDay()) + "-" 
    	         + date_format(date.getHours()) + ":"
    	         + date_format(date.getMinutes()) + ":"
    	         + date_format(date.getSeconds());
	$('#DSACurrent_header_refreshTime').text(strTimeStamp);
	
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
	
	var dynamicStorage = null;
	
	WL.Client.invokeProcedure(invocationData, {
		onSuccess : function(result) {
			//busy.hide();
			WL.Logger.debug("Profile loaded SUCCESS: ", result);
			if (result.invocationResult.dynamicStorage.cdsa) {
				// プロファイル情報の取得に成功した場合
				//WL.Logger.debug(">>>invocationResult.dsa:",result.invocationResult.dsa);
				dynamicStorage = result.invocationResult.dynamicStorage;
				WL.Logger.debug(">>>dynamicStorage: " , dynamicStorage);
				//WL.Logger.debug(">>>dsaData.cdsa.used: " , this.dsaData.cdsa.used);
				//this.profile.itemNum = itemNum;
				
				WL.Logger.debug(">>>update text field");
				
				var dsa_total_limit = dynamicStorage.cdsa.total_limit;
				//var dsa_total_allocated = this.dynamicStorage.cdsa.total_allocated;
				var dsa_total_allocated = dynamicStorage.cdsa.allocated +
										  dynamicStorage.rdsa.allocated +
										  dynamicStorage.sdsa.allocated +
										  dynamicStorage.udsa.allocated;
				var dsa_total_used = dynamicStorage.cdsa.used +
									 dynamicStorage.rdsa.used +
									 dynamicStorage.sdsa.used +
									 dynamicStorage.udsa.used;
				var dsa_total_free = dsa_total_limit - dsa_total_allocated;
				var dsa_threshold_size = dsa_threshold * dsa_total_limit / 100;
				
				var dsa_total_used_ratio = Math.round(100 * dsa_total_used / dsa_total_limit);
				var dsa_total_allocated_ratio = Math.round(100 * dsa_total_allocated / dsa_total_limit);
				var dsa_total_free_ratio = Math.round(100 * dsa_total_free / dsa_total_limit);
				var cdsa_used_ratio      = Math.round(100 * dynamicStorage.cdsa.used / dsa_total_limit);
				var cdsa_allocated_ratio = Math.round(100 * dynamicStorage.cdsa.allocated / dsa_total_limit);
				var rdsa_used_ratio      = Math.round(100 * dynamicStorage.rdsa.used / dsa_total_limit);
				var rdsa_allocated_ratio = Math.round(100 * dynamicStorage.rdsa.allocated / dsa_total_limit);
				var sdsa_used_ratio      = Math.round(100 * dynamicStorage.sdsa.used / dsa_total_limit);
				var sdsa_allocated_ratio = Math.round(100 * dynamicStorage.sdsa.allocated / dsa_total_limit);
				var udsa_used_ratio      = Math.round(100 * dynamicStorage.udsa.used/ dsa_total_limit);
				var udsa_allocated_ratio = Math.round(100 * dynamicStorage.udsa.allocated / dsa_total_limit);
				
				$('#dsa_total_limit').text("DSA Limit: "+ addFigure(dsa_total_limit) + " bytes");
				$('#dsa_threshold').text("Threshold: " + dsa_threshold + "%   (" + addFigure(dsa_threshold_size) + " bytes)");
				$('#dsa_total_used').text(addFigure(dsa_total_used) + " bytes (" + dsa_total_used_ratio + "%)");
				$('#dsa_total_allocated').text(addFigure(dsa_total_allocated) + " bytes (" + dsa_total_allocated_ratio + "%)");
				$('#cdsa_used').text(addFigure(dynamicStorage.cdsa.used) + " bytes (" + cdsa_used_ratio + "%)");
				$('#cdsa_allocated').text(addFigure(dynamicStorage.cdsa.allocated) + " bytes (" + cdsa_allocated_ratio + "%)");
				$('#rdsa_used').text(addFigure(dynamicStorage.rdsa.used) + " bytes (" + rdsa_used_ratio + "%)");
				$('#rdsa_allocated').text(addFigure(dynamicStorage.rdsa.allocated) + " bytes (" + rdsa_allocated_ratio + "%)");
				$('#sdsa_used').text(addFigure(dynamicStorage.sdsa.used) + " bytes (" + sdsa_used_ratio + "%)");
				$('#sdsa_allocated').text(addFigure(dynamicStorage.sdsa.allocated) + " bytes (" + sdsa_allocated_ratio + "%)");
				$('#udsa_used').text(addFigure(dynamicStorage.udsa.used) + " bytes (" + udsa_used_ratio + "%)");
				$('#udsa_allocated').text(addFigure(dynamicStorage.udsa.allocated) + " bytes (" + udsa_allocated_ratio + "%)");
				$('#dsa_total_free').text(addFigure(dsa_total_free) + " bytes (" + dsa_total_free_ratio + "%)");
	
			
				drawDSACurrent(dynamicStorage.cdsa.used, dynamicStorage.cdsa.free,
							   dynamicStorage.rdsa.used, dynamicStorage.rdsa.free,
							   dynamicStorage.sdsa.used, dynamicStorage.sdsa.free,
							   dynamicStorage.udsa.used, dynamicStorage.udsa.free,
							   dsa_total_free, dsa_total_limit, dsa_threshold_size);
							  
/*				var edsa_total_limit = dynamicStorage.ecdsa.total_limit;
				var edsa_total_allocated = dynamicStorage.ecdsa.allocated +
				  						   dynamicStorage.erdsa.allocated +
				  						   dynamicStorage.esdsa.allocated +
				  						   dynamicStorage.eudsa.allocated +
				  						   dynamicStorage.etdsa.allocated;
				var edsa_total_used = dynamicStorage.ecdsa.used +
									  dynamicStorage.erdsa.used +
									  dynamicStorage.esdsa.used +
									  dynamicStorage.eudsa.used +
									  dynamicStorage.etdsa.used;
				var edsa_total_free = edsa_total_limit - edsa_total_allocated;
				var edsa_threshold_size = edsa_threshold * edsa_total_limit / 100;
				
				var edsa_total_used_ratio = Math.round(100 * edsa_total_used / edsa_total_limit);
				var edsa_total_allocated_ratio = Math.round(100 * edsa_total_allocated / edsa_total_limit);
				var edsa_total_free_ratio = Math.round(100 * edsa_total_free / edsa_total_limit);
				var ecdsa_used_ratio      = Math.round(100 * dynamicStorage.ecdsa.used / edsa_total_limit);
				var ecdsa_allocated_ratio = Math.round(100 * dynamicStorage.ecdsa.allocated / edsa_total_limit);
				var erdsa_used_ratio      = Math.round(100 * dynamicStorage.erdsa.used / edsa_total_limit);
				var erdsa_allocated_ratio = Math.round(100 * dynamicStorage.erdsa.allocated / edsa_total_limit);
				var esdsa_used_ratio      = Math.round(100 * dynamicStorage.esdsa.used / edsa_total_limit);
				var esdsa_allocated_ratio = Math.round(100 * dynamicStorage.esdsa.allocated / edsa_total_limit);
				var eudsa_used_ratio      = Math.round(100 * dynamicStorage.eudsa.used/ edsa_total_limit);
				var eudsa_allocated_ratio = Math.round(100 * dynamicStorage.eudsa.allocated / edsa_total_limit);
				var etdsa_used_ratio      = Math.round(100 * dynamicStorage.etdsa.used/ edsa_total_limit);
				var etdsa_allocated_ratio = Math.round(100 * dynamicStorage.etdsa.allocated / edsa_total_limit);
				
				
				$('#edsa_total_limit').text("EDSA Limit: "+ addFigure(edsa_total_limit) + " bytes");
				$('#edsa_threshold').text("Threshold: " + edsa_threshold + "%   (" + addFigure(edsa_threshold_size) + " bytes)");
				$('#edsa_total_used').text(addFigure(edsa_total_used) + " bytes (" + edsa_total_used_ratio + "%)");
				$('#edsa_total_allocated').text(addFigure(edsa_total_allocated) + " bytes (" + edsa_total_allocated_ratio + "%)");
				$('#ecdsa_used').text(addFigure(dynamicStorage.ecdsa.used) + " bytes (" + ecdsa_used_ratio + "%)");
				$('#ecdsa_allocated').text(addFigure(dynamicStorage.ecdsa.allocated) + " bytes (" + ecdsa_allocated_ratio + "%)");
				$('#erdsa_used').text(addFigure(dynamicStorage.erdsa.used) + " bytes (" + erdsa_used_ratio + "%)");
				$('#erdsa_allocated').text(addFigure(dynamicStorage.erdsa.allocated) + " bytes (" + erdsa_allocated_ratio + "%)");
				$('#esdsa_used').text(addFigure(dynamicStorage.esdsa.used) + " bytes (" + esdsa_used_ratio + "%)");
				$('#esdsa_allocated').text(addFigure(dynamicStorage.esdsa.allocated) + " bytes (" + esdsa_allocated_ratio + "%)");
				$('#eudsa_used').text(addFigure(dynamicStorage.eudsa.used) + " bytes (" + eudsa_used_ratio + "%)");
				$('#eudsa_allocated').text(addFigure(dynamicStorage.eudsa.allocated) + " bytes (" + eudsa_allocated_ratio + "%)");
				$('#etdsa_used').text(addFigure(dynamicStorage.eudsa.used) + " bytes (" + etdsa_used_ratio + "%)");
				$('#etdsa_allocated').text(addFigure(dynamicStorage.eudsa.allocated) + " bytes (" + etdsa_allocated_ratio + "%)");
				$('#edsa_total_free').text(addFigure(edsa_total_free) + " bytes (" + edsa_total_free_ratio + "%)");
				
				drawEDSACurrent(dynamicStorage.ecdsa.used, dynamicStorage.ecdsa.free,
								dynamicStorage.erdsa.used, dynamicStorage.erdsa.free,
								dynamicStorage.esdsa.used, dynamicStorage.esdsa.free,
								dynamicStorage.eudsa.used, dynamicStorage.eudsa.free,
								dynamicStorage.etdsa.used, dynamicStorage.etdsa.free,
								edsa_total_free, edsa_total_limit, edsa_threshold_size);*/
				
							
			} else {
				// プロファイル情報の取得に失敗した場合
				WL.Logger.debug(">>>Error: ", result.invocationResult);
				clearDSACurrentField();
				
			}

		},
		onFailure : function(result) {
			//busy.hide();
			WL.Logger.debug("Profile loaded FAILURE: ", result);
			//alert("Profile loaded FAILURE: " + JSON.stringify(result));
			clearDSACurrentField();
		}
	});
	
	WL.Logger.debug("****** end getDynamicStorage*****");
}


function getEDSACurrent(){
	WL.Logger.debug("****** begin getEDSACurrent*****");
	WL.Logger.debug("*** selected region:" + JSON.stringify(selectedRegion));
	//var regionName = $('#Page_CurrentDynamicStorage').data('regionName0');
	var regionName = removeBlank(selectedRegion.REGIONNAME);
	var CICSplexName = removeBlank(selectedRegion.CICSPLEXNAME);
	var WUIServer = removeBlank(selectedRegion.WUISERVER);
	var sysId = removeBlank(selectedRegion.SYSID);
	var MVSSysName = removeBlank(selectedRegion.MVSSYSNAME);
	var dsa_threshold = selectedRegion.DSA_THRESHOLD;
	var edsa_threshold = selectedRegion.EDSA_THRESHOLD;
	var gdsa_threshold = selectedRegion.GDSA_THRESHOLD;
	
	if (WL.Client.getLoginName("AdapterAuthRealm") != null)	 {
		$("#EDSACurrent_header_user").text(WL.Client.getLoginName("AdapterAuthRealm"));
	}
	
	WL.Logger.debug("regionName=" + regionName);
	WL.Logger.debug("CICSplexName="+ CICSplexName);
	WL.Logger.debug("WUIServer="+ WUIServer);
	
	$('#EDSACurrent_header_regionName').text(regionName);
	$('#EDSACurrent_header_sysId').text(sysId);
	$('#EDSACurrent_header_CICSPlexName').text(CICSplexName);
	$('#EDSACurrent_header_MVSSysName').text(MVSSysName);
	
	var date = new Date();
	//var iTimeStamp = date.getTime();
	var strTimeStamp = date.getFullYear() + "/"
    	         + date_format(date.getMonth()) + "/"
    	         + date_format(date.getDay()) + "-" 
    	         + date_format(date.getHours()) + ":"
    	         + date_format(date.getMinutes()) + ":"
    	         + date_format(date.getSeconds());
	$('#EDSACurrent_header_refreshTime').text(strTimeStamp);
	
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
	
	var dynamicStorage = null;
	
	WL.Client.invokeProcedure(invocationData, {
		onSuccess : function(result) {
			//busy.hide();
			WL.Logger.debug("Profile loaded SUCCESS: ", result);
			if (result.invocationResult.dynamicStorage.cdsa) {
				// プロファイル情報の取得に成功した場合
				//WL.Logger.debug(">>>invocationResult.dsa:",result.invocationResult.dsa);
				dynamicStorage = result.invocationResult.dynamicStorage;
				WL.Logger.debug(">>>dynamicStorage: " , dynamicStorage);
				//WL.Logger.debug(">>>dsaData.cdsa.used: " , this.dsaData.cdsa.used);
				//this.profile.itemNum = itemNum;
				
				WL.Logger.debug(">>>update text field");
/*				
				var dsa_total_limit = dynamicStorage.cdsa.total_limit;
				//var dsa_total_allocated = this.dynamicStorage.cdsa.total_allocated;
				var dsa_total_allocated = dynamicStorage.cdsa.allocated +
										  dynamicStorage.rdsa.allocated +
										  dynamicStorage.sdsa.allocated +
										  dynamicStorage.udsa.allocated;
				var dsa_total_used = dynamicStorage.cdsa.used +
									 dynamicStorage.rdsa.used +
									 dynamicStorage.sdsa.used +
									 dynamicStorage.udsa.used;
				var dsa_total_free = dsa_total_limit - dsa_total_allocated;
				var dsa_threshold_size = dsa_threshold * dsa_total_limit / 100;
				
				var dsa_total_used_ratio = Math.round(100 * dsa_total_used / dsa_total_limit);
				var dsa_total_allocated_ratio = Math.round(100 * dsa_total_allocated / dsa_total_limit);
				var dsa_total_free_ratio = Math.round(100 * dsa_total_free / dsa_total_limit);
				var cdsa_used_ratio      = Math.round(100 * dynamicStorage.cdsa.used / dsa_total_limit);
				var cdsa_allocated_ratio = Math.round(100 * dynamicStorage.cdsa.allocated / dsa_total_limit);
				var rdsa_used_ratio      = Math.round(100 * dynamicStorage.rdsa.used / dsa_total_limit);
				var rdsa_allocated_ratio = Math.round(100 * dynamicStorage.rdsa.allocated / dsa_total_limit);
				var sdsa_used_ratio      = Math.round(100 * dynamicStorage.sdsa.used / dsa_total_limit);
				var sdsa_allocated_ratio = Math.round(100 * dynamicStorage.sdsa.allocated / dsa_total_limit);
				var udsa_used_ratio      = Math.round(100 * dynamicStorage.udsa.used/ dsa_total_limit);
				var udsa_allocated_ratio = Math.round(100 * dynamicStorage.udsa.allocated / dsa_total_limit);
				
				$('#dsa_total_limit').text("DSA Limit: "+ addFigure(dsa_total_limit) + " bytes");
				$('#dsa_threshold').text("Threshold: " + dsa_threshold + "%   (" + addFigure(dsa_threshold_size) + " bytes)");
				$('#dsa_total_used').text(addFigure(dsa_total_used) + " bytes (" + dsa_total_used_ratio + "%)");
				$('#dsa_total_allocated').text(addFigure(dsa_total_allocated) + " bytes (" + dsa_total_allocated_ratio + "%)");
				$('#cdsa_used').text(addFigure(dynamicStorage.cdsa.used) + " bytes (" + cdsa_used_ratio + "%)");
				$('#cdsa_allocated').text(addFigure(dynamicStorage.cdsa.allocated) + " bytes (" + cdsa_allocated_ratio + "%)");
				$('#rdsa_used').text(addFigure(dynamicStorage.rdsa.used) + " bytes (" + rdsa_used_ratio + "%)");
				$('#rdsa_allocated').text(addFigure(dynamicStorage.rdsa.allocated) + " bytes (" + rdsa_allocated_ratio + "%)");
				$('#sdsa_used').text(addFigure(dynamicStorage.sdsa.used) + " bytes (" + sdsa_used_ratio + "%)");
				$('#sdsa_allocated').text(addFigure(dynamicStorage.sdsa.allocated) + " bytes (" + sdsa_allocated_ratio + "%)");
				$('#udsa_used').text(addFigure(dynamicStorage.udsa.used) + " bytes (" + udsa_used_ratio + "%)");
				$('#udsa_allocated').text(addFigure(dynamicStorage.udsa.allocated) + " bytes (" + udsa_allocated_ratio + "%)");
				$('#dsa_total_free').text(addFigure(dsa_total_free) + " bytes (" + dsa_total_free_ratio + "%)");
	
			
				drawDSACurrent(dynamicStorage.cdsa.used, dynamicStorage.cdsa.free,
							   dynamicStorage.rdsa.used, dynamicStorage.rdsa.free,
							   dynamicStorage.sdsa.used, dynamicStorage.sdsa.free,
							   dynamicStorage.udsa.used, dynamicStorage.udsa.free,
							   dsa_total_free, dsa_total_limit, dsa_threshold_size);
							  */
				var edsa_total_limit = dynamicStorage.ecdsa.total_limit;
				var edsa_total_allocated = dynamicStorage.ecdsa.allocated +
				  						   dynamicStorage.erdsa.allocated +
				  						   dynamicStorage.esdsa.allocated +
				  						   dynamicStorage.eudsa.allocated +
				  						   dynamicStorage.etdsa.allocated;
				var edsa_total_used = dynamicStorage.ecdsa.used +
									  dynamicStorage.erdsa.used +
									  dynamicStorage.esdsa.used +
									  dynamicStorage.eudsa.used +
									  dynamicStorage.etdsa.used;
				var edsa_total_free = edsa_total_limit - edsa_total_allocated;
				var edsa_threshold_size = edsa_threshold * edsa_total_limit / 100;
				
				var edsa_total_used_ratio = Math.round(100 * edsa_total_used / edsa_total_limit);
				var edsa_total_allocated_ratio = Math.round(100 * edsa_total_allocated / edsa_total_limit);
				var edsa_total_free_ratio = Math.round(100 * edsa_total_free / edsa_total_limit);
				var ecdsa_used_ratio      = Math.round(100 * dynamicStorage.ecdsa.used / edsa_total_limit);
				var ecdsa_allocated_ratio = Math.round(100 * dynamicStorage.ecdsa.allocated / edsa_total_limit);
				var erdsa_used_ratio      = Math.round(100 * dynamicStorage.erdsa.used / edsa_total_limit);
				var erdsa_allocated_ratio = Math.round(100 * dynamicStorage.erdsa.allocated / edsa_total_limit);
				var esdsa_used_ratio      = Math.round(100 * dynamicStorage.esdsa.used / edsa_total_limit);
				var esdsa_allocated_ratio = Math.round(100 * dynamicStorage.esdsa.allocated / edsa_total_limit);
				var eudsa_used_ratio      = Math.round(100 * dynamicStorage.eudsa.used/ edsa_total_limit);
				var eudsa_allocated_ratio = Math.round(100 * dynamicStorage.eudsa.allocated / edsa_total_limit);
				var etdsa_used_ratio      = Math.round(100 * dynamicStorage.etdsa.used/ edsa_total_limit);
				var etdsa_allocated_ratio = Math.round(100 * dynamicStorage.etdsa.allocated / edsa_total_limit);
				
				
				$('#edsa_total_limit').text("EDSA Limit: "+ addFigure(edsa_total_limit) + " bytes");
				$('#edsa_threshold').text("Threshold: " + edsa_threshold + "%   (" + addFigure(edsa_threshold_size) + " bytes)");
				$('#edsa_total_used').text(addFigure(edsa_total_used) + " bytes (" + edsa_total_used_ratio + "%)");
				$('#edsa_total_allocated').text(addFigure(edsa_total_allocated) + " bytes (" + edsa_total_allocated_ratio + "%)");
				$('#ecdsa_used').text(addFigure(dynamicStorage.ecdsa.used) + " bytes (" + ecdsa_used_ratio + "%)");
				$('#ecdsa_allocated').text(addFigure(dynamicStorage.ecdsa.allocated) + " bytes (" + ecdsa_allocated_ratio + "%)");
				$('#erdsa_used').text(addFigure(dynamicStorage.erdsa.used) + " bytes (" + erdsa_used_ratio + "%)");
				$('#erdsa_allocated').text(addFigure(dynamicStorage.erdsa.allocated) + " bytes (" + erdsa_allocated_ratio + "%)");
				$('#esdsa_used').text(addFigure(dynamicStorage.esdsa.used) + " bytes (" + esdsa_used_ratio + "%)");
				$('#esdsa_allocated').text(addFigure(dynamicStorage.esdsa.allocated) + " bytes (" + esdsa_allocated_ratio + "%)");
				$('#eudsa_used').text(addFigure(dynamicStorage.eudsa.used) + " bytes (" + eudsa_used_ratio + "%)");
				$('#eudsa_allocated').text(addFigure(dynamicStorage.eudsa.allocated) + " bytes (" + eudsa_allocated_ratio + "%)");
				$('#etdsa_used').text(addFigure(dynamicStorage.etdsa.used) + " bytes (" + etdsa_used_ratio + "%)");
				$('#etdsa_allocated').text(addFigure(dynamicStorage.etdsa.allocated) + " bytes (" + etdsa_allocated_ratio + "%)");
				$('#edsa_total_free').text(addFigure(edsa_total_free) + " bytes (" + edsa_total_free_ratio + "%)");
				
				drawEDSACurrent(dynamicStorage.ecdsa.used, dynamicStorage.ecdsa.free,
								dynamicStorage.erdsa.used, dynamicStorage.erdsa.free,
								dynamicStorage.esdsa.used, dynamicStorage.esdsa.free,
								dynamicStorage.eudsa.used, dynamicStorage.eudsa.free,
								dynamicStorage.etdsa.used, dynamicStorage.etdsa.free,
								edsa_total_free, edsa_total_limit, edsa_threshold_size);
				
							
			} else {
				// プロファイル情報の取得に失敗した場合
				WL.Logger.debug(">>>Error: ", result.invocationResult);
				clearEDSACurrentField();
				
			}

		},
		onFailure : function(result) {
			//busy.hide();
			WL.Logger.debug("Profile loaded FAILURE: ", result);
			//alert("Profile loaded FAILURE: " + JSON.stringify(result));
			clearEDSACurrentField();
		}
	});
	
	WL.Logger.debug("****** end getDynamicStorage*****");
}




function getDSAHistory(){
	WL.Logger.debug("****** begin getDSAHistory*****");
	WL.Logger.debug("*** selected region:" + JSON.stringify(selectedRegion));
	var regionName = removeBlank(selectedRegion.REGIONNAME);
	var CICSplexName = removeBlank(selectedRegion.CICSPLEXNAME);
	var WUIServer = removeBlank(selectedRegion.WUISERVER);
	var sysId = removeBlank(selectedRegion.SYSID);
	var MVSSysName = removeBlank(selectedRegion.MVSSYSNAME);
	var dsa_threshold = selectedRegion.DSA_THRESHOLD;
	var edsa_threshold = selectedRegion.EDSA_THRESHOLD;
	var gdsa_threshold = selectedRegion.GDSA_THRESHOLD;
	
	if (WL.Client.getLoginName("AdapterAuthRealm") != null)	 {
		$("#DSAHistory_header_user").text(WL.Client.getLoginName("AdapterAuthRealm"));
	}
	
	WL.Logger.debug("regionName=" + regionName);
	WL.Logger.debug("CICSplexName="+ CICSplexName);
	WL.Logger.debug("WUIServer="+ WUIServer);
	
	$('#DSAHistory_header_regionName').text(regionName);
	$('#DSAHistory_header_sysId').text(sysId);
	$('#DSAHistory_header_CICSPlexName').text(CICSplexName);
	$('#DSAHistory_header_MVSSysName').text(MVSSysName);
	
	var date = new Date();
	//var iTimeStamp = date.getTime();
	var strTimeStamp = date.getFullYear() + "/"
    	         + date_format(date.getMonth()) + "/"
    	         + date_format(date.getDay()) + "-" 
    	         + date_format(date.getHours()) + ":"
    	         + date_format(date.getMinutes()) + ":"
    	         + date_format(date.getSeconds());
	$('#DSAHistory_header_refreshTime').text(strTimeStamp);	
	
	var SQLadapterName = 'SQL_DB01';
	var SQLprocedureName = 'getDSAHistory';
	//var SQLprocedureName = 'getDSAHistory2';
	var SQLparameter = [regionName, WUIServer, CICSplexName];
	
		
	var invocationData = {
			adapter : SQLadapterName,
			procedure : SQLprocedureName,
			parameters : SQLparameter
		};
	
	WL.Client.invokeProcedure(invocationData, {
		onSuccess : function(result) {
			WL.Logger.debug("*** onSuccess");
			WL.Logger.debug("result:", result);
			var dsaData = result.invocationResult.result;
			drawDSAHistory(dsaData.dsa_limit, dsaData.dsa_threshold,
						   dsaData.cdsa_used, dsaData.cdsa_free,
						   dsaData.rdsa_used, dsaData.rdsa_free,
						   dsaData.sdsa_used, dsaData.sdsa_free,
						   dsaData.udsa_used, dsaData.udsa_free
						   );
			
		},
		onFailure : function(result) {
			WL.Logger.debug("*** onFailure");
			WL.Logger.debug("result:", result);
		}
	});
}




