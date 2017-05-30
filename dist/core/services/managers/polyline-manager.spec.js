import { NgZone } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { AgmPolyline } from '../../directives/polyline';
import { GoogleMapsAPIWrapper } from '../../services/google-maps-api-wrapper';
import { PolylineManager } from '../../services/managers/polyline-manager';
describe('PolylineManager', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [
                { provide: NgZone, useFactory: function () { return new NgZone({ enableLongStackTrace: true }); } },
                PolylineManager, {
                    provide: GoogleMapsAPIWrapper,
                    useValue: jasmine.createSpyObj('GoogleMapsAPIWrapper', ['createPolyline'])
                }
            ]
        });
    });
    describe('Create a new polyline', function () {
        it('should call the mapsApiWrapper when creating a new polyline', inject([PolylineManager, GoogleMapsAPIWrapper], function (polylineManager, apiWrapper) {
            var newPolyline = new AgmPolyline(polylineManager);
            polylineManager.addPolyline(newPolyline);
            expect(apiWrapper.createPolyline).toHaveBeenCalledWith({
                clickable: true,
                draggable: false,
                editable: false,
                geodesic: false,
                strokeColor: undefined,
                strokeOpacity: undefined,
                strokeWeight: undefined,
                visible: true,
                zIndex: undefined,
                path: []
            });
        }));
    });
    describe('Delete a polyline', function () {
        it('should set the map to null when deleting a existing polyline', inject([PolylineManager, GoogleMapsAPIWrapper], function (polylineManager, apiWrapper) {
            var newPolyline = new AgmPolyline(polylineManager);
            var polylineInstance = jasmine.createSpyObj('Polyline', ['setMap']);
            apiWrapper.createPolyline.and.returnValue(Promise.resolve(polylineInstance));
            polylineManager.addPolyline(newPolyline);
            polylineManager.deletePolyline(newPolyline).then(function () {
                expect(polylineInstance.setMap).toHaveBeenCalledWith(null);
            });
        }));
    });
});
//# sourceMappingURL=polyline-manager.spec.js.map