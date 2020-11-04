import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { AgmBicyclingLayer } from './directives/bicycling-layer';
import { AgmCircle } from './directives/circle';
import { AgmDataLayer } from './directives/data-layer';
import { AgmFitBounds } from './directives/fit-bounds';
import { AgmInfoWindow } from './directives/info-window';
import { AgmKmlLayer } from './directives/kml-layer';
import { AgmMap } from './directives/map';
import { AgmMarker } from './directives/marker';
import { AgmPolygon } from './directives/polygon';
import { AgmPolyline } from './directives/polyline';
import { AgmPolylineIcon } from './directives/polyline-icon';
import { AgmPolylinePoint } from './directives/polyline-point';
import { AgmRectangle } from './directives/rectangle';
import { AgmTransitLayer } from './directives/transit-layer';
import { LAZY_MAPS_API_CONFIG, LazyMapsAPILoader } from './services/maps-api-loader/lazy-maps-api-loader';
import { MapsAPILoader } from './services/maps-api-loader/maps-api-loader';
import { BROWSER_GLOBALS_PROVIDERS } from './utils/browser-globals';
/**
 * @internal
 */
export function coreDirectives() {
    return [
        AgmBicyclingLayer,
        AgmCircle,
        AgmDataLayer,
        AgmFitBounds,
        AgmInfoWindow,
        AgmKmlLayer,
        AgmMap,
        AgmMarker,
        AgmPolygon,
        AgmPolyline,
        AgmPolylineIcon,
        AgmPolylinePoint,
        AgmRectangle,
        AgmTransitLayer,
    ];
}
/**
 * The angular-google-maps core module. Contains all Directives/Services/Pipes
 * of the core module. Please use `AgmCoreModule.forRoot()` in your app module.
 */
