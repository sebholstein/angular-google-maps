import { TestBed } from '@angular/core/testing';
import { FitBoundsService } from './fit-bounds';
import { MapsAPILoader } from './maps-api-loader/maps-api-loader';
import { LatLngBounds } from '@agm/core';

describe('FitBoundsService', () => {
  let loader: MapsAPILoader;
  let fitBoundsService: FitBoundsService;
  let latLngBounds: jest.Mock<LatLngBounds>;

  beforeEach(() => {
    loader = {
      load: jest.fn().mockReturnValue(Promise.resolve())
    };

    latLngBounds = jest.fn();
    (<any>window).google = {
      maps: {
        LatLngBounds: jest.fn().mockReturnValue(latLngBounds)
      }
    };

    TestBed.configureTestingModule({
      providers: [
        {provide: MapsAPILoader, useValue: loader},
        FitBoundsService
      ]
    });

    fitBoundsService = TestBed.get(FitBoundsService);
  });

  it('should wait for the load event', () => {
    expect(loader.load).toHaveBeenCalledTimes(1);
    expect(latLngBounds.mock.instances.length).toEqual(0);
  });

});