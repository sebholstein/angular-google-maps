import * as tslib_1 from "tslib";
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { InfoWindowManager, MarkerManager } from '@agm/core';
import { ClusterManager } from '../services/managers/cluster-manager';
/**
 * AgmMarkerCluster clusters map marker if they are near together
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    agm-map {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <agm-marker-cluster>
 *        <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *        </agm-marker>
 *        <agm-marker [latitude]="lat2" [longitude]="lng2" [label]="'N'">
 *        </agm-marker>
 *      </agm-marker-cluster>
 *    </agm-map>
 *  `
 * })
 * ```
 */
var AgmMarkerCluster = /** @class */ (function () {
    function AgmMarkerCluster(_clusterManager) {
        this._clusterManager = _clusterManager;
        this.clusterClick = new EventEmitter();
        this.mouseOver = new EventEmitter();
        this.mouseOut = new EventEmitter();
        this._observableSubscriptions = [];
    }
    /** @internal */
    AgmMarkerCluster.prototype.ngOnDestroy = function () {
        this._clusterManager.clearMarkers();
        this._observableSubscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    /** @internal */
    AgmMarkerCluster.prototype.ngOnChanges = function (changes) {
        if (changes['gridSize']) {
            this._clusterManager.setGridSize(this);
        }
        if (changes['maxZoom']) {
            this._clusterManager.setMaxZoom(this);
        }
        if (changes['zoomOnClick']) {
            this._clusterManager.setZoomOnClick(this);
        }
        if (changes['averageCenter']) {
            this._clusterManager.setAverageCenter(this);
        }
        if (changes['minimumClusterSize']) {
            this._clusterManager.setMinimumClusterSize(this);
        }
        if (changes['imagePath']) {
            this._clusterManager.setImagePath(this);
        }
        if (changes['imageExtension']) {
            this._clusterManager.setImageExtension(this);
        }
        if (changes['calculator']) {
            this._clusterManager.setCalculator(this);
        }
        if (changes['styles']) {
            this._clusterManager.setStyles(this);
        }
    };
    AgmMarkerCluster.prototype._addEventListeners = function () {
        var _this = this;
        var handlers = [
            {
                name: 'clusterclick',
                handler: function (args) { return _this.clusterClick.emit(args); },
            },
            {
                name: 'mouseover',
                handler: function (args) { return _this.mouseOver.emit(args); },
            },
        ];
        handlers.forEach(function (obj) {
            var os = _this._clusterManager.createClusterEventObservable(obj.name).subscribe(obj.handler);
            _this._observableSubscriptions.push(os);
        });
    };
    /** @internal */
    AgmMarkerCluster.prototype.ngOnInit = function () {
        this._addEventListeners();
        this._clusterManager.init({
            gridSize: this.gridSize,
            maxZoom: this.maxZoom,
            zoomOnClick: this.zoomOnClick,
            averageCenter: this.averageCenter,
            minimumClusterSize: this.minimumClusterSize,
            styles: this.styles,
            imagePath: this.imagePath,
            imageExtension: this.imageExtension,
            calculator: this.calculator,
        });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], AgmMarkerCluster.prototype, "gridSize", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], AgmMarkerCluster.prototype, "maxZoom", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], AgmMarkerCluster.prototype, "zoomOnClick", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], AgmMarkerCluster.prototype, "averageCenter", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], AgmMarkerCluster.prototype, "minimumClusterSize", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], AgmMarkerCluster.prototype, "styles", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Function)
    ], AgmMarkerCluster.prototype, "calculator", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], AgmMarkerCluster.prototype, "imagePath", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], AgmMarkerCluster.prototype, "imageExtension", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmMarkerCluster.prototype, "clusterClick", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmMarkerCluster.prototype, "mouseOver", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmMarkerCluster.prototype, "mouseOut", void 0);
    AgmMarkerCluster = tslib_1.__decorate([
        Directive({
            selector: 'agm-marker-cluster',
            providers: [
                ClusterManager,
                { provide: MarkerManager, useExisting: ClusterManager },
                InfoWindowManager,
            ],
        }),
        tslib_1.__metadata("design:paramtypes", [ClusterManager])
    ], AgmMarkerCluster);
    return AgmMarkerCluster;
}());
export { AgmMarkerCluster };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyLWNsdXN0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2pzLW1hcmtlci1jbHVzdGVyZXIvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL21hcmtlci1jbHVzdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWdDLE1BQU0sRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFFbkgsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGFBQWEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM3RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFNdEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBU0g7SUE0Q0UsMEJBQW9CLGVBQStCO1FBQS9CLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUx6QyxpQkFBWSxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzFELGNBQVMsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN2RCxhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFFeEQsNkJBQXdCLEdBQW1CLEVBQUUsQ0FBQztJQUNDLENBQUM7SUFFeEQsZ0JBQWdCO0lBQ2hCLHNDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQWYsQ0FBZSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELGdCQUFnQjtJQUNoQixzQ0FBVyxHQUFYLFVBQVksT0FBd0M7UUFDbEQsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDeEM7UUFDRCxJQUFJLE9BQU8sQ0FBQyxTQUFTLENB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RUFBRTs7Z0VBQTRCO0lBSzNCO1FBQVIsS0FBSyxFQUFFOztvREFBd0I7SUFLdkI7UUFBUixLQUFLLEVBQUU7O3dEQUErQjtJQUU5QjtRQUFSLEtBQUssRUFBRTs7dURBQW1CO0lBQ2xCO1FBQVIsS0FBSyxFQUFFOzs0REFBd0I7SUFFdEI7UUFBVCxNQUFNLEVBQUU7MENBQWUsWUFBWTswREFBZ0M7SUFDMUQ7UUFBVCxNQUFNLEVBQUU7MENBQVksWUFBWTt1REFBZ0M7SUFDdkQ7UUFBVCxNQUFNLEVBQUU7MENBQVcsWUFBWTtzREFBZ0M7SUF6Q3JELGdCQUFnQjtRQVI1QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLFNBQVMsRUFBRTtnQkFDVCxjQUFjO2dCQUNkLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFO2dCQUN2RCxpQkFBaUI7YUFDbEI7U0FDRixDQUFDO2lEQTZDcUMsY0FBYztPQTVDeEMsZ0JBQWdCLENBbUg1QjtJQUFELHVCQUFDO0NBQUEsQUFuSEQsSUFtSEM7U0FuSFksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBJbmZvV2luZG93TWFuYWdlciwgTWFya2VyTWFuYWdlciB9IGZyb20gJ0BhZ20vY29yZSc7XG5pbXBvcnQgeyBDbHVzdGVyTWFuYWdlciB9IGZyb20gJy4uL3NlcnZpY2VzL21hbmFnZXJzL2NsdXN0ZXItbWFuYWdlcic7XG5cbmltcG9ydCB7IENhbGN1bGF0ZUZ1bmN0aW9uLCBDbHVzdGVyT3B0aW9ucywgQ2x1c3RlclN0eWxlIH0gZnJvbSAnLi4vc2VydmljZXMvZ29vZ2xlLWNsdXN0ZXJlci10eXBlcyc7XG5cbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG4vKipcbiAqIEFnbU1hcmtlckNsdXN0ZXIgY2x1c3RlcnMgbWFwIG1hcmtlciBpZiB0aGV5IGFyZSBuZWFyIHRvZ2V0aGVyXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuICpcbiAqIEBDb21wb25lbnQoe1xuICogIHNlbGVjdG9yOiAnbXktbWFwLWNtcCcsXG4gKiAgc3R5bGVzOiBbYFxuICogICAgYWdtLW1hcCB7XG4gKiAgICAgIGhlaWdodDogMzAwcHg7XG4gKiAgICB9XG4gKiBgXSxcbiAqICB0ZW1wbGF0ZTogYFxuICogICAgPGFnbS1tYXAgW2xhdGl0dWRlXT1cImxhdFwiIFtsb25naXR1ZGVdPVwibG5nXCIgW3pvb21dPVwiem9vbVwiPlxuICogICAgICA8YWdtLW1hcmtlci1jbHVzdGVyPlxuICogICAgICAgIDxhZ20tbWFya2VyIFtsYXRpdHVkZV09XCJsYXRcIiBbbG9uZ2l0dWRlXT1cImxuZ1wiIFtsYWJlbF09XCInTSdcIj5cbiAqICAgICAgICA8L2FnbS1tYXJrZXI+XG4gKiAgICAgICAgPGFnbS1tYXJrZXIgW2xhdGl0dWRlXT1cImxhdDJcIiBbbG9uZ2l0dWRlXT1cImxuZzJcIiBbbGFiZWxdPVwiJ04nXCI+XG4gKiAgICAgICAgPC9hZ20tbWFya2VyPlxuICogICAgICA8L2FnbS1tYXJrZXItY2x1c3Rlcj5cbiAqICAgIDwvYWdtLW1hcD5cbiAqICBgXG4gKiB9KVxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2FnbS1tYXJrZXItY2x1c3RlcicsXG4gIHByb3ZpZGVyczogW1xuICAgIENsdXN0ZXJNYW5hZ2VyLFxuICAgIHsgcHJvdmlkZTogTWFya2VyTWFuYWdlciwgdXNlRXhpc3Rpbmc6IENsdXN0ZXJNYW5hZ2VyIH0sXG4gICAgSW5mb1dpbmRvd01hbmFnZXIsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFnbU1hcmtlckNsdXN0ZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgT25Jbml0LCBDbHVzdGVyT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBUaGUgZ3JpZCBzaXplIG9mIGEgY2x1c3RlciBpbiBwaXhlbHNcbiAgICovXG4gIEBJbnB1dCgpIGdyaWRTaXplOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBtYXhpbXVtIHpvb20gbGV2ZWwgdGhhdCBhIG1hcmtlciBjYW4gYmUgcGFydCBvZiBhIGNsdXN0ZXIuXG4gICAqL1xuICBASW5wdXQoKSBtYXhab29tOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGRlZmF1bHQgYmVoYXZpb3VyIG9mIGNsaWNraW5nIG9uIGEgY2x1c3RlciBpcyB0byB6b29tIGludG8gaXQuXG4gICAqL1xuICBASW5wdXQoKSB6b29tT25DbGljazogYm9vbGVhbjtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgY2VudGVyIG9mIGVhY2ggY2x1c3RlciBzaG91bGQgYmUgdGhlIGF2ZXJhZ2Ugb2YgYWxsIG1hcmtlcnMgaW4gdGhlIGNsdXN0ZXIuXG4gICAqL1xuICBASW5wdXQoKSBhdmVyYWdlQ2VudGVyOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBUaGUgbWluaW11bSBudW1iZXIgb2YgbWFya2VycyB0byBiZSBpbiBhIGNsdXN0ZXIgYmVmb3JlIHRoZSBtYXJrZXJzIGFyZSBoaWRkZW4gYW5kIGEgY291bnQgaXMgc2hvd24uXG4gICAqL1xuICBASW5wdXQoKSBtaW5pbXVtQ2x1c3RlclNpemU6IG51bWJlcjtcblxuICAvKipcbiAgICogQW4gb2JqZWN0IHRoYXQgaGFzIHN0eWxlIHByb3BlcnRpZXMuXG4gICAqL1xuICBASW5wdXQoKSBzdHlsZXM6IENsdXN0ZXJTdHlsZVtdO1xuXG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIHRoYXQgY2FsY3VsYXRlcyB0aGUgY2x1c3RlciBzdHlsZSBhbmQgdGV4dCBiYXNlZCBvbiB0aGUgbWFya2VycyBpbiB0aGUgY2x1c3Rlci5cbiAgICovXG4gIEBJbnB1dCgpIGNhbGN1bGF0b3I6IENhbGN1bGF0ZUZ1bmN0aW9uO1xuXG4gIEBJbnB1dCgpIGltYWdlUGF0aDogc3RyaW5nO1xuICBASW5wdXQoKSBpbWFnZUV4dGVuc2lvbjogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSBjbHVzdGVyQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBtb3VzZU92ZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBtb3VzZU91dDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBwcml2YXRlIF9vYnNlcnZhYmxlU3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2x1c3Rlck1hbmFnZXI6IENsdXN0ZXJNYW5hZ2VyKSB7IH1cblxuICAvKiogQGludGVybmFsICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2NsdXN0ZXJNYW5hZ2VyLmNsZWFyTWFya2VycygpO1xuICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLmZvckVhY2goKHMpID0+IHMudW5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW2tleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pIHtcbiAgICBpZiAoY2hhbmdlc1snZ3JpZFNpemUnXSkge1xuICAgICAgdGhpcy5fY2x1c3Rlck1hbmFnZXIuc2V0R3JpZFNpemUodGhpcyk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydtYXhab29tJ10pIHtcbiAgICAgIHRoaXMuX2NsdXN0ZXJNYW5hZ2VyLnNldE1heFpvb20odGhpcyk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWyd6b29tT25DbGljayddKSB7XG4gICAgICB0aGlzLl9jbHVzdGVyTWFuYWdlci5zZXRab29tT25DbGljayh0aGlzKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2F2ZXJhZ2VDZW50ZXInXSkge1xuICAgICAgdGhpcy5fY2x1c3Rlck1hbmFnZXIuc2V0QXZlcmFnZUNlbnRlcih0aGlzKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ21pbmltdW1DbHVzdGVyU2l6ZSddKSB7XG4gICAgICB0aGlzLl9jbHVzdGVyTWFuYWdlci5zZXRNaW5pbXVtQ2x1c3RlclNpemUodGhpcyk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydpbWFnZVBhdGgnXSkge1xuICAgICAgdGhpcy5fY2x1c3Rlck1hbmFnZXIuc2V0SW1hZ2VQYXRoKHRoaXMpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snaW1hZ2VFeHRlbnNpb24nXSkge1xuICAgICAgdGhpcy5fY2x1c3Rlck1hbmFnZXIuc2V0SW1hZ2VFeHRlbnNpb24odGhpcyk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydjYWxjdWxhdG9yJ10pIHtcbiAgICAgIHRoaXMuX2NsdXN0ZXJNYW5hZ2VyLnNldENhbGN1bGF0b3IodGhpcyk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydzdHlsZXMnXSkge1xuICAgICAgdGhpcy5fY2x1c3Rlck1hbmFnZXIuc2V0U3R5bGVzKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2FkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIGNvbnN0IGhhbmRsZXJzID0gW1xuICAgICAge1xuICAgICAgICBuYW1lOiAnY2x1c3RlcmNsaWNrJyxcbiAgICAgICAgaGFuZGxlcjogKGFyZ3M6IGFueSkgPT4gdGhpcy5jbHVzdGVyQ2xpY2suZW1pdChhcmdzKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdtb3VzZW92ZXInLFxuICAgICAgICBoYW5kbGVyOiAoYXJnczogYW55KSA9PiB0aGlzLm1vdXNlT3Zlci5lbWl0KGFyZ3MpLFxuICAgICAgfSxcbiAgICBdO1xuICAgIGhhbmRsZXJzLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgY29uc3Qgb3MgPSB0aGlzLl9jbHVzdGVyTWFuYWdlci5jcmVhdGVDbHVzdGVyRXZlbnRPYnNlcnZhYmxlKG9iai5uYW1lKS5zdWJzY3JpYmUob2JqLmhhbmRsZXIpO1xuICAgICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChvcyk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuX2FkZEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgdGhpcy5fY2x1c3Rlck1hbmFnZXIuaW5pdCh7XG4gICAgICBncmlkU2l6ZTogdGhpcy5ncmlkU2l6ZSxcbiAgICAgIG1heFpvb206IHRoaXMubWF4Wm9vbSxcbiAgICAgIHpvb21PbkNsaWNrOiB0aGlzLnpvb21PbkNsaWNrLFxuICAgICAgYXZlcmFnZUNlbnRlcjogdGhpcy5hdmVyYWdlQ2VudGVyLFxuICAgICAgbWluaW11bUNsdXN0ZXJTaXplOiB0aGlzLm1pbmltdW1DbHVzdGVyU2l6ZSxcbiAgICAgIHN0eWxlczogdGhpcy5zdHlsZXMsXG4gICAgICBpbWFnZVBhdGg6IHRoaXMuaW1hZ2VQYXRoLFxuICAgICAgaW1hZ2VFeHRlbnNpb246IHRoaXMuaW1hZ2VFeHRlbnNpb24sXG4gICAgICBjYWxjdWxhdG9yOiB0aGlzLmNhbGN1bGF0b3IsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==