var AgmCoreModule = /** @class */ (function () {
    function AgmCoreModule() {
    }
    AgmCoreModule_1 = AgmCoreModule;
    /**
     * Please use this method when you register the module at the root level.
     */
    AgmCoreModule.forRoot = function (lazyMapsAPILoaderConfig) {
        return {
            ngModule: AgmCoreModule_1,
            providers: tslib_1.__spread(BROWSER_GLOBALS_PROVIDERS, [
                { provide: MapsAPILoader, useClass: LazyMapsAPILoader },
                { provide: LAZY_MAPS_API_CONFIG, useValue: lazyMapsAPILoaderConfig },
            ]),
        };
    };
    var AgmCoreModule_1;
    AgmCoreModule = AgmCoreModule_1 = tslib_1.__decorate([
        NgModule({ declarations: coreDirectives(), exports: coreDirectives() })
    ], AgmCoreModule);
    return AgmCoreModule;
}());
export { AgmCoreModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2NvcmUvIiwic291cmNlcyI6WyJjb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDakUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDMUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzdELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFN0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLGlCQUFpQixFQUFrQyxNQUFNLGlEQUFpRCxDQUFDO0FBQzFJLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUUzRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVwRTs7R0FFRztBQUNILE1BQU0sVUFBVSxjQUFjO0lBQzVCLE9BQU87UUFDTCxpQkFBaUI7UUFDakIsU0FBUztRQUNULFlBQVk7UUFDWixZQUFZO1FBQ1osYUFBYTtRQUNiLFdBQVc7UUFDWCxNQUFNO1FBQ04sU0FBUztRQUNULFVBQVU7UUFDVixXQUFXO1FBQ1gsZUFBZTtRQUNmLGdCQUFnQjtRQUNoQixZQUFZO1FBQ1osZUFBZTtLQUNoQixDQUFDO0FBQ0osQ0FBQztBQUVEOzs7R0FHRztBQUVIO0lBQUE7SUFhQSxDQUFDO3NCQWJZLGFBQWE7SUFDeEI7O09BRUc7SUFDSSxxQkFBTyxHQUFkLFVBQWUsdUJBQXdEO1FBQ3JFLE9BQU87WUFDTCxRQUFRLEVBQUUsZUFBYTtZQUN2QixTQUFTLG1CQUNKLHlCQUF5QjtnQkFBRSxFQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFDO2dCQUNuRixFQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsdUJBQXVCLEVBQUM7Y0FDbkU7U0FDRixDQUFDO0lBQ0osQ0FBQzs7SUFaVSxhQUFhO1FBRHpCLFFBQVEsQ0FBQyxFQUFDLFlBQVksRUFBRSxjQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLEVBQUMsQ0FBQztPQUN6RCxhQUFhLENBYXpCO0lBQUQsb0JBQUM7Q0FBQSxBQWJELElBYUM7U0FiWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQWdtQmljeWNsaW5nTGF5ZXIgfSBmcm9tICcuL2RpcmVjdGl2ZXMvYmljeWNsaW5nLWxheWVyJztcbmltcG9ydCB7IEFnbUNpcmNsZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9jaXJjbGUnO1xuaW1wb3J0IHsgQWdtRGF0YUxheWVyIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2RhdGEtbGF5ZXInO1xuaW1wb3J0IHsgQWdtRml0Qm91bmRzIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2ZpdC1ib3VuZHMnO1xuaW1wb3J0IHsgQWdtSW5mb1dpbmRvdyB9IGZyb20gJy4vZGlyZWN0aXZlcy9pbmZvLXdpbmRvdyc7XG5pbXBvcnQgeyBBZ21LbWxMYXllciB9IGZyb20gJy4vZGlyZWN0aXZlcy9rbWwtbGF5ZXInO1xuaW1wb3J0IHsgQWdtTWFwIH0gZnJvbSAnLi9kaXJlY3RpdmVzL21hcCc7XG5pbXBvcnQgeyBBZ21NYXJrZXIgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbWFya2VyJztcbmltcG9ydCB7IEFnbVBvbHlnb24gfSBmcm9tICcuL2RpcmVjdGl2ZXMvcG9seWdvbic7XG5pbXBvcnQgeyBBZ21Qb2x5bGluZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9wb2x5bGluZSc7XG5pbXBvcnQgeyBBZ21Qb2x5bGluZUljb24gfSBmcm9tICcuL2RpcmVjdGl2ZXMvcG9seWxpbmUtaWNvbic7XG5pbXBvcnQgeyBBZ21Qb2x5bGluZVBvaW50IH0gZnJvbSAnLi9kaXJlY3RpdmVzL3BvbHlsaW5lLXBvaW50JztcbmltcG9ydCB7IEFnbVJlY3RhbmdsZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9yZWN0YW5nbGUnO1xuaW1wb3J0IHsgQWdtVHJhbnNpdExheWVyIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3RyYW5zaXQtbGF5ZXInO1xuXG5pbXBvcnQgeyBMQVpZX01BUFNfQVBJX0NPTkZJRywgTGF6eU1hcHNBUElMb2FkZXIsIExhenlNYXBzQVBJTG9hZGVyQ29uZmlnTGl0ZXJhbCB9IGZyb20gJy4vc2VydmljZXMvbWFwcy1hcGktbG9hZGVyL2xhenktbWFwcy1hcGktbG9hZGVyJztcbmltcG9ydCB7IE1hcHNBUElMb2FkZXIgfSBmcm9tICcuL3NlcnZpY2VzL21hcHMtYXBpLWxvYWRlci9tYXBzLWFwaS1sb2FkZXInO1xuXG5pbXBvcnQgeyBCUk9XU0VSX0dMT0JBTFNfUFJPVklERVJTIH0gZnJvbSAnLi91dGlscy9icm93c2VyLWdsb2JhbHMnO1xuXG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgZnVuY3Rpb24gY29yZURpcmVjdGl2ZXMoKSB7XG4gIHJldHVybiBbXG4gICAgQWdtQmljeWNsaW5nTGF5ZXIsXG4gICAgQWdtQ2lyY2xlLFxuICAgIEFnbURhdGFMYXllcixcbiAgICBBZ21GaXRCb3VuZHMsXG4gICAgQWdtSW5mb1dpbmRvdyxcbiAgICBBZ21LbWxMYXllcixcbiAgICBBZ21NYXAsXG4gICAgQWdtTWFya2VyLFxuICAgIEFnbVBvbHlnb24sXG4gICAgQWdtUG9seWxpbmUsXG4gICAgQWdtUG9seWxpbmVJY29uLFxuICAgIEFnbVBvbHlsaW5lUG9pbnQsXG4gICAgQWdtUmVjdGFuZ2xlLFxuICAgIEFnbVRyYW5zaXRMYXllcixcbiAgXTtcbn1cblxuLyoqXG4gKiBUaGUgYW5ndWxhci1nb29nbGUtbWFwcyBjb3JlIG1vZHVsZS4gQ29udGFpbnMgYWxsIERpcmVjdGl2ZXMvU2VydmljZXMvUGlwZXNcbiAqIG9mIHRoZSBjb3JlIG1vZHVsZS4gUGxlYXNlIHVzZSBgQWdtQ29yZU1vZHVsZS5mb3JSb290KClgIGluIHlvdXIgYXBwIG1vZHVsZS5cbiAqL1xuQE5nTW9kdWxlKHtkZWNsYXJhdGlvbnM6IGNvcmVEaXJlY3RpdmVzKCksIGV4cG9ydHM6IGNvcmVEaXJlY3RpdmVzKCl9KVxuZXhwb3J0IGNsYXNzIEFnbUNvcmVNb2R1bGUge1xuICAvKipcbiAgICogUGxlYXNlIHVzZSB0aGlzIG1ldGhvZCB3aGVuIHlvdSByZWdpc3RlciB0aGUgbW9kdWxlIGF0IHRoZSByb290IGxldmVsLlxuICAgKi9cbiAgc3RhdGljIGZvclJvb3QobGF6eU1hcHNBUElMb2FkZXJDb25maWc/OiBMYXp5TWFwc0FQSUxvYWRlckNvbmZpZ0xpdGVyYWwpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEFnbUNvcmVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgLi4uQlJPV1NFUl9HTE9CQUxTX1BST1ZJREVSUywge3Byb3ZpZGU6IE1hcHNBUElMb2FkZXIsIHVzZUNsYXNzOiBMYXp5TWFwc0FQSUxvYWRlcn0sXG4gICAgICAgIHtwcm92aWRlOiBMQVpZX01BUFNfQVBJX0NPTkZJRywgdXNlVmFsdWU6IGxhenlNYXBzQVBJTG9hZGVyQ29uZmlnfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl19