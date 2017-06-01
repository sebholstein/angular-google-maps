export var google;
/**
 * Identifiers used to specify the placement of controls on the map. Controls are
 * positioned relative to other controls in the same layout position. Controls that
 * are added first are positioned closer to the edge of the map.
 */
export var ControlPosition;
(function (ControlPosition) {
    ControlPosition[ControlPosition["BOTTOM_CENTER"] = 0] = "BOTTOM_CENTER";
    ControlPosition[ControlPosition["BOTTOM_LEFT"] = 1] = "BOTTOM_LEFT";
    ControlPosition[ControlPosition["BOTTOM_RIGHT"] = 2] = "BOTTOM_RIGHT";
    ControlPosition[ControlPosition["LEFT_BOTTOM"] = 3] = "LEFT_BOTTOM";
    ControlPosition[ControlPosition["LEFT_CENTER"] = 4] = "LEFT_CENTER";
    ControlPosition[ControlPosition["LEFT_TOP"] = 5] = "LEFT_TOP";
    ControlPosition[ControlPosition["RIGHT_BOTTOM"] = 6] = "RIGHT_BOTTOM";
    ControlPosition[ControlPosition["RIGHT_CENTER"] = 7] = "RIGHT_CENTER";
    ControlPosition[ControlPosition["RIGHT_TOP"] = 8] = "RIGHT_TOP";
    ControlPosition[ControlPosition["TOP_CENTER"] = 9] = "TOP_CENTER";
    ControlPosition[ControlPosition["TOP_LEFT"] = 10] = "TOP_LEFT";
    ControlPosition[ControlPosition["TOP_RIGHT"] = 11] = "TOP_RIGHT";
})(ControlPosition || (ControlPosition = {}));
export var MapTypeId;
(function (MapTypeId) {
    /** This map type displays a transparent layer of major streets on satellite images. */
    MapTypeId[MapTypeId["HYBRID"] = 0] = "HYBRID";
    /** This map type displays a normal street map. */
    MapTypeId[MapTypeId["ROADMAP"] = 1] = "ROADMAP";
    /** This map type displays satellite images. */
    MapTypeId[MapTypeId["SATELLITE"] = 2] = "SATELLITE";
    /** This map type displays maps with physical features such as terrain and vegetation. */
    MapTypeId[MapTypeId["TERRAIN"] = 3] = "TERRAIN";
})(MapTypeId || (MapTypeId = {}));
export var MapTypeControlStyle;
(function (MapTypeControlStyle) {
    MapTypeControlStyle[MapTypeControlStyle["DEFAULT"] = 0] = "DEFAULT";
    MapTypeControlStyle[MapTypeControlStyle["DROPDOWN_MENU"] = 1] = "DROPDOWN_MENU";
    MapTypeControlStyle[MapTypeControlStyle["HORIZONTAL_BAR"] = 2] = "HORIZONTAL_BAR";
})(MapTypeControlStyle || (MapTypeControlStyle = {}));
export var ScaleControlStyle;
(function (ScaleControlStyle) {
    ScaleControlStyle[ScaleControlStyle["DEFAULT"] = 0] = "DEFAULT";
})(ScaleControlStyle || (ScaleControlStyle = {}));
export var ZoomControlStyle;
(function (ZoomControlStyle) {
    ZoomControlStyle[ZoomControlStyle["DEFAULT"] = 0] = "DEFAULT";
    ZoomControlStyle[ZoomControlStyle["LARGE"] = 1] = "LARGE";
    ZoomControlStyle[ZoomControlStyle["SMALL"] = 2] = "SMALL";
})(ZoomControlStyle || (ZoomControlStyle = {}));
//# sourceMappingURL=google-maps-types.js.map