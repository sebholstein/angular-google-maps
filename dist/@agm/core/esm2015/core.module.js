import * as tslib_1 from "tslib";
var AgmCoreModule_1;
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
let AgmCoreModule = AgmCoreModule_1 = class AgmCoreModule {
    /**
     * Please use this method when you register the module at the root level.
     */
    static forRoot(lazyMapsAPILoaderConfig) {
        return {
            ngModule: AgmCoreModule_1,
            providers: [
                ...BROWSER_GLOBALS_PROVIDERS, { provide: MapsAPILoader, useClass: LazyMapsAPILoader },
                { provide: LAZY_MAPS_API_CONFIG, useValue: lazyMapsAPILoaderConfig },
            ],
        };
    }
};
AgmCoreModule = AgmCoreModule_1 = tslib_1.__decorate([
    NgModule({ declarations: coreDirectives(), exports: coreDirectives() })
], AgmCoreModule);
export { AgmCoreModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2NvcmUvIiwic291cmNlcyI6WyJjb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTlELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTdELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxpQkFBaUIsRUFBa0MsTUFBTSxpREFBaUQsQ0FBQztBQUMxSSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFFM0UsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFcEU7O0dBRUc7QUFDSCxNQUFNLFVBQVUsY0FBYztJQUM1QixPQUFPO1FBQ0wsaUJBQWlCO1FBQ2pCLFNBQVM7UUFDVCxZQUFZO1FBQ1osWUFBWTtRQUNaLGFBQWE7UUFDYixXQUFXO1FBQ1gsTUFBTTtRQUNOLFNBQVM7UUFDVCxVQUFVO1FBQ1YsV0FBVztRQUNYLGVBQWU7UUFDZixnQkFBZ0I7UUFDaEIsWUFBWTtRQUNaLGVBQWU7S0FDaEIsQ0FBQztBQUNKLENBQUM7QUFFRDs7O0dBR0c7QUFFSCxJQUFhLGFBQWEscUJBQTFCLE1BQWEsYUFBYTtJQUN4Qjs7T0FFRztJQUNILE1BQU0sQ0FBQyxPQUFPLENBQUMsdUJBQXdEO1FBQ3JFLE9BQU87WUFDTCxRQUFRLEVBQUUsZUFBYTtZQUN2QixTQUFTLEVBQUU7Z0JBQ1QsR0FBRyx5QkFBeUIsRUFBRSxFQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFDO2dCQUNuRixFQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsdUJBQXVCLEVBQUM7YUFDbkU7U0FDRixDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUFiWSxhQUFhO0lBRHpCLFFBQVEsQ0FBQyxFQUFDLFlBQVksRUFBRSxjQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLEVBQUMsQ0FBQztHQUN6RCxhQUFhLENBYXpCO1NBYlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFnbUJpY3ljbGluZ0xheWVyIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2JpY3ljbGluZy1sYXllcic7XG5pbXBvcnQgeyBBZ21DaXJjbGUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvY2lyY2xlJztcbmltcG9ydCB7IEFnbURhdGFMYXllciB9IGZyb20gJy4vZGlyZWN0aXZlcy9kYXRhLWxheWVyJztcbmltcG9ydCB7IEFnbUZpdEJvdW5kcyB9IGZyb20gJy4vZGlyZWN0aXZlcy9maXQtYm91bmRzJztcbmltcG9ydCB7IEFnbUluZm9XaW5kb3cgfSBmcm9tICcuL2RpcmVjdGl2ZXMvaW5mby13aW5kb3cnO1xuaW1wb3J0IHsgQWdtS21sTGF5ZXIgfSBmcm9tICcuL2RpcmVjdGl2ZXMva21sLWxheWVyJztcbmltcG9ydCB7IEFnbU1hcCB9IGZyb20gJy4vZGlyZWN0aXZlcy9tYXAnO1xuaW1wb3J0IHsgQWdtTWFya2VyIH0gZnJvbSAnLi9kaXJlY3RpdmVzL21hcmtlcic7XG5pbXBvcnQgeyBBZ21Qb2x5Z29uIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3BvbHlnb24nO1xuaW1wb3J0IHsgQWdtUG9seWxpbmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvcG9seWxpbmUnO1xuaW1wb3J0IHsgQWdtUG9seWxpbmVJY29uIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3BvbHlsaW5lLWljb24nO1xuaW1wb3J0IHsgQWdtUG9seWxpbmVQb2ludCB9IGZyb20gJy4vZGlyZWN0aXZlcy9wb2x5bGluZS1wb2ludCc7XG5pbXBvcnQgeyBBZ21SZWN0YW5nbGUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvcmVjdGFuZ2xlJztcbmltcG9ydCB7IEFnbVRyYW5zaXRMYXllciB9IGZyb20gJy4vZGlyZWN0aXZlcy90cmFuc2l0LWxheWVyJztcblxuaW1wb3J0IHsgTEFaWV9NQVBTX0FQSV9DT05GSUcsIExhenlNYXBzQVBJTG9hZGVyLCBMYXp5TWFwc0FQSUxvYWRlckNvbmZpZ0xpdGVyYWwgfSBmcm9tICcuL3NlcnZpY2VzL21hcHMtYXBpLWxvYWRlci9sYXp5LW1hcHMtYXBpLWxvYWRlcic7XG5pbXBvcnQgeyBNYXBzQVBJTG9hZGVyIH0gZnJvbSAnLi9zZXJ2aWNlcy9tYXBzLWFwaS1sb2FkZXIvbWFwcy1hcGktbG9hZGVyJztcblxuaW1wb3J0IHsgQlJPV1NFUl9HTE9CQUxTX1BST1ZJREVSUyB9IGZyb20gJy4vdXRpbHMvYnJvd3Nlci1nbG9iYWxzJztcblxuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvcmVEaXJlY3RpdmVzKCkge1xuICByZXR1cm4gW1xuICAgIEFnbUJpY3ljbGluZ0xheWVyLFxuICAgIEFnbUNpcmNsZSxcbiAgICBBZ21EYXRhTGF5ZXIsXG4gICAgQWdtRml0Qm91bmRzLFxuICAgIEFnbUluZm9XaW5kb3csXG4gICAgQWdtS21sTGF5ZXIsXG4gICAgQWdtTWFwLFxuICAgIEFnbU1hcmtlcixcbiAgICBBZ21Qb2x5Z29uLFxuICAgIEFnbVBvbHlsaW5lLFxuICAgIEFnbVBvbHlsaW5lSWNvbixcbiAgICBBZ21Qb2x5bGluZVBvaW50LFxuICAgIEFnbVJlY3RhbmdsZSxcbiAgICBBZ21UcmFuc2l0TGF5ZXIsXG4gIF07XG59XG5cbi8qKlxuICogVGhlIGFuZ3VsYXItZ29vZ2xlLW1hcHMgY29yZSBtb2R1bGUuIENvbnRhaW5zIGFsbCBEaXJlY3RpdmVzL1NlcnZpY2VzL1BpcGVzXG4gKiBvZiB0aGUgY29yZSBtb2R1bGUuIFBsZWFzZSB1c2UgYEFnbUNvcmVNb2R1bGUuZm9yUm9vdCgpYCBpbiB5b3VyIGFwcCBtb2R1bGUuXG4gKi9cbkBOZ01vZHVsZSh7ZGVjbGFyYXRpb25zOiBjb3JlRGlyZWN0aXZlcygpLCBleHBvcnRzOiBjb3JlRGlyZWN0aXZlcygpfSlcbmV4cG9ydCBjbGFzcyBBZ21Db3JlTW9kdWxlIHtcbiAgLyoqXG4gICAqIFBsZWFzZSB1c2UgdGhpcyBtZXRob2Qgd2hlbiB5b3UgcmVnaXN0ZXIgdGhlIG1vZHVsZSBhdCB0aGUgcm9vdCBsZXZlbC5cbiAgICovXG4gIHN0YXRpYyBmb3JSb290KGxhenlNYXBzQVBJTG9hZGVyQ29uZmlnPzogTGF6eU1hcHNBUElMb2FkZXJDb25maWdMaXRlcmFsKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBBZ21Db3JlTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIC4uLkJST1dTRVJfR0xPQkFMU19QUk9WSURFUlMsIHtwcm92aWRlOiBNYXBzQVBJTG9hZGVyLCB1c2VDbGFzczogTGF6eU1hcHNBUElMb2FkZXJ9LFxuICAgICAgICB7cHJvdmlkZTogTEFaWV9NQVBTX0FQSV9DT05GSUcsIHVzZVZhbHVlOiBsYXp5TWFwc0FQSUxvYWRlckNvbmZpZ30sXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==