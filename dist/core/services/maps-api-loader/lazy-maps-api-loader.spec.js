import { TestBed, inject } from '@angular/core/testing';
import { DocumentRef, WindowRef } from '../../utils/browser-globals';
import { GoogleMapsScriptProtocol, LAZY_MAPS_API_CONFIG, LazyMapsAPILoader } from './lazy-maps-api-loader';
import { MapsAPILoader } from './maps-api-loader';
describe('Service: LazyMapsAPILoader', function () {
    var documentRef;
    var doc;
    var windowRef;
    var windowObj;
    beforeEach(function () {
        doc = jasmine.createSpyObj('Document', ['createElement', 'getElementById']);
        doc.getElementById.and.returnValue(null);
        doc.body = jasmine.createSpyObj('body', ['appendChild']);
        documentRef = jasmine.createSpyObj('Document', ['getNativeDocument']);
        documentRef.getNativeDocument.and.returnValue(doc);
        windowRef = jasmine.createSpyObj('windowRef', ['getNativeWindow']);
        windowObj = {};
        windowRef.getNativeWindow.and.returnValue(windowObj);
        TestBed.configureTestingModule({
            providers: [
                { provide: MapsAPILoader, useClass: LazyMapsAPILoader },
                { provide: WindowRef, useValue: windowRef },
                { provide: DocumentRef, useValue: documentRef }
            ]
        });
    });
    it('should create the default script URL', inject([MapsAPILoader], function (loader) {
        var scriptElem = {};
        doc.createElement.and.returnValue(scriptElem);
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
    it('should not append a second script to body when theres already one with the fixed ID', inject([MapsAPILoader], function (loader) {
        doc.getElementById.and.returnValue(document.createElement('script'));
        loader.load();
        expect(doc.body.appendChild).not.toHaveBeenCalledWith();
    }));
    it('should not append a second script to body when window.google.maps is defined', inject([MapsAPILoader], function (loader) {
        windowObj.google = {
            maps: {}
        };
        loader.load();
        expect(doc.body.appendChild).not.toHaveBeenCalledWith();
    }));
    it('should load the script via http when provided', function () {
        var lazyLoadingConf = { protocol: GoogleMapsScriptProtocol.HTTP };
        TestBed.configureTestingModule({
            providers: [
                { provide: MapsAPILoader, useClass: LazyMapsAPILoader },
                { provide: WindowRef, useValue: windowRef },
                { provide: DocumentRef, useValue: documentRef },
                { provide: LAZY_MAPS_API_CONFIG, useValue: lazyLoadingConf }
            ]
        });
        inject([MapsAPILoader], function (loader) {
            var scriptElem = {};
            doc.createElement.and.returnValue(scriptElem);
            loader.load();
            expect(doc.createElement).toHaveBeenCalled();
            expect(scriptElem.src).toContain('http://maps.googleapis.com/maps/api/js');
            expect(doc.body.appendChild).toHaveBeenCalledWith(scriptElem);
        });
    });
});
//# sourceMappingURL=lazy-maps-api-loader.spec.js.map