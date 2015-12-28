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

function displayDSACurrentField(){
	WL.Logger.debug("*** begin displayDSACurrentField ***");
	
	//$('#Tab_DSACurrent').removeClass('ui-btn-active ui-state-persist');
	$('#Tab_EDSACurrent').removeClass('ui-btn-active');
	$('#Tab_GDSACurrent').removeClass('ui-btn-active');
	$('#Tab_DSACurrent').addClass('ui-btn-active');
	
	activeStorageTab = 'DSA';

	$('.tabContents').hide();
	//$('#TabContents_DSACurrent').fadeIn();
	$('#TabContents_DSACurrent').show();
	//$('#Tab_DSACurrent').addClass('ui-btn-active ui-state-persist');

	
	if (isLoadStorageCurrentSuccess) {
		var dsa_threshold = selectedRegion.DSA_THRESHOLD;
	
		var dsa_total_limit = storageCurrent.cdsa.total_limit;
		//var dsa_total_allocated = this.storageCurrent.cdsa.total_allocated;
		var dsa_total_allocated = storageCurrent.cdsa.allocated +
								  storageCurrent.rdsa.allocated +
								  storageCurrent.sdsa.allocated +
								  storageCurrent.udsa.allocated;
		var dsa_total_used = storageCurrent.cdsa.used +
							 storageCurrent.rdsa.used +
							 storageCurrent.sdsa.used +
							 storageCurrent.udsa.used;
		var dsa_total_free = dsa_total_limit - dsa_total_allocated;
		var dsa_threshold_size = dsa_threshold * dsa_total_limit / 100;
		
		var dsa_total_used_ratio = Math.round(100 * dsa_total_used / dsa_total_limit);
		var dsa_total_allocated_ratio = Math.round(100 * dsa_total_allocated / dsa_total_limit);
		var dsa_total_free_ratio = Math.round(100 * dsa_total_free / dsa_total_limit);
		var cdsa_used_ratio      = Math.round(100 * storageCurrent.cdsa.used / dsa_total_limit);
		var cdsa_allocated_ratio = Math.round(100 * storageCurrent.cdsa.allocated / dsa_total_limit);
		var rdsa_used_ratio      = Math.round(100 * storageCurrent.rdsa.used / dsa_total_limit);
		var rdsa_allocated_ratio = Math.round(100 * storageCurrent.rdsa.allocated / dsa_total_limit);
		var sdsa_used_ratio      = Math.round(100 * storageCurrent.sdsa.used / dsa_total_limit);
		var sdsa_allocated_ratio = Math.round(100 * storageCurrent.sdsa.allocated / dsa_total_limit);
		var udsa_used_ratio      = Math.round(100 * storageCurrent.udsa.used/ dsa_total_limit);
		var udsa_allocated_ratio = Math.round(100 * storageCurrent.udsa.allocated / dsa_total_limit);
		
		var is_dsa_sos = false;
		if (storageCurrent.sosbelowline == "SOS"){
			is_dsa_sos = true;
		}
		
		var dsa_total_limit_contents = "<a href='#Page_ChangeDSALimit'>";
		if (is_dsa_sos) {
			dsa_total_limit_contents = dsa_total_limit_contents + "<img src='images/status_red.png' width='15' height='15'/>";
		} else if (dsa_threshold_size < dsa_total_allocated) {
			dsa_total_limit_contents = dsa_total_limit_contents + "<img src='images/status_yellow.png' width='15' height='15'/>";
		} else {
			dsa_total_limit_contents = dsa_total_limit_contents + "<img src='images/status_green.png' width='15' height='15'/>";
		}
		dsa_total_limit_contents = dsa_total_limit_contents + "DSA Limit: "+ addFigure(dsa_total_limit) + " bytes / " + addFigure(dsa_total_limit/1024) + " KB" + "</a>";
		$('#dsa_total_limit').html(dsa_total_limit_contents);
		
		$('#dsa_threshold').text("Threshold: " + dsa_threshold + "%   (" + addFigure(dsa_threshold_size) + " bytes / " + addFigure(dsa_threshold_size/1024) + " KB"+ ")");
		$('#dsa_total_used').text(addFigure(dsa_total_used) + " bytes (" + dsa_total_used_ratio + "%)");
		$('#dsa_total_allocated').text(addFigure(dsa_total_allocated) + " bytes (" + dsa_total_allocated_ratio + "%)");
		$('#cdsa_used').text(addFigure(storageCurrent.cdsa.used) + " bytes (" + cdsa_used_ratio + "%)");
		$('#cdsa_allocated').text(addFigure(storageCurrent.cdsa.allocated) + " bytes (" + cdsa_allocated_ratio + "%)");
		$('#rdsa_used').text(addFigure(storageCurrent.rdsa.used) + " bytes (" + rdsa_used_ratio + "%)");
		$('#rdsa_allocated').text(addFigure(storageCurrent.rdsa.allocated) + " bytes (" + rdsa_allocated_ratio + "%)");
		$('#sdsa_used').text(addFigure(storageCurrent.sdsa.used) + " bytes (" + sdsa_used_ratio + "%)");
		$('#sdsa_allocated').text(addFigure(storageCurrent.sdsa.allocated) + " bytes (" + sdsa_allocated_ratio + "%)");
		$('#udsa_used').text(addFigure(storageCurrent.udsa.used) + " bytes (" + udsa_used_ratio + "%)");
		$('#udsa_allocated').text(addFigure(storageCurrent.udsa.allocated) + " bytes (" + udsa_allocated_ratio + "%)");
		$('#dsa_total_free').text(addFigure(dsa_total_free) + " bytes (" + dsa_total_free_ratio + "%)");
		
		drawDSACurrent(storageCurrent.cdsa.used, storageCurrent.cdsa.free,
					   storageCurrent.rdsa.used, storageCurrent.rdsa.free,
					   storageCurrent.sdsa.used, storageCurrent.sdsa.free,
					   storageCurrent.udsa.used, storageCurrent.udsa.free,
					   dsa_total_free, dsa_total_limit, dsa_threshold_size);
					   
	} else {
		clearDSACurrentField();
	}
	

	WL.Logger.debug("*** end displayDSACurrentField ***");
}

/*
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
	
	WL.Logger.debug("****** end getDSACurrent*****");
}

*/

