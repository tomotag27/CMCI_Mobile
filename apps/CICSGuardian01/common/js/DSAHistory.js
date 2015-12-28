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
    					+ date_format(history_date.getMonth()+1) + "/"
    					+ date_format(history_date.getDate()) + "-" 
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
	WL.Logger.debug("****** begin drawDSAHistory*****");
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
	WL.Logger.debug(">>> record_length: " , record_length);
	

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
	    	for (i = 1; i < dsa_limit.length  ; i++){
	    		if (dsa_limit[i][0] > obj.x ) {
	    			nearest_time1 = dsa_limit[i-1][0];
	    			nearest_time2 = dsa_limit[i][0];
	    			break;
	    		}
	    	}
	    	if (i >= dsa_limit.length) {
	    		nearest_index = i-1;
	    		WL.Logger.debug(">>>flag1:", nearest_index);
	    	} else 	if ((obj.x - nearest_time1) < (nearest_time2 - obj.x)){
	    		nearest_index = i-1;
	    		WL.Logger.debug(">>>flag2:", nearest_index);
	    	} else {
	    		nearest_index = i;
	    		WL.Logger.debug(">>>flag3:", nearest_index);
	    	}

	    	WL.Logger.debug("*** nearest_index:", nearest_index);
	    	WL.Logger.debug(">>>dsa_limit:", dsa_limit);
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

function clearDSAHsitoryField(){
	$("#graphDSAHistory").empty();
	
	var default_message = "unknown";
	
	$('#history_dsa_time_stamp').text("Time: "+ default_message);
	$('#history_dsa_total_limit').text("DSA Limit: " + default_message);
	$('#history_dsa_threshold').text("Threshold: " + default_message);
	$('#history_dsa_total_used').text(default_message);
	$('#history_dsa_total_allocated').text(default_message);
	$('#history_cdsa_used').text(default_message);
	$('#history_cdsa_allocated').text(default_message);
	$('#history_rdsa_used').text(default_message);
	$('#history_rdsa_allocated').text(default_message);
	$('#history_sdsa_used').text(default_message);
	$('#history_sdsa_allocated').text(default_message);
	$('#history_udsa_used').text(default_message);
	$('#history_udsa_allocated').text(default_message);
	$('#history_dsa_total_free').text(default_message);
	
}

function displayDSAHistoryField(){
	WL.Logger.debug("*** begin displayDSAHistoryField ***");
	
	//$('#Tab_DSAHistory').removeClass('ui-btn-active ui-state-persist');
	$('#Tab_EDSAHistory').removeClass('ui-btn-active');
	$('#Tab_GDSAHistory').removeClass('ui-btn-active');
	$('#Tab_DSAHistory').addClass('ui-btn-active');
	
	activeStorageTab = 'DSA';

	$('.tabContents').hide();
	//$('#TabContents_DSAHistory').fadeIn();
	$('#TabContents_DSAHistory').show();
	//$('#Tab_DSAHistory').addClass('ui-btn-active ui-state-persist');

	
	if (isLoadStorageHistorySuccess) {
		
		drawDSAHistory(storageHistory.dsa_limit, storageHistory.dsa_threshold,
				   storageHistory.cdsa_used, storageHistory.cdsa_free,
				   storageHistory.rdsa_used, storageHistory.rdsa_free,
				   storageHistory.sdsa_used, storageHistory.sdsa_free,
				   storageHistory.udsa_used, storageHistory.udsa_free
				   );
					   
	} else {
		clearDSAHistoryField();
	}
	

	WL.Logger.debug("*** end displayDSAHistoryField ***");
}









/****************** for TEST ******************************************/

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
    	         + date_format(date.getMonth()+1) + "/"
    	         + date_format(date.getDate()) + "-" 
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


