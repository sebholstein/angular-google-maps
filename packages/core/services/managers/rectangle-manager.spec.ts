import { NgZone } from '@angular/core';
import { TestBed, async, inject } from '@angular/core/testing';

import { AgmRectangle } from './../../directives/rectangle';
import { GoogleMapsAPIWrapper } from './../google-maps-api-wrapper';
import { Rectangle } from './../google-maps-types';
import { RectangleManager } from './../managers/rectangle-manager';

describe('RectangleManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: NgZone,
          useFactory: () => new NgZone({ enableLongStackTrace: true })
        },
        RectangleManager,
        {
          provide: GoogleMapsAPIWrapper,
          useValue: { createRectangle: jest.fn() }
        }
      ]
    });
  });

  describe('Create a new rectangle', () => {
    it('should call the mapsApiWrapper when creating a new rectangle', inject(
      [RectangleManager, GoogleMapsAPIWrapper],
      (
        rectangleManager: RectangleManager,
        apiWrapper: GoogleMapsAPIWrapper
      ) => {
        const newRectangle = new AgmRectangle(rectangleManager);
        newRectangle.north = 12.7;
        newRectangle.east = 56.6;
        newRectangle.south = 89.2;
        newRectangle.west = 52.6;
        rectangleManager.addRectangle(newRectangle);

        expect(apiWrapper.createRectangle).toHaveBeenCalledWith({
          bounds: {
            north: 12.7,
            east: 56.6,
            south: 89.2,
            west: 52.6
          },
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
          zIndex: undefined
        });
      }
    ));
  });

  describe('Delete a rectangle', () => {
    it('should set the map to null when deleting a existing rectangle', inject(
      [RectangleManager, GoogleMapsAPIWrapper],
      (
        rectangleManager: RectangleManager,
        apiWrapper: GoogleMapsAPIWrapper
      ) => {
        const newRectangle = new AgmRectangle(rectangleManager);
        newRectangle.north = 12.7;
        newRectangle.east = 56.6;
        newRectangle.south = 89.2;
        newRectangle.west = 52.6;

        const rectangleInstance: any = {
          setMap: jest.fn()
        };
        (<jest.Mock>apiWrapper.createRectangle).mockReturnValue(
          Promise.resolve(rectangleInstance)
        );

        rectangleManager.addRectangle(newRectangle);
        rectangleManager.removeRectangle(newRectangle).then(() => {
          expect(rectangleInstance.setMap).toHaveBeenCalledWith(null);
        });
      }
    ));
  });

  describe('Set bounds option', () => {
    it('should update that rectangle via setBounds method when the bounds changes', async(
      inject(
        [RectangleManager, GoogleMapsAPIWrapper],
        (
          rectangleManager: RectangleManager,
          apiWrapper: GoogleMapsAPIWrapper
        ) => {
          const newRectangle = new AgmRectangle(rectangleManager);
          newRectangle.north = 12.7;
          newRectangle.east = 56.6;
          newRectangle.south = 89.2;
          newRectangle.west = 52.6;

          const rectangleInstance: Rectangle = <any>{
            setMap: jest.fn(),
            setBounds: jest.fn()
          };
          (<jest.Mock>apiWrapper.createRectangle).mockReturnValue(
            Promise.resolve(rectangleInstance)
          );

          rectangleManager.addRectangle(newRectangle);
          expect(apiWrapper.createRectangle).toHaveBeenCalledWith({
            bounds: {
              north: 12.7,
              east: 56.6,
              south: 89.2,
              west: 52.6
            },
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
            zIndex: undefined
          });
          newRectangle.north = 15.6;
          newRectangle.east = 45.2;
          newRectangle.south = 12.6;
          newRectangle.west = 41.3;

          const bounds = {
            north: 15.6,
            east: 45.2,
            south: 12.6,
            west: 41.3
          };

          return rectangleManager.setBounds(newRectangle).then(() => {
            expect(rectangleInstance.setBounds).toHaveBeenCalledWith(bounds);
          });
        }
      )
    ));
  });

  describe('Set fill/stroke opacity option', () => {
    it('should update that rectangle via setOptions method when the options changes', async(
      inject(
        [RectangleManager, GoogleMapsAPIWrapper],
        (
          rectangleManager: RectangleManager,
          apiWrapper: GoogleMapsAPIWrapper
        ) => {
          const newRectangle = new AgmRectangle(rectangleManager);
          newRectangle.north = 12.7;
          newRectangle.east = 56.6;
          newRectangle.south = 89.2;
          newRectangle.west = 52.6;
          newRectangle.fillOpacity = 0.4;
          newRectangle.strokeOpacity = 0.4;

          const rectangleInstance: any = {
            setMap: jest.fn(),
            setOptions: jest.fn()
          };

          (<jest.Mock>apiWrapper.createRectangle).mockReturnValue(
            Promise.resolve(rectangleInstance)
          );

          rectangleManager.addRectangle(newRectangle);
          expect(apiWrapper.createRectangle).toHaveBeenCalledWith({
            bounds: {
              north: 12.7,
              east: 56.6,
              south: 89.2,
              west: 52.6
            },
            clickable: true,
            draggable: false,
            editable: false,
            fillColor: undefined,
            fillOpacity: 0.4,
            strokeColor: undefined,
            strokeOpacity: 0.4,
            strokePosition: 'CENTER',
            strokeWeight: 0,
            visible: true,
            zIndex: undefined
          });
          newRectangle.fillOpacity = 0.6;
          newRectangle.strokeOpacity = 0.6;

          const options = {
            fillOpacity: 0.6,
            strokeOpacity: 0.6
          };

          return rectangleManager.setOptions(newRectangle, options).then(() => {
            expect(rectangleInstance.setOptions).toHaveBeenCalledWith(options);
          });
        }
      )
    ));
  });

  describe('Set fill/stroke color option', () => {
    it('should update that rectangle via setOptions method when the options changes', async(
      inject(
        [RectangleManager, GoogleMapsAPIWrapper],
        (
          rectangleManager: RectangleManager,
          apiWrapper: GoogleMapsAPIWrapper
        ) => {
          const newRectangle = new AgmRectangle(rectangleManager);
          newRectangle.north = 12.7;
          newRectangle.east = 56.6;
          newRectangle.south = 89.2;
          newRectangle.west = 52.6;
          newRectangle.fillColor = '#FF7F50';
          newRectangle.strokeColor = '#FF7F50';

          const rectangleInstance: any = {
            setMap: jest.fn(),
            setOptions: jest.fn()
          };
          (<jest.Mock>apiWrapper.createRectangle).mockReturnValue(
            Promise.resolve(rectangleInstance)
          );

          rectangleManager.addRectangle(newRectangle);
          expect(apiWrapper.createRectangle).toHaveBeenCalledWith({
            bounds: {
              north: 12.7,
              east: 56.6,
              south: 89.2,
              west: 52.6
            },
            clickable: true,
            draggable: false,
            editable: false,
            fillColor: '#FF7F50',
            fillOpacity: undefined,
            strokeColor: '#FF7F50',
            strokeOpacity: undefined,
            strokePosition: 'CENTER',
            strokeWeight: 0,
            visible: true,
            zIndex: undefined
          });
          newRectangle.fillColor = '#00008B';
          newRectangle.strokeColor = '#00008B';

          const options = {
            fillColor: '#00008B',
            strokeColor: '#00008B'
          };

          return rectangleManager.setOptions(newRectangle, options).then(() => {
            expect(rectangleInstance.setOptions).toHaveBeenCalledWith(options);
          });
        }
      )
    ));
  });

  describe('Set visible option', () => {
    it('should update that rectangle via setVisible method when the visible changes', async(
      inject(
        [RectangleManager, GoogleMapsAPIWrapper],
        (
          rectangleManager: RectangleManager,
          apiWrapper: GoogleMapsAPIWrapper
        ) => {
          const newRectangle = new AgmRectangle(rectangleManager);
          newRectangle.north = 12.7;
          newRectangle.east = 56.6;
          newRectangle.south = 89.2;
          newRectangle.west = 52.6;
          newRectangle.visible = false;

          const rectangleInstance: any = {
            setMap: jest.fn(),
            setVisible: jest.fn()
          };
          (<jest.Mock>apiWrapper.createRectangle).mockReturnValue(
            Promise.resolve(rectangleInstance)
          );

          rectangleManager.addRectangle(newRectangle);
          expect(apiWrapper.createRectangle).toHaveBeenCalledWith({
            bounds: {
              north: 12.7,
              east: 56.6,
              south: 89.2,
              west: 52.6
            },
            clickable: true,
            draggable: false,
            editable: false,
            fillColor: undefined,
            fillOpacity: undefined,
            strokeColor: undefined,
            strokeOpacity: undefined,
            strokePosition: 'CENTER',
            strokeWeight: 0,
            visible: false,
            zIndex: undefined
          });
          newRectangle.visible = true;
          return rectangleManager.setVisible(newRectangle).then(() => {
            expect(rectangleInstance.setVisible).toHaveBeenCalledWith(true);
          });
        }
      )
    ));
  });
});
