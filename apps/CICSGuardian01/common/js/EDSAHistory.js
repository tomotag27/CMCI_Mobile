function updateEDSAHistoryData(iTimeStamp, edsa_limit, edsa_threshold,
							  ecdsa_used, ecdsa_free,
							  erdsa_used, erdsa_free,
							  esdsa_used, esdsa_free,
							  eudsa_used, eudsa_free,
							  etdsa_used, etdsa_free
							  ){
	
	WL.Logger.debug("*** begin updateEDSAHistoryData ***");
	
	WL.Logger.debug("***ecdsa_used:" , ecdsa_used);
	WL.Logger.debug("***ecdsa_used:" , ecdsa_free);
	
	var ecdsa_allocated = ecdsa_used + ecdsa_free;
	var erdsa_allocated = erdsa_used + erdsa_free;
	var esdsa_allocated = esdsa_used + esdsa_free;
	var eudsa_allocated = eudsa_used + eudsa_free;
	var etdsa_allocated = etdsa_used + etdsa_free;
	
	WL.Logger.debug("***ecdsa_allocated:" , ecdsa_allocated);
	
	var edsa_total_free = edsa_limit - (ecdsa_allocated + erdsa_allocated + esdsa_allocated + eudsa_allocated + etdsa_allocated);
	
	var edsa_total_used = ecdsa_used + erdsa_used + esdsa_used + eudsa_used + etdsa_used;
	var edsa_total_allocated = ecdsa_allocated + erdsa_allocated + esdsa_allocated + eudsa_allocated + etdsa_allocated;
	
	var edsa_threshold_size = edsa_threshold * edsa_limit / 100;
	WL.Logger.debug("***edsa_threshold:", edsa_threshold);
	WL.Logger.debug("***edsa_limit:", edsa_limit);
	WL.Logger.debug("***edsa_threshold_size:", edsa_threshold_size);
	
	var edsa_total_used_ratio = Math.round(100 * edsa_total_used / edsa_limit);
	var edsa_total_allocated_ratio = Math.round(100 * edsa_total_allocated / edsa_limit);
	var edsa_total_free_ratio = Math.round(100 * edsa_total_free / edsa_limit);
	var ecdsa_used_ratio      = Math.round(100 * ecdsa_used / edsa_limit);
	var ecdsa_allocated_ratio = Math.round(100 * ecdsa_allocated / edsa_limit);
	var erdsa_used_ratio      = Math.round(100 * erdsa_used / edsa_limit);
	var erdsa_allocated_ratio = Math.round(100 * erdsa_allocated / edsa_limit);
	var esdsa_used_ratio      = Math.round(100 * esdsa_used / edsa_limit);
	var esdsa_allocated_ratio = Math.round(100 * esdsa_allocated / edsa_limit);
	var eudsa_used_ratio      = Math.round(100 * eudsa_used/ edsa_limit);
	var eudsa_allocated_ratio = Math.round(100 * eudsa_allocated / edsa_limit);
	var etdsa_used_ratio      = Math.round(100 * etdsa_used/ edsa_limit);
	var etdsa_allocated_ratio = Math.round(100 * etdsa_allocated / edsa_limit);
	
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
	
	$('#history_edsa_time_stamp').text("Time: "+ history_strTimeStamp);
	$('#history_edsa_total_limit').text("EDSA Limit: "+ addFigure(edsa_limit) + " bytes");
	$('#history_edsa_threshold').text("Threshold: " + edsa_threshold + "%   (" + addFigure(edsa_threshold_size) + " bytes)");
	$('#history_edsa_total_used').text(addFigure(edsa_total_used) + " bytes (" + edsa_total_used_ratio + "%)");
	$('#history_edsa_total_allocated').text(addFigure(edsa_total_allocated) + " bytes (" + edsa_total_allocated_ratio + "%)");
	$('#history_ecdsa_used').text(addFigure(ecdsa_used) + " bytes (" + ecdsa_used_ratio + "%)");
	$('#history_ecdsa_allocated').text(addFigure(ecdsa_allocated) + " bytes (" + ecdsa_allocated_ratio + "%)");
	$('#history_erdsa_used').text(addFigure(erdsa_used) + " bytes (" + erdsa_used_ratio + "%)");
	$('#history_erdsa_allocated').text(addFigure(erdsa_allocated) + " bytes (" + erdsa_allocated_ratio + "%)");
	$('#history_esdsa_used').text(addFigure(esdsa_used) + " bytes (" + esdsa_used_ratio + "%)");
	$('#history_esdsa_allocated').text(addFigure(esdsa_allocated) + " bytes (" + esdsa_allocated_ratio + "%)");
	$('#history_eudsa_used').text(addFigure(eudsa_used) + " bytes (" + eudsa_used_ratio + "%)");
	$('#history_eudsa_allocated').text(addFigure(eudsa_allocated) + " bytes (" + eudsa_allocated_ratio + "%)");
	$('#history_etdsa_used').text(addFigure(etdsa_used) + " bytes (" + etdsa_used_ratio + "%)");
	$('#history_etdsa_allocated').text(addFigure(etdsa_allocated) + " bytes (" + etdsa_allocated_ratio + "%)");
	$('#history_edsa_total_free').text(addFigure(edsa_total_free) + " bytes (" + edsa_total_free_ratio + "%)");
	
	WL.Logger.debug("*** end updateEDSAHistoryData ***");
}

