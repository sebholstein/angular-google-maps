import {WindowRef} from '../../utils/browser-globals';
import {MapsAPILoader} from './maps-api-loader';

/**
 * When using the NoOpMapsAPILoader, the Google Maps API must be added to the page via a `<script>`
 * Tag.
 * It's important that the Google Maps API script gets loaded first on the page.
 */
export class NoOpMapsAPILoader implements MapsAPILoader {
  protected _windowRef: WindowRef;

  constructor(w: WindowRef) {
    this._windowRef = w;
  }

  load(): Promise<void> {
    const window = <any>this._windowRef.getNativeWindow();
    if (!window.google || !window.google.maps) {
      throw new Error(
          'Google Maps API not loaded on page. Make sure window.google.maps is available!');
    }
    return Promise.resolve();
  }
}
