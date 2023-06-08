import { GoogleMapsAPIWrapper } from '@agm/core';
import { Directive, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';

@Directive({
  selector: 'agm-direction',
})
export class AgmDirection implements OnChanges, OnInit, OnDestroy {

  @Input() origin?: string | google.maps.Place | google.maps.LatLng | google.maps.LatLngLiteral;

  @Input() destination?: string | google.maps.Place | google.maps.LatLng | google.maps.LatLngLiteral;

  @Input() travelMode?: google.maps.TravelMode;

  @Input() transitOptions?: google.maps.TransitOptions;

  @Input() drivingOptions?: google.maps.DrivingOptions;

  @Input() waypoints: google.maps.DirectionsWaypoint[] = [];

  @Input() optimizeWaypoints = true;

  @Input() provideRouteAlternatives = false;

  @Input() avoidHighways = false;

  @Input() avoidTolls = false;

  @Input() avoidFerries = false;

  @Input() unitSystem?: google.maps.UnitSystem;

  @Input() renderOptions?: google.maps.DirectionsRendererOptions;

  @Input() panel?: Element;

  @Input() markerOptions?: {
    origin: { infoWindow?: string | Node } & google.maps.MarkerOptions,
    destination: { infoWindow?: string | Node } & google.maps.MarkerOptions,
    waypoints?: { infoWindow?: string | Node } & google.maps.MarkerOptions | ({ infoWindow?: string | Node } & google.maps.MarkerOptions)[],
  };

  @Input() infoWindow?: google.maps.InfoWindow;

  // Remove or draw direction
  @Input() visible = true;

  // Render exist direction
  @Input() renderRoute?: google.maps.DirectionsResult | null;

  // Direction change event handler
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  // Direction response for the new request
  @Output() onResponse: EventEmitter<google.maps.DirectionsResult> = new EventEmitter<google.maps.DirectionsResult>();

  // Send a custom infowindow
  @Output() sendInfoWindow: EventEmitter<google.maps.InfoWindow> = new EventEmitter<google.maps.InfoWindow>();

  // Status of Directions Query (google.maps.DirectionsStatus.OVER_QUERY_LIMIT)
  @Output() status: EventEmitter<google.maps.DirectionsStatus> = new EventEmitter<google.maps.DirectionsStatus>();

  // Marker drag event handler
  @Output() originDrag: EventEmitter<any> = new EventEmitter<any>();
  @Output() destinationDrag: EventEmitter<any> = new EventEmitter<any>();

  public directionsService!: google.maps.DirectionsService;
  public directionsRenderer!: google.maps.DirectionsRenderer;

  // Use for custom marker
  private originMarker?: any;
  private destinationMarker?: any;
  private waypointsMarker: Array<google.maps.Marker> = [];

  // Use for visible flag
  private isFirstChange = true;

  constructor(
    private gmapsApi: GoogleMapsAPIWrapper,
  ) { }

  ngOnInit() {
    if (this.visible) {
      this.directionDraw();
    }
  }

  ngOnChanges(obj: any) {
    /**
     * When visible is false then remove the direction layer
     */
    if (!this.visible) {
      try {
        this.removeMarkers();
        this.removeDirections();
      } catch (e) { }
    } else {
      if (this.isFirstChange) {
        /**
         * When visible is false at the first time
         */
        if (typeof this.directionsRenderer === 'undefined') {
          this.directionDraw();
        }
        this.isFirstChange = false;
        return;
      }

      /**
       * When renderOptions are not first change then reset the display
       */
      if (typeof obj.renderOptions !== 'undefined') {
        if (obj.renderOptions.firstChange === false) {
          this.removeMarkers();
          this.removeDirections();
        }
      }
      this.directionDraw();
    }
  }

  ngOnDestroy() {
    this.destroyMarkers();
    this.removeDirections();
  }

  /**
   * This event is fired when the user creating or updating this direction
   */
  private directionDraw() {
    this.gmapsApi.getNativeMap().then(_map => {

      // const map = _map as unknown | google.maps.Map;
      const map = _map;

      if (typeof this.directionsRenderer === 'undefined') {
        this.directionsRenderer = new google.maps.DirectionsRenderer(this.renderOptions);
        // @ts-ignore
        this.directionsRenderer.setMap(map);
        this.directionsRenderer.addListener('directions_changed', () => {
          this.onChange.emit(this.directionsRenderer.getDirections());
        });
      }

      if (typeof this.directionsService === 'undefined') {
        this.directionsService = new google.maps.DirectionsService();
      }

      if (typeof this.panel === 'undefined') {
        // @ts-ignore
        this.directionsRenderer.setPanel(null);
      } else {
        this.directionsRenderer.setPanel(this.panel as any);
      }

      // Render exist direction
      if (this.renderRoute) {
        this.directionsRenderer.setDirections(this.renderRoute);
        this.renderRoute = undefined;
      } else {

        // Request new direction
        this.directionsService.route({
          origin: this.origin,
          destination: this.destination,
          travelMode: this.travelMode || google.maps.TravelMode.DRIVING,
          transitOptions: this.transitOptions,
          drivingOptions: this.drivingOptions,
          waypoints: this.waypoints,
          optimizeWaypoints: this.optimizeWaypoints,
          provideRouteAlternatives: this.provideRouteAlternatives,
          avoidHighways: this.avoidHighways,
          avoidTolls: this.avoidTolls,
          avoidFerries: this.avoidFerries,
          unitSystem: this.unitSystem,
        }, (response: any, status) => {

          this.onResponse.emit(response);

          // Emit Query Status
          this.status.emit(status);

          /**
           * DirectionsStatus
           * https://developers.google.com/maps/documentation/javascript/directions#DirectionsStatus
           */
          switch (status) {
            case google.maps.DirectionsStatus.OK:

              this.directionsRenderer.setDirections(response);

              /**
               * Emit The DirectionsResult Object
               * https://developers.google.com/maps/documentation/javascript/directions?hl=en#DirectionsResults
               */
              // Custom Markers
              if (typeof this.markerOptions !== 'undefined') {

                this.destroyMarkers();

                // Set custom markers
                const _route = response.routes[0];

                try {
                  if (_route.legs.length === 0) {
                    console.warn('The webpage has sent too many requests within the allowed time period.');
                    return;
                  }

                  // Origin Marker
                  if (typeof this.markerOptions.origin !== 'undefined') {
                    this.markerOptions.origin.map = map;
                    this.markerOptions.origin.position = _route.legs[0].start_location;
                    this.originMarker = this.setMarker(
                      map,
                      this.originMarker,
                      this.markerOptions.origin,
                      _route.legs[0].start_address,
                    );

                    if (this.markerOptions.origin.draggable) {
                      this.originMarker.addListener('dragend', () => {
                        this.origin = this.originMarker.position;
                        this.directionDraw();
                        this.originDrag.emit(this.origin);
                      });
                    }
                  }

                  for (let i = 0; i < _route.legs.length; i++) {
                    const leg = _route.legs[i];

                    if (i === (_route.legs.length - 1)) {
                      // Destination Marker
                      if (typeof this.markerOptions.destination !== 'undefined') {
                        this.markerOptions.destination.map = map;
                        this.markerOptions.destination.position = leg.end_location;
                        this.destinationMarker = this.setMarker(
                          map,
                          this.destinationMarker,
                          this.markerOptions.destination,
                          leg.end_address,
                        );
                        if (this.markerOptions.destination.draggable) {
                          this.destinationMarker.addListener('dragend', () => {
                            this.destination = this.destinationMarker.position;
                            this.directionDraw();
                            this.destinationDrag.emit(this.destination);
                          });
                        }
                      }
                    }else {
                      // Waypoints Marker equals leg[i].end_location (skip last leg, last leg = destination marker)
                      if (typeof this.markerOptions !== 'undefined' && typeof this.markerOptions.waypoints !== 'undefined') {
                        // If waypoints are not array then set all the same
                        if (!Array.isArray(this.markerOptions.waypoints)) {
                          this.markerOptions.waypoints.map = map;
                          this.markerOptions.waypoints.position = leg.end_location;
                          this.waypointsMarker[i] = this.setMarker(
                            map,
                            this.waypoints[i],
                            this.markerOptions.waypoints,
                            leg.start_address,
                          );
                        } else {
                          this.markerOptions.waypoints[i].map = map;
                          this.markerOptions.waypoints[i].position = leg.end_location;
                          this.waypointsMarker[i] = this.setMarker(
                            map,
                            this.waypoints[i],
                            this.markerOptions.waypoints[i],
                            leg.start_address,
                          );
                        }
                      }
                    }
                  }
                } catch (err) {
                  console.error('MarkerOptions error.', err);
                }
              }

              break;

            case google.maps.DirectionsStatus.OVER_QUERY_LIMIT:
              console.warn('The webpage has sent too many requests within the allowed time period.');
              break;
            default:
              // console.warn(status);
              break;
          } // End switch
        });
      }
    });
  }

  /**
   * Custom Origin and Destination Icon
   * @param map map
   * @param marker marker
   * @param markerOpts properties
   * @param content marker's infowindow content
   * @returns new marker
   */
  private setMarker(
    map: google.maps.Map,
    marker: google.maps.Marker | google.maps.DirectionsWaypoint,
    markerOpts: any,
    content: google.maps.LatLng | string
  ): google.maps.Marker {

    if (typeof this.infoWindow === 'undefined') {
      this.infoWindow = new google.maps.InfoWindow();
      this.sendInfoWindow.emit(this.infoWindow);
    }

    marker = new google.maps.Marker(markerOpts);
    // https://developers.google.com/maps/documentation/javascript/reference/marker?hl=zh-tw#MarkerOptions.clickable
    if (marker.getClickable()) {
      marker.addListener('click', () => {
        const infoWindowContent: string = typeof markerOpts.infoWindow === 'undefined' ? content : markerOpts.infoWindow;
        this.infoWindow!.setContent(infoWindowContent);
        this.infoWindow!.open(map, marker as google.maps.MVCObject);
      });
    }
    return marker;
  }

  /**
   * This event is fired when remove markers
   */
  private removeMarkers(): void {
    if (typeof this.originMarker !== 'undefined') {
      this.originMarker.setMap(null);
    }
    if (typeof this.destinationMarker !== 'undefined') {
      this.destinationMarker.setMap(null);
    }
    this.waypointsMarker.forEach((w: any) => {
      if (typeof w !== 'undefined') {
        w.setMap(null);
      }
    });
  }

  /**
   * This event is fired when remove directions
   */
  private removeDirections(): void {
    if (this.directionsRenderer !== undefined) {
      // @ts-ignore
      this.directionsRenderer.setPanel(null);
      this.directionsRenderer.setMap(null);
      // @ts-ignore
      this.directionsRenderer = undefined;
    }
  }

  /**
   * This event is fired when destroy markers
   */
  private destroyMarkers(): void {
    // Remove origin markers
    try {
      if (typeof this.markerOptions !== 'undefined' && typeof this.originMarker !== 'undefined') {
        google.maps.event.clearListeners(this.originMarker, 'click');
        if (this.markerOptions.origin.draggable) {
          google.maps.event.clearListeners(this.originMarker, 'dragend');
        }
      }
      if (typeof this.markerOptions !== 'undefined' && typeof this.destinationMarker !== 'undefined') {
        google.maps.event.clearListeners(this.destinationMarker, 'click');
        if (this.markerOptions.origin.draggable) {
          google.maps.event.clearListeners(this.destinationMarker, 'dragend');
        }
      }
      this.waypointsMarker.forEach((w: any) => {
        if (typeof w !== 'undefined') {
          google.maps.event.clearListeners(w, 'click');
        }
      });
      this.removeMarkers();

    } catch (err) {
      console.error('Can not reset custom marker.', err);
    }
  }
}
