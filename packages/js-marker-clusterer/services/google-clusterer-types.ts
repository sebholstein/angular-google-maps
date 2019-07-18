import { Marker, GoogleMap, LatLngBounds, LatLng } from '@agm/core/services/google-maps-types';

/**
 * This class is an object containing general information about a cluster icon.
 * This the object that a `calculator` function returns.
 */
export interface ClusterIconInfo {
  /**
   * The text of the label to be shown on the cluster icon.
   */
  text: string;

  /**
   * The index plus 1 of the element in the styles array to be used to style
   * the cluster icon.
   */
  index: number;

  /**
   * The tooltip to display when the mouse moves over the cluster icon. If this
   * value is `undefined` or `""`, `title` is set to the value of the `title`
   * property passed to the MarkerClusterer.
   */
  title: string;
}

/**
 * Function for determining the label text and style for a cluster icon.
 *
 * @param markers The array of markers represented by the cluster.
 * @param numStyles The number of marker styles available.
 * @return The information resource for the cluster.
 */
export type CalculateFunction = (markers: Marker[], numStyles: number) => ClusterIconInfo;

export interface MarkerClustererInstance {
  zoomOnClick_: boolean;
  averageCenter_: boolean;
  /**
   * @deprecated use getter and setter methods
   *
   * @type {string}
   * @memberof MarkerClustererInstance
   */
  imagePath_: string;
  minimumClusterSize_: number;
  /**
   * @deprecated use getter and setter methods
   * @type {string}
   * @memberof MarkerClustererInstance
   */
  imageExtension_: string;
  new(map: GoogleMap, marker: Marker[], options: ClusterOptions): MarkerClustererInstance;
  addMarker(marker: Marker, noDraw?: boolean): void;
  addMarkers(markers: Marker[], noDraw?: boolean): void;
  clearMarkers(): void;
  fitMapToMarkers(): void;
  getAverageCenter(): boolean;
  getBatchSizeIE(): number;
  getCalculator(): CalculateFunction;
  getClusterClass(): string;
  getClusters(): Cluster[];
  getExtendedBounds(bounds: LatLngBounds): LatLngBounds;
  getEnableRetinaIcons(): boolean;
  getGridSize(): number;
  getIgnoreHidden(): boolean;
  getImageExtension(): string;
  getImagePath(): string;
  getImageSizes(): number[];
  getMap(): GoogleMap;
  getMarkers(): Marker[];
  getMaxZoom(): number;
  getMinimumClusterSize(): number;
  getStyles(): ClusterStyle[];
  getTitle(): string;
  getTotalClusters(): number;
  getTotalMarkers(): Marker[];
  getZoomOnClick(): boolean;
  repaint(): void;
  removeMarker(marker: Marker, noDraw?: boolean): boolean;
  removeMarkers(markers: Marker[], noDraw?: boolean): void;
  setAverageCenter(averageCenter: boolean): void;
  setBatchSizeIE(batchSizeIE: number): void;
  setCalculator(calculator: CalculateFunction): void;
  setClusterClass(clusterClass: string): void;
  setEnableRetinaIcons(enableRetinaIcons: boolean): void;
  setGridSize(size: number): void;
  setIgnoreHidden(ignoreHidden: boolean): void;
  setImageExtension(imageExtension: string): void;
  setImagePath(imagePath: string): void;
  setImageSizes(imageSizes: number[]): void;
  setMap(map: GoogleMap): void;
  setMaxZoom(maxZoom: number): void;
  setMinimumClusterSize(minimumClusterSize: number): void;
  setStyles(styles: ClusterStyle[]): void;
  setTitle(title: string): void;
  setZoomOnClick(zoomOnClick: boolean): void;
}

export interface ClusterOptions {

  /**
   * The grid size of a cluster in pixels. The grid is a square
   *
   * @defaultValue 60
   */
  gridSize?: number;

  /**
   * The maximum zoom level at which clustering is enabled or
   * `null` if clustering is to be enabled at all zoom levels.
   *
   * @defaultValue: null
   */
  maxZoom?: number;

  /**
   * Whether to zoom the map when a cluster marker is clicked. You may want
   * to set this to `false` if you have installed a handler for the `click`
   * event and it deals with zooming on its own.
   *
   * @defaultValue true
   */
  zoomOnClick?: boolean;

