import { NgZone } from '@angular/core';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';

import { AgmCircle } from '../../directives/circle';
import { Circle, CircleOptions } from '../google-maps-types';
import { GoogleMapsAPIWrapper } from './../google-maps-api-wrapper';
import { CircleManager } from './circle-manager';

describe('CircleManager', () => {
  beforeEach(() => {
    (window as any).google = {
      maps: {
        StrokePosition: {CENTER: 1, INSIDE: 0, OUTSIDE: 2},
      },
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: NgZone,
          useFactory: () => new NgZone({ enableLongStackTrace: true }),
        },
        CircleManager,
        {
          provide: GoogleMapsAPIWrapper,
          useValue: { createCircle: jest.fn() },
        },
      ],
    });
  });

  describe('Create a new circle', () => {
    it('should call the mapsApiWrapper when creating a new circle', inject(
      [CircleManager, GoogleMapsAPIWrapper],
      (
        circleManager: CircleManager,
        apiWrapper: GoogleMapsAPIWrapper,
      ) => {
        const newCircle = new AgmCircle(circleManager);
        newCircle.radius = 500;
        newCircle.latitude = 32.1;
        newCircle.longitude = 11.612;
        circleManager.addCircle(newCircle);

        expect(apiWrapper.createCircle).toHaveBeenCalledWith({
          center: {
            lat: 32.1,
            lng: 11.612,
          },
          radius: 500,
          clickable: true,
          draggable: false,
          editable: false,
          fillColor: undefined,
          fillOpacity: undefined,
          strokeColor: undefined,
          strokeOpacity: undefined,
          strokePosition: 'CENTER',
          strokeWeight: 0,
          visible: true,
          zIndex: undefined,
        });
      },
    ));
  });
  describe('Delete a circle', () => {
    it('should set the map to null when deleting a existing circle', inject(
      [CircleManager, GoogleMapsAPIWrapper],
      (
        circleManager: CircleManager,
        apiWrapper: GoogleMapsAPIWrapper,
      ) => {
        const newCircle = new AgmCircle(circleManager);
        newCircle.radius = 500;
        newCircle.latitude = 32.1;
        newCircle.longitude = 11.612;
        circleManager.addCircle(newCircle);

        const circleInstance: any = {
          setMap: jest.fn(),
        };
        (apiWrapper.createCircle as jest.Mock).mockReturnValue(
          Promise.resolve(circleInstance),
        );

        circleManager.addCircle(newCircle);
        circleManager.removeCircle(newCircle).then(() => {
          expect(circleInstance.setMap).toHaveBeenCalledWith(null);
        });
      },
    ));
  });

  describe('Set radius option', () => {
    it('should update that circle via setRadius method when the radius changes', fakeAsync(
      inject(
        [CircleManager, GoogleMapsAPIWrapper],
        (
          circleManager: CircleManager,
          apiWrapper: GoogleMapsAPIWrapper,
        ) => {
          const newCircle = new AgmCircle(circleManager);
          newCircle.radius = 500;
          newCircle.latitude = 32.1;
          newCircle.longitude = 11.612;

          const circleInstance: Circle = {
            setMap: jest.fn(),
            setRadius: jest.fn(),
          } as any;
          (apiWrapper.createCircle as jest.Mock).mockReturnValue(
            Promise.resolve(circleInstance),
          );
          circleManager.addCircle(newCircle);
          newCircle.radius = 600;

          circleManager.setRadius(newCircle);
          tick();
          expect(circleInstance.setRadius).toHaveBeenCalledWith(600);
        },
      ),
    ));
  });

  describe('Set options', () => {
    it('should update that circle via setOptions method when the opacity options change', fakeAsync(
      inject(
        [CircleManager, GoogleMapsAPIWrapper],
        (
          circleManager: CircleManager,
          apiWrapper: GoogleMapsAPIWrapper,
        ) => {
          const newCircle = new AgmCircle(circleManager);
          newCircle.radius = 500;
          newCircle.latitude = 32.1;
          newCircle.longitude = 11.612;
          newCircle.fillOpacity = 0.4;
          newCircle.strokeOpacity = 0.4;

          const circleInstance: any = {
            setMap: jest.fn(),
            setOptions: jest.fn(),
          };

          (apiWrapper.createCircle as jest.Mock).mockReturnValue(
            Promise.resolve(circleInstance),
          );

          circleManager.addCircle(newCircle);

          newCircle.fillOpacity = 0.6;
          newCircle.strokeOpacity = 0.6;

          const options = {
            fillOpacity: 0.6,
            strokeOpacity: 0.6,
          };

          circleManager.setOptions(newCircle, options);
          tick();
          expect(circleInstance.setOptions).toHaveBeenCalledWith(options);
        },
      ),
    ));

    it('should update that circle via setOptions method when the color options change', fakeAsync(
      inject(
        [CircleManager, GoogleMapsAPIWrapper],
        (
          circleManager: CircleManager,
          apiWrapper: GoogleMapsAPIWrapper,
        ) => {
          const newCircle = new AgmCircle(circleManager);
          newCircle.radius = 500;
          newCircle.latitude = 32.1;
          newCircle.longitude = 11.612;
          newCircle.fillColor = '#FF7F50';
          newCircle.strokeColor = '#FF7F50';

          const circleInstance: any = {
            setMap: jest.fn(),
            setOptions: jest.fn(),
          };

          (apiWrapper.createCircle as jest.Mock).mockReturnValue(
            Promise.resolve(circleInstance));

          circleManager.addCircle(newCircle);
          newCircle.fillColor = '#00008B';
          newCircle.strokeColor = '#00008B';

          const options = {
            fillColor: '#00008B',
            strokeColor: '#00008B',
          };

          circleManager.setOptions(newCircle, options);
          tick();
          expect(circleInstance.setOptions).toHaveBeenCalledWith(options);
        },
      ),
    ));

    it('should update that circle via setOptions method when the strokeWeight/position change', fakeAsync(
      inject(
        [CircleManager, GoogleMapsAPIWrapper],
        (
          circleManager: CircleManager,
          apiWrapper: GoogleMapsAPIWrapper,
        ) => {
          const newCircle = new AgmCircle(circleManager);
          newCircle.radius = 500;
          newCircle.latitude = 32.1;
          newCircle.longitude = 11.612;
          newCircle.strokeWeight = 3;
          newCircle.strokePosition = 'INSIDE';

          const circleInstance: any = {
            setMap: jest.fn(),
            setOptions: jest.fn(),
          };

          (apiWrapper.createCircle as jest.Mock).mockReturnValue(
            Promise.resolve(circleInstance));

          circleManager.addCircle(newCircle);

          const options = {
            strokeWeight: 2,
            strokePosition: 'OUTSIDE',
          } as CircleOptions;

          circleManager.setOptions(newCircle, options);
          tick();
          expect(circleInstance.setOptions).toHaveBeenCalledWith({
            strokeWeight: 2,
            strokePosition: 2,
          });
        },
      ),
    ));

    it('should update that circle via setVisible method when the visible changes', fakeAsync(
      inject(
        [CircleManager, GoogleMapsAPIWrapper],
        (
          circleManager: CircleManager,
          apiWrapper: GoogleMapsAPIWrapper,
        ) => {
          const newCircle = new AgmCircle(circleManager);
          newCircle.radius = 500;
          newCircle.latitude = 32.1;
          newCircle.longitude = 11.612;
          newCircle.visible = false;

          const circleInstance: any = {
            setMap: jest.fn(),
            setVisible: jest.fn(),
          };
          (apiWrapper.createCircle as jest.Mock).mockReturnValue(
            Promise.resolve(circleInstance),
          );
          circleManager.addCircle(newCircle);

          newCircle.visible = true;
          circleManager.setVisible(newCircle);

          tick();
          expect(circleInstance.setVisible).toHaveBeenCalledWith(true);
        },
      ),
    ));
  });

});
