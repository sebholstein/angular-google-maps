import {Inject, Injectable, Optional, Provider, provide} from '@angular/core';

import {DOCUMENT_GLOBAL, WINDOW_GLOBAL} from '../../utils/browser-globals';

import {MapsAPILoader} from './maps-api-loader';

export enum GoogleMapsScriptProtocol {
  HTTP,
  HTTPS,
  AUTO
}

/**
 * Config literal used to create an instance of LazyMapsAPILoaderConfig.
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

/**
 * Configuration for {@link LazyMapsAPILoader}.
 * See {@link LazyMapsAPILoaderConfig} for instance attribute descriptions.
 */
export class LazyMapsAPILoaderConfig implements LazyMapsAPILoaderConfigLiteral {
  apiKey: string = null;
  clientId: string = null;
  channel: string = null;
  apiVersion: string = '3';
  hostAndPath: string = 'maps.googleapis.com/maps/api/js';
  protocol: GoogleMapsScriptProtocol = GoogleMapsScriptProtocol.HTTPS;
  libraries: string[] = [];
  region: string = null;
  language: string = null;
}

const DEFAULT_CONFIGURATION = new LazyMapsAPILoaderConfig();

@Injectable()
export class LazyMapsAPILoader extends MapsAPILoader {
  private _scriptLoadingPromise: Promise<void>;
  private _config: LazyMapsAPILoaderConfig;
  private _window: Window;
  private _document: Document;

  constructor(
      @Optional() config: LazyMapsAPILoaderConfig, @Inject(WINDOW_GLOBAL) w: Window,
      @Inject(DOCUMENT_GLOBAL) d: Document) {
    super();
    this._config = config || DEFAULT_CONFIGURATION;
    this._window = w;
    this._document = d;
  }

  load(): Promise<void> {
    if (this._scriptLoadingPromise) {
      return this._scriptLoadingPromise;
    }

    const script = this._document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    const callbackName: string = `angular2GoogleMapsLazyMapsAPILoader`;
    script.src = this._getScriptSrc(callbackName);

    this._scriptLoadingPromise = new Promise<void>((resolve: Function, reject: Function) => {
      (<any>this._window)[callbackName] = () => { resolve(); };

      script.onerror = (error: Event) => { reject(error); };
    });

    this._document.body.appendChild(script);
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
    const queryParams: {[key: string]: string | Array<string>} = {
      v: this._config.apiVersion || DEFAULT_CONFIGURATION.apiVersion,
      callback: callbackName,
      key: this._config.apiKey,
      client: this._config.clientId,
      channel: this._config.channel,
      libraries: this._config.libraries,
      region: this._config.region,
      language: this._config.language
    };
    const params: string =
        Object.keys(queryParams)
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
            .map((entry: {key: string, value: string}) => { return `${entry.key}=${entry.value}`; })
            .join('&');
    return `${protocol}//${hostAndPath}?${params}`;
  }
}

/**
 * Creates a provider for a {@link LazyMapsAPILoaderConfig})
 */
export function provideLazyMapsAPILoaderConfig(confLiteral: LazyMapsAPILoaderConfigLiteral):
    Provider {
  return provide(LazyMapsAPILoaderConfig, {
    useFactory: () => {
      const config = new LazyMapsAPILoaderConfig();
      // todo(sebastian): deprecate LazyMapsAPILoader class
      config.apiKey = confLiteral.apiKey || DEFAULT_CONFIGURATION.apiKey;
      config.apiVersion = confLiteral.apiVersion || DEFAULT_CONFIGURATION.apiVersion;
      config.channel = confLiteral.channel || DEFAULT_CONFIGURATION.channel;
      config.clientId = confLiteral.clientId || DEFAULT_CONFIGURATION.clientId;
      config.hostAndPath = confLiteral.hostAndPath || DEFAULT_CONFIGURATION.hostAndPath;
      config.language = confLiteral.language || DEFAULT_CONFIGURATION.language;
      config.libraries = confLiteral.libraries || DEFAULT_CONFIGURATION.libraries;
      config.protocol = config.protocol || DEFAULT_CONFIGURATION.protocol;
      config.region = config.region || DEFAULT_CONFIGURATION.region;
      return config;
    }
  });
}
