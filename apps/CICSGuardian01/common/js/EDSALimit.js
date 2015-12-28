function initChangeEDSALimit(){
	WL.Logger.debug("*** initEDSALimit begin ***");
	
	if (WL.Client.getLoginName("AdapterAuthRealm") != null)	 {
		$("#ChangeEDSALimit_header_user").html("User: " + 
											    "<span class='span_normal span_italic'>" +
											    WL.Client.getLoginName("AdapterAuthRealm") +
											    "</span>"
											    );
	}
	
	$('#ChangeEDSALimit_header_refreshTime').html("Refresh Time: " + 
												    "<span class='span_normal span_italic'>" +
												    storageCurrentTimeStamp +
												    "</span>"
												    );
	
	var regionName = removeBlank(selectedRegion.REGIONNAME);
	var CICSplexName = removeBlank(selectedRegion.CICSPLEXNAME);
	var sysId = removeBlank(selectedRegion.SYSID);
	var MVSSysName = removeBlank(selectedRegion.MVSSYSNAME);
	
	$('#ChangeEDSALimit_header_regionName').text(regionName);
	$('#ChangeEDSALimit_header_sysId').text(sysId);
	$('#ChangeEDSALimit_header_CICSPlexName').text(CICSplexName);
	$('#ChangeEDSALimit_header_MVSSysName').text(MVSSysName);
	
	var default_newEDSALimit = (storageCurrent.ecdsa.total_limit-0) / 1024 / 1024;
	//$('#slider_EDSALimit').attr('value', default_newEDSALimit);
	//$('#slider_EDSALimit').slider('refresh');
	$('#slider_EDSALimit').val(default_newEDSALimit).slider('refresh');
	
	WL.Logger.debug("*** default_newEDSALimit:" + default_newEDSALimit);
	displayBeforeEDSACurrentField();
	displayAfterEDSACurrentField(default_newEDSALimit);
	
	WL.Logger.debug("*** initEDSALimit end ***");
	//isAvailableEDSAlimitSlider = true;
}

function resetEDSALimit(){
	WL.Logger.debug("*** resetEDSALimit begin ***");
	var default_newEDSALimit = (storageCurrent.ecdsa.total_limit-0) / 1024 / 1024;
	WL.Logger.debug("*** default_newEDSALimit:" + default_newEDSALimit);
	//$('#slider_EDSALimit').attr('value', default_newEDSALimit);
	$('#slider_EDSALimit').val(default_newEDSALimit).slider('refresh');
	
	updateAfterEDSACurrentField();
	
	WL.Logger.debug("*** resetEDSALimit end ***");
}

function previewEDSALimit(){
	WL.Logger.debug("*** previewEDSALimit begin ***");

	updateAfterEDSACurrentField();
	
	WL.Logger.debug("*** previewEDSALimit end ***");
}

function drawBeforeEDSACurrent(ecdsa_used,ecdsa_free,
						erdsa_used,erdsa_free,
						esdsa_used,esdsa_free,
						eudsa_used,eudsa_free,
						etdsa_used,etdsa_free,
						edsa_total_free, edsa_total_limit,
						edsa_threshold){
	WL.Logger.debug("****** begin drawBeforeEDSACurrent*****");
	
	$("#beforeChange_graphEDSACurrent").empty();

	var container = document.getElementById("beforeChange_graphEDSACurrent");
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
    	
    	WL.Logger.debug("****** end drawBeforeEDSACurrent*****");
}

function clearBeforeEDSACurrentField(){
	$("#beforeChange_graphEDSACurrent").empty();
	
	var default_message = "unknown";
	$('#beforeChange_edsa_total_limit').text("EDSA Limit: "+ default_message);
	$('#beforeChange_edsa_threshold').text("Threshold: " + default_message);
	$('#beforeChange_edsa_total_used').text(default_message);
	$('#beforeChange_edsa_total_allocated').text(default_message);

}

