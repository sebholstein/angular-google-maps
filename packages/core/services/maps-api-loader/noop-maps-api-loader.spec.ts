import {inject, TestBed} from '@angular/core/testing';

import {WindowRef} from '../../utils/browser-globals';
import {MapsAPILoader} from './maps-api-loader';
import {NoOpMapsAPILoader} from './noop-maps-api-loader';

describe('Service: NoOpMapsAPILoader', () => {
  let windowRef: WindowRef;
  let windowObj: any;

  beforeEach(() => {
    windowObj = {};
    windowRef = <WindowRef>{getNativeWindow: jest.fn().mockReturnValue(windowObj)};
    TestBed.configureTestingModule({
      providers: [
        {provide: MapsAPILoader, useClass: NoOpMapsAPILoader},
        {provide: WindowRef, useValue: windowRef}
      ]
    });
  });

  it('should resolve when google maps exist on the window', () => {
    inject([MapsAPILoader], (loader: NoOpMapsAPILoader) => {
      windowObj.google = {maps: {}};
      expect(loader.load()).toEqual(Promise.resolve());
    });
  });

  it('should throw an error when window.google does not exist', () => {
    inject([MapsAPILoader], (loader: NoOpMapsAPILoader) => {
      expect(loader.load)
          .toThrowError(new Error(
              'Google Maps API not loaded on page. Make sure window.google.maps is available!'));
    });
  });

  it('should throw an error when window.google.maps does not exist', () => {
    inject([MapsAPILoader], (loader: NoOpMapsAPILoader) => {
      windowObj.google = {};
      expect(loader.load)
          .toThrowError(new Error(
              'Google Maps API not loaded on page. Make sure window.google.maps is available!'));
    });
  });
});
