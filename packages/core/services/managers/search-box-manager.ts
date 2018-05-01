import {Injectable, NgZone} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import {GoogleMapsAPIWrapper} from '../google-maps-api-wrapper';
import {AgmSearchBox} from '../../directives/search-box';

@Injectable()
export class SearchBoxManager {

  constructor(private _apiWrapper: GoogleMapsAPIWrapper, private _zone: NgZone) {}

  /** @internal */
  createEventObservable<T>(searchBox: AgmSearchBox): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      searchBox.getSearchBoxEl().addListener('places_changed', (e: T) => {
        this._zone.run(() => observer.next(e));
      });
    });
  }
}
