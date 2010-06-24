/**
* @author Dave Taylor (@davetayls)
* @url http://the-taylors.org/jQueryPlugins/jquery.jqmaps/
*/
(function ($) {
    var mapHolder;
    var map;
    var maps = {};

    var getIcon = function (suffix) {
        var genericIcon = new GIcon(G_DEFAULT_ICON);
        genericIcon.image = "/images/map-marker" + suffix + ".png";
        genericIcon.shadow = "";
        genericIcon.iconSize = new GSize(39, 46);
        genericIcon.iconAnchor = new GPoint(22, 39);
        genericIcon.imageMap = [0, 0, 39, 0, 39, 46, 0, 46];
        genericIcon.infoWindowAnchor = new GPoint(9, 2);
        return genericIcon;
    };
    brc.maps = {
        init: function () {
            if (typeof (GBrowserIsCompatible) != 'undefined' && GBrowserIsCompatible()) {
                $(".cp-map").each(function () {
                    var self = $(this);
                    var mapHolder = self.find("> .cp-map-container").get(0);
                    var mapPins$ = self.find(">.cp-map-pins");

                    self.addClass("cp-map-applied")
                        .addClass("cp-map-loading");
                    $(mapHolder).addClass("cp-map-container-applied");

                    // get pins
                    var pins = [];
                    mapPins$
                    .addClass("accessibility-item")
                    .find("li").each(function (i) {
                        var pin$ = $(this);
                        pin$.find(".cp-map-pinLink").remove();
                        var pinOptions = {};
                        pinOptions.lat = pin$.find(">.geo>.latitude").text();
                        pinOptions.lon = pin$.find(">.geo>.longitude").text();
                        if (pinOptions) {
                            var latlng = new GLatLng(pinOptions.lat, pinOptions.lon);
                            var iconSuffix = '-' + ('00' + (i + 1).toString()).substr((i + 1).toString().length - 3, 2);
                            var newGmarker = new GMarker(latlng, { icon: getIcon(iconSuffix) });
                            newGmarker.showTheInfoWindow = function () {
                                this.openExtInfoWindow(map, "cp-map-window", pin$.html(), { beakOffset: 10 });
                                map.getExtInfoWindow().resize();
                            };
                            if (pin$.children().length > 2) {
                                GEvent.addListener(newGmarker, "click", function () {
                                    newGmarker.showTheInfoWindow();
                                });
                            }
                            pins.push(newGmarker);
                        }
                    });

                    // generate map
                    var map = new GMap2(mapHolder);
                    if (self.attr('id')) maps[self.attr('id')] = { 'gmap': map, 'pins': pins };
                    var centerOptions = {};
                    centerOptions.lat = self.find(">.geo>.latitude").text();
                    centerOptions.lon = self.find(">.geo>.longitude").text();
                    centerOptions.zoom = parseInt(self.find(">.geo>.zoom").text());
                    if (centerOptions) {
                        var latlng = new GLatLng(centerOptions.lat, centerOptions.lon);
                        map.setCenter(latlng, centerOptions.zoom);
                        map.setUIToDefault();
                        $(pins).each(function () {
                            map.addOverlay(this);
                        });
                    }

                    self.removeClass("cp-map-loading")
                        .addClass("cp-map-loaded");

                });
            }
        },
        getMap: function (mapid) { return maps[mapid]; },
        setCenter: function (mapid, latlong) {
            var latlng = new GLatLng(latlong[0], latlong[1]);
            maps[mapid].gmap.panTo(latlng);
        }
    };

})(jQuery);