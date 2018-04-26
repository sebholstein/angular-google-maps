import {TestBed, inject} from '@angular/core/testing';

import {DocumentRef, WindowRef} from '../../utils/browser-globals';

import {GoogleMapsScriptProtocol, LAZY_MAPS_API_CONFIG, LazyMapsAPILoader, LazyMapsAPILoaderConfigLiteral} from './lazy-maps-api-loader';
import {MapsAPILoader} from './maps-api-loader';

describe('Service: LazyMapsAPILoader', () => {
  let documentRef: DocumentRef;
  let doc: any;
  let windowRef: WindowRef;
  let windowObj: any;

  beforeEach(() => {
    doc = jasmine.createSpyObj<DocumentRef>('Document', ['createElement', 'getElementById']);
    (<jasmine.Spy>doc.getElementById).and.returnValue(null);
    doc.body = jasmine.createSpyObj('body', ['appendChild']);
    documentRef = jasmine.createSpyObj<DocumentRef>('Document', ['getNativeDocument']);
    (<jasmine.Spy>documentRef.getNativeDocument).and.returnValue(doc);

    windowRef = jasmine.createSpyObj<WindowRef>('windowRef', ['getNativeWindow']);
    windowObj = {};
    (<jasmine.Spy>windowRef.getNativeWindow).and.returnValue(windowObj);

    TestBed.configureTestingModule({
      providers: [
        {provide: MapsAPILoader, useClass: LazyMapsAPILoader},
        {provide: WindowRef, useValue: windowRef},
        {provide: DocumentRef, useValue: documentRef}
      ]
    });
  });

  it('should create the default script URL', inject([MapsAPILoader], (loader: LazyMapsAPILoader) => {
      interface Script {
        src?: string;
        async?: boolean;
        defer?: boolean;
        type?: string;
        id?: string;
      }
      const scriptElem: Script = {};
      (<jasmine.Spy>doc.createElement).and.returnValue(scriptElem);

      loader.load();
      expect(doc.createElement).toHaveBeenCalledWith('script');
      expect(scriptElem.type).toEqual('text/javascript');
      expect(scriptElem.async).toEqual(true);
      expect(scriptElem.defer).toEqual(true);
      expect(scriptElem.src).toBeDefined();
      expect(scriptElem.id).toEqual('agmGoogleMapsApiScript');
      expect(scriptElem.src).toContain('https://maps.googleapis.com/maps/api/js');
      expect(scriptElem.src).toContain('v=3');
      expect(scriptElem.src).toContain('callback=agmLazyMapsAPILoader');
      expect(doc.body.appendChild).toHaveBeenCalledWith(scriptElem);
  }));

  it('should not append a second script to body when theres already one with the fixed ID', inject([MapsAPILoader], (loader: LazyMapsAPILoader) => {
      (<jasmine.Spy>doc.getElementById).and.returnValue(document.createElement('script'));
      loader.load();
      expect(doc.body.appendChild).not.toHaveBeenCalledWith();
  }));

  it('should not append a second script to body when window.google.maps is defined', inject([MapsAPILoader], (loader: LazyMapsAPILoader) => {
    windowObj.google = {
      maps: {}
    };
    loader.load();
    expect(doc.body.appendChild).not.toHaveBeenCalledWith();
  }));

  it('should not append a second script to body when the script loading request is processing',
      inject([MapsAPILoader, WindowRef, DocumentRef],
      (loader: LazyMapsAPILoader, windowRed: WindowRef, documentRef: DocumentRef) => {
    (<jasmine.Spy>doc.getElementById).and.returnValue(null);
    (<jasmine.Spy>doc.createElement).and.returnValue({});
    loader.load();
    const secondLoader = new LazyMapsAPILoader(null, windowRef, documentRef);
    secondLoader.load();
    expect(doc.body.appendChild).toHaveBeenCalledTimes(1);
}));

  it('should load the script via http when provided', () => {
    const lazyLoadingConf:
        LazyMapsAPILoaderConfigLiteral = {protocol: GoogleMapsScriptProtocol.HTTP};

    TestBed.configureTestingModule({
      providers: [
        {provide: MapsAPILoader, useClass: LazyMapsAPILoader},
        {provide: WindowRef, useValue: windowRef},
        {provide: DocumentRef, useValue: documentRef},
        {provide: LAZY_MAPS_API_CONFIG, useValue: lazyLoadingConf}
      ]
    });

    inject([MapsAPILoader], (loader: LazyMapsAPILoader) => {
      interface Script {
        src?: string;
        async?: boolean;
        defer?: boolean;
        type?: string;
      }
      const scriptElem: Script = {};
      (<jasmine.Spy>doc.createElement).and.returnValue(scriptElem);

      loader.load();
      expect(doc.createElement).toHaveBeenCalled();
      expect(scriptElem.src).toContain('http://maps.googleapis.com/maps/api/js');
      expect(doc.body.appendChild).toHaveBeenCalledWith(scriptElem);
    });
  });
});
