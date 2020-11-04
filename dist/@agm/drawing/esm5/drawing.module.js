import * as tslib_1 from "tslib";
import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { AgmDrawingManager } from './directives/drawing-manager';
import { AgmDrawingManagerTrigger } from './directives/drawing-manager-trigger';
var AgmDrawingModule = /** @class */ (function () {
    function AgmDrawingModule() {
    }
    AgmDrawingModule = tslib_1.__decorate([
        NgModule({
            imports: [AgmCoreModule],
            declarations: [AgmDrawingManager, AgmDrawingManagerTrigger],
            exports: [AgmDrawingManager, AgmDrawingManagerTrigger],
        })
    ], AgmDrawingModule);
    return AgmDrawingModule;
}());
export { AgmDrawingModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2luZy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2RyYXdpbmcvIiwic291cmNlcyI6WyJkcmF3aW5nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUMxQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBT2hGO0lBQUE7SUFDQSxDQUFDO0lBRFksZ0JBQWdCO1FBTDVCLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLGFBQWEsQ0FBQztZQUN4QixZQUFZLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSx3QkFBd0IsQ0FBQztZQUMzRCxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSx3QkFBd0IsQ0FBQztTQUN2RCxDQUFDO09BQ1csZ0JBQWdCLENBQzVCO0lBQUQsdUJBQUM7Q0FBQSxBQURELElBQ0M7U0FEWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZ21Db3JlTW9kdWxlIH0gZnJvbSAnQGFnbS9jb3JlJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBZ21EcmF3aW5nTWFuYWdlciB9IGZyb20gJy4vZGlyZWN0aXZlcy9kcmF3aW5nLW1hbmFnZXInO1xuaW1wb3J0IHsgQWdtRHJhd2luZ01hbmFnZXJUcmlnZ2VyIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2RyYXdpbmctbWFuYWdlci10cmlnZ2VyJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0FnbUNvcmVNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtBZ21EcmF3aW5nTWFuYWdlciwgQWdtRHJhd2luZ01hbmFnZXJUcmlnZ2VyXSxcbiAgZXhwb3J0czogW0FnbURyYXdpbmdNYW5hZ2VyLCBBZ21EcmF3aW5nTWFuYWdlclRyaWdnZXJdLFxufSlcbmV4cG9ydCBjbGFzcyBBZ21EcmF3aW5nTW9kdWxlIHtcbn1cbiJdfQ==