function drawEDSAHistory(edsa_limit, edsa_threshold,
						ecdsa_used, ecdsa_free,
					    erdsa_used, erdsa_free,
					    esdsa_used, esdsa_free,
					    eudsa_used, eudsa_free,	
					    etdsa_used, etdsa_free
					    ){
	$("#graphEDSAHistory").empty();
	WL.Logger.debug("****** begin drawEDSAHistory*****");
	var container = document.getElementById("graphEDSAHistory");
	
	WL.Logger.debug("*** ecdsa_used.stacked:" , ecdsa_used.stacked);
	WL.Logger.debug("*** ecdsa_free.stacked:" , ecdsa_free.stacked);
	WL.Logger.debug("*** erdsa_used.stacked:" , erdsa_used.stacked);
	WL.Logger.debug("*** erdsa_free.stacked:" , erdsa_free.stacked);
	WL.Logger.debug("*** esdsa_used.stacked:" , esdsa_used.stacked);
	WL.Logger.debug("*** esdsa_free.stacked:" , esdsa_free.stacked);
	WL.Logger.debug("*** eudsa_used.stacked:" , eudsa_used.stacked);
	WL.Logger.debug("*** eudsa_free.stacked:" , eudsa_free.stacked);
	WL.Logger.debug("*** etdsa_used.stacked:" , etdsa_used.stacked);
	WL.Logger.debug("*** etdsa_free.stacked:" , etdsa_free.stacked);


	WL.Logger.debug(">>> edsa_threshold: " , edsa_threshold);
	WL.Logger.debug(">>> edsa_limit: " , edsa_limit);
	
	var record_length = edsa_limit.length;
	

	var default_show = true,
		default_stacked = true,
		default_horizontal = true,
		default_barWidth = 1.5,
		default_lineWidth = 1,
		default_shadowSize = 0.1,
		ecdsa_used_color = "#ffff66",
		ecdsa_free_color = "#888855",
		erdsa_used_color = "#cc66cc",
		erdsa_free_color = "#885588",
		esdsa_used_color = "#ffcc00",
		esdsa_free_color = "#887700",
		eudsa_used_color = "#6666cc",
		eudsa_free_color = "#555588",
		etdsa_used_color = "#cc6666",
		etdsa_free_color = "#885555",
		edsa_total_free_color = "#777777",
		default_background_color = "#333333",
		default_tick_color = "#eeeeee",
		default_used_Opacity = 1,
		default_free_Opacity = 1,
		edsa_threshold_color = "#ffff00",
		default_isStacked = false;

	var ecdsa_used_line = {
			data: ecdsa_used.stacked,
			lines: {
				color: ecdsa_used_color,
				show: true,
				stacked: default_isStacked,
				fill: true,
				fillBorder: false,
				fillColor: ecdsa_used_color,
				fillOpacity: default_used_Opacity
			},
	        points: {
	            show: true,
	            radius: 2,
	            lineWidth: 1,
	            color: ecdsa_used_color,
	            fill: true,
	            fillColor: ecdsa_used_color, 
	            fillOpacity: 1
	        }
	};
	
	var ecdsa_free_line = {
			data: ecdsa_free.stacked,
			lines: {
				color: ecdsa_free_color,
				show: true,
				stacked: default_isStacked,
				fill: true,
				fillBorder: false,
				fillColor: ecdsa_free_color,
				fillOpacity: default_free_Opacity
			},
	        points: {
	            show: true,
	            radius: 2,
	            lineWidth: 1,
	            color: ecdsa_free_color,
	            fill: true,
	            fillColor: ecdsa_free_color, 
	            fillOpacity: 1
	        }
	};
	
	var erdsa_used_line = {
			data: erdsa_used.stacked,
			lines: {
				color: erdsa_used_color,
				show: true,
				stacked: default_isStacked,
				fill: true,
				fillBorder: false,
				fillColor: erdsa_used_color,
				fillOpacity: default_used_Opacity
			},
	        points: {
	            show: true,
	            radius: 2,
	            lineWidth: 1,
	            color: erdsa_used_color,
	            fill: true,
	            fillColor: erdsa_used_color, 
	            fillOpacity: 1
	        }
	};
	
	var erdsa_free_line = {
			data: erdsa_free.stacked,
			lines: {
				color: erdsa_free_color,
				show: true,
				stacked: default_isStacked,
				fill: true,
				fillBorder: false,
				fillColor: erdsa_free_color,
				fillOpacity: default_free_Opacity
			},
			points: {
	            show: true,
	            radius: 2,
	            lineWidth: 1,
	            color: erdsa_free_color,
	            fill: true,
	            fillColor: erdsa_free_color, 
	            fillOpacity: 1
	        }
	};
	
	var esdsa_used_line = {
			data: esdsa_used.stacked,
			lines: {
				color: esdsa_used_color,
				show: true,
				stacked: default_isStacked,
				fill: true,
				fillBorder: false,
				fillColor: esdsa_used_color,
				fillOpacity: default_used_Opacity
			},
	        points: {
	            show: true,
	            radius: 2,
	            lineWidth: 1,
	            color: esdsa_used_color,
	            fill: true,
	            fillColor: esdsa_used_color, 
	            fillOpacity: 1
	        }
	};
	
	var esdsa_free_line = {
			data: esdsa_free.stacked,
			lines: {
				color: esdsa_free_color,
				show: true,
				stacked: default_isStacked,
				fill: true,
				fillBorder: false,
				fillColor: esdsa_free_color,
				fillOpacity: default_free_Opacity
			},
	        points: {
	            show: true,
	            radius: 2,
	            lineWidth: 1,
	            color: esdsa_free_color,
	            fill: true,
	            fillColor: esdsa_free_color, 
	            fillOpacity: 1
	        }
	};

	var eudsa_used_line = {
			data: eudsa_used.stacked,
			lines: {
				color: eudsa_used_color,
				show: true,
				stacked: default_isStacked,
				fill: true,
				fillBorder: false,
				fillColor: eudsa_used_color,
				fillOpacity: default_used_Opacity
			},
	        points: {
	            show: true,
	            radius: 2,
	            lineWidth: 1,
	            color: eudsa_used_color,
	            fill: true,
	            fillColor: eudsa_used_color, 
	            fillOpacity: 1
	        }
	};
			
	var eudsa_free_line = {
			data: eudsa_free.stacked,
			lines: {
				color: eudsa_free_color,
				show: true,
				stacked: default_isStacked,
				fill: true,
				fillBorder: false,
				fillColor: eudsa_free_color,
				fillOpacity: default_free_Opacity
			},
	        points: {
	            show: true,
	            radius: 2,
	            lineWidth: 1,
	            color: eudsa_free_color,
	            fill: true,
	            fillColor: eudsa_free_color, 
	            fillOpacity: 1
	        }
	};

	var etdsa_used_line = {
			data: etdsa_used.stacked,
			lines: {
				color: etdsa_used_color,
				show: true,
				stacked: default_isStacked,
				fill: true,
				fillBorder: false,
				fillColor: etdsa_used_color,
				fillOpacity: default_used_Opacity
			},
	        points: {
	            show: true,
	            radius: 2,
	            lineWidth: 1,
	            color: etdsa_used_color,
	            fill: true,
	            fillColor: etdsa_used_color, 
	            fillOpacity: 1
	        }
	};
			
	var etdsa_free_line = {
			data: etdsa_free.stacked,
			lines: {
				color: etdsa_free_color,
				show: true,
				stacked: default_isStacked,
				fill: true,
				fillBorder: false,
				fillColor: etdsa_free_color,
				fillOpacity: default_free_Opacity
			},
	        points: {
	            show: true,
	            radius: 2,
	            lineWidth: 1,
	            color: etdsa_free_color,
	            fill: true,
	            fillColor: etdsa_free_color, 
	            fillOpacity: 1
	        }
	};
	
	var edsa_total_free_line = {
			data: edsa_limit,
			lines: {
				color: edsa_total_free_color,
				show: true,
				stacked: default_isStacked,
				fill: true,
				fillBorder: false,
				fillColor: edsa_total_free_color,
				fillOpacity: default_free_Opacity
			},
	        points: {
	            show: false
	        }
	};
	
	var edsa_threshold_line = {
			data: edsa_threshold.stacked,
			lines: {
				color: edsa_threshold_color,
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
				max: edsa_limit[record_length-1][0] + ((edsa_limit[record_length-1][0] - edsa_limit[0][0]) * 0.05),
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
				  WL.Logger.debug("***ecdsa_used.stacked[obj.index]:",ecdsa_used.stacked[obj.index]);
				  WL.Logger.debug("***ecdsa_used.stacked[obj.index][1]:",ecdsa_used.stacked[obj.index][1]);
				  updateEDSAHistoryData(obj.x, edsa_limit[obj.index][1], edsa_threshold.original[obj.index][1],
						  			   ecdsa_used.original[obj.index][1], ecdsa_free.original[obj.index][1],
						    		   erdsa_used.original[obj.index][1], erdsa_free.original[obj.index][1],
						    		   esdsa_used.original[obj.index][1], esdsa_free.original[obj.index][1],
						    		   eudsa_used.original[obj.index][1], eudsa_free.original[obj.index][1],
						    		   etdsa_used.original[obj.index][1], etdsa_free.original[obj.index][1]
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

        $("#graphEDSAHistory").empty();
        // Return a new graph.
        return  Flotr.draw(container, [ edsa_total_free_line,
                	                    etdsa_free_line,
            	                        etdsa_used_line,
                	                    eudsa_free_line,
            	                        eudsa_used_line,
            	                        esdsa_free_line,
            	                        esdsa_used_line,
            	                        erdsa_free_line,
            	                        erdsa_used_line,
            	                        ecdsa_free_line,
            	                        ecdsa_used_line,
            	                        edsa_threshold_line,
            	                        focus_line
            	                        ],  options);
    }
    

	var xmax = edsa_limit[record_length-1][0];
	var ymax = edsa_limit[record_length-1][1];
	var focus_data = [[xmax, 0], [xmax, ymax]];
	WL.Logger.debug("*** focus_data:", focus_data);    
    graph = drawGraph(focus_data);
	
      var index = edsa_limit.length - 1;
	  updateEDSAHistoryData(edsa_limit[index][0], edsa_limit[index][1], edsa_threshold.original[index][1],
			   			   ecdsa_used.original[index][1], ecdsa_free.original[index][1],
				   		   erdsa_used.original[index][1], erdsa_free.original[index][1],
				   		   esdsa_used.original[index][1], esdsa_free.original[index][1],
				   		   eudsa_used.original[index][1], eudsa_free.original[index][1],
				   		   etdsa_used.original[index][1], etdsa_free.original[index][1]
				   		   );
	  
	    Flotr.EventAdapter.observe(container, 'flotr:click', function(obj) {
	        
	    	WL.Logger.debug("*** flotr:click, obj:",obj);
	    	var nearest_index = 0;
	    	var nearest_time1 = edsa_limit[0][0];
	    	var nearest_time2 = edsa_limit[0][0];
	    	var i;
	    	for (i = 1; i < edsa_limit.length; i++){
	    		if (edsa_limit[i][0] > obj.x ) {
	    			nearest_time1 = edsa_limit[i-1][0];
	    			nearest_time2 = edsa_limit[i][0];
	    			break;
	    		}
	    	}
	    	if (i >= edsa_limit.length){
	    		nearest_index = i-1;
	    		WL.Logger.debug(">>>flag1:", nearest_index);
	    	} else if ((obj.x - nearest_time1) < (nearest_time2 - obj.x)){
	    		nearest_index = i-1;
	    		WL.Logger.debug(">>>flag2:", nearest_index);
	    	} else {
	    		nearest_index = i;
	    		WL.Logger.debug(">>>flag3:", nearest_index);
	    	}
	    	WL.Logger.debug("*** nearest_index:", nearest_index);
	    	var selected_x = edsa_limit[nearest_index][0];
	    	focus_data = [[selected_x, 0], [selected_x, ymax]];	
	    	
	    	graph = drawGraph(focus_data);
	    	index = nearest_index;
	    	updateEDSAHistoryData(edsa_limit[index][0], edsa_limit[index][1], edsa_threshold.original[index][1],
		   			   ecdsa_used.original[index][1], ecdsa_free.original[index][1],
			   		   erdsa_used.original[index][1], erdsa_free.original[index][1],
			   		   esdsa_used.original[index][1], esdsa_free.original[index][1],
			   		   eudsa_used.original[index][1], eudsa_free.original[index][1],
			   		   etdsa_used.original[index][1], etdsa_free.original[index][1]
			   		   );	    	
	    });
	WL.Logger.debug("****** end drawEDSAHistory*****");
}

function clearEDSAHsitoryField(){
	$("#graphEDSAHistory").empty();
	
	var default_message = "unknown";
	
	$('#history_edsa_time_stamp').text("Time: "+ default_message);
	$('#history_edsa_total_limit').text("EDSA Limit: " + default_message);
	$('#history_edsa_threshold').text("Threshold: " + default_message);
	$('#history_edsa_total_used').text(default_message);
	$('#history_edsa_total_allocated').text(default_message);
	$('#history_ecdsa_used').text(default_message);
	$('#history_ecdsa_allocated').text(default_message);
	$('#history_erdsa_used').text(default_message);
	$('#history_erdsa_allocated').text(default_message);
	$('#history_esdsa_used').text(default_message);
	$('#history_esdsa_allocated').text(default_message);
	$('#history_eudsa_used').text(default_message);
	$('#history_eudsa_allocated').text(default_message);
	$('#history_etdsa_used').text(default_message);
	$('#history_etdsa_allocated').text(default_message);
	$('#history_edsa_total_free').text(default_message);
	
}

function displayEDSAHistoryField(){
	WL.Logger.debug("*** begin displayEDSAHistoryField ***");
	
	$('#Tab_DSAHistory').removeClass('ui-btn-active');
	//$('#Tab_EDSAHistory').removeClass('ui-btn-active ui-state-persist');
	$('#Tab_GDSAHistory').removeClass('ui-btn-active');
	$('#Tab_EDSAHistory').addClass('ui-btn-active');
	
	activeStorageTab = 'EDSA';

	$('.tabContents').hide();
	//$('#TabContents_EDSAHistory').fadeIn();
	$('#TabContents_EDSAHistory').show();
	//$('#Tab_DSAHistory').addClass('ui-btn-active ui-state-persist');

	
	if (isLoadStorageHistorySuccess) {
		
		drawEDSAHistory(storageHistory.edsa_limit, storageHistory.edsa_threshold,
				   storageHistory.ecdsa_used, storageHistory.ecdsa_free,
				   storageHistory.erdsa_used, storageHistory.erdsa_free,
				   storageHistory.esdsa_used, storageHistory.esdsa_free,
				   storageHistory.eudsa_used, storageHistory.eudsa_free,
				   storageHistory.etdsa_used, storageHistory.etdsa_free
				   );
					 
	} else {
		clearEDSAHistoryField();
	}
	

	WL.Logger.debug("*** end displayEDSAHistoryField ***");
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


