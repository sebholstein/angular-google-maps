import {Injectable} from '@angular/core';

import {GoogleMapsAPIWrapper} from './../google-maps-api-wrapper';
import {ImageMapTypeOptions} from '../google-maps-types';

@Injectable()
export class ImageMapTypeManager {

  constructor(protected _mapsWrapper: GoogleMapsAPIWrapper) {

  }

  addMapType(id: string, options: ImageMapTypeOptions) {
    this._mapsWrapper.setMapTypes(id, options);
  }

}
