import { NgZone } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { AgmPolygon } from '../../directives/polygon';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
import { PolygonManager } from './polygon-manager';
describe('PolygonManager', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [
                { provide: NgZone, useFactory: function () { return new NgZone({ enableLongStackTrace: true }); } },
                PolygonManager, AgmPolygon, {
                    provide: GoogleMapsAPIWrapper,
                    useValue: jasmine.createSpyObj('GoogleMapsAPIWrapper', ['createPolygon'])
                }
            ]
        });
    });
    describe('Create a new polygon', function () {
        it('should call the mapsApiWrapper when creating a new polygon', inject([PolygonManager, GoogleMapsAPIWrapper], function (polygonManager, apiWrapper) {
            var newPolygon = new AgmPolygon(polygonManager);
            polygonManager.addPolygon(newPolygon);
            expect(apiWrapper.createPolygon).toHaveBeenCalledWith({
                clickable: true,
                draggable: false,
                editable: false,
                fillColor: undefined,
                fillOpacity: undefined,
                geodesic: false,
                paths: [],
                strokeColor: undefined,
                strokeOpacity: undefined,
                strokeWeight: undefined,
                visible: undefined,
                zIndex: undefined
            });
        }));
    });
    describe('Delete a polygon', function () {
        it('should set the map to null when deleting a existing polygon', inject([PolygonManager, GoogleMapsAPIWrapper], function (polygonManager, apiWrapper) {
            var newPolygon = new AgmPolygon(polygonManager);
            var polygonInstance = jasmine.createSpyObj('Polygon', ['setMap']);
            apiWrapper.createPolygon.and.returnValue(Promise.resolve(polygonInstance));
            polygonManager.addPolygon(newPolygon);
            polygonManager.deletePolygon(newPolygon).then(function () {
                expect(polygonInstance.setMap).toHaveBeenCalledWith(null);
            });
        }));
    });
});
//# sourceMappingURL=polygon-manager.spec.js.map