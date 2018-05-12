import { NgZone } from '@angular/core';
import { TestBed, async, inject } from '@angular/core/testing';

import { GoogleMapsAPIWrapper } from '../../../core/services/google-maps-api-wrapper';
import { MarkerWithLabelManager } from './marker-with-label-manager';
import { AgmMarkerWithLabel } from '../../directives/marker-with-label';
import { MarkerWithLabel } from '../../services/google-marker-with-label-types';

(window as any).google = {
  maps: {}
};

describe('MarkerWithLabelManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NgZone, useFactory: () => new NgZone({ enableLongStackTrace: true }) },
        MarkerWithLabelManager, {
          provide: GoogleMapsAPIWrapper,
          useValue: {
            getNativeMap: jest.fn().mockImplementation(() => Promise.resolve({})),
            createMarker: jest.fn()
          }
        }
      ]
    });
  });

  describe('Create a new marker', () => {
    it('should create new marker with label',
      inject([MarkerWithLabelManager, GoogleMapsAPIWrapper],
        (markerWithLabelManager: MarkerWithLabelManager, apiWrapper: GoogleMapsAPIWrapper) => {
          const newMarker = new AgmMarkerWithLabel(markerWithLabelManager);
          newMarker.latitude = 34.4;
          newMarker.longitude = 22.3;
          newMarker.labelContent = 'A';
          newMarker.labelClass = 'my-label';
          markerWithLabelManager.addMarker(newMarker);
          markerWithLabelManager.getNativeMarker(newMarker).then((nativeMarker: MarkerWithLabel) => {
            expect((nativeMarker as any).labelContent).toEqual('A');
          });
        })
    );
  });

  describe('Update label content', () => {
    it('Should update label content',
      inject([MarkerWithLabelManager, GoogleMapsAPIWrapper],
        (markerWithLabelManager: MarkerWithLabelManager, apiWrapper: GoogleMapsAPIWrapper) => {
          const newMarker = new AgmMarkerWithLabel(markerWithLabelManager);
          newMarker.latitude = 34.4;
          newMarker.longitude = 22.3;
          newMarker.labelContent = 'A';
          newMarker.labelClass = 'my-label';
          markerWithLabelManager.addMarker(newMarker);
          newMarker.labelContent = 'B';
          markerWithLabelManager.updateLabelContent(newMarker);
          markerWithLabelManager.getNativeMarker(newMarker).then((nativeMarker: MarkerWithLabel) => {
            expect((nativeMarker as any).labelContent).toEqual('B');
          });
        })
    );
  });

  describe('Update label class', () => {
    it('Should update label class',
      inject([MarkerWithLabelManager, GoogleMapsAPIWrapper],
        (markerWithLabelManager: MarkerWithLabelManager, apiWrapper: GoogleMapsAPIWrapper) => {
          const newMarker = new AgmMarkerWithLabel(markerWithLabelManager);
          newMarker.latitude = 34.4;
          newMarker.longitude = 22.3;
          newMarker.labelContent = 'A';
          newMarker.labelClass = 'my-label';
          markerWithLabelManager.addMarker(newMarker);
          newMarker.labelClass = 'your-label';
          markerWithLabelManager.updateLabelClass(newMarker);
          markerWithLabelManager.getNativeMarker(newMarker).then((nativeMarker: MarkerWithLabel) => {
            expect((nativeMarker as any).labelClass).toEqual('your-label');
          });
        })
    );
  });
});