function displayBeforeEDSACurrentField(){
	WL.Logger.debug("*** begin displayBeforeEDSACurrentField ***");
	
	if (isLoadStorageCurrentSuccess) {
		var edsa_threshold = selectedRegion.EDSA_THRESHOLD;
	
		var edsa_total_limit = storageCurrent.ecdsa.total_limit;
		//var edsa_total_allocated = this.storageCurrent.ecdsa.total_allocated;
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
		
		var is_edsa_sos = false;
		if (storageCurrent.sosaboveline == "SOS"){
			is_edsa_sos = true;
		}
		
		var beforeChange_edsa_total_limit_contents = "";
		if (is_edsa_sos) {
			beforeChange_edsa_total_limit_contents = beforeChange_edsa_total_limit_contents + "<img src='images/status_red.png' width='15' height='15'/>";
		} else if (edsa_threshold_size < edsa_total_allocated) {
			beforeChange_edsa_total_limit_contents = beforeChange_edsa_total_limit_contents + "<img src='images/status_yellow.png' width='15' height='15'/>";
		} else {
			beforeChange_edsa_total_limit_contents = beforeChange_edsa_total_limit_contents + "<img src='images/status_green.png' width='15' height='15'/>";
		}
		beforeChange_edsa_total_limit_contents = beforeChange_edsa_total_limit_contents + "EDSA Limit: "+ addFigure(edsa_total_limit) + " bytes / " + addFigure(edsa_total_limit/1024/1024) + " MB";
		$('#beforeChange_edsa_total_limit').html(beforeChange_edsa_total_limit_contents);
		
		//$('#beforeChange_edsa_total_limit').text("EDSA Limit: "+ addFigure(edsa_total_limit) + " bytes / " + addFigure(edsa_total_limit/1024) + " KB");
		$('#beforeChange_edsa_threshold').text("Threshold: " + edsa_threshold + "%   (" + addFigure(edsa_threshold_size) + " bytes / " + addFigure(edsa_threshold_size/1024/1024) + " MB"+ ")");
		$('#beforeChange_edsa_total_used').text(addFigure(edsa_total_used) + " bytes (" + edsa_total_used_ratio + "%)");
		$('#beforeChange_edsa_total_allocated').text(addFigure(edsa_total_allocated) + " bytes (" + edsa_total_allocated_ratio + "%)");
				
		drawBeforeEDSACurrent(storageCurrent.ecdsa.used, storageCurrent.ecdsa.free,
					   storageCurrent.erdsa.used, storageCurrent.erdsa.free,
					   storageCurrent.esdsa.used, storageCurrent.esdsa.free,
					   storageCurrent.eudsa.used, storageCurrent.eudsa.free,
					   storageCurrent.etdsa.used, storageCurrent.etdsa.free,
					   edsa_total_free, edsa_total_limit, edsa_threshold_size);
					   
	} else {
		clearBeforeEDSACurrentField();
	}
	

	WL.Logger.debug("*** end displayBeforeEDSACurrentField ***");
}



function drawAfterEDSACurrent(ecdsa_used,ecdsa_free,
								erdsa_used,erdsa_free,
								esdsa_used,esdsa_free,
								eudsa_used,eudsa_free,
								etdsa_used,etdsa_free,
								edsa_total_free, edsa_total_limit,
								edsa_threshold){
	WL.Logger.debug("****** begin drawAfterEDSACurrent*****");
	
	$("#afterChange_graphEDSACurrent").empty();
	
	var container = document.getElementById("afterChange_graphEDSACurrent");
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
	
	WL.Logger.debug("****** end drawAfterEDSACurrent*****");
}

function clearAfterEDSACurrentField(){
	$("#afterChange_graphEDSACurrent").empty();
	
	var default_message = "unknown";
	$('#afterChange_edsa_total_limit').text("EDSA Limit: "+ default_message);
	$('#afterChange_edsa_threshold').text("Threshold: " + default_message);
	$('#afterChange_edsa_total_used').text(default_message);
	$('#afterChange_edsa_total_allocated').text(default_message);

}

