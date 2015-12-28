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

function displayEDSACurrentField(){

	//$('#Tab_StorageCurrent li a').removeClass('ui-btn-active ui-state-persist');
	$('#Tab_DSACurrent').removeClass('ui-btn-active');
	//$('#Tab_EDSACurrent').removeClass('ui-btn-active ui-state-persist');
	$('#Tab_GDSACurrent').removeClass('ui-btn-active');
	$('#Tab_EDSACurrent').addClass('ui-btn-active');
	
	activeStorageTab = 'EDSA';
	
	$('.tabContents').hide();
	//$('#TabContents_EDSACurrent').fadeIn();
	$('#TabContents_EDSACurrent').show();
	
	if (isLoadStorageCurrentSuccess) {
		var edsa_threshold = selectedRegion.EDSA_THRESHOLD;
		
		var edsa_total_limit = storageCurrent.ecdsa.total_limit;
		var edsa_total_allocated = storageCurrent.ecdsa.allocated +
		  						   storageCurrent.erdsa.allocated +
		  						   storageCurrent.esdsa.allocated +
		  						   storageCurrent.eudsa.allocated +
		  						   storageCurrent.etdsa.allocated;
		var edsa_total_used = storageCurrent.ecdsa.used +
							  storageCurrent.erdsa.used +
							  storageCurrent.esdsa.used +
							  storageCurrent.eudsa.used +
							  storageCurrent.etdsa.used;
		var edsa_total_free = edsa_total_limit - edsa_total_allocated;
		var edsa_threshold_size = edsa_threshold * edsa_total_limit / 100;
		
		var edsa_total_used_ratio = Math.round(100 * edsa_total_used / edsa_total_limit);
		var edsa_total_allocated_ratio = Math.round(100 * edsa_total_allocated / edsa_total_limit);
		var edsa_total_free_ratio = Math.round(100 * edsa_total_free / edsa_total_limit);
		var ecdsa_used_ratio      = Math.round(100 * storageCurrent.ecdsa.used / edsa_total_limit);
		var ecdsa_allocated_ratio = Math.round(100 * storageCurrent.ecdsa.allocated / edsa_total_limit);
		var erdsa_used_ratio      = Math.round(100 * storageCurrent.erdsa.used / edsa_total_limit);
		var erdsa_allocated_ratio = Math.round(100 * storageCurrent.erdsa.allocated / edsa_total_limit);
		var esdsa_used_ratio      = Math.round(100 * storageCurrent.esdsa.used / edsa_total_limit);
		var esdsa_allocated_ratio = Math.round(100 * storageCurrent.esdsa.allocated / edsa_total_limit);
		var eudsa_used_ratio      = Math.round(100 * storageCurrent.eudsa.used/ edsa_total_limit);
		var eudsa_allocated_ratio = Math.round(100 * storageCurrent.eudsa.allocated / edsa_total_limit);
		var etdsa_used_ratio      = Math.round(100 * storageCurrent.etdsa.used/ edsa_total_limit);
		var etdsa_allocated_ratio = Math.round(100 * storageCurrent.etdsa.allocated / edsa_total_limit);
		
		var is_edsa_sos = false;
		if (storageCurrent.sosaboveline == "SOS"){
			is_edsa_sos = true;
		}
		
		var edsa_total_limit_contents = "<a href='#Page_ChangeEDSALimit'>";
		if (is_edsa_sos) {
			edsa_total_limit_contents = edsa_total_limit_contents + "<img src='images/status_red.png' width='15' height='15'/>";
		} else if (edsa_threshold_size < edsa_total_allocated) {
			edsa_total_limit_contents = edsa_total_limit_contents + "<img src='images/status_yellow.png' width='15' height='15'/>";
		} else {
			edsa_total_limit_contents = edsa_total_limit_contents + "<img src='images/status_green.png' width='15' height='15'/>";
		}
		edsa_total_limit_contents = edsa_total_limit_contents + "EDSA Limit: "+ addFigure(edsa_total_limit) + " bytes / " + addFigure(edsa_total_limit/1024/1024) + " MB";
		edsa_total_limit_contents = edsa_total_limit_contents + "</a>";
		$('#edsa_total_limit').html(edsa_total_limit_contents);
		
		//$('#edsa_total_limit').text("EDSA Limit: "+ addFigure(edsa_total_limit) + " bytes");
		$('#edsa_threshold').text("Threshold: " + edsa_threshold + "%   (" + addFigure(edsa_threshold_size) + " bytes / " + addFigure(edsa_threshold_size/1024/1024) + " MB"+ ")");
		$('#edsa_total_used').text(addFigure(edsa_total_used) + " bytes (" + edsa_total_used_ratio + "%)");
		$('#edsa_total_allocated').text(addFigure(edsa_total_allocated) + " bytes (" + edsa_total_allocated_ratio + "%)");
		$('#ecdsa_used').text(addFigure(storageCurrent.ecdsa.used) + " bytes (" + ecdsa_used_ratio + "%)");
		$('#ecdsa_allocated').text(addFigure(storageCurrent.ecdsa.allocated) + " bytes (" + ecdsa_allocated_ratio + "%)");
		$('#erdsa_used').text(addFigure(storageCurrent.erdsa.used) + " bytes (" + erdsa_used_ratio + "%)");
		$('#erdsa_allocated').text(addFigure(storageCurrent.erdsa.allocated) + " bytes (" + erdsa_allocated_ratio + "%)");
		$('#esdsa_used').text(addFigure(storageCurrent.esdsa.used) + " bytes (" + esdsa_used_ratio + "%)");
		$('#esdsa_allocated').text(addFigure(storageCurrent.esdsa.allocated) + " bytes (" + esdsa_allocated_ratio + "%)");
		$('#eudsa_used').text(addFigure(storageCurrent.eudsa.used) + " bytes (" + eudsa_used_ratio + "%)");
		$('#eudsa_allocated').text(addFigure(storageCurrent.eudsa.allocated) + " bytes (" + eudsa_allocated_ratio + "%)");
		$('#etdsa_used').text(addFigure(storageCurrent.etdsa.used) + " bytes (" + etdsa_used_ratio + "%)");
		$('#etdsa_allocated').text(addFigure(storageCurrent.etdsa.allocated) + " bytes (" + etdsa_allocated_ratio + "%)");
		$('#edsa_total_free').text(addFigure(edsa_total_free) + " bytes (" + edsa_total_free_ratio + "%)");
		
		drawEDSACurrent(storageCurrent.ecdsa.used, storageCurrent.ecdsa.free,
						storageCurrent.erdsa.used, storageCurrent.erdsa.free,
						storageCurrent.esdsa.used, storageCurrent.esdsa.free,
						storageCurrent.eudsa.used, storageCurrent.eudsa.free,
						storageCurrent.etdsa.used, storageCurrent.etdsa.free,
						edsa_total_free, edsa_total_limit, edsa_threshold_size);	
						
	}else{
		clearEDSACurrentField();
	}
}

/*
function getEDSACurrent(){
	WL.Logger.debug("****** begin getEDSACurrent*****");
	WL.Logger.debug("*** selected region:" + JSON.stringify(selectedRegion));
	//var regionName = $('#Page_CurrentDynamicStorage').data('regionName0');
	var regionName = removeBlank(selectedRegion.REGIONNAME);
	var CICSplexName = removeBlank(selectedRegion.CICSPLEXNAME);
	var WUIServer = removeBlank(selectedRegion.WUISERVER);
	var sysId = removeBlank(selectedRegion.SYSID);
	var MVSSysName = removeBlank(selectedRegion.MVSSYSNAME);
	var edsa_threshold = selectedRegion.EDSA_THRESHOLD;
	
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
				displayEDSACurrentField();				
							
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

*/

