import {NgZone} from '@angular/core';
import {TestBed, inject, fakeAsync, async } from '@angular/core/testing';
import {AgmTransitLayer} from '../../directives/transit-layer';
import {GoogleMapsAPIWrapper} from '../../services/google-maps-api-wrapper';
import {TransitLayerManager} from '../../services/managers/transit-layer-manager';

describe('TransitLayerManager', () => {
    beforeAll(() => {
        (<any>window).google = {
            maps: {
                TransitLayer: class TransitLayer {
                    setMap = jest.fn();

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
                        createTransitLayer: jest.fn()
                    }
                },
                TransitLayerManager,

            ]
        });
    }); // end beforeEach

    describe('Create a new TransitLayer', () => {

        it('should call mapsApiWrapper when creating a new transit',
            fakeAsync(inject(
                [TransitLayerManager, GoogleMapsAPIWrapper],
                (transitLayerManager: TransitLayerManager, apiWrapper: GoogleMapsAPIWrapper) => {
                    const newTransitLayer = new AgmTransitLayer(transitLayerManager);
                    const opt = {inVisible: false};
                    const spy = jest.spyOn(apiWrapper, 'createTransitLayer');
                    transitLayerManager.addTransitLayer(newTransitLayer, opt);
                    expect(spy).toHaveBeenCalled();

                    spy.mockRestore();

                })
            )
        );
    });

    describe('Toggling visibility of TransitLayer', () => {

        it('should update that rectangle via setOptions method when the options changes', async(

            inject(
                [TransitLayerManager, GoogleMapsAPIWrapper],
                (transitLayerManager: TransitLayerManager,
                 apiWrapper: GoogleMapsAPIWrapper) => {
                    const newTransitLayer = new AgmTransitLayer(transitLayerManager);
                    newTransitLayer.inVisible = true;

                    const transitLayerInstance: any = {
                        setMap: jest.fn(),
                        toggleTransitLayer: jest.fn(),
                        setOptions: jest.fn()

                    };

                    (<jest.Mock>apiWrapper.createTransitLayer).mockReturnValue(
                        Promise.resolve(transitLayerInstance)
                    );

                    transitLayerManager.addTransitLayer(newTransitLayer, {inVisible: false});
                    expect(apiWrapper.createTransitLayer).toHaveBeenCalledWith({
                        inVisible: false
                    });

                    newTransitLayer.inVisible = false;
                    transitLayerManager.setOptions(newTransitLayer, {inVisible: true}).then(() => {
                        expect(transitLayerInstance.setMap).toHaveBeenCalledWith(null);
                    });

                }
            )

        ));

    });

});
