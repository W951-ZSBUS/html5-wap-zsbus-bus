APP.transitionInfo = function (params) {
	var viewModel = {
		title: ko.observable(params.id),
		goBack: function() {
			APP.app.back();
		},
		datasource: new DevExpress.data.DataSource(),
		itemClickAction: function(data) {
			DevExpress.ui.dialog.alert(data.itemData.planName, dialog_title);
		}
	};
	
	showPlans(viewModel);
	
	return viewModel;
};

function showPlans(view) {
    var btseg = transPlan.segments;
	for(var j = 0; j < btseg.length; j++) {
		var planObj = {
			planName: btseg[j].instruction
		};
		view.datasource.store().insert(planObj);
	}
}