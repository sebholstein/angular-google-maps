import {Injectable, forwardRef, Optional} from 'angular2/angular2';
import {MapsAPILoader} from './maps_api_loader';

export enum GoogleMapsScriptProtocol {
  HTTP,
  HTTPS,
  AUTO
}

export class LazyMapsAPILoaderConfig {
  apiKey: string = null;
  hostAndPath: string = 'maps.googleapis.com/maps/api/js';
  protocol: GoogleMapsScriptProtocol = GoogleMapsScriptProtocol.HTTPS;
}

const DEFAULT_CONFIGURATION = new LazyMapsAPILoaderConfig();

@Injectable()
export class LazyMapsAPILoader extends MapsAPILoader {
  private _scriptLoadingPromise: Promise<void>;

  constructor(@Optional() private _config: LazyMapsAPILoaderConfig = DEFAULT_CONFIGURATION) {
    super();
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

    const hostAndPath: string =
        (this._config && this._config.hostAndPath) || DEFAULT_CONFIGURATION.hostAndPath;
    const apiKey: string = (this._config && this._config.apiKey) || DEFAULT_CONFIGURATION.apiKey;
    const queryParams: {[key: string]: string} = {};
    if (apiKey) {
      queryParams['key'] = apiKey;
    }
    queryParams['callback'] = callbackName;
    const queryParamsString: string =
        Object.keys(queryParams)
            .map(
                (key: string, index: number) =>
                    index === 0 ? `?${key}=${queryParams[key]}` : `&${key}=${queryParams[key]}`)
            .join('');
    return `${protocol}//${hostAndPath}${queryParamsString}`;
  }
}
