import {Injectable} from 'angular2/core';
import {GoogleMapsAPIWrapper} from './google-maps-api-wrapper';

/**
 * Wrapper container class for method getMap support
 * API v3
 */
@Injectable()
export class WrapperContainer {
  private _wrapperMap: Map<string, GoogleMapsAPIWrapper> = new Map<string, GoogleMapsAPIWrapper>();

  constructor() {}
  addWrapper(key: string, apiWrapper: GoogleMapsAPIWrapper) { this._wrapperMap.set(key, apiWrapper); }
  getWrapper(key: string): GoogleMapsAPIWrapper { return this._wrapperMap.get(key); }
  dropWrapper(key: string) { this._wrapperMap.delete(key); }
}