  /**
   * Whether the position of a cluster marker should be
   * the average position of all markers in the cluster. If set to `false`, the
   * cluster marker is positioned at the location of the first marker added to
   * the cluster.
   *
   * @defaultValue false
   */
  averageCenter?: boolean;

  /**
   * The minimum number of markers needed in a cluster
   * before the markers are hidden and a cluster marker appears.
   *
   * @defaultValue 2
   */
  minimumClusterSize?: number;

  /**
   * An array of {@link ClusterIconStyle} elements defining the styles of the
   * cluster markers to be used. The element to be used to style a given
   * cluster marker is determined by the function defined by the `calculator`
   * property. The default is an array of {@link ClusterIconStyle} elements
   * whose properties are derived from the values for `imagePath`,
   * `imageExtension`, and `imageSizes`.
   */
  styles?: ClusterStyle[];

  /**
   * The tooltip to display when the mouse moves over a cluster marker.
   * (Alternatively, you can use a custom `calculator` function to specify a
   * different tooltip for each cluster marker.)
   *
   * @defaultValue ''
   */
  title?: string;
  /**
   * Whether to ignore hidden markers in clusters. You may want to set this to
   * `true` to ensure that hidden markers are not included in the marker count
   * that appears on a cluster marker (this count is the value of the `text`
   * property of the result returned by the default `calculator`). If set to
   * `true` and you change the visibility of a marker being clustered, be sure
   * to also call `MarkerClusterer.repaint()`.
   *
   * @defaultValue false
   */
  ignoreHidden?: boolean;

  /**
   * Whether to allow the use of cluster icons that have sizes that are some
   * multiple (typically double) of their actual display size. Icons such as
   * these look better when viewed on high-resolution monitors such as Apple's
   * Retina displays. Note: if this property is `true`, sprites cannot be used
   * as cluster icons.
   *
   * @defaultValue false
   */
  enableRetinaIcons?: boolean;

  /**
   * The full URL of the root name of the group of image files to use for
   * cluster icons. The complete file name is of the form
   * `<imagePath><n>.<imageExtension>` where n is the image file number (1, 2,
   * etc.).
   *
   * @defaultValue https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m
   */
  imagePath?: string;

  /**
   * The extension name for the cluster icon image files (e.g., "png" or "jpg")
   *
   * @defaultValue 'png'
   */
  imageExtension?: string;

  /**
   * An array of numbers containing the widths of the group of
   * `<imagePath><n>.<imageExtension>` image files. (The images are assumed to
   * be square.)
   *
   * @defaultValue [53, 56, 66, 78, 90]
   */
  imageSizes?: number[];

  /**
   * The function used to determine the text to be displayed on a cluster
   * marker and the index indicating which style to use for the cluster marker.
   * The input parameters for the function are (1) the array of markers
   * represented by a cluster marker and (2) the number of cluster icon styles.
   *
   * @defaultValue The default `calculator` returns a `text` property which is
   * the number of markers in the cluster and an `index` property which is one
   * higher than the lowest integer such that `10^i` exceeds the number of
   * markers in the cluster, or the size of the styles array, whichever is
   * less. The `styles` array element used has an index of `index` minus 1. For
   * example, the default `calculator` returns a `text` value of `125` and an
   * `index` of `3` for a cluster icon representing 125 markers so the element
   * used in the `styles` array is `2`. A `calculator` may also return a
   * `title` property that contains the text of the tooltip to be used for the
   * cluster marker. If `title` is not defined, the tooltip is set to the value
   * of the `title` property for the `MarkerClusterer`.
   */
  calculator?: CalculateFunction;

  /**
   * Set this property to the number of markers to be processed in a single
   * batch when using a browser other than Internet Explorer (for Internet
   * Explorer, use the batchSizeIE property instead).
   *
   * @defaultValue 2000
   */
  batchSize?: number;

  /**
   * When Internet Explorer is being used, markers are processed in several
   * batches with a small delay inserted between each batch in an attempt to
   * avoid Javascript timeout errors. Set this property to the number of
   * markers to be processed in a single batch; select as high a number as you
   * can without causing a timeout error in the browser. This number might need
   * to be as low as 100 if 15,000 markers are being managed, for example.
   *
   * @defaultValue 500
   */
  batchSizeIE?: number;

  /**
   * The name of the CSS class defining general styles for the cluster markers.
   * Use this class to define CSS styles that are not set up by the code that
   * processes the `styles` array.
   *
   * @defaultValue 'cluster'
   */
  clusterClass?: string;
}

