var startPlace;

APP.transitionStart = function (params) {
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
			startPlace = data.itemData;
			APP.app.navigate("transitionEnd/" + place[1]);
		}
	};
	
	var place = params.id.split(",");
	showStartPlaces(viewModel, place[0]);
	
	return viewModel;
};

function showStartPlaces(view, start) {
	view.loadPanel.startLoading();
	var MSearch;  
	mapObj.plugin(["AMap.PlaceSearch"], function() {
		MSearch = new AMap.PlaceSearch({ //构造地点查询类
			pageIndex:1,
			pageSize:100,
			city:APP.config.city //城市
		});
		AMap.event.addListener(MSearch, "complete", function(data) {
			var poiArr = data.poiList.pois;
			for (var i = 0 ; i < poiArr.length ; i++) {
				var placeName = poiArr[i].name;
				var placeLng = poiArr[i].location.getLng();
				var placeLat = poiArr[i].location.getLat();
				
				var placeObj = {
					placeName: placeName,
					placeLng: placeLng,
					placeLat: placeLat
				};
				
				view.datasource.store().insert(placeObj);
			}
			
			view.datasource.load();
			view.loadPanel.finishLoading();
		});//返回地点查询结果
		MSearch.search(start); //关键字查询
	});
}