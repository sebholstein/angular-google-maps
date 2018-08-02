import { Subscription } from 'rxjs';
import { AgmInfoWindow } from './info-window';
import { GoogleMapsAPIWrapper } from '../services/google-maps-api-wrapper';
import { MarkerManager } from '../services/managers/marker-manager';
import { AfterViewInit, AfterContentInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { AgmMarker } from './marker';

import {
  Input,
  Component,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  QueryList,
  ContentChildren
} from '@angular/core';

@Component({
  selector: 'agm-overlay',
  template:
    '<div #content><div style="position:absolute"><ng-content></ng-content></div></div>'
})
export class AgmOverlay implements AfterViewInit, AfterContentInit, OnChanges, OnDestroy {
  overlayViewMarker: AgmMarker;
  overlayView: google.maps.OverlayView;
  elmGuts: any;
  private _observableSubscriptions: Subscription[] = [];
    /*
    overlays position on lat position
   */
  @Input() latitude: number;
    /*
    overlays position on lng map
   */
  @Input() longitude: number;
  /*
    is the overlay currently visible
   */
  @Input() visible: boolean = true;

  /*
    Overlay height in relation to other overlays
   */
  @Input() zIndex: number = 1;
  /*
    set the state of the infowindow to visible or hidden
   */
  @Input() openInfoWindow: boolean = true;
    /*
    emits a change when overlay is clicked
   */
  @Output() markerClick: EventEmitter<void> = new EventEmitter<void>();

  @ContentChildren(AgmInfoWindow)
  infoWindow: QueryList<AgmInfoWindow> = new QueryList<AgmInfoWindow>();

  // TODO: implement this
  // @Input('markerDraggable') draggable: boolean = false;

  @ViewChild('content', { read: ElementRef })
  template: ElementRef;

  constructor(
    protected _mapsWrapper: GoogleMapsAPIWrapper,
    private _markerManager: MarkerManager // TODO: rename to fight the private declaration of parent
  ) {}

  ngAfterViewInit() {
    // js-marker-clusterer does not support updating positions. We are forced to delete/add and compensate for .removeChild calls
    this.elmGuts = this.template.nativeElement.children[0];

    // remove reference of info windows
    const iWins = this.template.nativeElement.getElementsByTagName(
      'agm-info-window'
    );
    for (let x = iWins.length - 1; x >= 0; --x) {
      iWins[x].parentNode.removeChild(iWins[x]);
    }

    this.load().then(() => {
      this.onChanges = this.onChangesOverride;
    });
  }

  ngAfterContentInit() {
    this.infoWindow.changes.subscribe(() => this.handleInfoWindowUpdate());
  }

  ngOnChanges(changes: SimpleChanges) {
    this.onChanges(changes);
  }

  onChanges(changes: SimpleChanges) {}

  onChangesOverride(changes: SimpleChanges) {
    if (changes.latitude || changes.longitude) {
      this.overlayViewMarker.latitude = this.latitude;
      this.overlayViewMarker.longitude = this.longitude;

      this._markerManager
        .updateMarkerPosition(this.overlayViewMarker)
        .then(() => this.load());
    }
  }

  private handleInfoWindowUpdate() {
    if (this.infoWindow.length > 1) {
      throw new Error('Expected no more than one info window.');
    }

    this.infoWindow.forEach(iWin => {
      iWin.hostMarker = <any>this.overlayViewMarker;
    });
  }

  load(): Promise<void> {
    return this._mapsWrapper
      .getNativeMap()
      .then(map => {
        const overlayMarker: AgmMarker = this.getOverlay(map);

        this._markerManager.addMarker(overlayMarker);
        this._addEventListeners();

        return this._markerManager.getNativeMarker(overlayMarker);
      })
      .then(nativeMarker => {
        const setMap = nativeMarker.setMap;
        if (nativeMarker.getMap()) {
          this.overlayView.setMap(nativeMarker.getMap());
        }

        nativeMarker.setMap = map => {
          setMap.call(nativeMarker, map);

          if (this.overlayViewMarker) {
            this.overlayView.setMap(map);
          }
        };
      });
  }

  getOverlay(map: google.maps.Map) {
    this.overlayView = this.overlayView || new google.maps.OverlayView();

    /* make into foo marker that AGM likes */
    this.overlayViewMarker.iconUrl = ' '; // " "
    this.overlayViewMarker.latitude = this.latitude;
    this.overlayViewMarker.longitude = this.longitude;
    /* end */
    const elm = this.elmGuts;

    this.overlayView.onRemove = function() {
      if (!this.div) {
        return;
      }
      this.div.parentNode.removeChild(this.div);
      delete this.div;
    };

    // this.overlayViewMarker.getDiv = function() {
    //   return this.div;
    // };

    this.overlayView.draw = function() {
      if (!this.div) {
        this.div = elm;
        const panes: google.maps.MapPanes = this.getPanes();
        // if no panes then assumed not on map
        if (!panes || !panes.overlayImage) {
          return;
        }

        panes.overlayImage.appendChild(elm);
      }

      const latlng: google.maps.LatLng = new google.maps.LatLng(this.latitude, this.longitude);

      const proj: google.maps.Projection = this.getProjection();
      if (!proj) {
        return;
      }

      const point = proj.fromLatLngToPoint(latlng);

      if (point) {
        elm.style.left = point.x - 10 + 'px';
        elm.style.top = point.y - 20 + 'px';
      }
    };

    elm.addEventListener('click', this.handleTap());

    this.handleInfoWindowUpdate();

    return this.overlayViewMarker;
  }

  handleTap() {
    if (this.openInfoWindow) {
      this.infoWindow.forEach(infoWindow => {
        infoWindow.open();
      });
    }
    this.markerClick.emit(null);
  }

  _addEventListeners() {
    const eo = this._markerManager.createEventObservable('click', this.overlayViewMarker);
    const cs = eo.subscribe(() => this.handleTap());
    this._observableSubscriptions.push(cs);
  }

  destroy() {
    this._markerManager.deleteMarker(this.overlayViewMarker);
    this.overlayView.setMap(null);
    this._observableSubscriptions.map( s => s.unsubscribe());
    delete this.overlayViewMarker;
    delete this.elmGuts;
  }

  ngOnDestroy() {
    this.destroy();
  }
}
