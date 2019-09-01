import { SimpleChange, SimpleChanges } from '@angular/core';
import { AgmPolylinePoint } from './polyline-point';

describe('AgmPolylinePoint', () => {
  describe('ngOnChanges', () => {
    it('should emit positionChanged on latitude change', () => {
      const polylinePoint = new AgmPolylinePoint();
      polylinePoint.latitude = 50;
      polylinePoint.longitude = -50;
      polylinePoint.positionChanged.emit = jest.fn();

      const positionChanges:
          SimpleChanges = {'latitude': new SimpleChange('previousLat', 'newLat', false)};

      polylinePoint.ngOnChanges(positionChanges);

      expect(polylinePoint.positionChanged.emit).toHaveBeenCalledWith({lat: 'newLat', lng: -50});
    });
    it('should emit positionChanged on longitude change', () => {
      const polylinePoint = new AgmPolylinePoint();
      polylinePoint.latitude = 50;
      polylinePoint.longitude = -50;
      polylinePoint.positionChanged.emit = jest.fn();

      const positionChanges:
          SimpleChanges = {'longitude': new SimpleChange('previousLng', 'newLng', false)};

      polylinePoint.ngOnChanges(positionChanges);

      expect(polylinePoint.positionChanged.emit).toHaveBeenCalledWith({lat: 50, lng: 'newLng'});
    });
    it('should emit positionChanged on latitude and longitude change', () => {
      const polylinePoint = new AgmPolylinePoint();
      polylinePoint.latitude = 50;
      polylinePoint.longitude = -50;
      polylinePoint.positionChanged.emit = jest.fn();

      const positionChanges: SimpleChanges = {
        'latitude': new SimpleChange('previousLat', 'newLat', false),
        'longitude': new SimpleChange('previousLng', 'newLng', false),
      };

      polylinePoint.ngOnChanges(positionChanges);

      expect(polylinePoint.positionChanged.emit)
          .toHaveBeenCalledWith({lat: 'newLat', lng: 'newLng'});
    });
  });
});