export interface ClusterStyle {
  /**
   * The URL of the cluster icon image file. Required.
   */
  url?: string;

  /**
   * The display height (in pixels) of the cluster icon. Required.
   */
  height?: number;

  /**
   * The display width (in pixels) of the cluster icon. Required.
   */
  width?: number;

  /**
   * The position (in pixels) from the center of the cluster icon to where the
   * text label is to be centered and drawn. The format is `[yoffset, xoffset]`
   * where `yoffset` increases as you go down from center and `xoffset`
   * increases to the right of center
   *
   * @defaultValue [0, 0]
   */
  anchorText?: [number, number];

  /**
   * The color of the label text shown on the cluster icon.
   *
   * @defaultValue 'black'
   */
  textColor?: string;

  /**
   * The size (in pixels) of the label text shown on the cluster icon.
   *
   * @defaultValue 11
   */
  textSize?: number;

  /**
   * The value of the CSS `text-decoration` property for the label text shown
   * on the cluster icon.
   *
   * @defaultValue 'none'
   */
  textDecoration?: string;

  /**
   * The value of the CSS `font-weight` property for the label text shown on
   * the cluster icon.
   *
   * @defaultValue 'bold'
   */
  fontWeight?: string;

  /**
   * The value of the CSS `font-style` property for the label text shown on the
   * cluster icon.
   *
   * @defaultValue 'normal'
   */
  fontStyle?: string;


  /**
   * The value of the CSS `font-family` property for the label text shown on
   * the cluster icon.
   *
   * @defaultValue 'Arial,sans-serif'
   */
  fontFamily?: string;

  /**
   * The position of the cluster icon image within the image defined by `url`.
   * The format is `"xpos ypos"` (the same format as for the CSS
   * `background-position` property). You must set this property appropriately
   * when the image defined by `url` represents a sprite containing multiple
   * images. Note that the position _must_ be specified in px units.
   *
   * @defaultValue '0 0'
   */
  backgroundPosition?: string;

  /**
   * The anchor position (in pixels) of the cluster icon. This is the spot on
   * the cluster icon that is to be aligned with the cluster position. The
   * format is `[yoffset, xoffset]` where `yoffset` increases as you go down
   * and `xoffset` increases to the right of the top-left corner of the icon.
   *
   * @defaultValue The default anchor position is the center of the cluster
   * icon. `[height/2, width/2]`
   */
  anchorIcon?: [number, number];
}

export interface Cluster {
  /**
   * Returns the number of markers managed by the cluster. You can call this
   * from a `click`, `mouseover`, or `mouseout` event handler for the
   * `MarkerClusterer` object.
   *
   * @return {number} The number of markers in the cluster.
   */
  getSize(): number;

  /**
   * Returns the array of markers managed by the cluster. You can call this
   * from a `click`, `mouseover`, or `mouseout` event handler for the
   * `MarkerClusterer` object.
   *
   * @return {Array} The array of markers in the cluster.
   */
  getMarkers(): Marker[];

  /**
   * Returns the center of the cluster. You can call this from a `click`,
   * `mouseover`, or `mouseout` event handler for the `MarkerClusterer` object.
   *
   * @return {google.maps.LatLng} The center of the cluster.
   */
  getCenter(): LatLng;

  /**
   * Returns the map with which the cluster is associated.
   */
  getMap(): GoogleMap;

  /**
   * Returns the `MarkerClusterer` object with which the cluster is associated.
   *
   * @return {MarkerClusterer} The associated marker clusterer.
   */
  getMarkerClusterer(): MarkerClustererInstance;

  /**
   * Returns the bounds of the cluster.
   *
   * @return {google.maps.LatLngBounds} the cluster bounds.
   */
  getBounds(): LatLngBounds;

  /**
   * Removes the cluster from the map.
   */
  remove(): void;

  /**
   * Adds a marker to the cluster.
   *
   * @param {google.maps.Marker} marker The marker to be added.
   * @return {boolean} True if the marker was added.
   */
  addMarker(marker: Marker): boolean;

  /**
   * Determines if a marker lies within the cluster's bounds.
   *
   * @param {google.maps.Marker} marker The marker to check.
   * @return {boolean} True if the marker lies in the bounds.
   */
  isMarkerInClusterBounds(marker: Marker): boolean;

}
