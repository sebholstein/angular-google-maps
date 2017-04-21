import { Directive, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { HeatmapLayerManager } from '../services/managers/heatmap-layer-manager';

let layerId = 0;

@Directive({
  selector: 'agm-heatmap-layer'
})
export class AgmHeatmapLayer implements OnInit, OnChanges, OnDestroy{
  private _addedToManager: boolean = false;
  private _id: string = (layerId++).toString();
  private static _heatmapLayerOptions: string[] =
    [ 'data', 'dissipating', 'gradient', 'maxIntensity', 'opacity', 'radius', 'options' ];

  /**
   * The data points to display. Required.
   */
  @Input() data: any[]|null = null;

  /**
   * Specifies whether heatmaps dissipate on zoom. By default, the radius of influence of a data point
   * is specified by the radius option only. When dissipating is disabled, the radius option is interpreted
   * as a radius at zoom level 0.
   */
  @Input() dissipating: boolean = false;

  /**
   * The color gradient of the heatmap, specified as an array of CSS color strings. All CSS3 colors are
   * supported except for extended named colors.
   */
  @Input() gradient: string[]|null = null;

  /**
   * The maximum intensity of the heatmap. By default, heatmap colors are dynamically scaled
   * according to the greatest concentration of points at any particular pixel on the map. This property
   * allows you to specify a fixed maximum.
   */
  @Input() maxIntensity: number|null = null;

  /**
   * The radius of influence for each data point, in pixels.
   */
  @Input() radius: number|null = null;

  /**
   * The opacity of the heatmap, expressed as a number between 0 and 1. Defaults to 0.6.
   */
  @Input() opacity: number|null = null;

  constructor(
    private _manager: HeatmapLayerManager
  ) { }

  ngOnInit() {
    if (this._addedToManager) {
      return;
    }
    this._manager.addHeatmapLayer(this);
    this._addedToManager = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this._addedToManager) {
      return;
    }
    this._updatePolygonOptions(changes);
  }

  private _updatePolygonOptions(changes: SimpleChanges) {
    const options = Object.keys(changes)
      .filter(k => AgmHeatmapLayer._heatmapLayerOptions.indexOf(k) !== -1)
      .reduce((obj: any, k: string) => {
        obj[k] = changes[k].currentValue;
        return obj;
      }, {});
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
    this._manager.deleteHeatmapLayer(this);
  }

}
