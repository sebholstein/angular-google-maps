import { Directive, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { LayerManager } from '../services/managers/layer-manager';

let layerId = 0;

/*
 * This directive adds a bicycling layer to a google map instance
 * <agm-bicycling-layer [visible]="true|false"> <agm-bicycling-layer>
 * */
@Directive({
    selector: 'agm-bicycling-layer',
})

export class AgmBicyclingLayer implements OnInit, OnChanges, OnDestroy{
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
        this._manager.addBicyclingLayer(this, {visible: this.visible});
        this._addedToManager = true;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this._addedToManager) {
            return;
        }
        if (changes['visible'] != null) {
            this._manager.toggleLayerVisibility(this, {visible: changes['visible'].currentValue});
        }
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
