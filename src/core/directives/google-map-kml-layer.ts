import {Directive, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {KmlMouseEvent} from './../services/google-maps-types';
import {KmlLayerManager} from './../services/managers/kml-layer-manager';

let layerId = 0;

@Directive({
  selector: 'sebm-google-map-kml-layer',
  inputs:
      ['clickable', 'preserveViewport', 'screenOverlays', 'suppressInfoWindows', 'url', 'zIndex'],
  outputs: ['layerClick', 'defaultViewportChange', 'statusChange']
})
export class SebmGoogleMapKmlLayer implements OnInit, OnDestroy, OnChanges {
  private _addedToManager: boolean = false;
  private _id: string = (layerId++).toString();
  private _subscriptions: Subscription[] = [];
  private static _kmlLayerOptions: string[] =
      ['clickable', 'preserveViewport', 'screenOverlays', 'suppressInfoWindows', 'url', 'zIndex'];

  /**
   * If true, the layer receives mouse events. Default value is true.
   */
  clickable: boolean = true;

  /**
   * By default, the input map is centered and zoomed to the bounding box of the contents of the
   * layer.
   * If this option is set to true, the viewport is left unchanged, unless the map's center and zoom
   * were never set.
   */
  preserveViewport: boolean = false;

  /**
   * Whether to render the screen overlays. Default true.
   */
  screenOverlays: boolean = true;

  /**
   * Suppress the rendering of info windows when layer features are clicked.
   */
  suppressInfoWindows: boolean = false;

  /**
   * The URL of the KML document to display.
   */
  url: string = null;

  /**
   * The z-index of the layer.
   */
  zIndex: number|null = null;

  /**
   * This event is fired when a feature in the layer is clicked.
   */
  layerClick: EventEmitter<KmlMouseEvent> = new EventEmitter<KmlMouseEvent>();

  /**
   * This event is fired when the KML layers default viewport has changed.
   */
  defaultViewportChange: EventEmitter<void> = new EventEmitter<void>();

  /**
   * This event is fired when the KML layer has finished loading.
   * At this point it is safe to read the status property to determine if the layer loaded
   * successfully.
   */
  statusChange: EventEmitter<void> = new EventEmitter<void>();

  constructor(private _manager: KmlLayerManager) {}

  ngOnInit() {
    if (this._addedToManager) {
      return;
    }
    this._manager.addKmlLayer(this);
    this._addedToManager = true;
    this._addEventListeners();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this._addedToManager) {
      return;
    }
    this._updatePolygonOptions(changes);
  }

  private _updatePolygonOptions(changes: SimpleChanges) {
    const options = Object.keys(changes)
                        .filter(k => SebmGoogleMapKmlLayer._kmlLayerOptions.indexOf(k) !== -1)
                        .reduce((obj: any, k: string) => {
                          obj[k] = changes[k].currentValue;
                          return obj;
                        }, {});
    if (Object.keys(options).length > 0) {
      this._manager.setOptions(this, options);
    }
  }

  private _addEventListeners() {
    const listeners = [
      {name: 'click', handler: (ev: KmlMouseEvent) => this.layerClick.emit(ev)},
      {name: 'defaultviewport_changed', handler: () => this.defaultViewportChange.emit()},
      {name: 'status_changed', handler: () => this.statusChange.emit()},
    ];
    listeners.forEach((obj) => {
      const os = this._manager.createEventObservable(obj.name, this).subscribe(obj.handler);
      this._subscriptions.push(os);
    });
  }

  /** @internal */
  id(): string { return this._id; }

  /** @internal */
  toString(): string { return `SebmGoogleMapKmlLayer-${this._id.toString()}`; }

  /** @internal */
  ngOnDestroy() {
    this._manager.deleteKmlLayer(this);
    // unsubscribe all registered observable subscriptions
    this._subscriptions.forEach(s => s.unsubscribe());
  }
}
