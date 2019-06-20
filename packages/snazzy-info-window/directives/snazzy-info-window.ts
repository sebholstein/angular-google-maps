import { Host, SkipSelf, OnChanges, AfterViewInit, EventEmitter, Input, SimpleChanges, ViewContainerRef, TemplateRef, Output, Optional, OnDestroy, ElementRef, Component, ViewChild, ContentChild } from '@angular/core';
import { AgmMarker, GoogleMapsAPIWrapper, MarkerManager, MapsAPILoader } from '@agm/core';

declare var require: any;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'agm-snazzy-info-window',
  template: '<div #outerWrapper><div #viewContainer></div></div><ng-content></ng-content>'
})
export class AgmSnazzyInfoWindow implements AfterViewInit, OnDestroy, OnChanges {
  /**
   * The latitude and longitude where the info window is anchored.
   * The offset will default to 0px when using this option. Only required/used if you are not using a agm-marker.
   */
  @Input() latitude: number;

  /**
   * The longitude where the info window is anchored.
   * The offset will default to 0px when using this option. Only required/used if you are not using a agm-marker.
   */
  @Input() longitude: number;

  /**
   * Changes the open status of the snazzy info window.
   */
  @Input() isOpen: boolean = false;

  /**
   * Emits when the open status changes.
   */
  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Choose where you want the info window to be displayed, relative to the marker.
   */
  @Input() placement: 'top'|'bottom'|'left'|'right' = 'top';

  /**
   * The max width in pixels of the info window.
   */
  @Input() maxWidth: number|string = 200;

  /**
   * The max height in pixels of the info window.
   */
  @Input() maxHeight: number|string = 200;

  /**
   * The color to use for the background of the info window.
   */
  @Input() backgroundColor: string;

  /**
   * A custom padding size around the content of the info window.
   */
  @Input() padding: string;

  /**
   * A custom border around the info window. Set to false to completely remove the border.
   * The units used for border should be the same as pointer.
   */
  @Input() border: {width: string; color: string}|boolean;

  /**
   * A custom CSS border radius property to specify the rounded corners of the info window.
   */
  @Input() borderRadius: string;

  /**
   * The font color to use for the content inside the body of the info window.
   */
  @Input() fontColor: string;

  /**
   * The font size to use for the content inside the body of the info window.
   */
  @Input() fontSize: string;

  /**
   * The height of the pointer from the info window to the marker.
   * Set to false to completely remove the pointer.
   * The units used for pointer should be the same as border.
   */
  @Input() pointer: string|boolean;

  /**
   * The CSS properties for the shadow of the info window.
   * Set to false to completely remove the shadow.
   */
  @Input() shadow: boolean|{h?: string, v?: string, blur: string, spread: string, opacity: number, color: string};

  /**
   * Determines if the info window will open when the marker is clicked.
   * An internal listener is added to the Google Maps click event which calls the open() method.
   */
  @Input() openOnMarkerClick: boolean = true;

  /**
   * Determines if the info window will close when the map is clicked. An internal listener is added to the Google Maps click event which calls the close() method.
   * This will not activate on the Google Maps drag event when the user is panning the map.
   */
  @Input() closeOnMapClick: boolean = true;

  /**
   * An optional CSS class to assign to the wrapper container of the info window.
   * Can be used for applying custom CSS to the info window.
   */
  @Input() wrapperClass: string;

  /**
   * Determines if the info window will close when any other Snazzy Info Window is opened.
   */
  @Input() closeWhenOthersOpen: boolean = false;

  /**
   * Determines if the info window will show a close button.
   */
  @Input() showCloseButton: boolean = true;

  /**
   * Determines if the info window will be panned into view when opened.
   */
  @Input() panOnOpen: boolean = true;

  /**
   * Emits before the info window opens.
   */
  @Output() beforeOpen: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Emits before the info window closes.
   */
  @Output() afterClose: EventEmitter<void> = new EventEmitter<void>();

  /**
   * @internal
   */
  @ViewChild('outerWrapper', {read: ElementRef}) _outerWrapper: ElementRef;

  /**
   * @internal
   */
  @ViewChild('viewContainer', {read: ViewContainerRef}) _viewContainerRef: ViewContainerRef;

