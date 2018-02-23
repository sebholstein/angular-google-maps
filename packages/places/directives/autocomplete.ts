import {MapsAPILoader} from '@agm/core';
import {Directive, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {fromEventPattern} from 'rxjs/observable/fromEventPattern';

@Directive({
  selector: 'agm-autocomplete'
})
export class AgmAutocompleteDirective implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('agm-autocomplete') public config: google.maps.places.AutocompleteOptions;

  @Output() public placeResult: EventEmitter<google.maps.places.PlaceResult> = new EventEmitter<google.maps.places.PlaceResult>();

  private autocomplete: google.maps.places.Autocomplete;

  constructor(private element: ElementRef,
              private mapsAPILoader: MapsAPILoader) {
  }

  public ngOnInit(): void {
    if (typeof this.config === 'undefined') {
      this.config = {
        types: ['address']
      };
    }

    this.mapsAPILoader.load().then(() => {
      this.autocomplete = new google.maps.places.Autocomplete(this.element.nativeElement, this.config);
      fromEventPattern((handler: any) => this.addHandler(handler), () => this.removeHandler())
        .subscribe({
          next: () => {
            const placeResult = this.autocomplete.getPlace();
            this.placeResult.emit(placeResult);
          }
        });
    });
  }

  private addHandler(handler: (...args: Array<any>) => void) {
    return this.autocomplete.addListener('place_changed', handler);
  }

  private removeHandler() {
    this.autocomplete.unbindAll();
  }
}
