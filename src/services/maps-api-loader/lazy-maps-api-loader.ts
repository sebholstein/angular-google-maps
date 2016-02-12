import {Injectable, Optional} from 'angular2/core';
import {MapsAPILoader} from './maps-api-loader';

export enum GoogleMapsScriptProtocol {
  HTTP,
  HTTPS,
  AUTO
}

export class LazyMapsAPILoaderConfig {
  /**
   * The Google Maps API Key (see:
   * https://developers.google.com/maps/documentation/javascript/get-api-key)
   */
  apiKey: string = null;

  /**
   * Google Maps API version.
   */
  apiVersion: string = '3';

  /**
   * Host and Path used for the `<script>` tag.
   */
  hostAndPath: string = 'maps.googleapis.com/maps/api/js';

  /**
   * Protocol used for the `<script>` tag.
   */
  protocol: GoogleMapsScriptProtocol = GoogleMapsScriptProtocol.HTTPS;

  /**
   * Defines which Google Maps libraries should get loaded.
   */
  libraries: string[] = [];

  /**
   * The default bias for the map behavior is US.
   * If you wish to alter your application to serve different map tiles or bias the
   * application, you can overwrite the default behavior (US) by defining a `region`.
   * See https://developers.google.com/maps/documentation/javascript/basics#Region
   */
  region: string = null;

  /**
   * The Google Maps API uses the browser's preferred language when displaying
   * textual information. If you wish to overwrite this behavior and force the API
   * to use a given language, you can use this setting.
   * See https://developers.google.com/maps/documentation/javascript/basics#Language
   */
  language: string = null;
}

const DEFAULT_CONFIGURATION = new LazyMapsAPILoaderConfig();

@Injectable()
export class LazyMapsAPILoader extends MapsAPILoader {
  private _scriptLoadingPromise: Promise<void>;

  constructor(@Optional() private _config: LazyMapsAPILoaderConfig) {
    super();
    if (this._config === null || this._config === undefined) {
      this._config = DEFAULT_CONFIGURATION;
    }
  }

  load(): Promise<void> {
    if (this._scriptLoadingPromise) {
      return this._scriptLoadingPromise;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    const callbackName: string = `angular2googlemaps${new Date().getMilliseconds()}`;
    script.src = this._getScriptSrc(callbackName);

    this._scriptLoadingPromise = new Promise<void>((resolve: Function, reject: Function) => {
      (<any>window)[callbackName] = () => { resolve(); };

      script.onerror = (error: Event) => { reject(error); };
    });

    document.body.appendChild(script);
    return this._scriptLoadingPromise;
  }

  private _getScriptSrc(callbackName: string): string {
    let protocolType: GoogleMapsScriptProtocol =
        (this._config && this._config.protocol) || DEFAULT_CONFIGURATION.protocol;
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

    const hostAndPath: string = this._config.hostAndPath || DEFAULT_CONFIGURATION.hostAndPath;
    const apiKey: string = this._config.apiKey || DEFAULT_CONFIGURATION.apiKey;
    const libraries: string[] = this._config.libraries || DEFAULT_CONFIGURATION.libraries;
    const region: string = this._config.region || DEFAULT_CONFIGURATION.region;
    const language: string = this._config.language || DEFAULT_CONFIGURATION.language;
    const queryParams: {[key: string]: string} = {
      v: this._config.apiVersion || DEFAULT_CONFIGURATION.apiKey,
      callback: callbackName
    };
    if (apiKey) {
      queryParams['key'] = apiKey;
    }
    if (libraries != null && libraries.length > 0) {
      queryParams['libraries'] = libraries.join(',');
    }
    if (region != null && region.length > 0) {
      queryParams['region'] = region;
    }
    if (language != null && language.length > 0) {
      queryParams['language'] = language;
    }
    const params: string = Object.keys(queryParams)
                               .map((k: string, i: number) => {
                                 let param = (i === 0) ? '?' : '&';
                                 return param += `${k}=${queryParams[k]}`;
                               })
                               .join('');
    return `${protocol}//${hostAndPath}${params}`;
  }
}
