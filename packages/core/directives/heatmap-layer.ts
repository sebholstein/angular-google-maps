import { Directive, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { HeatmapLayerOptions, LatLng, MVCArray, WeightedLocation } from '../services/google-maps-types';
import { LayerManager } from '../services/managers/layer-manager';

let layerId = 0;
const OPTION_KEYS = [
    'data', 'dissipating', 'gradient', 'maxIntensity', 'opacity',
    'radius', 'options',
];

@Directive({
  selector: 'agm-heatmap-layer',
})
export class AgmHeatmapLayer implements OnInit, OnChanges, OnDestroy{
  private _addedToManager = false;
  private _id: string = (layerId++).toString();

  /**
   * The data points to display. Required.
   */
  @Input() data: Array<LatLng | WeightedLocation> | MVCArray<LatLng | WeightedLocation> | null = null;

  /**
   * Specifies whether heatmaps dissipate on zoom. By default, the radius of influence of a data point
   * is specified by the radius option only. When dissipating is disabled, the radius option is interpreted
   * as a radius at zoom level 0.
   */
  @Input() dissipating = false;

  /**
   * The color gradient of the heatmap, specified as an array of CSS color strings. All CSS3 colors are
   * supported except for extended named colors.
   */
  @Input() gradient: string[] | null = null;

  /**
   * The maximum intensity of the heatmap. By default, heatmap colors are dynamically scaled
   * according to the greatest concentration of points at any particular pixel on the map. This property
   * allows you to specify a fixed maximum.
   */
  @Input() maxIntensity: number | null = null;

  /**
   * The radius of influence for each data point, in pixels.
   */
  @Input() radius: number | null = null;

  /**
   * The opacity of the heatmap, expressed as a number between 0 and 1. Defaults to 0.6.
   */
  @Input() opacity: number | null = null;

  /**
   * Hide/show heatmap layer
   */
  @Input() visible = true;

  constructor( private _manager: LayerManager) {}

  ngOnInit() {
    if (this._addedToManager) {
      return;
    }
    this._manager.addHeatmapLayer(this, OPTION_KEYS.reduce((result, key) => {
        if (this[key] != null) {
            result[key] = this[key];
        }

        return result;
    }, {visible: this.visible}) as HeatmapLayerOptions);
    this._addedToManager = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this._addedToManager) {
      return;
    }

    if (changes['visible'] != null) {
        this._manager.setLayerVisibility(this, changes['visible'].currentValue);
    }

    const options = OPTION_KEYS.reduce((result, key) => {
        if (changes[key] != null) {
            result[key] = changes[key].currentValue;
        }

        return result;
    }, {}) as HeatmapLayerOptions;

    if (Object.keys(options).length > 0) {
      this._manager.setOptions(this, options);
    }
  }

  /** @internal */
  id(): string { return this._id; }

  /** @internal */
  toString(): string { return `AgmHeatmapLayer-${this._id.toString()}`; }

  /** @internal */
  ngOnDestroy() {
    this._manager.deleteLayer(this);
  }

}
