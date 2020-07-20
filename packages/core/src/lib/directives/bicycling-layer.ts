import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { LayerManager } from '../services/managers/layer-manager';

let layerId = 0;

/*
 * This directive adds a bicycling layer to a google map instance
 * <agm-bicycling-layer [visible]="true|false"> <agm-bicycling-layer>
 * */
@Directive({
    selector: 'agm-bicycling-layer',
})
export class AgmBicyclingLayer implements OnInit, OnDestroy{
    private _addedToManager = false;
    private _id: string = (layerId++).toString();

    /**
     * Hide/show bicycling layer
     */
    @Input() visible = true;

    constructor( private _manager: LayerManager ) {}

    ngOnInit() {
        if (this._addedToManager) {
            return;
        }
        this._manager.addBicyclingLayer(this);
        this._addedToManager = true;
    }

    /** @internal */
    id(): string { return this._id; }

    /** @internal */
    toString(): string { return `AgmBicyclingLayer-${this._id.toString()}`; }

    /** @internal */
    ngOnDestroy() {
        this._manager.deleteLayer(this);
    }

}
