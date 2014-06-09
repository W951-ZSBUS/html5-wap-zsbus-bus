APP.station = function (params) {
	var lineName = params.id;
//	var startEnd = lineName.substring(lineName.indexOf("(") + 1, lineName.indexOf(")"));
//	var stations = startEnd.split("--");
	
	var viewModel = {
		title: ko.observable(lineName),
		goBack: function() {
			APP.app.back();
		},
		datasource: new DevExpress.data.DataSource([])
	};
	
	for (var i = 0; i < lineStops.length; i++) {
		var stationObj = {
			stationId:"",
			stationName:""
		};
		stationObj.stationId = i + 1;
		stationObj.stationName = lineStops[i].name;
		
		viewModel.datasource.store().insert(stationObj);
	}
	
	return viewModel;
};