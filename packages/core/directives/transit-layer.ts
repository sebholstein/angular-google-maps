import { Directive, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MapLayerManager } from '../services/managers/map-layer-manager';
import { MapLayerType } from '../services/google-maps-types';

let layerId = 0;

/*
 * This directive adds a transit layer to a google map instance
 * <agm-transit-layer [visible]="true|false"> <agm-transit-layer>
 * */
@Directive({
    selector: 'agm-transit-layer'
})

export class AgmTransitLayer implements OnInit, OnChanges, OnDestroy{
    private _addedToManager: boolean = false;
    private _id: string = (layerId++).toString();
    private _name: MapLayerType = 'TransitLayer';

    /**
     * Hide/show transit layer
     */
    @Input() visible: boolean = true;

    constructor( private _manager: MapLayerManager ) {}

    ngOnInit() {
        if (this._addedToManager) {
            return;
        }
        this._manager.addMapLayer(this, {visible: this.visible});
        this._addedToManager = true;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this._addedToManager) {
            return;
        }
        this._manager.setOptions(this, changes);
    }

    /** @internal */
    id(): string { return this._id; }

    /** @internal */
    name(): MapLayerType { return this._name; }

    /** @internal */
    toString(): string { return `AgmTransitLayer-${this._id.toString()}`; }

    /** @internal */
    ngOnDestroy() {
        this._manager.deleteMapLayer(this);
    }

}
