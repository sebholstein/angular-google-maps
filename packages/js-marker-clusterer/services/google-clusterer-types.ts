export interface CalculatorResult {
  text: string;
  index: number;
}

export type CalculateFunction = (marker: google.maps.Marker[], count: number) => CalculatorResult;

export interface MarkerClustererInstance extends google.maps.MVCObject {
  zoomOnClick_: boolean;
  averageCenter_: boolean;
  imagePath_: string;
  minimumClusterSize_: number;
  imageExtension_: string;
  new(map: google.maps.Map, marker: google.maps.Marker[], options: ClusterOptions): MarkerClustererInstance;
  addMarker(marker: google.maps.Marker, noDraw?: boolean): void;
  addMarkers(markers: google.maps.Marker[], noDraw?: boolean): void;
  clearMarkers(): void;
  getCalculator(): CalculateFunction;
  getExtendedBounds(bounds: google.maps.LatLngBounds): google.maps.LatLngBounds;
  getGridSize(): number;
  getMap(): google.maps.Map;
  getMarkers(): google.maps.Marker[];
  getStyles(): ClusterStyle;
  getTotalClusters(): number;
  getTotalMarkers(): google.maps.Marker[];
  isZoomOnClick(): boolean;
  redraw(): void;
  removeMarker(marker: google.maps.Marker): boolean;
  resetViewport(): void;
  setCalculator(calculator: CalculateFunction): void;
  setGridSize(size: number): void;
  setMap(map: google.maps.Map): void;
  setMaxZoom(maxZoom: number): void;
  setStyles(styles: ClusterStyle[]): void;
}

export interface ClusterOptions {
  /**
   * The grid size of a cluster in pixels.
   */
  gridSize?: number;

  /**
   * The maximum zoom level that a marker can be part of a cluster.
   */
  maxZoom?: number;

  /**
   * Whether the default behaviour of clicking on a cluster is to zoom into it.
   */
  zoomOnClick?: boolean;

  /**
   * Whether the center of each cluster should be the average of all markers in the cluster.
   */
  averageCenter?: boolean;

  /**
   * The minimum number of markers to be in a cluster before the markers are hidden and a count is shown.
   */
  minimumClusterSize?: number;

  /**
   * An object that has style properties.
   */
  styles?: ClusterStyle[];

  imagePath?: string;
  imageExtension?: string;
  calculator?: CalculateFunction;
}

export interface ClusterStyle {
  /**
   * The image url.
   */
  url?: string;

  /**
   * The image height.
   */
  height?: number;

  /**
   * The image width.
   */
  width?: number;

  /**
   * The anchor position of the label text.
   */
  anchor?: [number, number];

  /**
   * The text color.
   */
  textColor?: string;

  /**
   * The text size.
   */
  textSize?: number;

  /**
   * The position of the backgound x, y.
   */
  backgroundPosition?: string;

  /**
   * The anchor position of the icon x, y.
   */
  iconAnchor?: [number, number];
}
