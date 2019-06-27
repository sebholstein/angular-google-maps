import {NgZone, QueryList} from '@angular/core';
import {TestBed, inject, fakeAsync, tick} from '@angular/core/testing';

import {AgmPolyline} from '../../directives/polyline';
import {GoogleMapsAPIWrapper} from '../../services/google-maps-api-wrapper';
import { Polyline } from '../../services/google-maps-types';
import {PolylineManager} from '../../services/managers/polyline-manager';
import { AgmPolylineIcon } from '@agm/core/directives/polyline-icon';
import { Subject } from 'rxjs';

describe('PolylineManager', () => {
  beforeAll(() => {
    (<any>window).google = {
      maps: {
        Point: class Point {
          constructor(public x: number, public y: number) {

          }
        },
        SymbolPath: {
          BACKWARD_CLOSED_ARROW: 3,
          BACKWARD_OPEN_ARROW: 4,
          CIRCLE: 0,
          FORWARD_CLOSED_ARROW: 1,
          FORWARD_OPEN_ARROW: 2,
        }
      }
    };
  });

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        {provide: NgZone, useFactory: () => new NgZone({enableLongStackTrace: true})},
        PolylineManager, {
          provide: GoogleMapsAPIWrapper,
          useValue: {
            createPolyline: jest.fn()
          }
        }
      ]
    });
  }); // end beforeEach

  describe('Create a new polyline', () => {

    it('should call the mapsApiWrapper when creating a new polyline',
       inject(
           [PolylineManager, GoogleMapsAPIWrapper],
           (polylineManager: PolylineManager, apiWrapper: GoogleMapsAPIWrapper) => {

             const newPolyline = new AgmPolyline(polylineManager);
             polylineManager.addPolyline(newPolyline);

             expect(apiWrapper.createPolyline).toHaveBeenCalledWith({
               clickable: true,
               draggable: false,
               editable: false,
               geodesic: false,
               strokeColor: undefined,
               strokeOpacity: undefined,
               strokeWeight: undefined,
               visible: true,
               zIndex: undefined,
               path: [],
               icons: [],
             });
           }));

    it('should call the mapsApiWrapper when creating a new polyline',
       fakeAsync(inject(
          [PolylineManager, GoogleMapsAPIWrapper],
          (polylineManager: PolylineManager, apiWrapper: GoogleMapsAPIWrapper) => {
            const newPolyline = new AgmPolyline(polylineManager);
              newPolyline.iconSequences = Object.assign(new QueryList<AgmPolylineIcon>(), {
                changes: new Subject<AgmPolylineIcon>(),
                toArray: () => [{
                    fixedRotation: true,
                    offset: '1px',
                    repeat: '50px',
                    anchorX: 10,
                    anchorY: 15,
                    fillColor: 'blue',
                    fillOpacity: 0.5,
                    rotation: 60,
                    scale: 2,
                    strokeColor: 'green',
                    strokeOpacity: 0.7,
                    strokeWeight: 1.5,
                    path: 'CIRCLE',
                  }
                ]
              }) as QueryList<AgmPolylineIcon>;
              polylineManager.addPolyline(newPolyline);

              expect(apiWrapper.createPolyline).toHaveBeenCalledWith({
                 clickable: true,
                 draggable: false,
                 editable: false,
                 geodesic: false,
                 strokeColor: undefined,
                 strokeOpacity: undefined,
                 strokeWeight: undefined,
                 visible: true,
                 zIndex: undefined,
                 path: [],
                 icons: [{
                  'fixedRotation': true,
                  'icon':  {
                    'anchor': {'x': 10, 'y': 15},
                    'fillColor': 'blue',
                    'fillOpacity': 0.5,
                    'path': 0,
                    'rotation': 60,
                    'scale': 2,
                    'strokeColor': 'green',
                    'strokeOpacity': 0.7,
                    'strokeWeight': 1.5
                  },
                  'offset': '1px',
                  'repeat': '50px'
                }],
               });
             })
    ));

  });

  describe('Delete a polyline', () => {
    it('should set the map to null when deleting a existing polyline',
       inject(
           [PolylineManager, GoogleMapsAPIWrapper],
           (polylineManager: PolylineManager, apiWrapper: GoogleMapsAPIWrapper) => {
             const newPolyline = new AgmPolyline(polylineManager);

             const polylineInstance: Partial<Polyline> = {
              setMap: jest.fn()
             };
             (<jest.Mock>apiWrapper.createPolyline).mockReturnValue(Promise.resolve(polylineInstance));

             polylineManager.addPolyline(newPolyline);
             polylineManager.deletePolyline(newPolyline).then(() => {
               expect(polylineInstance.setMap).toHaveBeenCalledWith(null);
             });
           }));
  });

});
