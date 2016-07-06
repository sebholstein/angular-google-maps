import {addProviders, describe, inject, it} from '@angular/core/testing';

import {LazyMapsAPILoader} from '../../../src/core/services/maps-api-loader/lazy-maps-api-loader';
import {MapsAPILoader} from '../../../src/core/services/maps-api-loader/maps-api-loader';
import {DOCUMENT_GLOBAL, WINDOW_GLOBAL} from '../../../src/core/utils/browser-globals';

export function main() {
  describe('Service: LazyMapsAPILoader', () => {
    beforeEach(() => {
      addProviders([
        {provide: MapsAPILoader, useClass: LazyMapsAPILoader},
        {provide: WINDOW_GLOBAL, useValue: {}}, {
          provide: DOCUMENT_GLOBAL,
          useValue: jasmine.createSpyObj<Document>('Document', ['createElement'])
        }
      ]);
    });

    it('should create the default script URL',
       inject([MapsAPILoader, DOCUMENT_GLOBAL], (loader: LazyMapsAPILoader, doc: Document) => {
         interface Script {
           src?: string;
           async?: boolean;
           defer?: boolean;
           type?: string;
         }
         const scriptElem: Script = {};
         (<jasmine.Spy>doc.createElement).and.returnValue(scriptElem);
         doc.body = jasmine.createSpyObj('body', ['appendChild']);

         loader.load();
         expect(doc.createElement).toHaveBeenCalled();
         expect(scriptElem.type).toEqual('text/javascript');
         expect(scriptElem.async).toEqual(true);
         expect(scriptElem.defer).toEqual(true);
         expect(scriptElem.src).toBeDefined();
         expect(scriptElem.src).toContain('https://maps.googleapis.com/maps/api/js');
         expect(scriptElem.src).toContain('v=3');
         expect(scriptElem.src).toContain('callback=angular2GoogleMapsLazyMapsAPILoader');
         expect(doc.body.appendChild).toHaveBeenCalledWith(scriptElem);
       }));
  });
}
