var lineStops = new Array();

APP.line = function (params) {
	var viewModel = {
		loadPanel: {
            visible: ko.observable(false),
            startLoading: function() {
                viewModel.loadPanel.visible(true);
            },
            finishLoading: function() {
                viewModel.loadPanel.visible(false);
            }
        },
		goBack: function() {
			APP.app.back();
		},
		datasource: new DevExpress.data.DataSource({
			store: {
				type: "array",
				key: "id",
				data: []
			}
		}),
		itemClickAction: function(data) {
			lineStops = data.itemData.lineStops;
			APP.app.navigate("station/" + data.itemData.lineName);
		}
	};
	
	// 地图
	lineSearch(params.id, viewModel);
	
	return viewModel;
};

function lineSearch(line, view) {
	view.loadPanel.startLoading();
	
	//加载公交线路查询插件
	//实例化公交线路查询类，只取回一条路线
	mapObj.plugin(["AMap.LineSearch"], function () {
		var linesearch = new AMap.LineSearch({
				pageIndex : 1,
				city : APP.config.city,
				pageSize : 100,
				extensions : 'all'
			});
		linesearch.search(line);
		AMap.event.addListener(linesearch, "complete", function (data) {
			var lineArr = data.lineInfo;
			var lineNum = data.lineInfo.length;
			if (lineNum == 0) {
				DevExpress.ui.dialog.alert("没有查询结果", dialog_title);
			} else {
				for(var i = 0; i < lineNum; i++) {
					var lineName = lineArr[i].name;  
					var lineCity = lineArr[i].city;  
					var distance = lineArr[i].distance;  
					var company  = lineArr[i].company;  
					var stime    = lineArr[i].stime;  
					var etime    = lineArr[i].etime;  
					var pathArr  = lineArr[i].path;  
					var stops    = lineArr[i].via_stops;  
					var startPot = stops[0].location;  
					var endPot   = stops[stops.length-1].location;
					
					var lineObj = {
						lineId:"",
						lineName:"",
						lineStops: new Array()
					};
					lineObj.lineId = i;
					lineObj.lineName = lineName;
					lineObj.lineStops = stops;
					
					view.datasource.store().insert(lineObj);
				}
				
				view.datasource.load();
			}
			view.loadPanel.finishLoading();
		});
		AMap.event.addListener(linesearch, "error", function (e) {
			DevExpress.ui.dialog.alert("没有查询结果", dialog_title);
			view.loadPanel.finishLoading();
		});
	});
}