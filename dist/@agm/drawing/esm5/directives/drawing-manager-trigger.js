import * as tslib_1 from "tslib";
import { AgmMap } from '@agm/core';
import { Directive, Host, Input } from '@angular/core';
import { first } from 'rxjs/operators';
import { AgmDrawingManager } from './drawing-manager';
var AgmDrawingManagerTrigger = /** @class */ (function () {
    function AgmDrawingManagerTrigger(_agmMap) {
        this._agmMap = _agmMap;
    }
    AgmDrawingManagerTrigger.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._agmMap.mapReady.pipe(first()).subscribe(function (map) { return _this.drawingManager.setMap(map); });
    };
    AgmDrawingManagerTrigger.prototype.ngOnDestroy = function () {
        var _this = this;
        this._agmMap.mapReady.pipe(first()).subscribe(function () { return _this.drawingManager.setMap(null); });
    };
    tslib_1.__decorate([
        Input('agmDrawingManager'),
        tslib_1.__metadata("design:type", AgmDrawingManager)
    ], AgmDrawingManagerTrigger.prototype, "drawingManager", void 0);
    AgmDrawingManagerTrigger = tslib_1.__decorate([
        Directive({
            selector: 'agm-map[agmDrawingManager]',
            exportAs: 'matDrawingManagerTrigger',
        }),
        tslib_1.__param(0, Host()),
        tslib_1.__metadata("design:paramtypes", [AgmMap])
    ], AgmDrawingManagerTrigger);
    return AgmDrawingManagerTrigger;
}());
export { AgmDrawingManagerTrigger };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2luZy1tYW5hZ2VyLXRyaWdnZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2RyYXdpbmcvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2RyYXdpbmctbWFuYWdlci10cmlnZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ25DLE9BQU8sRUFBaUIsU0FBUyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDakYsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBTXREO0lBTUUsa0NBQTRCLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO0lBQzNDLENBQUM7SUFFRCxrREFBZSxHQUFmO1FBQUEsaUJBRUM7UUFEQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDO0lBQ3hGLENBQUM7SUFFRCw4Q0FBVyxHQUFYO1FBQUEsaUJBRUM7UUFEQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFoQyxDQUFnQyxDQUFDLENBQUM7SUFDeEYsQ0FBQztJQVgyQjtRQUEzQixLQUFLLENBQUMsbUJBQW1CLENBQUM7MENBQWlCLGlCQUFpQjtvRUFBQztJQUpuRCx3QkFBd0I7UUFKcEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLDRCQUE0QjtZQUN0QyxRQUFRLEVBQUUsMEJBQTBCO1NBQ3JDLENBQUM7UUFPYSxtQkFBQSxJQUFJLEVBQUUsQ0FBQTtpREFBa0IsTUFBTTtPQU5oQyx3QkFBd0IsQ0FnQnBDO0lBQUQsK0JBQUM7Q0FBQSxBQWhCRCxJQWdCQztTQWhCWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZ21NYXAgfSBmcm9tICdAYWdtL2NvcmUnO1xuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBIb3N0LCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmaXJzdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFnbURyYXdpbmdNYW5hZ2VyIH0gZnJvbSAnLi9kcmF3aW5nLW1hbmFnZXInO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdhZ20tbWFwW2FnbURyYXdpbmdNYW5hZ2VyXScsXG4gIGV4cG9ydEFzOiAnbWF0RHJhd2luZ01hbmFnZXJUcmlnZ2VyJyxcbn0pXG5leHBvcnQgY2xhc3MgQWdtRHJhd2luZ01hbmFnZXJUcmlnZ2VyIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95e1xuXG4gIC8qKiBUaGUgZHJhd2luZyBtYW5hZ2VyIHRvIGJlIGF0dGFjaGVkIHRvIHRoaXMgdHJpZ2dlci4gKi9cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCdhZ21EcmF3aW5nTWFuYWdlcicpIGRyYXdpbmdNYW5hZ2VyOiBBZ21EcmF3aW5nTWFuYWdlcjtcblxuICBjb25zdHJ1Y3RvcihASG9zdCgpIHByaXZhdGUgX2FnbU1hcDogQWdtTWFwKSB7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fYWdtTWFwLm1hcFJlYWR5LnBpcGUoZmlyc3QoKSkuc3Vic2NyaWJlKG1hcCA9PiB0aGlzLmRyYXdpbmdNYW5hZ2VyLnNldE1hcChtYXApKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2FnbU1hcC5tYXBSZWFkeS5waXBlKGZpcnN0KCkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLmRyYXdpbmdNYW5hZ2VyLnNldE1hcChudWxsKSk7XG4gIH1cbn1cbiJdfQ==