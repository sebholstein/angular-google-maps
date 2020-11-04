import * as tslib_1 from "tslib";
var AgmDataLayer_1;
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { DataLayerManager } from './../services/managers/data-layer-manager';
let layerId = 0;
/**
 * AgmDataLayer enables the user to add data layers to the map.
 *
 * ### Example
 * ```typescript
 * import { Component } from 'angular2/core';
 * import { AgmMap, AgmDataLayer } from
 * 'angular-google-maps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  directives: [AgmMap, AgmDataLayer],
 *  styles: [`
 *    .agm-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 * <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 * 	  <agm-data-layer [geoJson]="geoJsonObject" (layerClick)="clicked($event)" [style]="styleFunc">
 * 	  </agm-data-layer>
 * </agm-map>
 *  `
 * })
 * export class MyMapCmp {
 *   lat: number = -25.274449;
 *   lng: number = 133.775060;
 *   zoom: number = 5;
 *
 * clicked(clickEvent) {
 *    console.log(clickEvent);
 *  }
 *
 *  styleFunc(feature) {
 *    return ({
 *      clickable: false,
 *      fillColor: feature.getProperty('color'),
 *      strokeWeight: 1
 *    });
 *  }
 *
 *  geoJsonObject: Object = {
 *    "type": "FeatureCollection",
 *    "features": [
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "G",
 *          "color": "blue",
 *          "rank": "7",
 *          "ascii": "71"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [123.61, -22.14], [122.38, -21.73], [121.06, -21.69], [119.66, -22.22], [119.00, -23.40],
 *              [118.65, -24.76], [118.43, -26.07], [118.78, -27.56], [119.22, -28.57], [120.23, -29.49],
 *              [121.77, -29.87], [123.57, -29.64], [124.45, -29.03], [124.71, -27.95], [124.80, -26.70],
 *              [124.80, -25.60], [123.61, -25.64], [122.56, -25.64], [121.72, -25.72], [121.81, -26.62],
 *              [121.86, -26.98], [122.60, -26.90], [123.57, -27.05], [123.57, -27.68], [123.35, -28.18],
 *              [122.51, -28.38], [121.77, -28.26], [121.02, -27.91], [120.49, -27.21], [120.14, -26.50],
 *              [120.10, -25.64], [120.27, -24.52], [120.67, -23.68], [121.72, -23.32], [122.43, -23.48],
 *              [123.04, -24.04], [124.54, -24.28], [124.58, -23.20], [123.61, -22.14]
 *            ]
 *          ]
 *        }
 *      },
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "o",
 *          "color": "red",
 *          "rank": "15",
 *          "ascii": "111"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [128.84, -25.76], [128.18, -25.60], [127.96, -25.52], [127.88, -25.52], [127.70, -25.60],
 *              [127.26, -25.79], [126.60, -26.11], [126.16, -26.78], [126.12, -27.68], [126.21, -28.42],
 *              [126.69, -29.49], [127.74, -29.80], [128.80, -29.72], [129.41, -29.03], [129.72, -27.95],
 *              [129.68, -27.21], [129.33, -26.23], [128.84, -25.76]
 *            ],
 *            [
 *              [128.45, -27.44], [128.32, -26.94], [127.70, -26.82], [127.35, -27.05], [127.17, -27.80],
 *              [127.57, -28.22], [128.10, -28.42], [128.49, -27.80], [128.45, -27.44]
 *            ]
 *          ]
 *        }
 *      },
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "o",
 *          "color": "yellow",
 *          "rank": "15",
 *          "ascii": "111"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [131.87, -25.76], [131.35, -26.07], [130.95, -26.78], [130.82, -27.64], [130.86, -28.53],
 *              [131.26, -29.22], [131.92, -29.76], [132.45, -29.87], [133.06, -29.76], [133.72, -29.34],
 *              [134.07, -28.80], [134.20, -27.91], [134.07, -27.21], [133.81, -26.31], [133.37, -25.83],
 *              [132.71, -25.64], [131.87, -25.76]
 *            ],
 *            [
 *              [133.15, -27.17], [132.71, -26.86], [132.09, -26.90], [131.74, -27.56], [131.79, -28.26],
 *              [132.36, -28.45], [132.93, -28.34], [133.15, -27.76], [133.15, -27.17]
 *            ]
 *          ]
 *        }
 *      },
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "g",
 *          "color": "blue",
 *          "rank": "7",
 *          "ascii": "103"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [138.12, -25.04], [136.84, -25.16], [135.96, -25.36], [135.26, -25.99], [135, -26.90],
 *              [135.04, -27.91], [135.26, -28.88], [136.05, -29.45], [137.02, -29.49], [137.81, -29.49],
 *              [137.94, -29.99], [137.90, -31.20], [137.85, -32.24], [136.88, -32.69], [136.45, -32.36],
 *              [136.27, -31.80], [134.95, -31.84], [135.17, -32.99], [135.52, -33.43], [136.14, -33.76],
 *              [137.06, -33.83], [138.12, -33.65], [138.86, -33.21], [139.30, -32.28], [139.30, -31.24],
 *              [139.30, -30.14], [139.21, -28.96], [139.17, -28.22], [139.08, -27.41], [139.08, -26.47],
 *              [138.99, -25.40], [138.73, -25.00], [138.12, -25.04]
 *            ],
 *            [
 *              [137.50, -26.54], [136.97, -26.47], [136.49, -26.58], [136.31, -27.13], [136.31, -27.72],
 *              [136.58, -27.99], [137.50, -28.03], [137.68, -27.68], [137.59, -26.78], [137.50, -26.54]
 *            ]
 *          ]
 *        }
 *      },
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "l",
 *          "color": "green",
 *          "rank": "12",
 *          "ascii": "108"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [140.14, -21.04], [140.31, -29.42], [141.67, -29.49], [141.59, -20.92], [140.14, -21.04]
 *            ]
 *          ]
 *        }
 *      },
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "e",
 *          "color": "red",
 *          "rank": "5",
 *          "ascii": "101"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [144.14, -27.41], [145.67, -27.52], [146.86, -27.09], [146.82, -25.64], [146.25, -25.04],
 *              [145.45, -24.68], [144.66, -24.60], [144.09, -24.76], [143.43, -25.08], [142.99, -25.40],
 *              [142.64, -26.03], [142.64, -27.05], [142.64, -28.26], [143.30, -29.11], [144.18, -29.57],
 *              [145.41, -29.64], [146.46, -29.19], [146.64, -28.72], [146.82, -28.14], [144.84, -28.42],
 *              [144.31, -28.26], [144.14, -27.41]
 *            ],
 *            [
 *              [144.18, -26.39], [144.53, -26.58], [145.19, -26.62], [145.72, -26.35], [145.81, -25.91],
 *              [145.41, -25.68], [144.97, -25.68], [144.49, -25.64], [144, -25.99], [144.18, -26.39]
 *            ]
 *          ]
 *        }
 *      }
 *    ]
 *  };
 * }
 * ```
 */
