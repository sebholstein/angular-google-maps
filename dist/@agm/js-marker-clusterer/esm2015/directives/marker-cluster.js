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
let AgmMarkerCluster = class AgmMarkerCluster {
    constructor(_clusterManager) {
        this._clusterManager = _clusterManager;
        this.clusterClick = new EventEmitter();
        this.mouseOver = new EventEmitter();
        this.mouseOut = new EventEmitter();
        this._observableSubscriptions = [];
    }
    /** @internal */
    ngOnDestroy() {
        this._clusterManager.clearMarkers();
        this._observableSubscriptions.forEach((s) => s.unsubscribe());
    }
    /** @internal */
    ngOnChanges(changes) {
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
    }
    _addEventListeners() {
        const handlers = [
            {
                name: 'clusterclick',
                handler: (args) => this.clusterClick.emit(args),
            },
            {
                name: 'mouseover',
                handler: (args) => this.mouseOver.emit(args),
            },
        ];
        handlers.forEach((obj) => {
            const os = this._clusterManager.createClusterEventObservable(obj.name).subscribe(obj.handler);
            this._observableSubscriptions.push(os);
        });
    }
    /** @internal */
    ngOnInit() {
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
    }
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
export { AgmMarkerCluster };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyLWNsdXN0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2pzLW1hcmtlci1jbHVzdGVyZXIvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL21hcmtlci1jbHVzdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWdDLE1BQU0sRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFFbkgsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGFBQWEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM3RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFNdEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBU0gsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBZ0I7SUE0QzNCLFlBQW9CLGVBQStCO1FBQS9CLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUx6QyxpQkFBWSxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzFELGNBQVMsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN2RCxhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFFeEQsNkJBQXdCLEdBQW1CLEVBQUUsQ0FBQztJQUNDLENBQUM7SUFFeEQsZ0JBQWdCO0lBQ2hCLFdBQVc7UUFDVCxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxnQkFBZ0I7SUFDaEIsV0FBVyxDQUFDLE9BQXdDO1FBQ2xELElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsSUFBSSxPQUFP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RTs7NERBQTRCO0FBSzNCO0lBQVIsS0FBSyxFQUFFOztnREFBd0I7QUFLdkI7SUFBUixLQUFLLEVBQUU7O29EQUErQjtBQUU5QjtJQUFSLEtBQUssRUFBRTs7bURBQW1CO0FBQ2xCO0lBQVIsS0FBSyxFQUFFOzt3REFBd0I7QUFFdEI7SUFBVCxNQUFNLEVBQUU7c0NBQWUsWUFBWTtzREFBZ0M7QUFDMUQ7SUFBVCxNQUFNLEVBQUU7c0NBQVksWUFBWTttREFBZ0M7QUFDdkQ7SUFBVCxNQUFNLEVBQUU7c0NBQVcsWUFBWTtrREFBZ0M7QUF6Q3JELGdCQUFnQjtJQVI1QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsb0JBQW9CO1FBQzlCLFNBQVMsRUFBRTtZQUNULGNBQWM7WUFDZCxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRTtZQUN2RCxpQkFBaUI7U0FDbEI7S0FDRixDQUFDOzZDQTZDcUMsY0FBYztHQTVDeEMsZ0JBQWdCLENBbUg1QjtTQW5IWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEluZm9XaW5kb3dNYW5hZ2VyLCBNYXJrZXJNYW5hZ2VyIH0gZnJvbSAnQGFnbS9jb3JlJztcbmltcG9ydCB7IENsdXN0ZXJNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvY2x1c3Rlci1tYW5hZ2VyJztcblxuaW1wb3J0IHsgQ2FsY3VsYXRlRnVuY3Rpb24sIENsdXN0ZXJPcHRpb25zLCBDbHVzdGVyU3R5bGUgfSBmcm9tICcuLi9zZXJ2aWNlcy9nb29nbGUtY2x1c3RlcmVyLXR5cGVzJztcblxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbi8qKlxuICogQWdtTWFya2VyQ2x1c3RlciBjbHVzdGVycyBtYXAgbWFya2VyIGlmIHRoZXkgYXJlIG5lYXIgdG9nZXRoZXJcbiAqXG4gKiAjIyMgRXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4gKlxuICogQENvbXBvbmVudCh7XG4gKiAgc2VsZWN0b3I6ICdteS1tYXAtY21wJyxcbiAqICBzdHlsZXM6IFtgXG4gKiAgICBhZ20tbWFwIHtcbiAqICAgICAgaGVpZ2h0OiAzMDBweDtcbiAqICAgIH1cbiAqIGBdLFxuICogIHRlbXBsYXRlOiBgXG4gKiAgICA8YWdtLW1hcCBbbGF0aXR1ZGVdPVwibGF0XCIgW2xvbmdpdHVkZV09XCJsbmdcIiBbem9vbV09XCJ6b29tXCI+XG4gKiAgICAgIDxhZ20tbWFya2VyLWNsdXN0ZXI+XG4gKiAgICAgICAgPGFnbS1tYXJrZXIgW2xhdGl0dWRlXT1cImxhdFwiIFtsb25naXR1ZGVdPVwibG5nXCIgW2xhYmVsXT1cIidNJ1wiPlxuICogICAgICAgIDwvYWdtLW1hcmtlcj5cbiAqICAgICAgICA8YWdtLW1hcmtlciBbbGF0aXR1ZGVdPVwibGF0MlwiIFtsb25naXR1ZGVdPVwibG5nMlwiIFtsYWJlbF09XCInTidcIj5cbiAqICAgICAgICA8L2FnbS1tYXJrZXI+XG4gKiAgICAgIDwvYWdtLW1hcmtlci1jbHVzdGVyPlxuICogICAgPC9hZ20tbWFwPlxuICogIGBcbiAqIH0pXG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnYWdtLW1hcmtlci1jbHVzdGVyJyxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ2x1c3Rlck1hbmFnZXIsXG4gICAgeyBwcm92aWRlOiBNYXJrZXJNYW5hZ2VyLCB1c2VFeGlzdGluZzogQ2x1c3Rlck1hbmFnZXIgfSxcbiAgICBJbmZvV2luZG93TWFuYWdlcixcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQWdtTWFya2VyQ2x1c3RlciBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBPbkluaXQsIENsdXN0ZXJPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSBncmlkIHNpemUgb2YgYSBjbHVzdGVyIGluIHBpeGVsc1xuICAgKi9cbiAgQElucHV0KCkgZ3JpZFNpemU6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIG1heGltdW0gem9vbSBsZXZlbCB0aGF0IGEgbWFya2VyIGNhbiBiZSBwYXJ0IG9mIGEgY2x1c3Rlci5cbiAgICovXG4gIEBJbnB1dCgpIG1heFpvb206IG51bWJlcjtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgZGVmYXVsdCBiZWhhdmlvdXIgb2YgY2xpY2tpbmcgb24gYSBjbHVzdGVyIGlzIHRvIHpvb20gaW50byBpdC5cbiAgICovXG4gIEBJbnB1dCgpIHpvb21PbkNsaWNrOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBjZW50ZXIgb2YgZWFjaCBjbHVzdGVyIHNob3VsZCBiZSB0aGUgYXZlcmFnZSBvZiBhbGwgbWFya2VycyBpbiB0aGUgY2x1c3Rlci5cbiAgICovXG4gIEBJbnB1dCgpIGF2ZXJhZ2VDZW50ZXI6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRoZSBtaW5pbXVtIG51bWJlciBvZiBtYXJrZXJzIHRvIGJlIGluIGEgY2x1c3RlciBiZWZvcmUgdGhlIG1hcmtlcnMgYXJlIGhpZGRlbiBhbmQgYSBjb3VudCBpcyBzaG93bi5cbiAgICovXG4gIEBJbnB1dCgpIG1pbmltdW1DbHVzdGVyU2l6ZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBbiBvYmplY3QgdGhhdCBoYXMgc3R5bGUgcHJvcGVydGllcy5cbiAgICovXG4gIEBJbnB1dCgpIHN0eWxlczogQ2x1c3RlclN0eWxlW107XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdGhhdCBjYWxjdWxhdGVzIHRoZSBjbHVzdGVyIHN0eWxlIGFuZCB0ZXh0IGJhc2VkIG9uIHRoZSBtYXJrZXJzIGluIHRoZSBjbHVzdGVyLlxuICAgKi9cbiAgQElucHV0KCkgY2FsY3VsYXRvcjogQ2FsY3VsYXRlRnVuY3Rpb247XG5cbiAgQElucHV0KCkgaW1hZ2VQYXRoOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGltYWdlRXh0ZW5zaW9uOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIGNsdXN0ZXJDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIG1vdXNlT3ZlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIG1vdXNlT3V0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHByaXZhdGUgX29ic2VydmFibGVTdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jbHVzdGVyTWFuYWdlcjogQ2x1c3Rlck1hbmFnZXIpIHsgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fY2x1c3Rlck1hbmFnZXIuY2xlYXJNYXJrZXJzKCk7XG4gICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMuZm9yRWFjaCgocykgPT4gcy51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogeyBba2V5OiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSkge1xuICAgIGlmIChjaGFuZ2VzWydncmlkU2l6ZSddKSB7XG4gICAgICB0aGlzLl9jbHVzdGVyTWFuYWdlci5zZXRHcmlkU2l6ZSh0aGlzKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ21heFpvb20nXSkge1xuICAgICAgdGhpcy5fY2x1c3Rlck1hbmFnZXIuc2V0TWF4Wm9vbSh0aGlzKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ3pvb21PbkNsaWNrJ10pIHtcbiAgICAgIHRoaXMuX2NsdXN0ZXJNYW5hZ2VyLnNldFpvb21PbkNsaWNrKHRoaXMpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snYXZlcmFnZUNlbnRlciddKSB7XG4gICAgICB0aGlzLl9jbHVzdGVyTWFuYWdlci5zZXRBdmVyYWdlQ2VudGVyKHRoaXMpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snbWluaW11bUNsdXN0ZXJTaXplJ10pIHtcbiAgICAgIHRoaXMuX2NsdXN0ZXJNYW5hZ2VyLnNldE1pbmltdW1DbHVzdGVyU2l6ZSh0aGlzKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2ltYWdlUGF0aCddKSB7XG4gICAgICB0aGlzLl9jbHVzdGVyTWFuYWdlci5zZXRJbWFnZVBhdGgodGhpcyk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydpbWFnZUV4dGVuc2lvbiddKSB7XG4gICAgICB0aGlzLl9jbHVzdGVyTWFuYWdlci5zZXRJbWFnZUV4dGVuc2lvbih0aGlzKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2NhbGN1bGF0b3InXSkge1xuICAgICAgdGhpcy5fY2x1c3Rlck1hbmFnZXIuc2V0Q2FsY3VsYXRvcih0aGlzKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ3N0eWxlcyddKSB7XG4gICAgICB0aGlzLl9jbHVzdGVyTWFuYWdlci5zZXRTdHlsZXModGhpcyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgY29uc3QgaGFuZGxlcnMgPSBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdjbHVzdGVyY2xpY2snLFxuICAgICAgICBoYW5kbGVyOiAoYXJnczogYW55KSA9PiB0aGlzLmNsdXN0ZXJDbGljay5lbWl0KGFyZ3MpLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ21vdXNlb3ZlcicsXG4gICAgICAgIGhhbmRsZXI6IChhcmdzOiBhbnkpID0+IHRoaXMubW91c2VPdmVyLmVtaXQoYXJncyksXG4gICAgICB9LFxuICAgIF07XG4gICAgaGFuZGxlcnMuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICBjb25zdCBvcyA9IHRoaXMuX2NsdXN0ZXJNYW5hZ2VyLmNyZWF0ZUNsdXN0ZXJFdmVudE9ic2VydmFibGUob2JqLm5hbWUpLnN1YnNjcmliZShvYmouaGFuZGxlcik7XG4gICAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKG9zKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLl9jbHVzdGVyTWFuYWdlci5pbml0KHtcbiAgICAgIGdyaWRTaXplOiB0aGlzLmdyaWRTaXplLFxuICAgICAgbWF4Wm9vbTogdGhpcy5tYXhab29tLFxuICAgICAgem9vbU9uQ2xpY2s6IHRoaXMuem9vbU9uQ2xpY2ssXG4gICAgICBhdmVyYWdlQ2VudGVyOiB0aGlzLmF2ZXJhZ2VDZW50ZXIsXG4gICAgICBtaW5pbXVtQ2x1c3RlclNpemU6IHRoaXMubWluaW11bUNsdXN0ZXJTaXplLFxuICAgICAgc3R5bGVzOiB0aGlzLnN0eWxlcyxcbiAgICAgIGltYWdlUGF0aDogdGhpcy5pbWFnZVBhdGgsXG4gICAgICBpbWFnZUV4dGVuc2lvbjogdGhpcy5pbWFnZUV4dGVuc2lvbixcbiAgICAgIGNhbGN1bGF0b3I6IHRoaXMuY2FsY3VsYXRvcixcbiAgICB9KTtcbiAgfVxufVxuIl19