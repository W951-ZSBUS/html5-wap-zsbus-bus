window.APP = window.APP || {};

var mapObj;
var resLine = '';

$(function() {
    APP.app = new DevExpress.framework.html.HtmlApplication({
        namespace: APP,
		disableViewCache: true,
        navigationType: "empty"
    });
    APP.app.router.register(":view/:id", { view: "home", id: undefined });
    APP.app.navigate();
	
	// 国际化
	
	jQuery.i18n.properties({
		name: 'lang', 
		path: 'locale/', 
		mode: 'both',
		language: jQuery.i18n.browserLang(), 
		callback: function() {
			
		}
	});
	
	// 初始化地图
	
	var opts = {
		level : 13, //设置地图缩放级别
		center : new AMap.LngLat(113.22, 22.31) //设置地图中心点
	}
	mapObj = new AMap.Map("iCenter", opts);
});