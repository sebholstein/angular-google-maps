import { Directive, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { LayerManager } from '../services/managers/layer-manager';

let layerId = 0;

/*
 * This directive adds a transit layer to a google map instance
 * <agm-transit-layer [visible]="true|false"> <agm-transit-layer>
 * */
@Directive({
    selector: 'agm-transit-layer',
})

export class AgmTransitLayer implements OnInit, OnChanges, OnDestroy{
    private _addedToManager = false;
    private _id: string = (layerId++).toString();

    /**
     * Hide/show transit layer
     */
    @Input() visible = true;

    constructor( private _manager: LayerManager ) {}

    ngOnInit() {
        if (this._addedToManager) {
            return;
        }
        this._manager.addTransitLayer(this, {visible: this.visible});
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
    toString(): string { return `AgmTransitLayer-${this._id.toString()}`; }

    /** @internal */
    ngOnDestroy() {
        this._manager.deleteLayer(this);
    }

}
