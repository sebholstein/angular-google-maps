import {Provider, provide} from '@angular/core';

export const BROWSER_GLOBALS_PROVIDERS: Provider[] =
    [provide(Window, {useValue: window}), provide(Document, {useValue: document})];
