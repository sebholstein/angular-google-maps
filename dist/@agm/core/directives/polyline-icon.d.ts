import { OnInit } from '@angular/core';
/**
 * AgmPolylineIcon enables to add polyline sequences to add arrows, circle,
 * or custom icons either along the entire line, or in a specific part of it.
 * See https://developers.google.com/maps/documentation/javascript/shapes#polyline_customize
 *
 * ### Example
 * ```html
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <agm-polyline>
 *          <agm-icon-sequence [fixedRotation]="true" [path]="'FORWARD_OPEN_ARROW'">
 *          </agm-icon-sequence>
 *      </agm-polyline>
 *    </agm-map>
 * ```
 *
 * @export
 * @class AgmPolylineIcon
 */
export declare class AgmPolylineIcon implements OnInit {
    /**
     * If `true`, each icon in the sequence has the same fixed rotation regardless of the
     * angle of the edge on which it lies. Defaults to `false`, in which case each icon
     * in the sequence is rotated to align with its edge.
     *
     * @type {boolean}
     * @memberof AgmPolylineIcon
     */
    fixedRotation: boolean;
    /**
     * The distance from the start of the line at which an icon is to be rendered. This
     * distance may be expressed as a percentage of line's length (e.g. '50%') or in pixels
     * (e.g. '50px'). Defaults to '100%'.
     *
     * @type {string}
     * @memberof AgmPolylineIcon
     */
    offset: string;
    /**
     * The distance between consecutive icons on the line. This distance may be expressed as
     * a percentage of the line's length (e.g. '50%') or in pixels (e.g. '50px'). To disable
     * repeating of the icon, specify '0'. Defaults to '0'.
     *
     * @type {string}
     * @memberof AgmPolylineIcon
     */
    repeat: string;
    /**
     * The x coordinate of the position of the symbol relative to the polyline. The coordinate
     * of the symbol's path is translated _left_ by the anchor's x coordinate. By default, a
     * symbol is anchored at (0, 0). The position is expressed in the same coordinate system as the
     * symbol's path.
     *
     * @type {number}
     * @memberof AgmPolylineIcon
     */
    anchorX: number;
    /**
     * The y coordinate of the position of the symbol relative to the polyline. The coordinate
     * of the symbol's path is translated _up_ by the anchor's y coordinate. By default, a
     * symbol is anchored at (0, 0). The position is expressed in the same coordinate system as the
     * symbol's path.
     *
     * @type {number}
     * @memberof AgmPolylineIcon
     */
    anchorY: number;
    /**
     * The symbol's fill color. All CSS3 colors are supported except for extended named
     * colors. Defaults to the stroke color of the corresponding polyline.
     *
     * @type {string}
     * @memberof AgmPolylineIcon
     */
    fillColor: string;
    /**
     * The symbol's fill opacity. Defaults to 0.
     */
    fillOpacity: number;
    /**
     * The symbol's path, which is a built-in symbol path, or a custom path expressed using
     * SVG path notation. Required.
     *
     * @type {SymbolPath}
     * @memberof AgmPolylineIcon
     */
    path: 'CIRCLE' | 'BACKWARD_CLOSED_ARROW' | 'BACKWARD_OPEN_ARROW' | 'FORWARD_CLOSED_ARROW' | 'FORWARD_OPEN_ARROW' | string;
    /**
     * The angle by which to rotate the symbol, expressed clockwise in degrees.
     * Defaults to 0. A symbol where `fixedRotation` is `false` is rotated relative to
     * the angle of the edge on which it lies.
     *
     * @type {number}
     * @memberof AgmPolylineIcon
     */
    rotation: number;
    /**
     * The amount by which the symbol is scaled in size. Defaults to the stroke weight
     * of the polyline; after scaling, the symbol must lie inside a square 22 pixels in
     * size centered at the symbol's anchor.
     *
     * @type {number}
     * @memberof AgmPolylineIcon
     */
    scale: number;
    /**
     * The symbol's stroke color. All CSS3 colors are supported except for extended named
     * colors. Defaults to the stroke color of the polyline.
     *
     * @type {string}
     * @memberof AgmPolylineIcon
     */
    strokeColor: string;
    /**
     * The symbol's stroke opacity. Defaults to the stroke opacity of the polyline.
     *
     * @type {number}
     * @memberof AgmPolylineIcon
     */
    strokeOpacity: number;
    /**
     * The symbol's stroke weight. Defaults to the scale of the symbol.
     *
     * @type {number}
     * @memberof AgmPolylineIcon
     */
    strokeWeight: number;
    ngOnInit(): void;
}
