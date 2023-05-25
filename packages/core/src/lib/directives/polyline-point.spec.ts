import { SimpleChange, SimpleChanges } from '@angular/core';
import { discardPeriodicTasks, fakeAsync, tick } from '@angular/core/testing';
import { FitBoundsDetails } from '../services/fit-bounds';
import { AgmPolylinePoint } from './polyline-point';

describe('AgmPolylinePoint', () => {
  describe('ngOnChanges', () => {
    it('should emit positionChanged on latitude change', () => {
      const polylinePoint = new AgmPolylinePoint();
      polylinePoint.latitude = 50;
      polylinePoint.longitude = -50;
      polylinePoint.positionChanged.emit = jest.fn();

      const positionChanges:
          SimpleChanges = {latitude: new SimpleChange('previousLat', 'newLat', false)};

      polylinePoint.ngOnChanges(positionChanges);

      expect(polylinePoint.positionChanged.emit).toHaveBeenCalledWith({lat: 'newLat', lng: -50});
    });
    it('should emit positionChanged on longitude change', () => {
      const polylinePoint = new AgmPolylinePoint();
      polylinePoint.latitude = 50;
      polylinePoint.longitude = -50;
      polylinePoint.positionChanged.emit = jest.fn();

      const positionChanges:
          SimpleChanges = {longitude: new SimpleChange('previousLng', 'newLng', false)};

      polylinePoint.ngOnChanges(positionChanges);

      expect(polylinePoint.positionChanged.emit).toHaveBeenCalledWith({lat: 50, lng: 'newLng'});
    });
    it('should emit positionChanged on latitude and longitude change', () => {
      const polylinePoint = new AgmPolylinePoint();
      polylinePoint.latitude = 50;
      polylinePoint.longitude = -50;
      polylinePoint.positionChanged.emit = jest.fn();

      const positionChanges: SimpleChanges = {
        latitude: new SimpleChange('previousLat', 'newLat', false),
        longitude: new SimpleChange('previousLng', 'newLng', false),
      };

      polylinePoint.ngOnChanges(positionChanges);

      expect(polylinePoint.positionChanged.emit)
          .toHaveBeenCalledWith({lat: 'newLat', lng: 'newLng'});
    });
    it('should emit bounds on latitude and longitude change', fakeAsync(() => {
      const polylinePoint = new AgmPolylinePoint();
      polylinePoint.latitude = 50;
      polylinePoint.longitude = -50;

      let value: FitBoundsDetails = null;
      polylinePoint.getFitBoundsDetails$().subscribe(details => value = details);

      expect(value).toEqual({ latLng: {lat: 50, lng: -50} });

      const positionChanges: SimpleChanges = {
        latitude: new SimpleChange(50, 100, false),
        longitude: new SimpleChange(-50, -100, false),
      };
      polylinePoint.ngOnChanges(positionChanges);

      tick(1);
      expect(value).toEqual({ latLng: {lat: 100, lng: -100} });

      discardPeriodicTasks();
    }));
  });
});
