function drawGDSACurrent(gcdsa_used,gcdsa_free,
						gsdsa_used,gsdsa_free,
						gudsa_used,gudsa_free,
						gdsa_total_free, gdsa_total_limit,
						gdsa_threshold){
	$("#graphGDSACurrent").empty();
	WL.Logger.debug("****** begin drawGDSACurrent*****");
	var container = document.getElementById("graphGDSACurrent");
    var	gcdsa_used_data = [[gcdsa_used, 0]],
        gcdsa_free_data = [[gcdsa_free, 0]],
    	gsdsa_used_data = [[gsdsa_used, 0]],
        gsdsa_free_data = [[gsdsa_free, 0]],
    	gudsa_used_data = [[gudsa_used, 0]],
        gudsa_free_data = [[gudsa_free, 0]],
        gdsa_total_free_data = [[gdsa_total_free, 0]];

    var gdsa_threshold_data = [[gdsa_threshold, -1], [gdsa_threshold, 1]];
    
    WL.Logger.debug(">>> gdsa_threshold: " + gdsa_threshold);
    WL.Logger.debug(">>> gdsa_total_free: " + gdsa_total_free);
    WL.Logger.debug(">>> gdsa_total_limit: " + gdsa_total_limit);
    if (gdsa_total_limit <= 0){
    	gdsa_total_limit = gcdsa_used + gcdsa_free + gsdsa_used + gsdsa_free + gudsa_used + gudsa_free;
    }
    
    var default_show = true,
    	default_stacked = true,
    	default_horizontal = true,
    	default_barWidth = 1.5,
    	default_lineWidth = 1,
    	default_shadowSize = 0.1,
    	gcdsa_color = "#ffff66",
    	gsdsa_color = "#ffcc00",
    	gudsa_color = "#6666cc",
    	gdsa_total_free_color = "#777777",
    	default_background_color = "#333333",
    	default_tick_color = "#eeeeee",
    	default_used_Opacity = 1,
    	default_free_Opacity = 0.5,
    	gdsa_threshold_color = "#ffff00";
    	
    var gcdsa_used_bar = {
            data: gcdsa_used_data,
            bars: {
                    color: gcdsa_color,
                    fillColor: gcdsa_color,
                    fillOpacity: default_used_Opacity,
    	            show: default_show,
    	            stacked: default_stacked,
    	            horizontal: default_horizontal,
    	            barWidth: default_barWidth,
    	            lineWidth: default_lineWidth,
    	            shadowSize: default_shadowSize
                }
        };
    	var gcdsa_free_bar = {
                data: gcdsa_free_data,
                 bars: {
                    color: gcdsa_color,
                    fillColor: gcdsa_color,
                    fillOpacity: default_free_Opacity,
     	            show: default_show,
     	            stacked: default_stacked,
     	            horizontal: default_horizontal,
     	            barWidth: default_barWidth,
     	            lineWidth: default_lineWidth,
     	            shadowSize: default_shadowSize
                    }
        };
    	var gsdsa_used_bar = {
                data: gsdsa_used_data,
                 bars: {
                    color: gsdsa_color,
                    fillColor: gsdsa_color,
                    fillOpacity: default_used_Opacity,
      	            show: default_show,
      	            stacked: default_stacked,
      	            horizontal: default_horizontal,
      	            barWidth: default_barWidth,
      	            lineWidth: default_lineWidth,
      	            shadowSize: default_shadowSize
                 }
        };
        var gsdsa_free_bar = {
               data: gsdsa_free_data,
               bars: {
                   color: gsdsa_color,
                   fillColor: gsdsa_color,
                   fillOpacity: default_free_Opacity,
     	           show: default_show,
     	           stacked: default_stacked,
     	           horizontal: default_horizontal,
     	           barWidth: default_barWidth,
     	           lineWidth: default_lineWidth,
     	           shadowSize: default_shadowSize
                }
        };
        var gudsa_used_bar = {
               data: gudsa_used_data,
               bars: {
                   color: gudsa_color,
                   fillColor: gudsa_color,
                   fillOpacity: default_used_Opacity,
     	           show: default_show,
     	           stacked: default_stacked,
     	           horizontal: default_horizontal,
     	           barWidth: default_barWidth,
     	           lineWidth: default_lineWidth,
     	           shadowSize: default_shadowSize
                }
        };
        var gudsa_free_bar = {
                data: gudsa_free_data,
                bars: {
                    color: gudsa_color,
                    fillColor: gudsa_color,
                    fillOpacity: default_free_Opacity,
      	            show: default_show,
      	            stacked: default_stacked,
      	            horizontal: default_horizontal,
      	            barWidth: default_barWidth,
      	            lineWidth: default_lineWidth,
      	            shadowSize: default_shadowSize
                 }
        };   
        var gdsa_total_free_bar = {
                data: gdsa_total_free_data,
                bars: {
                    color: gdsa_total_free_color,
                    fillColor: gdsa_total_free_color,
                    fillOpacity: default_used_Opacity,
      	            show: default_show,
      	            stacked: default_stacked,
      	            horizontal: default_horizontal,
      	            barWidth: default_barWidth,
      	            lineWidth: default_lineWidth,
      	            shadowSize: default_shadowSize
                 }
        }; 
        var gdsa_threshold_line = {
        		data: gdsa_threshold_data,
        		lines: {
        			color: gdsa_threshold_color,
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
    	          max: gdsa_total_limit
    	          
    	        },
    	        yaxis: {
    	          showLabels: false,
    	          min: -1,
    	          max: 1
    	        }
    	};
    	
    	Flotr.draw(container, [ gcdsa_used_bar, gcdsa_free_bar, 
    	                        gsdsa_used_bar, gsdsa_free_bar,
    	                        gudsa_used_bar, gudsa_free_bar,
    	                        gdsa_total_free_bar,
    	                        gdsa_threshold_line ],  options);
    	
    	WL.Logger.debug("****** end drawGDSACurrent*****");
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

function displayGDSACurrentField(){
	
	$('#Tab_DSACurrent').removeClass('ui-btn-active');
	$('#Tab_EDSACurrent').removeClass('ui-btn-active');
	//$('#Tab_GDSACurrent').removeClass('ui-btn-active ui-state-persist');
	$('#Tab_GDSACurrent').addClass('ui-btn-active');
	
	activeStorageTab = 'GDSA';
	
	$('.tabContents').hide();
	//$('#TabContents_GDSACurrent').fadeIn();
	$('#TabContents_GDSACurrent').show();
	
	if (isLoadStorageCurrentSuccess) {
		var gdsa_threshold = selectedRegion.GDSA_THRESHOLD;
		
		var gdsa_total_limit = storageCurrent.gcdsa.total_limit;
		//var dsa_total_allocated = this.storageCurrent.cdsa.total_allocated;
		var gdsa_total_allocated = storageCurrent.gcdsa.allocated +
								  storageCurrent.gsdsa.allocated +
								  storageCurrent.gudsa.allocated;
		var gdsa_total_used = storageCurrent.gcdsa.used +
							 storageCurrent.gsdsa.used +
							 storageCurrent.gudsa.used;
		var gdsa_total_free = gdsa_total_limit - gdsa_total_allocated;
		var gdsa_threshold_size = gdsa_threshold * gdsa_total_limit / 100;
		
		var gdsa_total_used_ratio = Math.round(100 * gdsa_total_used / gdsa_total_limit);
		var gdsa_total_allocated_ratio = Math.round(100 * gdsa_total_allocated / gdsa_total_limit);
		var gdsa_total_free_ratio = Math.round(100 * gdsa_total_free / gdsa_total_limit);
		var gcdsa_used_ratio      = Math.round(100 * storageCurrent.gcdsa.used / gdsa_total_limit);
		var gcdsa_allocated_ratio = Math.round(100 * storageCurrent.gcdsa.allocated / gdsa_total_limit);
		var gsdsa_used_ratio      = Math.round(100 * storageCurrent.gsdsa.used / gdsa_total_limit);
		var gsdsa_allocated_ratio = Math.round(100 * storageCurrent.gsdsa.allocated / gdsa_total_limit);
		var gudsa_used_ratio      = Math.round(100 * storageCurrent.gudsa.used/ gdsa_total_limit);
		var gudsa_allocated_ratio = Math.round(100 * storageCurrent.gudsa.allocated / gdsa_total_limit);
		
		var is_gdsa_sos = false;
		if (storageCurrent.sosabovebar == "SOS"){
			is_gdsa_sos = true;
		}		
		
		//var gdsa_total_limit_contents = "<a href='#Page_ChangeGDSALimit'>";
		var gdsa_total_limit_contents = "";
		if (is_gdsa_sos) {
			gdsa_total_limit_contents = gdsa_total_limit_contents + "<img src='images/status_red.png' width='15' height='15'/>";
		} else if (gdsa_total_limit <= 0 ){
			gdsa_total_limit_contents = gdsa_total_limit_contents + "<img src='images/status_green.png' width='15' height='15'/>";
		} else if (gdsa_threshold_size < gdsa_total_allocated) {
			gdsa_total_limit_contents = gdsa_total_limit_contents + "<img src='images/status_yellow.png' width='15' height='15'/>";
		} else {
			gdsa_total_limit_contents = gdsa_total_limit_contents + "<img src='images/status_green.png' width='15' height='15'/>";
		}
		gdsa_total_limit_contents = gdsa_total_limit_contents + "GDSA Limit: "+ addFigure(gdsa_total_limit) + " bytes / " + addFigure(gdsa_total_limit/1024/1024) + " MB";
		//gdsa_total_limit_contents = gdsa_total_limit_contents + "</a>";
		$('#gdsa_total_limit').html(gdsa_total_limit_contents);
		
		//$('#gdsa_total_limit').text("GDSA Limit: "+ addFigure(gdsa_total_limit) + " bytes");
		$('#gdsa_threshold').text("Threshold: " + gdsa_threshold + "%   (" + addFigure(gdsa_threshold_size) + " bytes / " + addFigure(gdsa_threshold_size/1024/1024) + " MB"+ ")");
		$('#gdsa_total_used').text(addFigure(gdsa_total_used) + " bytes (" + gdsa_total_used_ratio + "%)");
		$('#gdsa_total_allocated').text(addFigure(gdsa_total_allocated) + " bytes (" + gdsa_total_allocated_ratio + "%)");
		
		$('#gcdsa_used').text(addFigure(storageCurrent.gcdsa.used) + " bytes (" + gcdsa_used_ratio + "%)");
		$('#gcdsa_allocated').text(addFigure(storageCurrent.gcdsa.allocated) + " bytes (" + gcdsa_allocated_ratio + "%)");
		$('#gsdsa_used').text(addFigure(storageCurrent.gsdsa.used) + " bytes (" + gsdsa_used_ratio + "%)");
		$('#gsdsa_allocated').text(addFigure(storageCurrent.gsdsa.allocated) + " bytes (" + gsdsa_allocated_ratio + "%)");
		$('#gudsa_used').text(addFigure(storageCurrent.gudsa.used) + " bytes (" + gudsa_used_ratio + "%)");
		$('#gudsa_allocated').text(addFigure(storageCurrent.gudsa.allocated) + " bytes (" + gudsa_allocated_ratio + "%)");
		if (gdsa_total_limit <= 0){
			$('#gdsa_total_free').text("N/A");
		} else {
			$('#gdsa_total_free').text(addFigure(gdsa_total_free) + " bytes ("   + gdsa_total_free_ratio + "%)");
		}
	
	
		drawGDSACurrent(storageCurrent.gcdsa.used, storageCurrent.gcdsa.free,
					    storageCurrent.gsdsa.used, storageCurrent.gsdsa.free,
					    storageCurrent.gudsa.used, storageCurrent.gudsa.free,
					    gdsa_total_free, gdsa_total_limit, gdsa_threshold_size);
					    
	}else{
		clearGDSACurrentField();
	}
}

/*
function getGDSACurrent(){
	WL.Logger.debug("****** begin getGDSACurrent*****");
	WL.Logger.debug("*** selected region:" + JSON.stringify(selectedRegion));
	//var regionName = $('#Page_CurrentDynamicStorage').data('regionName0');
	var regionName = removeBlank(selectedRegion.REGIONNAME);
	var CICSplexName = removeBlank(selectedRegion.CICSPLEXNAME);
	var WUIServer = removeBlank(selectedRegion.WUISERVER);
	var sysId = removeBlank(selectedRegion.SYSID);
	var MVSSysName = removeBlank(selectedRegion.MVSSYSNAME);
	var gdsa_threshold = selectedRegion.GDSA_THRESHOLD;
	
	if (WL.Client.getLoginName("AdapterAuthRealm") != null)	 {
		$("#GDSACurrent_header_user").text(WL.Client.getLoginName("AdapterAuthRealm"));
	}
	
	WL.Logger.debug("regionName=" + regionName);
	WL.Logger.debug("CICSplexName="+ CICSplexName);
	WL.Logger.debug("WUIServer="+ WUIServer);
	
	$('#GDSACurrent_header_regionName').text(regionName);
	$('#GDSACurrent_header_sysId').text(sysId);
	$('#GDSACurrent_header_CICSPlexName').text(CICSplexName);
	$('#GDSACurrent_header_MVSSysName').text(MVSSysName);
	
	var date = new Date();
	//var iTimeStamp = date.getTime();
	var strTimeStamp = date.getFullYear() + "/"
    	         + date_format(date.getMonth()) + "/"
    	         + date_format(date.getDay()) + "-" 
    	         + date_format(date.getHours()) + ":"
    	         + date_format(date.getMinutes()) + ":"
    	         + date_format(date.getSeconds());
	$('#GDSACurrent_header_refreshTime').text(strTimeStamp);
	
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
				
				displayGDSACurrentField();
			  			
							
			} else {
				// プロファイル情報の取得に失敗した場合
				WL.Logger.debug(">>>Error: ", result.invocationResult);
				clearGDSACurrentField();
				
			}

		},
		onFailure : function(result) {
			//busy.hide();
			WL.Logger.debug("Profile loaded FAILURE: ", result);
			//alert("Profile loaded FAILURE: " + JSON.stringify(result));
			clearGDSACurrentField();
		}
	});
	
	WL.Logger.debug("****** end getGDSACurrent*****");
}

*/
