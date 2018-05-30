import {Inject, Injectable, InjectionToken, Optional} from '@angular/core';

import {DocumentRef, WindowRef} from '../../utils/browser-globals';

import {MapsAPILoader} from './maps-api-loader';

export enum GoogleMapsScriptProtocol {
  HTTP = 1,
  HTTPS = 2,
  AUTO = 3
}

/**
 * Token for the config of the LazyMapsAPILoader. Please provide an object of type {@link
 * LazyMapsAPILoaderConfig}.
 */
export const LAZY_MAPS_API_CONFIG = new InjectionToken<LazyMapsAPILoaderConfigLiteral>('angular-google-maps LAZY_MAPS_API_CONFIG');

/**
 * Configuration for the {@link LazyMapsAPILoader}.
 */
export interface LazyMapsAPILoaderConfigLiteral {
  /**
   * The Google Maps API Key (see:
   * https://developers.google.com/maps/documentation/javascript/get-api-key)
   */
  apiKey?: string;

  /**
   * The Google Maps client ID (for premium plans).
   * When you have a Google Maps APIs Premium Plan license, you must authenticate
   * your application with either an API key or a client ID.
   * The Google Maps API will fail to load if both a client ID and an API key are included.
   */
  clientId?: string;

  /**
   * The Google Maps channel name (for premium plans).
   * A channel parameter is an optional parameter that allows you to track usage under your client
   * ID by assigning a distinct channel to each of your applications.
   */
  channel?: string;

  /**
   * Google Maps API version.
   */
  apiVersion?: string;

  /**
   * Host and Path used for the `<script>` tag.
   */
  hostAndPath?: string;

  /**
   * Protocol used for the `<script>` tag.
   */
  protocol?: GoogleMapsScriptProtocol;

  /**
   * Defines which Google Maps libraries should get loaded.
   */
  libraries?: string[];

  /**
   * The default bias for the map behavior is US.
   * If you wish to alter your application to serve different map tiles or bias the
   * application, you can overwrite the default behavior (US) by defining a `region`.
   * See https://developers.google.com/maps/documentation/javascript/basics#Region
   */
  region?: string;

  /**
   * The Google Maps API uses the browser's preferred language when displaying
   * textual information. If you wish to overwrite this behavior and force the API
   * to use a given language, you can use this setting.
   * See https://developers.google.com/maps/documentation/javascript/basics#Language
   */
  language?: string;
}

@Injectable()
export class LazyMapsAPILoader extends MapsAPILoader {
  protected _scriptLoadingPromise: Promise<void>;
  protected _config: LazyMapsAPILoaderConfigLiteral;
  protected _windowRef: WindowRef;
  protected _documentRef: DocumentRef;
  protected readonly _SCRIPT_ID: string = 'agmGoogleMapsApiScript';
  protected readonly callbackName: string = `agmLazyMapsAPILoader`;

  constructor(@Optional() @Inject(LAZY_MAPS_API_CONFIG) config: any = null, w: WindowRef, d: DocumentRef) {
    super();
    this._config = config || {};
    this._windowRef = w;
    this._documentRef = d;
  }

  load(): Promise<void> {
    const window = <any>this._windowRef.getNativeWindow();
    if (window.google && window.google.maps) {
      // Google maps already loaded on the page.
      return Promise.resolve();
    }

    if (this._scriptLoadingPromise) {
      return this._scriptLoadingPromise;
    }

    // this can happen in HMR situations or Stackblitz.io editors.
    const scriptOnPage = this._documentRef.getNativeDocument().getElementById(this._SCRIPT_ID);
    if (scriptOnPage) {
      this._assignScriptLoadingPromise(scriptOnPage);
      return this._scriptLoadingPromise;
    }

    const script = this._documentRef.getNativeDocument().createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.id = this._SCRIPT_ID;
    script.src = this._getScriptSrc(this.callbackName);
    this._assignScriptLoadingPromise(script);
    this._documentRef.getNativeDocument().body.appendChild(script);
    return this._scriptLoadingPromise;
  }

  private _assignScriptLoadingPromise(scriptElem: HTMLElement) {
    this._scriptLoadingPromise = new Promise<void>((resolve: Function, reject: Function) => {
      (<any>this._windowRef.getNativeWindow())[this.callbackName] = () => {
        resolve();
      };

      scriptElem.onerror = (error: Event) => {
        reject(error);
      };
    });
  }

  protected _getScriptSrc(callbackName: string): string {
    let protocolType: GoogleMapsScriptProtocol =
        (this._config && this._config.protocol) || GoogleMapsScriptProtocol.HTTPS;
    let protocol: string;

    switch (protocolType) {
      case GoogleMapsScriptProtocol.AUTO:
        protocol = '';
        break;
      case GoogleMapsScriptProtocol.HTTP:
        protocol = 'http:';
        break;
      case GoogleMapsScriptProtocol.HTTPS:
        protocol = 'https:';
        break;
    }

    const hostAndPath: string = this._config.hostAndPath || 'maps.googleapis.com/maps/api/js';
    const queryParams: {[key: string]: string | Array<string>} = {
      v: this._config.apiVersion || '3',
      callback: callbackName,
      key: this._config.apiKey,
      client: this._config.clientId,
      channel: this._config.channel,
      libraries: this._config.libraries,
      region: this._config.region,
      language: this._config.language
    };
    const params: string = Object.keys(queryParams)
                               .filter((k: string) => queryParams[k] != null)
                               .filter((k: string) => {
                                 // remove empty arrays
                                 return !Array.isArray(queryParams[k]) ||
                                     (Array.isArray(queryParams[k]) && queryParams[k].length > 0);
                               })
                               .map((k: string) => {
                                 // join arrays as comma seperated strings
                                 let i = queryParams[k];
                                 if (Array.isArray(i)) {
                                   return {key: k, value: i.join(',')};
                                 }
                                 return {key: k, value: queryParams[k]};
                               })
                               .map((entry: {key: string, value: string}) => {
                                 return `${entry.key}=${entry.value}`;
                               })
                               .join('&');
    return `${protocol}//${hostAndPath}?${params}`;
  }
}
