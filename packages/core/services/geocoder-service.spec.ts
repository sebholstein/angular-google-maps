import { fakeAsync, TestBed, tick, discardPeriodicTasks } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { AgmGeocoder } from './geocoder-service';
import { MapsAPILoader } from './maps-api-loader/maps-api-loader';

describe('GeocoderService', () => {
  let loader: MapsAPILoader;
  let geocoderService: AgmGeocoder;
  let geocoderConstructs: number;
  let geocodeMock: jest.Mock = jest.fn();

  beforeEach(fakeAsync(() => {
    loader = {
      load: jest.fn().mockReturnValue(Promise.resolve()),
    };

    geocoderConstructs = 0;

    (window as any).google = {
      maps: {
        Geocoder: class Geocoder {
          geocode: jest.Mock = geocodeMock;

          constructor() {
            geocoderConstructs += 1;
          }
        },
      },
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: MapsAPILoader, useValue: loader },
        AgmGeocoder,
      ],
    });

    geocoderService = TestBed.get(AgmGeocoder);
    tick();
  }));

  it('should wait for the load event', () => {
    expect(loader.load).toHaveBeenCalledTimes(1);
    expect(geocoderConstructs).toEqual(0);
  });

  it('should emit a geocode result', fakeAsync(() => {
    const success = jest.fn();
    const geocodeRequest = {
      address: 'Mountain View, California, United States'
    };

    geocoderService.geocode(geocodeRequest).subscribe(success);

    expect(geocodeMock).toHaveBeenCalledTimes(0);

    tick(200);

    expect(success).toHaveBeenCalledTimes(1);
    expect(geocodeMock).toHaveBeenCalledTimes(1);

    discardPeriodicTasks();
  }));
});
