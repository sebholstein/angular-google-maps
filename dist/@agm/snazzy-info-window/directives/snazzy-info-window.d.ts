import { AgmMarker, GoogleMapsAPIWrapper, MapsAPILoader, MarkerManager } from '@agm/core';
import { AfterViewInit, ElementRef, EventEmitter, OnChanges, OnDestroy, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
export declare class AgmSnazzyInfoWindow implements AfterViewInit, OnDestroy, OnChanges {
    private _marker;
    private _wrapper;
    private _manager;
    private _loader;
    /**
     * The latitude and longitude where the info window is anchored.
     * The offset will default to 0px when using this option. Only required/used if you are not using a agm-marker.
     */
    latitude: number;
    /**
     * The longitude where the info window is anchored.
     * The offset will default to 0px when using this option. Only required/used if you are not using a agm-marker.
     */
    longitude: number;
    /**
     * Changes the open status of the snazzy info window.
     */
    isOpen: boolean;
    /**
     * Emits when the open status changes.
     */
    isOpenChange: EventEmitter<boolean>;
    /**
     * Choose where you want the info window to be displayed, relative to the marker.
     */
    placement: 'top' | 'bottom' | 'left' | 'right';
    /**
     * The max width in pixels of the info window.
     */
    maxWidth: number | string;
    /**
     * The max height in pixels of the info window.
     */
    maxHeight: number | string;
    /**
     * The color to use for the background of the info window.
     */
    backgroundColor: string;
    /**
     * A custom padding size around the content of the info window.
     */
    padding: string;
    /**
     * A custom border around the info window. Set to false to completely remove the border.
     * The units used for border should be the same as pointer.
     */
    border: {
        width: string;
        color: string;
    } | boolean;
    /**
     * A custom CSS border radius property to specify the rounded corners of the info window.
     */
    borderRadius: string;
    /**
     * The font color to use for the content inside the body of the info window.
     */
    fontColor: string;
    /**
     * The font size to use for the content inside the body of the info window.
     */
    fontSize: string;
    /**
     * The height of the pointer from the info window to the marker.
     * Set to false to completely remove the pointer.
     * The units used for pointer should be the same as border.
     */
    pointer: string | boolean;
    /**
     * The CSS properties for the shadow of the info window.
     * Set to false to completely remove the shadow.
     */
    shadow: boolean | {
        h?: string;
        v?: string;
        blur: string;
        spread: string;
        opacity: number;
        color: string;
    };
    /**
     * Determines if the info window will open when the marker is clicked.
     * An internal listener is added to the Google Maps click event which calls the open() method.
     */
    openOnMarkerClick: boolean;
    /**
     * Determines if the info window will close when the map is clicked. An internal listener is added to the Google Maps click event which calls the close() method.
     * This will not activate on the Google Maps drag event when the user is panning the map.
     */
    closeOnMapClick: boolean;
    /**
     * An optional CSS class to assign to the wrapper container of the info window.
     * Can be used for applying custom CSS to the info window.
     */
    wrapperClass: string;
    /**
     * Determines if the info window will close when any other Snazzy Info Window is opened.
     */
    closeWhenOthersOpen: boolean;
    /**
     * Determines if the info window will show a close button.
     */
    showCloseButton: boolean;
    /**
     * Determines if the info window will be panned into view when opened.
     */
    panOnOpen: boolean;
    /**
     * Emits before the info window opens.
     */
    beforeOpen: EventEmitter<void>;
    /**
     * Emits before the info window closes.
     */
    afterClose: EventEmitter<void>;
    /**
     * @internal
     */
    _outerWrapper: ElementRef;
    /**
     * @internal
     */
    _viewContainerRef: ViewContainerRef;
    /**
     * @internal
     */
    _templateRef: TemplateRef<any>;
    protected _nativeSnazzyInfoWindow: any;
    protected _snazzyInfoWindowInitialized: Promise<any> | null;
    constructor(_marker: AgmMarker, _wrapper: GoogleMapsAPIWrapper, _manager: MarkerManager, _loader: MapsAPILoader);
    /**
     * @internal
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * @internal
     */
    ngAfterViewInit(): void;
    protected _openInfoWindow(): void;
    protected _closeInfoWindow(): void;
    protected _createViewContent(): void;
    protected _updatePosition(): void;
    /**
     * Returns true when the Snazzy Info Window is initialized and open.
     */
    openStatus(): boolean;
    /**
     * @internal
     */
    ngOnDestroy(): void;
}
