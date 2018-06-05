import { TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { FitBoundsService } from './fit-bounds';
import { MapsAPILoader } from './maps-api-loader/maps-api-loader';
import { LatLngBounds } from '@agm/core';
import { take, first } from 'rxjs/operators';

describe('FitBoundsService', () => {
  let loader: MapsAPILoader;
  let fitBoundsService: FitBoundsService;
  let latLngBoundsConstructs: number;
  let latLngBoundsExtend: jest.Mock;

  beforeEach(fakeAsync(() => {
    loader = {
      load: jest.fn().mockReturnValue(Promise.resolve())
    };

    latLngBoundsConstructs = 0;
    latLngBoundsExtend = jest.fn();

    (<any>window).google = {
      maps: {
        LatLngBounds: class LatLngBounds {
          extend: jest.Mock = latLngBoundsExtend;

          constructor() {
            latLngBoundsConstructs += 1;
          }
        }
      }
    };

    TestBed.configureTestingModule({
      providers: [
        {provide: MapsAPILoader, useValue: loader},
        FitBoundsService
      ]
    });

    fitBoundsService = TestBed.get(FitBoundsService);
    tick();
  }));

  it('should wait for the load event', () => {
    expect(loader.load).toHaveBeenCalledTimes(1);
    expect(latLngBoundsConstructs).toEqual(0);
  });

  it('should emit empty bounds when API finished loaded but the are not entries in the includeInBounds$ map', fakeAsync(() => {
    const success = jest.fn();
    fitBoundsService.getBounds$().pipe(first()).subscribe(success);
    tick();
    expect(success).toHaveBeenCalledTimes(1);
    discardPeriodicTasks();
  }));

  it('should emit the new bounds every 200ms by default', fakeAsync(() => {
    const success = jest.fn();
    fitBoundsService.getBounds$().subscribe(success);
    tick(1);
    fitBoundsService.addToBounds({lat: 2, lng: 2});
    fitBoundsService.addToBounds({lat: 2, lng: 2});
    fitBoundsService.addToBounds({lat: 3, lng: 3});
    expect(success).toHaveBeenCalledTimes(1);
    tick(150);
    expect(success).toHaveBeenCalledTimes(1);
    tick(200);
    expect(success).toHaveBeenCalledTimes(2);
    discardPeriodicTasks();
  }));

  it('should provide all latLng to the bounds', fakeAsync(() => {
    const success = jest.fn();
    fitBoundsService.getBounds$().subscribe(success);
    tick(1);
    const latLngs = [
      {lat: 2, lng: 2},
      {lat: 3, lng: 3},
      {lat: 4, lng: 4}
    ];
    fitBoundsService.addToBounds(latLngs[0]);
    fitBoundsService.addToBounds(latLngs[1]);
    fitBoundsService.addToBounds(latLngs[2]);
    expect(latLngBoundsExtend).toHaveBeenCalledTimes(0);
    tick(200);
    expect(latLngBoundsExtend).toHaveBeenCalledTimes(3);
    expect(latLngBoundsExtend).toHaveBeenCalledWith(latLngs[0]);
    expect(latLngBoundsExtend).toHaveBeenCalledWith(latLngs[1]);
    expect(latLngBoundsExtend).toHaveBeenCalledWith(latLngs[2]);
    discardPeriodicTasks();
  }));

  it('should remove latlng from bounds and emit the new bounds after the sample time', fakeAsync(() => {
    const success = jest.fn();
    fitBoundsService.getBounds$().subscribe(success);
    tick(1);
    fitBoundsService.addToBounds({lat: 2, lng: 2});
    fitBoundsService.addToBounds({lat: 3, lng: 3});
    tick(200);
    latLngBoundsExtend.mockReset();

    fitBoundsService.removeFromBounds({lat: 2, lng: 2});
    fitBoundsService.removeFromBounds({lat: 3, lng: 3});
    tick(150);
    expect(latLngBoundsExtend).toHaveBeenCalledTimes(0);
    tick(200);

    expect(latLngBoundsExtend).toHaveBeenCalledTimes(0);
    discardPeriodicTasks();
  }));

  it('should use the new _boundsChangeSampleTime$ for all next bounds', fakeAsync(() => {
    const success = jest.fn();
    fitBoundsService.getBounds$().subscribe(success);
    tick(1);
    fitBoundsService.addToBounds({lat: 2, lng: 2});
    fitBoundsService.addToBounds({lat: 3, lng: 3});
    tick(200);
    success.mockReset();

    fitBoundsService.changeFitBoundsChangeSampleTime(100);
    fitBoundsService.removeFromBounds({lat: 2, lng: 2});
    fitBoundsService.removeFromBounds({lat: 3, lng: 3});
    tick(100);

    expect(success).toHaveBeenCalledTimes(1);
    discardPeriodicTasks();
  }));

});
