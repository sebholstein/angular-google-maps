import { Circle, ControlPosition, Marker, Polygon, Polyline, Rectangle } from '@agm/core/services/google-maps-types';
export declare enum OverlayType {
    CIRCLE = "circle",
    MARKER = "marker",
    POLYGONE = "polygon",
    POLYLINE = "polyline",
    RECTANGE = "rectangle"
}
export interface DrawingControlOptions {
    drawingModes?: OverlayType[];
    position?: ControlPosition;
}
export interface OverlayCompleteEvent {
    overlay: Marker | Polygon | Polyline | Rectangle | Circle;
    type: OverlayType;
}