function displayAfterEDSACurrentField(newEDSALimit){
	WL.Logger.debug("*** begin displayAfterEDSACurrentField ***");
	
	if (isLoadStorageCurrentSuccess) {
		
		var edsa_total_limit = 0;
		edsa_total_limit = newEDSALimit * 1024 * 1024;
		/*
		if (newEDSALimit > 0){
			edsa_total_limit = newEDSALimit * 1024;
		} else {
			edsa_total_limit = storageCurrent.ecdsa.total_limit;
		}*/
		
		var edsa_threshold = selectedRegion.EDSA_THRESHOLD;

		var edsa_total_allocated = storageCurrent.ecdsa.allocated +
						  storageCurrent.erdsa.allocated +
						  storageCurrent.esdsa.allocated +
						  storageCurrent.eudsa.allocated +
						  storageCurrent.etdsa.allocated;
		var edsa_total_used = storageCurrent.cdsa.used +
					 storageCurrent.erdsa.used +
					 storageCurrent.esdsa.used +
					 storageCurrent.eudsa.used +
					 storageCurrent.etdsa.used;
		var edsa_total_free = edsa_total_limit - edsa_total_allocated;
		var edsa_threshold_size = edsa_threshold * edsa_total_limit / 100;
		
		var edsa_total_used_ratio = Math.round(100 * edsa_total_used / edsa_total_limit);
		var edsa_total_allocated_ratio = Math.round(100 * edsa_total_allocated / edsa_total_limit);
		
		var afterChange_edsa_total_limit_contents = "";
		if (edsa_total_limit < edsa_total_used) {
			afterChange_edsa_total_limit_contents = afterChange_edsa_total_limit_contents + "<img src='images/status_red.png' width='15' height='15'/>";
		} else if (edsa_threshold_size < edsa_total_allocated) {
			afterChange_edsa_total_limit_contents = afterChange_edsa_total_limit_contents + "<img src='images/status_yellow.png' width='15' height='15'/>";
		} else {
			afterChange_edsa_total_limit_contents = afterChange_edsa_total_limit_contents + "<img src='images/status_green.png' width='15' height='15'/>";
		}
		afterChange_edsa_total_limit_contents = afterChange_edsa_total_limit_contents + "EDSA Limit: "+ addFigure(edsa_total_limit) + " bytes / " + addFigure(edsa_total_limit/1024/1024) + " MB";
		$('#afterChange_edsa_total_limit').html(afterChange_edsa_total_limit_contents);
		
		//$('#afterChange_edsa_total_limit').text("EDSA Limit: "+ addFigure(edsa_total_limit) + " bytes / " + addFigure(edsa_total_limit/1024) + " KB");
		$('#afterChange_edsa_threshold').text("Threshold: " + edsa_threshold + "%   (" + addFigure(edsa_threshold_size) + " bytes / " + addFigure(edsa_threshold_size/1024/1024) + " MB"+ ")");
		$('#afterChange_edsa_total_used').text(addFigure(edsa_total_used) + " bytes (" + edsa_total_used_ratio + "%)");
		$('#afterChange_edsa_total_allocated').text(addFigure(edsa_total_allocated) + " bytes (" + edsa_total_allocated_ratio + "%)");
		
		drawAfterEDSACurrent(storageCurrent.ecdsa.used, storageCurrent.ecdsa.free,
			   storageCurrent.erdsa.used, storageCurrent.erdsa.free,
			   storageCurrent.esdsa.used, storageCurrent.esdsa.free,
			   storageCurrent.eudsa.used, storageCurrent.eudsa.free,
			   storageCurrent.etdsa.used, storageCurrent.etdsa.free,
			   edsa_total_free, edsa_total_limit, edsa_threshold_size);
			   
	} else {
		clearAfterEDSACurrentField();
	}
	
	
	WL.Logger.debug("*** end displayAfterEDSACurrentField ***");
}


function updateAfterEDSACurrentField(){
	var newEDSALimit = $('#slider_EDSALimit').val();
	WL.Logger.debug(">>> slider changed:" + newEDSALimit);
	displayAfterEDSACurrentField(newEDSALimit);
}


function showEDSALimitConfirm(){
	WL.Logger.debug("*** showEDSALimitConfirm() ***");
	isChangeEDSALimitOK = false;
	var str = '<div style="font-size: small">' +
			  	'EDSA Limit を 更新します' +
			  	'<hr/>' +
			  	'Before: ' + addFigure(storageCurrent.ecdsa.total_limit/1024/1024) + ' MB <br/>' +
			  	'After:  ' + addFigure($('#slider_EDSALimit').val()) + ' MB <br/>' +
			  	'<hr/>' +
			  	'よろしいですか？' +
			  '</div>'	;
	WL.Logger.debug(">>>str:" + str);
	$("#EDSALimitConfirmMessage").html(str);
	
	WL.Logger.debug("*** showEDSALimitConfirm() end ***");
}

