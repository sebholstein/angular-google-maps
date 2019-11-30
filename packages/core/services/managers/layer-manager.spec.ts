import { NgZone } from '@angular/core';
import { fakeAsync, inject, TestBed } from '@angular/core/testing';
import { AgmBicyclingLayer } from '../../directives/bicycling-layer';
import { AgmTransitLayer } from '../../directives/transit-layer';
import { GoogleMapsAPIWrapper } from '../../services/google-maps-api-wrapper';
import { LayerManager } from './layer-manager';

describe('LayerManager', () => {
    beforeAll(() => {
        (window as any).google = {
            maps: {
                TransitLayer: class TransitLayer {
                    setMap = jest.fn();
                    getMap = jest.fn();
                    constructor() {

                    }
                },

                BicyclingLayer: class BicyclingLayer {
                    setMap = jest.fn();
                    getMap = jest.fn();
                    constructor() {

                    }
                },
            },
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
                        createTransitLayer: jest.fn(),
                        createBicyclingLayer: jest.fn(),

                    },
                },
                LayerManager,

            ],
        });
    }); // end beforeEach

    describe('Create a new transit layer', () => {

        it('should call mapsApiWrapper when creating a new transit layer',
            fakeAsync(inject(
                [LayerManager, GoogleMapsAPIWrapper],
                (layerManager: LayerManager, apiWrapper: GoogleMapsAPIWrapper) => {
                    const transitLayer = new AgmTransitLayer(layerManager);
                    const opt = {visible: false};
                    layerManager.addTransitLayer(transitLayer, opt);
                    expect(apiWrapper.createTransitLayer).toHaveBeenCalledWith(opt);
                }),
            ),
        );
    });

    describe('Create a new bicycling layer', () => {

        it('should call mapsApiWrapper when creating a new bicycling layer',
            fakeAsync(inject(
                [LayerManager, GoogleMapsAPIWrapper],
                (layerManager: LayerManager, apiWrapper: GoogleMapsAPIWrapper) => {
                    const bicyclingLayer = new AgmBicyclingLayer(layerManager);
                    const opt = {visible: true};
                    layerManager.addBicyclingLayer(bicyclingLayer, opt);
                    expect(apiWrapper.createBicyclingLayer).toHaveBeenCalledWith(opt);

                }),
            ),
        );
    });

    describe('Toggling visibility of a MapLayer', () => {

        it('should update the visibility of a map layer when the visibility option changes', fakeAsync(

            inject(
                [LayerManager, GoogleMapsAPIWrapper],
                (layerManager: LayerManager,
                 apiWrapper: GoogleMapsAPIWrapper) => {
                    const newLayer = new AgmTransitLayer(layerManager);
                    newLayer.visible = true;

                    const transitLayerInstance: any = {
                        setMap: jest.fn(),
                        getMap: jest.fn(),
                    };

                    (apiWrapper.createTransitLayer as jest.Mock).mockReturnValue(
                        Promise.resolve(transitLayerInstance),
                    );

                    layerManager.addTransitLayer(newLayer, {visible: true});
                    expect(apiWrapper.createTransitLayer).toHaveBeenCalledWith({visible: true});

                    newLayer.visible = false;
                    layerManager.toggleLayerVisibility(newLayer, {visible: false}).then(() => {
                        expect(transitLayerInstance.setMap).toHaveBeenCalledWith(null);
                    });
                },
            ),

        ));

    });

});
