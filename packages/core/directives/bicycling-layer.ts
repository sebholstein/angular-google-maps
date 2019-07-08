import { Directive, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MapLayerManager } from '../services/managers/map-layer-manager';

let layerId = 0;

/*
 * This directive adds a bicycling layer to a google map instance
 * <agm-bicycling-layer [visible]="true|false"> <agm-bicycling-layer>
 * */
@Directive({
    selector: 'agm-bicycling-layer'
})

export class AgmBicyclingLayer implements OnInit, OnChanges, OnDestroy{
    private _addedToManager: boolean = false;
    private _id: string = (layerId++).toString();

    /**
     * Hide/show bicycling layer
     */
    @Input() visible: boolean = false;

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
    name(): string { return 'BicyclingLayer'; }

    /** @internal */
    toString(): string { return `AgmBicyclingLayer-${this._id.toString()}`; }

    /** @internal */
    ngOnDestroy() {
        this._manager.deleteMapLayer(this);
    }

}
