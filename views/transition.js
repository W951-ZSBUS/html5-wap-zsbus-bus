APP.transition = function (params) {
	var viewModel = {
		input: {
			start: ko.observable(''),
			end: ko.observable('')
		},
		goBack: function() {
			APP.app.back();
		},
		placeSearch: function() {
			var start = this.input.start();
			var end = this.input.end();
			
			if (start.length == 0) {
				DevExpress.ui.dialog.alert("请输入起点名称", dialog_title);
				return;
			} else if (end.length == 0) {
				DevExpress.ui.dialog.alert("请输入终点名称", dialog_title);
				return;
			}
			
			APP.app.navigate("transitionStart/" + start + "," + end);
		}
	};
	return viewModel;
};