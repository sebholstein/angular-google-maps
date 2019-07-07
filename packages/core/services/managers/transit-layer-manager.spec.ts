import {NgZone} from '@angular/core';
import {TestBed, inject, fakeAsync} from '@angular/core/testing';
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
                    const opt = {visible: false};
                    transitLayerManager.addTransitLayer(newTransitLayer, opt);
                    expect(apiWrapper.createTransitLayer).toHaveBeenCalled();

                })
            )
        );
    });

    describe('Toggling visibility of TransitLayer', () => {

        it('should update that transit layer via setOptions method when the options changes', fakeAsync(

            inject(
                [TransitLayerManager, GoogleMapsAPIWrapper],
                (transitLayerManager: TransitLayerManager,
                 apiWrapper: GoogleMapsAPIWrapper) => {
                    const newTransitLayer = new AgmTransitLayer(transitLayerManager);
                    newTransitLayer.visible = true;

                    const transitLayerInstance: any = {
                        setMap: jest.fn(),
                        setOptions: jest.fn()

                    };

                    (<jest.Mock>apiWrapper.createTransitLayer).mockReturnValue(
                        Promise.resolve(transitLayerInstance)
                    );

                    transitLayerManager.addTransitLayer(newTransitLayer, {visible: true});
                    expect(apiWrapper.createTransitLayer).toHaveBeenCalledWith({
                        visible: true
                    });

                    newTransitLayer.visible = false;
                    transitLayerManager.setOptions(newTransitLayer, {visible: false}).then(() => {
                        expect(transitLayerInstance.setMap).toHaveBeenCalledWith(null);
                    });

                }
            )

        ));

    });

});
