import {NgZone} from '@angular/core';
import {TestBed, inject, fakeAsync} from '@angular/core/testing';
import {AgmTransitLayer} from '../../directives/transit-layer';
import {GoogleMapsAPIWrapper} from '../../services/google-maps-api-wrapper';
import {MapLayerManager} from './map-layer-manager';
import {AgmBicyclingLayer} from '../../directives/bicycling-layer';

describe('MapLayerManager', () => {
    beforeAll(() => {
        (<any>window).google = {
            maps: {
                MapLayer: class MapLayer {
                    setMap = jest.fn();
                    getMap = jest.fn();
                    setOptions = jest.fn();

                    constructor() {

                    }
                },
            }
        };
    });

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                {provide: NgZone, useFactory: () => new NgZone({enableLongStackTrace: true})},
                {
                    provide: GoogleMapsAPIWrapper,
                    useValue: {
                        getNativeMap: () => Promise.resolve(),
                        createMapLayer: jest.fn()
                    }
                },
                MapLayerManager,

            ]
        });
    }); // end beforeEach

    describe('Create a new transit layer', () => {

        it('should call mapsApiWrapper when creating a new transit layer',
            fakeAsync(inject(
                [MapLayerManager, GoogleMapsAPIWrapper],
                (mapLayerManager: MapLayerManager, apiWrapper: GoogleMapsAPIWrapper) => {
                    const transitLayer = new AgmTransitLayer(mapLayerManager);
                    const opt = {visible: false};
                    mapLayerManager.addMapLayer(transitLayer, opt);
                    expect(apiWrapper.createMapLayer).toHaveBeenCalledWith(opt, 'TransitLayer');

                })
            )
        );
    });

    describe('Create a new bicycling layer', () => {

        it('should call mapsApiWrapper when creating a new bicycling layer',
            fakeAsync(inject(
                [MapLayerManager, GoogleMapsAPIWrapper],
                (mapLayerManager: MapLayerManager, apiWrapper: GoogleMapsAPIWrapper) => {
                    const bicyclingLayer = new AgmBicyclingLayer(mapLayerManager);
                    const opt = {visible: true};
                    mapLayerManager.addMapLayer(bicyclingLayer, opt);
                    expect(apiWrapper.createMapLayer).toHaveBeenCalledWith(opt, 'BicyclingLayer');

                })
            )
        );
    });

    describe('Toggling visibility of a MapLayer', () => {

        it('should update the visibility of a map layer when the visibility option changes', fakeAsync(

            inject(
                [MapLayerManager, GoogleMapsAPIWrapper],
                (mapLayerManager: MapLayerManager,
                 apiWrapper: GoogleMapsAPIWrapper) => {
                    const newMapLayer = new AgmTransitLayer(mapLayerManager);
                    newMapLayer.visible = true;

                    const transitLayerInstance: any = {
                        setMap: jest.fn(),
                        getMap: jest.fn(),
                        setOptions: jest.fn()

                    };

                    (<jest.Mock>apiWrapper.createMapLayer).mockReturnValue(
                        Promise.resolve(transitLayerInstance)
                    );

                    mapLayerManager.addMapLayer(newMapLayer, {visible: true});
                    expect(apiWrapper.createMapLayer).toHaveBeenCalledWith({visible: true}, 'TransitLayer');

                    newMapLayer.visible = false;
                    mapLayerManager.toggleLayerVisibility(newMapLayer, {visible: false}).then(() => {
                        expect(transitLayerInstance.setMap).toHaveBeenCalledWith(null);
                    });
                }
            )

        ));

    });

});