let AgmDataLayer = AgmDataLayer_1 = class AgmDataLayer {
    constructor(_manager) {
        this._manager = _manager;
        this._addedToManager = false;
        this._id = (layerId++).toString();
        this._subscriptions = [];
        /**
         * This event is fired when a feature in the layer is clicked.
         */
        this.layerClick = new EventEmitter();
        /**
         * The geoJson to be displayed
         */
        this.geoJson = null;
    }
    ngOnInit() {
        if (this._addedToManager) {
            return;
        }
        this._manager.addDataLayer(this);
        this._addedToManager = true;
        this._addEventListeners();
    }
    _addEventListeners() {
        const listeners = [
            { name: 'click', handler: (ev) => this.layerClick.emit(ev) },
        ];
        listeners.forEach((obj) => {
            const os = this._manager.createEventObservable(obj.name, this).subscribe(obj.handler);
            this._subscriptions.push(os);
        });
    }
    /** @internal */
    id() { return this._id; }
    /** @internal */
    toString() { return `AgmDataLayer-${this._id.toString()}`; }
    /** @internal */
    ngOnDestroy() {
        this._manager.deleteDataLayer(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach(s => s.unsubscribe());
    }
    /** @internal */
    ngOnChanges(changes) {
        if (!this._addedToManager) {
            return;
        }
        var geoJsonChange = changes['geoJson'];
        if (geoJsonChange) {
            this._manager.updateGeoJson(this, geoJsonChange.currentValue);
        }
        let dataOptions = {};
        AgmDataLayer_1._dataOptionsAttributes.forEach(k => dataOptions[k] = changes.hasOwnProperty(k) ? changes[k].currentValue : this[k]);
        this._manager.setDataOptions(this, dataOptions);
    }
};
AgmDataLayer._dataOptionsAttributes = ['style'];
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], AgmDataLayer.prototype, "layerClick", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AgmDataLayer.prototype, "geoJson", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Function)
], AgmDataLayer.prototype, "style", void 0);
AgmDataLayer = AgmDataLayer_1 = tslib_1.__decorate([
    Directive({
        selector: 'agm-data-layer',
    }),
    tslib_1.__metadata("design:paramtypes", [DataLayerManager])
], AgmDataLayer);
export { AgmDataLayer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvZGF0YS1sYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBZ0MsTUFBTSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUlwSCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUU3RSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFFaEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZMRztBQUlILElBQWEsWUFBWSxvQkFBekIsTUFBYSxZQUFZO0lBc0J2QixZQUFvQixRQUEwQjtRQUExQixhQUFRLEdBQVIsUUFBUSxDQUFrQjtRQW5CdEMsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsUUFBRyxHQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNyQyxtQkFBYyxHQUFtQixFQUFFLENBQUM7UUFFNUM7O1dBRUc7UUFDTyxlQUFVLEdBQWlDLElBQUksWUFBWSxFQUFrQixDQUFDO1FBRXhGOztXQUVHO1FBQ00sWUFBTyxHQUEyQixJQUFJLENBQUM7SUFPRSxDQUFDO0lBRW5ELFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVPLGtCQUFrQjtRQUN4QixNQUFNLFNBQVMsR0FBRztZQUNoQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBa0IsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7U0FDN0UsQ0FBQztRQUNGLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUN4QixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN0RixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxnQkFBZ0I7SUFDaEIsRUFBRSxLQUFhLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFakMsZ0JBQWdCO0lBQ2hCLFFBQVEsS0FBYSxPQUFPLGdCQUFnQixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXBFLGdCQUFnQjtJQUNoQixXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsc0RBQXNEO1FBQ3RELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELGdCQUFnQjtJQUNoQixXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDekIsT0FBTztTQUNSO1FBRUQsSUFBSSxhQUFhLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksYUFBYSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDL0Q7UUFFRCxJQUFJLFdBQVcsR0FBZ0IsRUFBRSxDQUFDO1FBRWxDLGNBQVksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBRSxXQUFtQixDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFFLElBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRW5KLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNsRCxDQUFDO0NBQ0YsQ0FBQTtBQXhFZ0IsbUNBQXNCLEdBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7QUFTdkQ7SUFBVCxNQUFNLEVBQUU7c0NBQWEsWUFBWTtnREFBc0Q7QUFLL0U7SUFBUixLQUFLLEVBQUU7c0NBQVUsTUFBTTs2Q0FBd0I7QUFLdkM7SUFBUixLQUFLLEVBQUU7OzJDQUFtQjtBQXBCaEIsWUFBWTtJQUh4QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsZ0JBQWdCO0tBQzNCLENBQUM7NkNBdUI4QixnQkFBZ0I7R0F0Qm5DLFlBQVksQ0F5RXhCO1NBekVZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IERhdGFNb3VzZUV2ZW50LCBEYXRhT3B0aW9ucyB9IGZyb20gJy4vLi4vc2VydmljZXMvZ29vZ2xlLW1hcHMtdHlwZXMnO1xuaW1wb3J0IHsgRGF0YUxheWVyTWFuYWdlciB9IGZyb20gJy4vLi4vc2VydmljZXMvbWFuYWdlcnMvZGF0YS1sYXllci1tYW5hZ2VyJztcblxubGV0IGxheWVySWQgPSAwO1xuXG4vKipcbiAqIEFnbURhdGFMYXllciBlbmFibGVzIHRoZSB1c2VyIHRvIGFkZCBkYXRhIGxheWVycyB0byB0aGUgbWFwLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbiAqIGltcG9ydCB7IEFnbU1hcCwgQWdtRGF0YUxheWVyIH0gZnJvbVxuICogJ2FuZ3VsYXItZ29vZ2xlLW1hcHMvY29yZSc7XG4gKlxuICogQENvbXBvbmVudCh7XG4gKiAgc2VsZWN0b3I6ICdteS1tYXAtY21wJyxcbiAqICBkaXJlY3RpdmVzOiBbQWdtTWFwLCBBZ21EYXRhTGF5ZXJdLFxuICogIHN0eWxlczogW2BcbiAqICAgIC5hZ20tY29udGFpbmVyIHtcbiAqICAgICAgaGVpZ2h0OiAzMDBweDtcbiAqICAgIH1cbiAqIGBdLFxuICogIHRlbXBsYXRlOiBgXG4gKiA8YWdtLW1hcCBbbGF0aXR1ZGVdPVwibGF0XCIgW2xvbmdpdHVkZV09XCJsbmdcIiBbem9vbV09XCJ6b29tXCI+XG4gKiBcdCAgPGFnbS1kYXRhLWxheWVyIFtnZW9Kc29uXT1cImdlb0pzb25PYmplY3RcIiAobGF5ZXJDbGljayk9XCJjbGlja2VkKCRldmVudClcIiBbc3R5bGVdPVwic3R5bGVGdW5jXCI+XG4gKiBcdCAgPC9hZ20tZGF0YS1sYXllcj5cbiAqIDwvYWdtLW1hcD5cbiAqICBgXG4gKiB9KVxuICogZXhwb3J0IGNsYXNzIE15TWFwQ21wIHtcbiAqICAgbGF0OiBudW1iZXIgPSAtMjUuMjc0NDQ5O1xuICogICBsbmc6IG51bWJlciA9IDEzMy43NzUwNjA7XG4gKiAgIHpvb206IG51bWJlciA9IDU7XG4gKlxuICogY2xpY2tlZChjbGlja0V2ZW50KSB7XG4gKiAgICBjb25zb2xlLmxvZyhjbGlja0V2ZW50KTtcbiAqICB9XG4gKlxuICogIHN0eWxlRnVuYyhmZWF0dXJlKSB7XG4gKiAgICByZXR1cm4gKHtcbiAqICAgICAgY2xpY2thYmxlOiBmYWxzZSxcbiAqICAgICAgZmlsbENvbG9yOiBmZWF0dXJlLmdldFByb3BlcnR5KCdjb2xvcicpLFxuICogICAgICBzdHJva2VXZWlnaHQ6IDFcbiAqICAgIH0pO1xuICogIH1cbiAqXG4gKiAgZ2VvSnNvbk9iamVjdDogT2JqZWN0ID0ge1xuICogICAgXCJ0eXBlXCI6IFwiRmVhdHVyZUNvbGxlY3Rpb25cIixcbiAqICAgIFwiZmVhdHVyZXNcIjogW1xuICogICAgICB7XG4gKiAgICAgICAgXCJ0eXBlXCI6IFwiRmVhdHVyZVwiLFxuICogICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gKiAgICAgICAgICBcImxldHRlclwiOiBcIkdcIixcbiAqICAgICAgICAgIFwiY29sb3JcIjogXCJibHVlXCIsXG4gKiAgICAgICAgICBcInJhbmtcIjogXCI3XCIsXG4gKiAgICAgICAgICBcImFzY2lpXCI6IFwiNzFcIlxuICogICAgICAgIH0sXG4gKiAgICAgICAgXCJnZW9tZXRyeVwiOiB7XG4gKiAgICAgICAgICBcInR5cGVcIjogXCJQb2x5Z29uXCIsXG4gKiAgICAgICAgICBcImNvb3JkaW5hdGVzXCI6IFtcbiAqICAgICAgICAgICAgW1xuICogICAgICAgICAgICAgIFsxMjMuNjEsIC0yMi4xNF0sIFsxMjIuMzgsIC0yMS43M10sIFsxMjEuMDYsIC0yMS42OV0sIFsxMTkuNjYsIC0yMi4yMl0sIFsxMTkuMDAsIC0yMy40MF0sXG4gKiAgICAgICAgICAgICAgWzExOC42NSwgLTI0Ljc2XSwgWzExOC40MywgLTI2LjA3XSwgWzExOC43OCwgLTI3LjU2XSwgWzExOS4yMiwgLTI4LjU3XSwgWzEyMC4yMywgLTI5LjQ5XSxcbiAqICAgICAgICAgICAgICBbMTIxLjc3LCAtMjkuODddLCBbMTIzLjU3LCAtMjkuNjRdLCBbMTI0LjQ1LCAtMjkuMDNdLCBbMTI0LjcxLCAtMjcuOTVdLCBbMTI0LjgwLCAtMjYuNzBdLFxuICogICAgICAgICAgICAgIFsxMjQuODAsIC0yNS42MF0sIFsxMjMuNjEsIC0yNS42NF0sIFsxMjIuNTYsIC0yNS42NF0sIFsxMjEuNzIsIC0yNS43Ml0sIFsxMjEuODEsIC0yNi42Ml0sXG4gKiAgICAgICAgICAgICAgWzEyMS44NiwgLTI2Ljk4XSwgWzEyMi42MCwgLTI2LjkwXSwgWzEyMy41NywgLTI3LjA1XSwgWzEyMy41NywgLTI3LjY4XSwgWzEyMy4zNSwgLTI4LjE4XSxcbiAqICAgICAgICAgICAgICBbMTIyLjUxLCAtMjguMzhdLCBbMTIxLjc3LCAtMjguMjZdLCBbMTIxLjAyLCAtMjcuOTFdLCBbMTIwLjQ5LCAtMjcuMjFdLCBbMTIwLjE0LCAtMjYuNTBdLFxuICogICAgICAgICAgICAgIFsxMjAuMTAsIC0yNS42NF0sIFsxMjAuMjcsIC0yNC41Ml0sIFsxMjAuNjcsIC0yMy42OF0sIFsxMjEuNzIsIC0yMy4zMl0sIFsxMjIuNDMsIC0yMy40OF0sXG4gKiAgICAgICAgICAgICAgWzEyMy4wNCwgLTI0LjA0XSwgWzEyNC41NCwgLTI0LjI4XSwgWzEyNC41OCwgLTIzLjIwXSwgWzEyMy42MSwgLTIyLjE0XVxuICogICAgICAgICAgICBdXG4gKiAgICAgICAgICBdXG4gKiAgICAgICAgfVxuICogICAgICB9LFxuICogICAgICB7XG4gKiAgICAgICAgXCJ0eXBlXCI6IFwiRmVhdHVyZVwiLFxuICogICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gKiAgICAgICAgICBcImxldHRlclwiOiBcIm9cIixcbiAqICAgICAgICAgIFwiY29sb3JcIjogXCJyZWRcIixcbiAqICAgICAgICAgIFwicmFua1wiOiBcIjE1XCIsXG4gKiAgICAgICAgICBcImFzY2lpXCI6IFwiMTExXCJcbiAqICAgICAgICB9LFxuICogICAgICAgIFwiZ2VvbWV0cnlcIjoge1xuICogICAgICAgICAgXCJ0eXBlXCI6IFwiUG9seWdvblwiLFxuICogICAgICAgICAgXCJjb29yZGluYXRlc1wiOiBbXG4gKiAgICAgICAgICAgIFtcbiAqICAgICAgICAgICAgICBbMTI4Ljg0LCAtMjUuNzZdLCBbMTI4LjE4LCAtMjUuNjBdLCBbMTI3Ljk2LCAtMjUuNTJdLCBbMTI3Ljg4LCAtMjUuNTJdLCBbMTI3LjcwLCAtMjUuNjBdLFxuICogICAgICAgICAgICAgIFsxMjcuMjYsIC0yNS43OV0sIFsxMjYuNjAsIC0yNi4xMV0sIFsxMjYuMTYsIC0yNi43OF0sIFsxMjYuMTIsIC0yNy42OF0sIFsxMjYuMjEsIC0yOC40Ml0sXG4gKiAgICAgICAgICAgICAgWzEyNi42OSwgLTI5LjQ5XSwgWzEyNy43NCwgLTI5LjgwXSwgWzEyOC44MCwgLTI5LjcyXSwgWzEyOS40MSwgLTI5LjAzXSwgWzEyOS43MiwgLTI3Ljk1XSxcbiAqICAgICAgICAgICAgICBbMTI5LjY4LCAtMjcuMjFdLCBbMTI5LjMzLCAtMjYuMjNdLCBbMTI4Ljg0LCAtMjUuNzZdXG4gKiAgICAgICAgICAgIF0sXG4gKiAgICAgICAgICAgIFtcbiAqICAgICAgICAgICAgICBbMTI4LjQ1LCAtMjcuNDRdLCBbMTI4LjMyLCAtMjYuOTRdLCBbMTI3LjcwLCAtMjYuODJdLCBbMTI3LjM1LCAtMjcuMDVdLCBbMTI3LjE3LCAtMjcuODBdLFxuICogICAgICAgICAgICAgIFsxMjcuNTcsIC0yOC4yMl0sIFsxMjguMTAsIC0yOC40Ml0sIFsxMjguNDksIC0yNy44MF0sIFsxMjguNDUsIC0yNy40NF1cbiAqICAgICAgICAgICAgXVxuICogICAgICAgICAgXVxuICogICAgICAgIH1cbiAqICAgICAgfSxcbiAqICAgICAge1xuICogICAgICAgIFwidHlwZVwiOiBcIkZlYXR1cmVcIixcbiAqICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICogICAgICAgICAgXCJsZXR0ZXJcIjogXCJvXCIsXG4gKiAgICAgICAgICBcImNvbG9yXCI6IFwieWVsbG93XCIsXG4gKiAgICAgICAgICBcInJhbmtcIjogXCIxNVwiLFxuICogICAgICAgICAgXCJhc2NpaVwiOiBcIjExMVwiXG4gKiAgICAgICAgfSxcbiAqICAgICAgICBcImdlb21ldHJ5XCI6IHtcbiAqICAgICAgICAgIFwidHlwZVwiOiBcIlBvbHlnb25cIixcbiAqICAgICAgICAgIFwiY29vcmRpbmF0ZXNcIjogW1xuICogICAgICAgICAgICBbXG4gKiAgICAgICAgICAgICAgWzEzMS44NywgLTI1Ljc2XSwgWzEzMS4zNSwgLTI2LjA3XSwgWzEzMC45NSwgLTI2Ljc4XSwgWzEzMC44MiwgLTI3LjY0XSwgWzEzMC44NiwgLTI4LjUzXSxcbiAqICAgICAgICAgICAgICBbMTMxLjI2LCAtMjkuMjJdLCBbMTMxLjkyLCAtMjkuNzZdLCBbMTMyLjQ1LCAtMjkuODddLCBbMTMzLjA2LCAtMjkuNzZdLCBbMTMzLjcyLCAtMjkuMzRdLFxuICogICAgICAgICAgICAgIFsxMzQuMDcsIC0yOC44MF0sIFsxMzQuMjAsIC0yNy45MV0sIFsxMzQuMDcsIC0yNy4yMV0sIFsxMzMuODEsIC0yNi4zMV0sIFsxMzMuMzcsIC0yNS44M10sXG4gKiAgICAgICAgICAgICAgWzEzMi43MSwgLTI1LjY0XSwgWzEzMS44NywgLTI1Ljc2XVxuICogICAgICAgICAgICBdLFxuICogICAgICAgICAgICBbXG4gKiAgICAgICAgICAgICAgWzEzMy4xNSwgLTI3LjE3XSwgWzEzMi43MSwgLTI2Ljg2XSwgWzEzMi4wOSwgLTI2LjkwXSwgWzEzMS43NCwgLTI3LjU2XSwgWzEzMS43OSwgLTI4LjI2XSxcbiAqICAgICAgICAgICAgICBbMTMyLjM2LCAtMjguNDVdLCBbMTMyLjkzLCAtMjguMzRdLCBbMTMzLjE1LCAtMjcuNzZdLCBbMTMzLjE1LCAtMjcuMTddXG4gKiAgICAgICAgICAgIF1cbiAqICAgICAgICAgIF1cbiAqICAgICAgICB9XG4gKiAgICAgIH0sXG4gKiAgICAgIHtcbiAqICAgICAgICBcInR5cGVcIjogXCJGZWF0dXJlXCIsXG4gKiAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAqICAgICAgICAgIFwibGV0dGVyXCI6IFwiZ1wiLFxuICogICAgICAgICAgXCJjb2xvclwiOiBcImJsdWVcIixcbiAqICAgICAgICAgIFwicmFua1wiOiBcIjdcIixcbiAqICAgICAgICAgIFwiYXNjaWlcIjogXCIxMDNcIlxuICogICAgICAgIH0sXG4gKiAgICAgICAgXCJnZW9tZXRyeVwiOiB7XG4gKiAgICAgICAgICBcInR5cGVcIjogXCJQb2x5Z29uXCIsXG4gKiAgICAgICAgICBcImNvb3JkaW5hdGVzXCI6IFtcbiAqICAgICAgICAgICAgW1xuICogICAgICAgICAgICAgIFsxMzguMTIsIC0yNS4wNF0sIFsxMzYuODQsIC0yNS4xNl0sIFsxMzUuOTYsIC0yNS4zNl0sIFsxMzUuMjYsIC0yNS45OV0sIFsxMzUsIC0yNi45MF0sXG4gKiAgICAgICAgICAgICAgWzEzNS4wNCwgLTI3LjkxXSwgWzEzNS4yNiwgLTI4Ljg4XSwgWzEzNi4wNSwgLTI5LjQ1XSwgWzEzNy4wMiwgLTI5LjQ5XSwgWzEzNy44MSwgLTI5LjQ5XSxcbiAqICAgICAgICAgICAgICBbMTM3Ljk0LCAtMjkuOTldLCBbMTM3LjkwLCAtMzEuMjBdLCBbMTM3Ljg1LCAtMzIuMjRdLCBbMTM2Ljg4LCAtMzIuNjldLCBbMTM2LjQ1LCAtMzIuMzZdLFxuICogICAgICAgICAgICAgIFsxMzYuMjcsIC0zMS44MF0sIFsxMzQuOTUsIC0zMS44NF0sIFsxMzUuMTcsIC0zMi45OV0sIFsxMzUuNTIsIC0zMy40M10sIFsxMzYuMTQsIC0zMy43Nl0sXG4gKiAgICAgICAgICAgICAgWzEzNy4wNiwgLTMzLjgzXSwgWzEzOC4xMiwgLTMzLjY1XSwgWzEzOC44NiwgLTMzLjIxXSwgWzEzOS4zMCwgLTMyLjI4XSwgWzEzOS4zMCwgLTMxLjI0XSxcbiAqICAgICAgICAgICAgICBbMTM5LjMwLCAtMzAuMTRdLCBbMTM5LjIxLCAtMjguOTZdLCBbMTM5LjE3LCAtMjguMjJdLCBbMTM5LjA4LCAtMjcuNDFdLCBbMTM5LjA4LCAtMjYuNDddLFxuICogICAgICAgICAgICAgIFsxMzguOTksIC0yNS40MF0sIFsxMzguNzMsIC0yNS4wMF0sIFsxMzguMTIsIC0yNS4wNF1cbiAqICAgICAgICAgICAgXSxcbiAqICAgICAgICAgICAgW1xuICogICAgICAgICAgICAgIFsxMzcuNTAsIC0yNi41NF0sIFsxMzYuOTcsIC0yNi40N10sIFsxMzYuNDksIC0yNi41OF0sIFsxMzYuMzEsIC0yNy4xM10sIFsxMzYuMzEsIC0yNy43Ml0sXG4gKiAgICAgICAgICAgICAgWzEzNi41OCwgLTI3Ljk5XSwgWzEzNy41MCwgLTI4LjAzXSwgWzEzNy42OCwgLTI3LjY4XSwgWzEzNy41OSwgLTI2Ljc4XSwgWzEzNy41MCwgLTI2LjU0XVxuICogICAgICAgICAgICBdXG4gKiAgICAgICAgICBdXG4gKiAgICAgICAgfVxuICogICAgICB9LFxuICogICAgICB7XG4gKiAgICAgICAgXCJ0eXBlXCI6IFwiRmVhdHVyZVwiLFxuICogICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gKiAgICAgICAgICBcImxldHRlclwiOiBcImxcIixcbiAqICAgICAgICAgIFwiY29sb3JcIjogXCJncmVlblwiLFxuICogICAgICAgICAgXCJyYW5rXCI6IFwiMTJcIixcbiAqICAgICAgICAgIFwiYXNjaWlcIjogXCIxMDhcIlxuICogICAgICAgIH0sXG4gKiAgICAgICAgXCJnZW9tZXRyeVwiOiB7XG4gKiAgICAgICAgICBcInR5cGVcIjogXCJQb2x5Z29uXCIsXG4gKiAgICAgICAgICBcImNvb3JkaW5hdGVzXCI6IFtcbiAqICAgICAgICAgICAgW1xuICogICAgICAgICAgICAgIFsxNDAuMTQsIC0yMS4wNF0sIFsxNDAuMzEsIC0yOS40Ml0sIFsxNDEuNjcsIC0yOS40OV0sIFsxNDEuNTksIC0yMC45Ml0sIFsxNDAuMTQsIC0yMS4wNF1cbiAqICAgICAgICAgICAgXVxuICogICAgICAgICAgXVxuICogICAgICAgIH1cbiAqICAgICAgfSxcbiAqICAgICAge1xuICogICAgICAgIFwidHlwZVwiOiBcIkZlYXR1cmVcIixcbiAqICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICogICAgICAgICAgXCJsZXR0ZXJcIjogXCJlXCIsXG4gKiAgICAgICAgICBcImNvbG9yXCI6IFwicmVkXCIsXG4gKiAgICAgICAgICBcInJhbmtcIjogXCI1XCIsXG4gKiAgICAgICAgICBcImFzY2lpXCI6IFwiMTAxXCJcbiAqICAgICAgICB9LFxuICogICAgICAgIFwiZ2VvbWV0cnlcIjoge1xuICogICAgICAgICAgXCJ0eXBlXCI6IFwiUG9seWdvblwiLFxuICogICAgICAgICAgXCJjb29yZGluYXRlc1wiOiBbXG4gKiAgICAgICAgICAgIFtcbiAqICAgICAgICAgICAgICBbMTQ0LjE0LCAtMjcuNDFdLCBbMTQ1LjY3LCAtMjcuNTJdLCBbMTQ2Ljg2LCAtMjcuMDldLCBbMTQ2LjgyLCAtMjUuNjRdLCBbMTQ2LjI1LCAtMjUuMDRdLFxuICogICAgICAgICAgICAgIFsxNDUuNDUsIC0yNC42OF0sIFsxNDQuNjYsIC0yNC42MF0sIFsxNDQuMDksIC0yNC43Nl0sIFsxNDMuNDMsIC0yNS4wOF0sIFsxNDIuOTksIC0yNS40MF0sXG4gKiAgICAgICAgICAgICAgWzE0Mi42NCwgLTI2LjAzXSwgWzE0Mi42NCwgLTI3LjA1XSwgWzE0Mi42NCwgLTI4LjI2XSwgWzE0My4zMCwgLTI5LjExXSwgWzE0NC4xOCwgLTI5LjU3XSxcbiAqICAgICAgICAgICAgICBbMTQ1LjQxLCAtMjkuNjRdLCBbMTQ2LjQ2LCAtMjkuMTldLCBbMTQ2LjY0LCAtMjguNzJdLCBbMTQ2LjgyLCAtMjguMTRdLCBbMTQ0Ljg0LCAtMjguNDJdLFxuICogICAgICAgICAgICAgIFsxNDQuMzEsIC0yOC4yNl0sIFsxNDQuMTQsIC0yNy40MV1cbiAqICAgICAgICAgICAgXSxcbiAqICAgICAgICAgICAgW1xuICogICAgICAgICAgICAgIFsxNDQuMTgsIC0yNi4zOV0sIFsxNDQuNTMsIC0yNi41OF0sIFsxNDUuMTksIC0yNi42Ml0sIFsxNDUuNzIsIC0yNi4zNV0sIFsxNDUuODEsIC0yNS45MV0sXG4gKiAgICAgICAgICAgICAgWzE0NS40MSwgLTI1LjY4XSwgWzE0NC45NywgLTI1LjY4XSwgWzE0NC40OSwgLTI1LjY0XSwgWzE0NCwgLTI1Ljk5XSwgWzE0NC4xOCwgLTI2LjM5XVxuICogICAgICAgICAgICBdXG4gKiAgICAgICAgICBdXG4gKiAgICAgICAgfVxuICogICAgICB9XG4gKiAgICBdXG4gKiAgfTtcbiAqIH1cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdhZ20tZGF0YS1sYXllcicsXG59KVxuZXhwb3J0IGNsYXNzIEFnbURhdGFMYXllciBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICBwcml2YXRlIHN0YXRpYyBfZGF0YU9wdGlvbnNBdHRyaWJ1dGVzOiBBcnJheTxzdHJpbmc+ID0gWydzdHlsZSddO1xuXG4gIHByaXZhdGUgX2FkZGVkVG9NYW5hZ2VyID0gZmFsc2U7XG4gIHByaXZhdGUgX2lkOiBzdHJpbmcgPSAobGF5ZXJJZCsrKS50b1N0cmluZygpO1xuICBwcml2YXRlIF9zdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gYSBmZWF0dXJlIGluIHRoZSBsYXllciBpcyBjbGlja2VkLlxuICAgKi9cbiAgQE91dHB1dCgpIGxheWVyQ2xpY2s6IEV2ZW50RW1pdHRlcjxEYXRhTW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPERhdGFNb3VzZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGUgZ2VvSnNvbiB0byBiZSBkaXNwbGF5ZWRcbiAgICovXG4gIEBJbnB1dCgpIGdlb0pzb246IE9iamVjdCB8IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBUaGUgbGF5ZXIncyBzdHlsZSBmdW5jdGlvbi5cbiAgICovXG4gIEBJbnB1dCgpIHN0eWxlOiAoKSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX21hbmFnZXI6IERhdGFMYXllck1hbmFnZXIpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLl9hZGRlZFRvTWFuYWdlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9tYW5hZ2VyLmFkZERhdGFMYXllcih0aGlzKTtcbiAgICB0aGlzLl9hZGRlZFRvTWFuYWdlciA9IHRydWU7XG4gICAgdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IFtcbiAgICAgIHsgbmFtZTogJ2NsaWNrJywgaGFuZGxlcjogKGV2OiBEYXRhTW91c2VFdmVudCkgPT4gdGhpcy5sYXllckNsaWNrLmVtaXQoZXYpIH0sXG4gICAgXTtcbiAgICBsaXN0ZW5lcnMuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICBjb25zdCBvcyA9IHRoaXMuX21hbmFnZXIuY3JlYXRlRXZlbnRPYnNlcnZhYmxlKG9iai5uYW1lLCB0aGlzKS5zdWJzY3JpYmUob2JqLmhhbmRsZXIpO1xuICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKG9zKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgaWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2lkOyB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gYEFnbURhdGFMYXllci0ke3RoaXMuX2lkLnRvU3RyaW5nKCl9YDsgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fbWFuYWdlci5kZWxldGVEYXRhTGF5ZXIodGhpcyk7XG4gICAgLy8gdW5zdWJzY3JpYmUgYWxsIHJlZ2lzdGVyZWQgb2JzZXJ2YWJsZSBzdWJzY3JpcHRpb25zXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5fYWRkZWRUb01hbmFnZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgZ2VvSnNvbkNoYW5nZSA9IGNoYW5nZXNbJ2dlb0pzb24nXTtcbiAgICBpZiAoZ2VvSnNvbkNoYW5nZSkge1xuICAgICAgdGhpcy5fbWFuYWdlci51cGRhdGVHZW9Kc29uKHRoaXMsIGdlb0pzb25DaGFuZ2UuY3VycmVudFZhbHVlKTtcbiAgICB9XG5cbiAgICBsZXQgZGF0YU9wdGlvbnM6IERhdGFPcHRpb25zID0ge307XG5cbiAgICBBZ21EYXRhTGF5ZXIuX2RhdGFPcHRpb25zQXR0cmlidXRlcy5mb3JFYWNoKGsgPT4gKGRhdGFPcHRpb25zIGFzIGFueSlba10gPSBjaGFuZ2VzLmhhc093blByb3BlcnR5KGspID8gY2hhbmdlc1trXS5jdXJyZW50VmFsdWUgOiAodGhpcyBhcyBhbnkpW2tdKTtcblxuICAgIHRoaXMuX21hbmFnZXIuc2V0RGF0YU9wdGlvbnModGhpcywgZGF0YU9wdGlvbnMpO1xuICB9XG59XG4iXX0=