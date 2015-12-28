function initChangeDSALimit(){
	WL.Logger.debug("*** initDSALimit begin ***");
	
	if (WL.Client.getLoginName("AdapterAuthRealm") != null)	 {
		$("#ChangeDSALimit_header_user").html("User: " + 
											    "<span class='span_normal span_italic'>" +
											    WL.Client.getLoginName("AdapterAuthRealm") +
											    "</span>"
											    );
	}
	
	$('#ChangeDSALimit_header_refreshTime').html("Refresh Time: " + 
												    "<span class='span_normal span_italic'>" +
												    storageCurrentTimeStamp +
												    "</span>"
												    );
	
	var regionName = removeBlank(selectedRegion.REGIONNAME);
	var CICSplexName = removeBlank(selectedRegion.CICSPLEXNAME);
	var sysId = removeBlank(selectedRegion.SYSID);
	var MVSSysName = removeBlank(selectedRegion.MVSSYSNAME);
	
	$('#ChangeDSALimit_header_regionName').text(regionName);
	$('#ChangeDSALimit_header_sysId').text(sysId);
	$('#ChangeDSALimit_header_CICSPlexName').text(CICSplexName);
	$('#ChangeDSALimit_header_MVSSysName').text(MVSSysName);
	
	var default_newDSALimit = (storageCurrent.cdsa.total_limit-0) / 1024;
	//$('#slider_DSALimit').attr('value', default_newDSALimit);
	//$('#slider_DSALimit').slider('refresh');
	$('#slider_DSALimit').val(default_newDSALimit).slider('refresh');
	
	WL.Logger.debug("*** default_newDSALimit:" + default_newDSALimit);
	displayBeforeDSACurrentField();
	displayAfterDSACurrentField(default_newDSALimit);
	
	WL.Logger.debug("*** initDSALimit end ***");
	//isAvailableDSAlimitSlider = true;
}

function resetDSALimit(){
	WL.Logger.debug("*** resetDSALimit begin ***");
	var default_newDSALimit = (storageCurrent.cdsa.total_limit-0) / 1024;
	WL.Logger.debug("*** default_newDSALimit:" + default_newDSALimit);
	//$('#slider_DSALimit').attr('value', default_newDSALimit);
	$('#slider_DSALimit').val(default_newDSALimit).slider('refresh');
	
	updateAfterDSACurrentField();
	
	WL.Logger.debug("*** resetDSALimit end ***");
}

function previewDSALimit(){
	WL.Logger.debug("*** previewDSALimit begin ***");

	updateAfterDSACurrentField();
	
	WL.Logger.debug("*** previewDSALimit end ***");
}

function drawBeforeDSACurrent(cdsa_used,cdsa_free,
						rdsa_used,rdsa_free,
						sdsa_used,sdsa_free,
						udsa_used,udsa_free,
						dsa_total_free, dsa_total_limit,
						dsa_threshold){
	WL.Logger.debug("****** begin drawBeforeDSACurrent*****");
	
	$("#beforeChange_graphDSACurrent").empty();

	var container = document.getElementById("beforeChange_graphDSACurrent");
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
    	
    	WL.Logger.debug("****** end drawBeforeDSACurrent*****");
}

function clearBeforeDSACurrentField(){
	$("#beforeChange_graphDSACurrent").empty();
	
	var default_message = "unknown";
	$('#beforeChange_dsa_total_limit').text("DSA Limit: "+ default_message);
	$('#beforeChange_dsa_threshold').text("Threshold: " + default_message);
	$('#beforeChange_dsa_total_used').text(default_message);
	$('#beforeChange_dsa_total_allocated').text(default_message);

}

