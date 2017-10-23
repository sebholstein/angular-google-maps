import {Injectable} from '@angular/core';

import {GoogleMapsAPIWrapper} from './../google-maps-api-wrapper';

@Injectable()
export class OverlayManager {

  constructor(protected _mapsWrapper: GoogleMapsAPIWrapper) {

  }

  USGSOverlay(bounds: number[], image: string) {
    return this._mapsWrapper.USGSOverlay(bounds, image);
  }

}
