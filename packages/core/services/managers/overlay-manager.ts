import {Injectable} from '@angular/core';

import {GoogleMapsAPIWrapper} from './../google-maps-api-wrapper';

@Injectable()
export class OverlayManager {

  constructor(protected _mapsWrapper: GoogleMapsAPIWrapper) {

  }

  USGSOverlay(bounds: any, srcImage: any) {
    this._mapsWrapper.USGSOverlay(bounds, srcImage);
  }

}