function displayBeforeDSACurrentField(){
	WL.Logger.debug("*** begin displayBeforeDSACurrentField ***");
	
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
		
		var is_dsa_sos = false;
		if (storageCurrent.sosbelowline == "SOS"){
			is_dsa_sos = true;
		} 
		
		var beforeChange_dsa_total_limit_contents = "";
		if (is_dsa_sos) {
			beforeChange_dsa_total_limit_contents = beforeChange_dsa_total_limit_contents + "<img src='images/status_red.png' width='15' height='15'/>";
		} else if (dsa_threshold_size < dsa_total_allocated) {
			beforeChange_dsa_total_limit_contents = beforeChange_dsa_total_limit_contents + "<img src='images/status_yellow.png' width='15' height='15'/>";
		} else {
			beforeChange_dsa_total_limit_contents = beforeChange_dsa_total_limit_contents + "<img src='images/status_green.png' width='15' height='15'/>";
		}
		beforeChange_dsa_total_limit_contents = beforeChange_dsa_total_limit_contents + "DSA Limit: "+ addFigure(dsa_total_limit) + " bytes / " + addFigure(dsa_total_limit/1024) + " KB";
		$('#beforeChange_dsa_total_limit').html(beforeChange_dsa_total_limit_contents);
		
		//$('#beforeChange_dsa_total_limit').text("DSA Limit: "+ addFigure(dsa_total_limit) + " bytes / " + addFigure(dsa_total_limit/1024) + " KB");
		$('#beforeChange_dsa_threshold').text("Threshold: " + dsa_threshold + "%   (" + addFigure(dsa_threshold_size) + " bytes / " + addFigure(dsa_threshold_size/1024) + " KB"+ ")");
		$('#beforeChange_dsa_total_used').text(addFigure(dsa_total_used) + " bytes (" + dsa_total_used_ratio + "%)");
		$('#beforeChange_dsa_total_allocated').text(addFigure(dsa_total_allocated) + " bytes (" + dsa_total_allocated_ratio + "%)");
				
		drawBeforeDSACurrent(storageCurrent.cdsa.used, storageCurrent.cdsa.free,
					   storageCurrent.rdsa.used, storageCurrent.rdsa.free,
					   storageCurrent.sdsa.used, storageCurrent.sdsa.free,
					   storageCurrent.udsa.used, storageCurrent.udsa.free,
					   dsa_total_free, dsa_total_limit, dsa_threshold_size);
					   
	} else {
		clearBeforeDSACurrentField();
	}
	

	WL.Logger.debug("*** end displayBeforeDSACurrentField ***");
}



function drawAfterDSACurrent(cdsa_used,cdsa_free,
								rdsa_used,rdsa_free,
								sdsa_used,sdsa_free,
								udsa_used,udsa_free,
								dsa_total_free, dsa_total_limit,
								dsa_threshold){
	WL.Logger.debug("****** begin drawAfterDSACurrent*****");
	
	$("#afterChange_graphDSACurrent").empty();
	
	var container = document.getElementById("afterChange_graphDSACurrent");
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
	
	WL.Logger.debug("****** end drawAfterDSACurrent*****");
}

function clearAfterDSACurrentField(){
	$("#afterChange_graphDSACurrent").empty();
	
	var default_message = "unknown";
	$('#afterChange_dsa_total_limit').text("DSA Limit: "+ default_message);
	$('#afterChange_dsa_threshold').text("Threshold: " + default_message);
	$('#afterChange_dsa_total_used').text(default_message);
	$('#afterChange_dsa_total_allocated').text(default_message);

}