  /**
   * @internal
   */
  @ContentChild(TemplateRef) _templateRef: TemplateRef<any>;

  protected _nativeSnazzyInfoWindow: any;
  protected _snazzyInfoWindowInitialized: Promise<any>|null = null;

  constructor(
    @Optional() @Host() @SkipSelf() private _marker: AgmMarker,
    private _wrapper: GoogleMapsAPIWrapper,
    private _manager: MarkerManager,
    private _loader: MapsAPILoader
  ) {}

  /**
   * @internal
   */
  ngOnChanges(changes: SimpleChanges) {
    if (this._nativeSnazzyInfoWindow == null) {
      return;
    }
    if ('isOpen' in changes && this.isOpen) {
      this._openInfoWindow();
    } else if ('isOpen' in changes && !this.isOpen) {
      this._closeInfoWindow();
    }
    if (('latitude' in changes || 'longitude' in changes) && this._marker == null) {
      this._updatePosition();
    }
  }

  /**
   * @internal
   */
  ngAfterViewInit() {
    const m = this._manager != null ? this._manager.getNativeMarker(this._marker) : null;
    this._snazzyInfoWindowInitialized = this._loader.load()
      .then(() => require('snazzy-info-window'))
      .then((module: any) => Promise.all([module, m, this._wrapper.getNativeMap()]))
      .then((elems) => {
        const options: any = {
          map: elems[2],
          content: '',
          placement: this.placement,
          maxWidth: this.maxWidth,
          maxHeight: this.maxHeight,
          backgroundColor: this.backgroundColor,
          padding: this.padding,
          border: this.border,
          borderRadius: this.borderRadius,
          fontColor: this.fontColor,
          pointer: this.pointer,
          shadow: this.shadow,
          closeOnMapClick: this.closeOnMapClick,
          openOnMarkerClick: this.openOnMarkerClick,
          closeWhenOthersOpen: this.closeWhenOthersOpen,
          showCloseButton: this.showCloseButton,
          panOnOpen: this.panOnOpen,
          wrapperClass: this.wrapperClass,
          callbacks: {
            beforeOpen: () => {
              this._createViewContent();
              this.beforeOpen.emit();
            },
            afterOpen: () => {
              this.isOpenChange.emit(this.openStatus());
            },
            afterClose: () => {
              this.afterClose.emit();
              this.isOpenChange.emit(this.openStatus());
            }
          }
        };
        if (elems[1] != null) {
          options.marker = elems[1];
        } else {
          options.position = {
            lat: this.latitude,
            lng: this.longitude
          };
        }
        this._nativeSnazzyInfoWindow = new elems[0](options);
      });
      this._snazzyInfoWindowInitialized.then(() => {
        if (this.isOpen) {
          this._openInfoWindow();
        }
      });
  }

  protected _openInfoWindow() {
    this._snazzyInfoWindowInitialized.then(() => {
      this._createViewContent();
      this._nativeSnazzyInfoWindow.open();
    });
  }

  protected _closeInfoWindow() {
    this._snazzyInfoWindowInitialized.then(() => {
      this._nativeSnazzyInfoWindow.close();
    });
  }

  protected _createViewContent() {
    if (this._viewContainerRef.length === 1) {
      return;
    }
    const evr = this._viewContainerRef.createEmbeddedView(this._templateRef);
    this._nativeSnazzyInfoWindow.setContent(this._outerWrapper.nativeElement);
    // we have to run this in a separate cycle.
    setTimeout(() => {
      evr.detectChanges();
    });
  }

  protected _updatePosition() {
    this._nativeSnazzyInfoWindow.setPosition({
      lat: this.latitude,
      lng: this.longitude
    });
  }

  /**
   * Returns true when the Snazzy Info Window is initialized and open.
   */
  openStatus(): boolean {
    return this._nativeSnazzyInfoWindow && this._nativeSnazzyInfoWindow.isOpen();
  }

  /**
   * @internal
   */
  ngOnDestroy() {
    if (this._nativeSnazzyInfoWindow) {
      this._nativeSnazzyInfoWindow.destroy();
    }
  }
}
