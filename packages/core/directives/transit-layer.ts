import { Directive, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { TransitLayerManager } from '../services/managers/transit-layer-manager';

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
    private static _transitLayerOptions: string[] = [ 'visible'];

    /**
     * Hide/show transit layer
     */
    @Input() visible: boolean = true;

    constructor( private _manager: TransitLayerManager ) {}

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
        this._updateTransitLayerOptions(changes);
    }

    private _updateTransitLayerOptions(changes: SimpleChanges) {
        const options = Object.keys(changes)
            .filter(k => AgmTransitLayer._transitLayerOptions.indexOf(k) !== -1)
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
    toString(): string { return `AgmTransitLayer-${this._id.toString()}`; }

    /** @internal */
    ngOnDestroy() {
        this._manager.deleteTransitLayer(this);
    }

}