function displayAfterDSACurrentField(newDSALimit){
	WL.Logger.debug("*** begin displayAfterDSACurrentField ***");
	
	if (isLoadStorageCurrentSuccess) {
		
		var dsa_total_limit = 0;
		dsa_total_limit = newDSALimit * 1024;
		/*
		if (newDSALimit > 0){
			dsa_total_limit = newDSALimit * 1024;
		} else {
			dsa_total_limit = storageCurrent.cdsa.total_limit;
		}*/
		
		var dsa_threshold = selectedRegion.DSA_THRESHOLD;

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
		
		var afterChange_dsa_total_limit_contents = "";
		if (dsa_total_limit < dsa_total_used) {
			afterChange_dsa_total_limit_contents = afterChange_dsa_total_limit_contents + "<img src='images/status_red.png' width='15' height='15'/>";
		} else if (dsa_threshold_size < dsa_total_allocated) {
			afterChange_dsa_total_limit_contents = afterChange_dsa_total_limit_contents + "<img src='images/status_yellow.png' width='15' height='15'/>";
		} else {
			afterChange_dsa_total_limit_contents = afterChange_dsa_total_limit_contents + "<img src='images/status_green.png' width='15' height='15'/>";
		}
		afterChange_dsa_total_limit_contents = afterChange_dsa_total_limit_contents + "DSA Limit: "+ addFigure(dsa_total_limit) + " bytes / " + addFigure(dsa_total_limit/1024) + " KB";
		$('#afterChange_dsa_total_limit').html(afterChange_dsa_total_limit_contents);
		
		//$('#afterChange_dsa_total_limit').text("DSA Limit: "+ addFigure(dsa_total_limit) + " bytes / " + addFigure(dsa_total_limit/1024) + " KB");
		$('#afterChange_dsa_threshold').text("Threshold: " + dsa_threshold + "%   (" + addFigure(dsa_threshold_size) + " bytes / " + addFigure(dsa_threshold_size/1024) + " KB"+ ")");
		$('#afterChange_dsa_total_used').text(addFigure(dsa_total_used) + " bytes (" + dsa_total_used_ratio + "%)");
		$('#afterChange_dsa_total_allocated').text(addFigure(dsa_total_allocated) + " bytes (" + dsa_total_allocated_ratio + "%)");
		
		drawAfterDSACurrent(storageCurrent.cdsa.used, storageCurrent.cdsa.free,
			   storageCurrent.rdsa.used, storageCurrent.rdsa.free,
			   storageCurrent.sdsa.used, storageCurrent.sdsa.free,
			   storageCurrent.udsa.used, storageCurrent.udsa.free,
			   dsa_total_free, dsa_total_limit, dsa_threshold_size);
			   
	} else {
		clearAfterDSACurrentField();
	}
	
	
	WL.Logger.debug("*** end displayAfterDSACurrentField ***");
}


function updateAfterDSACurrentField(){
	var newDSALimit = $('#slider_DSALimit').val();
	WL.Logger.debug(">>> slider changed:" + newDSALimit);
	displayAfterDSACurrentField(newDSALimit);
}


function showDSALimitConfirm(){
	WL.Logger.debug("*** showDSALimitConfirm() ***");
	isChangeDSALimitOK = false;
	var str = '<div style="font-size: small">' +
			  	'Change DSA Limit' +
			  	'<hr/>' +
			  	'Before: ' + addFigure(storageCurrent.cdsa.total_limit/1024) + ' KB <br/>' +
			  	'After:  ' + addFigure($('#slider_DSALimit').val()) + ' KB <br/>' +
			  	'<hr/>' +
			  	'Do you really want to change?' +
			  '</div>'	;
	WL.Logger.debug(">>>str:" + str);
	$("#DSALimitConfirmMessage").html(str);
	
	WL.Logger.debug("*** showDSALimitConfirm() end ***");
}

function invokeChangeDSALimit(){
	WL.Logger.debug("***invokeChangeDSALimit()***");
	
	if (isChangeDSALimitOK) {
		var newDSALimit = $('#slider_DSALimit').val() * 1024;
		
		var regionName = removeBlank(selectedRegion.REGIONNAME);
		var CICSplexName = removeBlank(selectedRegion.CICSPLEXNAME);
		var WUIServer = removeBlank(selectedRegion.WUISERVER);
		
		var HTTPadapterName;
		var HTTPparameter = [];
			
		if (WUIServer != null){
			HTTPadapterName = 'HTTP_' + WUIServer + '_CMCI';
			WL.Logger.debug("HTTPadapterName="+ HTTPadapterName);
			HTTPparameter = [CICSplexName, regionName, newDSALimit];
		} else {
			HTTPadapterName = 'HTTP_' + regionName + '_CMCI';
			WL.Logger.debug("HTTPadapterName="+ HTTPadapterName);
			HTTPparameter = [regionName, regionName, newDSALimit];
		}
			
		var invocationData = {
				adapter : HTTPadapterName,
				procedure : 'updateDSALimit',
				parameters : HTTPparameter
			};
		
		WL.Client.invokeProcedure(invocationData, {
			onSuccess : function(result) {
				WL.Logger.debug("*** success: " , result);
				
				var api_resp = result.invocationResult.response.resultsummary.api_response1_alt.toString();
				
				WL.Logger.debug(">>> api_resp:" + api_resp);
				
				if (api_resp == "OK"){
					showDSALimitResult_Success();
				} else {
					showDSALimitResult_Fail(result);
				}
				


			},
			onFailure : function(result) {
				WL.Logger.debug("*** fail: " , result);
				showDSALimitResult_Fail(null);

			}
		});
	}
}

