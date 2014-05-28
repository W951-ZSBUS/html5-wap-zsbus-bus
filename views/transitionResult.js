var transPlan;

APP.transitionResult = function (params) {
	var viewModel = {
		goBack: function() {
			APP.app.back();
		},
		loadPanel: {
            visible: ko.observable(false),
            startLoading: function() {
                viewModel.loadPanel.visible(true);
            },
            finishLoading: function() {
                viewModel.loadPanel.visible(false);
            }
        },
		datasource: new DevExpress.data.DataSource(),
		itemClickAction: function(data) {
			transPlan = data.itemData.transPlans;
			APP.app.navigate("transitionInfo/" + data.itemData.transName);
		}
	};
	
	transferRoute(viewModel);
	
	return viewModel;
};

function transferRoute(view) {
	view.loadPanel.startLoading();
	var trans;
    //加载公交换乘插件
    mapObj.plugin(["AMap.Transfer"], function() { 
        transOptions = {
            city: APP.config.city, //公交城市
            policy: AMap.TransferPolicy.LEAST_TIME //乘车策略
        };
        //构造公交换乘类
        trans = new AMap.Transfer (transOptions);
        //返回导航查询结果
        AMap.event.addListener(trans, "complete", function(data) {
			var btPlans = data.plans;
			
			if (btPlans.length == 0) {
				DevExpress.ui.dialog.alert("没有查询结果", dialog_title);
			} else {
				for (var i = 0 ; i < btPlans.length ; i++) {
					var transObj = {
						transName: "方案" + (i + 1) + "-" + Getdistance(btPlans[i].distance),
						transPlans: btPlans[i]
					};
					view.datasource.store().insert(transObj);
				}
			}
			
			view.datasource.load();
			view.loadPanel.finishLoading();
		});
        //显示错误信息
        AMap.event.addListener(trans, "error", function(e) {
			DevExpress.ui.dialog.alert("没有查询结果", dialog_title);
			view.loadPanel.finishLoading();
		});
        //根据起、终点坐标查询公交换乘路线
        trans.search(new AMap.LngLat(startPlace.placeLng, startPlace.placeLat), new AMap.LngLat(endPlace.placeLng, endPlace.placeLat));
    });
}

//距离，米换算为千米  
function Getdistance(len) {  
    if (len <= 1000) {  
        var s = len;  
        return s + "米";  
    } else {  
        var s = Math.round(len / 1000);  
        return "约" + s + "公里";  
    }  
}