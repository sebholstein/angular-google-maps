import { fakeAsync, TestBed, tick } from '@angular/core/testing';
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
});
