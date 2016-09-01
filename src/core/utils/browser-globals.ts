/**
 * angular2-google-maps - Angular 2 components for Google Maps
 * @version v0.13.0
 * @link https://github.com/SebastianM/angular2-google-maps#readme
 * @license MIT
 */
export const WINDOW_GLOBAL = new OpaqueToken('angular2-google-maps window_global');
export const DOCUMENT_GLOBAL = new OpaqueToken('angular2-google-maps document_global');

export const BROWSER_GLOBALS_PROVIDERS: Provider[] =
    [{provide: WINDOW_GLOBAL, useValue: window}, {provide: DOCUMENT_GLOBAL, useValue: document}];
