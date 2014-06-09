APP.home = function (params) {
	var viewModel = {
		input: {
			line: ko.observable('')
		},
		searchLine: function() {
			var line = this.input.line();
			if (line.length == 0) {
				DevExpress.ui.dialog.alert("请输入线路名称", dialog_title);
			} else {
				APP.app.navigate("line/" + this.input.line());
			}
		},
		transition: function() {
			APP.app.navigate("transition/");
		}
	};
	return viewModel;
};
