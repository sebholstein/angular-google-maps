import {OpaqueToken, Provider, provide} from '@angular/core';

export const WINDOW_GLOBAL = new OpaqueToken('angular2-google-maps window_global');
export const DOCUMENT_GLOBAL = new OpaqueToken('angular2-google-maps document_global');

export const BROWSER_GLOBALS_PROVIDERS: Provider[] =
    [provide(WINDOW_GLOBAL, {useValue: window}), provide(DOCUMENT_GLOBAL, {useValue: document})];
