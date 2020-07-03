import { discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AgmGeocoder } from './geocoder-service';
import { MapsAPILoader } from './maps-api-loader/maps-api-loader';

describe('GeocoderService', () => {
  let loader: MapsAPILoader;
  let geocoderService: AgmGeocoder;
  let geocoderConstructs: number;
  let geocodeMock: jest.Mock;

  beforeEach(fakeAsync(() => {
    loader = {
      load: jest.fn().mockReturnValue(Promise.resolve()),
    };

    geocoderConstructs = 0;
    geocodeMock = jest.fn();

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
    expect(geocoderConstructs).toEqual(1);
  });

  it('should emit a geocode result', fakeAsync(() => {
    const success = jest.fn();
    const geocodeRequest = {
      address: 'Mountain View, California, United States',
    };
    const geocodeExampleResponse = {
      'results': [
        {
          'address_components': [
            {
              'long_name': '1600',
              'short_name': '1600',
              'types': ['street_number'],
            },
            {
              'long_name': 'Amphitheatre Parkway',
              'short_name': 'Amphitheatre Pkwy',
              'types': ['route'],
            },
            {
              'long_name': 'Mountain View',
              'short_name': 'Mountain View',
              'types': ['locality', 'political'],
            },
            {
              'long_name': 'Santa Clara County',
              'short_name': 'Santa Clara County',
              'types': ['administrative_area_level_2', 'political'],
            },
            {
              'long_name': 'California',
              'short_name': 'CA',
              'types': ['administrative_area_level_1', 'political'],
            },
            {
              'long_name': 'United States',
              'short_name': 'US',
              'types': ['country', 'political'],
            },
            {
              'long_name': '94043',
              'short_name': '94043',
              'types': ['postal_code'],
            },
          ],
          'formatted_address': '1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA',
          'geometry': {
            'location': {
              'lat': 37.4267861,
              'lng': -122.0806032,
            },
            'location_type': 'ROOFTOP',
            'viewport': {
              'northeast': {
                'lat': 37.4281350802915,
                'lng': -122.0792542197085,
              },
              'southwest': {
                'lat': 37.4254371197085,
                'lng': -122.0819521802915,
              },
            },
          },
          'place_id': 'ChIJtYuu0V25j4ARwu5e4wwRYgE',
          'plus_code': {
            'compound_code': 'CWC8+R3 Mountain View, California, United States',
            'global_code': '849VCWC8+R3',
          },
          'types': ['street_address'],
        },
      ],
      'status': 'OK',
    };

    geocodeMock.mockImplementation((_geocodeRequest, callback) => callback(geocodeExampleResponse, 'OK'));

    geocoderService.geocode(geocodeRequest).subscribe(success);

    tick();

    expect(success).toHaveBeenCalledTimes(1);
    expect(success).toHaveBeenCalledWith(geocodeExampleResponse);
    expect(geocodeMock).toHaveBeenCalledTimes(1);

    discardPeriodicTasks();
  }));

  it('should catch error if Google does not return a OK result', fakeAsync(() => {
    const success = jest.fn();
    const catchFn = jest.fn();
    const geocodeRequest = {
      address: 'Mountain View, California, United States',
    };

    geocodeMock.mockImplementation((geocodeRequest, callback) => callback(geocodeRequest, 'INVALID_REQUEST'));

    geocoderService.geocode(geocodeRequest).subscribe(success, catchFn);

    tick();

    expect(success).toHaveBeenCalledTimes(0);
    expect(catchFn).toHaveBeenCalledTimes(1);
    expect(catchFn).toHaveBeenCalledWith('INVALID_REQUEST');
    expect(geocodeMock).toHaveBeenCalledTimes(1);

    discardPeriodicTasks();
  }));
});