function invokeChangeEDSALimit(){
	WL.Logger.debug("***invokeChangeEDSALimit()***");
	
	if (isChangeEDSALimitOK) {
		var newEDSALimit = $('#slider_EDSALimit').val() * 1024 * 1024;
		
		var regionName = removeBlank(selectedRegion.REGIONNAME);
		var CICSplexName = removeBlank(selectedRegion.CICSPLEXNAME);
		var WUIServer = removeBlank(selectedRegion.WUISERVER);
		
		var HTTPadapterName;
		var HTTPparameter = [];
			
		if (WUIServer != null){
			HTTPadapterName = 'HTTP_' + WUIServer + '_CMCI';
			WL.Logger.debug("HTTPadapterName="+ HTTPadapterName);
			HTTPparameter = [CICSplexName, regionName, newEDSALimit];
		} else {
			HTTPadapterName = 'HTTP_' + regionName + '_CMCI';
			WL.Logger.debug("HTTPadapterName="+ HTTPadapterName);
			HTTPparameter = [regionName, regionName, newEDSALimit];
		}
			
		var invocationData = {
				adapter : HTTPadapterName,
				procedure : 'updateEDSALimit',
				parameters : HTTPparameter
			};
		
		WL.Client.invokeProcedure(invocationData, {
			onSuccess : function(result) {
				WL.Logger.debug("*** success: " , result);
				
				var api_resp = result.invocationResult.response.resultsummary.api_response1_alt.toString();
				
				WL.Logger.debug(">>> api_resp:" + api_resp);
				
				if (api_resp == "OK"){
					showEDSALimitResult_Success();
				} else {
					showEDSALimitResult_Fail(result);
				}
				


			},
			onFailure : function(result) {
				WL.Logger.debug("*** fail: " , result);
				showEDSALimitResult_Fail(null);

			}
		});
	}
}

function showEDSALimitResult_Success(){
	WL.Logger.debug("***result success***");
	
	WL.Logger.debug(">>>invoke getStorageCurrentAfterChangeEDSALimit()");
	getStorageCurrentAfterChangeEDSALimit();
	
	WL.Logger.debug(">>>invoke recordStorageCurrent()");
	recordStorageCurrent();
	
	var options = {
		'positionTo	': 'window',
		'transition' : 'slidedown'
	};
	$("#Popup_EDSALimitResult").popup("open", options);
	
	var str = '<div style="font-size: small">' +
			  	'EDSA Limit の更新が完了しました <br/>' +
			  '</div>'	;
	$("#EDSALimitResultMessage").html(str);
	

	//$("#EDSALimitConfirmMessage").html(str).trigger('create');
}

function showEDSALimitResult_Fail(result){
	WL.Logger.debug("***result fail***");
	
	$("#EDSALimitResultMessage").empty();
	
	var options = {
		'positionTo	': 'window',
		'transition' : 'slidedown'
	};
	$("#Popup_EDSALimitResult").popup("open", options);
	
	var str = '<div style="font-size: small; color: red">' +
			  	'EDSA Limit の更新に失敗しました '+
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
	$("#EDSALimitResultMessage").html(str);

	
}

 


function getStorageCurrentAfterChangeEDSALimit(){
	WL.Logger.debug("****** begin getStorageCurrentAfterChangeEDSALimit() *****");
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
				
				initChangeEDSALimit();
							  				
							
			} else {
				// プロファイル情報の取得に失敗した場合
				WL.Logger.debug(">>>Error: ", result.invocationResult);
				isLoadStorageCurrentSuccess = false;
				
				initChangeEDSALimit();
								
			}

		},
		onFailure : function(result) {
			//busy.hide();
			WL.Logger.debug("Profile loaded FAILURE: ", result);
			//alert("Profile loaded FAILURE: " + JSON.stringify(result));
			isLoadStorageCurrentSuccess = false;
			
			initChangeEDSALimit();

		}
	});
	
	WL.Logger.debug("****** end getEDSACurrent*****");
}




 //----------test-------------
function changeEDSALimit(){
	var dialogTitle = "EDSA Limit";
	var dialogText = "EDSA Limitを変更します。よろしいですか？";
	WL.SimpleDialog.show(dialogTitle, dialogText, 
						[ {
							text: 'Cancel', 
						    handler: function(){
							   WL.Logger.debug("***Change EDSA Limit Canceled!***");
						    }
						  },
						  {
							text: 'OK',
							handler: invokeChangeEDSALimit
						  }
						]);
}

