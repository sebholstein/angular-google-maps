import {Directive, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Subscription} from 'rxjs';

import {FusionTablesLayerOptions, FusionTablesMouseEvent} from './../services/google-maps-types';
import {FusionTablesLayerManager} from './../services/managers/fusion-tables-layer-manager';

let layerId = 0;

@Directive({selector: 'agm-fusion-tables-layer'})
export class AgmFusionTablesLayer implements OnInit, OnDestroy, OnChanges {
  private _addedToManager: boolean = false;
  private _id: string = (layerId++).toString();
  private _subscriptions: Subscription[] = [];

  /**
   * This event is fired when a feature in the layer is clicked.
   */
  @Output()
  layerClick: EventEmitter<FusionTablesMouseEvent> = new EventEmitter<FusionTablesMouseEvent>();

  /**
   * Fusion table layer options
   */
  @Input() options: FusionTablesLayerOptions;

  constructor(private _manager: FusionTablesLayerManager) {}

  ngOnInit() {
    if (this._addedToManager) {
      return;
    }
    this._manager.addFusionTablesLayer(this);
    this._addedToManager = true;
    this._addEventListeners();
  }

  private _addEventListeners() {
    const listeners = [
      {name: 'click', handler: (ev: FusionTablesMouseEvent) => this.layerClick.emit(ev)},
    ];
    listeners.forEach((obj) => {
      const os = this._manager.createEventObservable(obj.name, this).subscribe(obj.handler);
      this._subscriptions.push(os);
    });
  }

  /** @internal */
  id(): string {
    return this._id;
  }

  /** @internal */
  toString(): string {
    return `AgmFusionTablesLayer-${this._id.toString()}`;
  }

  /** @internal */
  ngOnDestroy() {
    this._manager.deleteFusionTablesLayer(this);
    // unsubscribe all registered observable subscriptions
    this._subscriptions.forEach(s => s.unsubscribe());
  }

  /** @internal */
  ngOnChanges(changes: SimpleChanges) {
    if (!this._addedToManager) {
      return;
    }
  }
}
