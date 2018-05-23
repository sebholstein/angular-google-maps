import {MapsAPILoader} from '@agm/core';
import {Directive, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {fromEventPattern} from 'rxjs/observable/fromEventPattern';

@Directive({
  selector: 'agm-autocomplete'
})
export class AgmAutocompleteDirective implements OnInit, OnChanges {

  /**
   * Configuration Input described by the AutocompleteOptions Interface
   * https://developers.google.com/maps/documentation/javascript/reference/3.exp/places-widget#AutocompleteOptions
   */
  // tslint:disable-next-line:no-input-rename
  @Input('agm-autocomplete') public config: google.maps.places.AutocompleteOptions;

  /**
   * This event is fired on selection of an element from the autocomplete list.
   * The event contains a PlaceResult from GoogleMapsAPI
   * https://developers.google.com/maps/documentation/javascript/reference/3.exp/places-service#PlaceResult
   */
  @Output() public placeResult: EventEmitter<google.maps.places.PlaceResult> = new EventEmitter<google.maps.places.PlaceResult>();

  /**
   * This event is fired on selection of an element from the autocomplete list.
   * The event contains a LatLngBounds from GoogleMapsAPI
   * https://developers.google.com/maps/documentation/javascript/reference/3.exp/coordinates#LatLngBounds
   */
  @Output() public bounds: EventEmitter<google.maps.LatLngBounds> = new EventEmitter<google.maps.LatLngBounds>();

  private autocomplete: google.maps.places.Autocomplete;

  constructor(private element: ElementRef,
              private mapsAPILoader: MapsAPILoader) {
  }

  /** @internal */
  public ngOnInit(): void {
    if (typeof this.config === 'undefined') {
      this.config = {
        types: ['address']
      };
    }

    if (this.element.nativeElement instanceof HTMLInputElement) {
      this.mapsAPILoader.load().then(() => {
        this.autocomplete = new google.maps.places.Autocomplete(this.element.nativeElement, this.config);
        fromEventPattern((handler: any) => this.addHandler(handler), () => this.removeHandler())
          .subscribe({
            next: () => {
              this.placeResult.emit(this.autocomplete.getPlace());
              this.bounds.emit(this.autocomplete.getBounds());
            }
          });
      });
    } else {
      throw new Error('Directive can only be applied to an HTMLInputElement');
    }
  }

  /** @internal */
  ngOnChanges(changes: SimpleChanges): void {
    if (typeof changes.config !== 'undefined' && !changes.config.firstChange) {
      const config = changes.config.currentValue as google.maps.places.AutocompleteOptions;
      if (typeof config.bounds !== 'undefined') {
        this.autocomplete.setBounds(config.bounds);
      }
      if (typeof config.componentRestrictions !== 'undefined') {
        this.autocomplete.setComponentRestrictions(config.componentRestrictions);
      }
      if (typeof config.types !== 'undefined') {
        this.autocomplete.setTypes(config.types);
      }
    }
  }

  /** @internal */
  private addHandler(handler: (...args: Array<any>) => void) {
    return this.autocomplete.addListener('place_changed', handler);
  }

  /** @internal */
  private removeHandler() {
    this.autocomplete.unbindAll();
  }
}