function showDSALimitResult_Success(){
	WL.Logger.debug("***result success***");
	
	WL.Logger.debug(">>>invoke getStorageCurrentAfterChangeDSALimit()");
	getStorageCurrentAfterChangeDSALimit();
	
	WL.Logger.debug(">>>invoke recordStorageCurrent()");
	recordStorageCurrent();
	
	var options = {
		'positionTo	': 'window',
		'transition' : 'slidedown'
	};
	$("#Popup_DSALimitResult").popup("open", options);
	
	var str = '<div style="font-size: small">' +
			  	'Completed Successfully <br/>' +
			  '</div>'	;
	$("#DSALimitResultMessage").html(str);
	

	//$("#DSALimitConfirmMessage").html(str).trigger('create');
}

function showDSALimitResult_Fail(result){
	WL.Logger.debug("***result fail***");
	
	$("#DSALimitResultMessage").empty();
	
	var options = {
		'positionTo	': 'window',
		'transition' : 'slidedown'
	};
	$("#Popup_DSALimitResult").popup("open", options);
	
	var str = '<div style="font-size: small; color: red">' +
			  	'Failed to change DSA Limit'+
			  	'<hr/>';
	if (result!=null){
		if(result.invocationResult.response.resultsummary.api_response1_alt != null) {
			str = str + 'api_response1_alt: ' + result.invocationResult.response.resultsummary.api_response1_alt + '<br/>';
		}
		if (result.invocationResult.response.resultsummary.api_response2_alt != null) {
			str = str + 'api_response2_alt: ' + result.invocationResult.response.resultsummary.api_response2_alt + '<br/>';
		}
		if ((result.invocationResult.response.errors != null) && (result.invocationResult.response.errors.feedback.resp_alt != null)) {
			str = str + 'resp_alt: ' + result.invocationResult.response.errors.feedback.resp_alt + '<br/>';
		}
	}
	str = str +  '<hr/> </div>';
	$("#DSALimitResultMessage").html(str);

	
}

 


function getStorageCurrentAfterChangeDSALimit(){
	WL.Logger.debug("****** begin getStorageCurrentAfterChangeDSALimit() *****");
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
				
				initChangeDSALimit();
							  				
							
			} else {
				// プロファイル情報の取得に失敗した場合
				WL.Logger.debug(">>>Error: ", result.invocationResult);
				isLoadStorageCurrentSuccess = false;
				
				initChangeDSALimit();
								
			}

		},
		onFailure : function(result) {
			//busy.hide();
			WL.Logger.debug("Profile loaded FAILURE: ", result);
			//alert("Profile loaded FAILURE: " + JSON.stringify(result));
			isLoadStorageCurrentSuccess = false;
			
			initChangeDSALimit();

		}
	});
	
	WL.Logger.debug("****** end getDSACurrent*****");
}




 //----------test-------------
function changeDSALimit(){
	var dialogTitle = "DSA Limit";
	var dialogText = "DSA Limitを変更します。よろしいですか？";
	WL.SimpleDialog.show(dialogTitle, dialogText, 
						[ {
							text: 'Cancel', 
						    handler: function(){
							   WL.Logger.debug("***Change DSA Limit Canceled!***");
						    }
						  },
						  {
							text: 'OK',
							handler: invokeChangeDSALimit
						  }
						]);
}

