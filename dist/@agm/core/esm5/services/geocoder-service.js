import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { bindCallback, Observable, of, ReplaySubject, throwError } from 'rxjs';
import { map, multicast, switchMap } from 'rxjs/operators';
import { GeocoderStatus } from './google-maps-types';
import { MapsAPILoader } from './maps-api-loader/maps-api-loader';
import * as i0 from "@angular/core";
import * as i1 from "./maps-api-loader/maps-api-loader";
var AgmGeocoder = /** @class */ (function () {
    function AgmGeocoder(loader) {
        var _this = this;
        var connectableGeocoder$ = new Observable(function (subscriber) {
            loader.load().then(function () { return subscriber.next(); });
        })
            .pipe(map(function () { return _this._createGeocoder(); }), multicast(new ReplaySubject(1)));
        connectableGeocoder$.connect(); // ignore the subscription
        // since we will remain subscribed till application exits
        this.geocoder$ = connectableGeocoder$;
    }
    AgmGeocoder.prototype.geocode = function (request) {
        var _this = this;
        return this.geocoder$.pipe(switchMap(function (geocoder) { return _this._getGoogleResults(geocoder, request); }));
    };
    AgmGeocoder.prototype._getGoogleResults = function (geocoder, request) {
        var geocodeObservable = bindCallback(geocoder.geocode);
        return geocodeObservable(request).pipe(switchMap(function (_a) {
            var _b = tslib_1.__read(_a, 2), results = _b[0], status = _b[1];
            if (status === GeocoderStatus.OK) {
                return of(results);
            }
            return throwError(status);
        }));
    };
    AgmGeocoder.prototype._createGeocoder = function () {
        return new google.maps.Geocoder();
    };
    AgmGeocoder.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function AgmGeocoder_Factory() { return new AgmGeocoder(i0.ɵɵinject(i1.MapsAPILoader)); }, token: AgmGeocoder, providedIn: "root" });
    AgmGeocoder = tslib_1.__decorate([
        Injectable({ providedIn: 'root' }),
        tslib_1.__metadata("design:paramtypes", [MapsAPILoader])
    ], AgmGeocoder);
    return AgmGeocoder;
}());
export { AgmGeocoder };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvY29kZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2dlb2NvZGVyLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBeUIsVUFBVSxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNELE9BQU8sRUFBNkMsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7QUFLbEU7SUFHRSxxQkFBWSxNQUFxQjtRQUFqQyxpQkFhQztRQVpDLElBQU0sb0JBQW9CLEdBQUcsSUFBSSxVQUFVLENBQUMsVUFBQSxVQUFVO1lBQ3BELE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBTSxPQUFBLFVBQVUsQ0FBQyxJQUFJLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQzthQUNDLElBQUksQ0FDSCxHQUFHLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxlQUFlLEVBQUUsRUFBdEIsQ0FBc0IsQ0FBQyxFQUNqQyxTQUFTLENBQUMsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDRyxDQUFDO1FBRXZDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsMEJBQTBCO1FBQzFELHlEQUF5RDtRQUV6RCxJQUFJLENBQUMsU0FBUyxHQUFHLG9CQUFvQixDQUFDO0lBQ3hDLENBQUM7SUFFRCw2QkFBTyxHQUFQLFVBQVEsT0FBd0I7UUFBaEMsaUJBSUM7UUFIQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUN4QixTQUFTLENBQUMsVUFBQyxRQUFRLElBQUssT0FBQSxLQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUF6QyxDQUF5QyxDQUFDLENBQ25FLENBQUM7SUFDSixDQUFDO0lBRU8sdUNBQWlCLEdBQXpCLFVBQTBCLFFBQWtCLEVBQUUsT0FBd0I7UUFDcEUsSUFBTSxpQkFBaUIsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pELE9BQU8saUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUNwQyxTQUFTLENBQUMsVUFBQyxFQUFpQjtnQkFBakIsMEJBQWlCLEVBQWhCLGVBQU8sRUFBRSxjQUFNO1lBQ3pCLElBQUksTUFBTSxLQUFLLGNBQWMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2hDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3BCO1lBRUQsT0FBTyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFTyxxQ0FBZSxHQUF2QjtRQUNFLE9BQU8sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBYyxDQUFDO0lBQ2hELENBQUM7O0lBdkNVLFdBQVc7UUFEdkIsVUFBVSxDQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxDQUFDO2lEQUliLGFBQWE7T0FIdEIsV0FBVyxDQXdDdkI7c0JBakREO0NBaURDLEFBeENELElBd0NDO1NBeENZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBiaW5kQ2FsbGJhY2ssIENvbm5lY3RhYmxlT2JzZXJ2YWJsZSwgT2JzZXJ2YWJsZSwgb2YsIFJlcGxheVN1YmplY3QsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgbXVsdGljYXN0LCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBHZW9jb2RlciwgR2VvY29kZXJSZXF1ZXN0LCBHZW9jb2RlclJlc3VsdCwgR2VvY29kZXJTdGF0dXMgfSBmcm9tICcuL2dvb2dsZS1tYXBzLXR5cGVzJztcbmltcG9ydCB7IE1hcHNBUElMb2FkZXIgfSBmcm9tICcuL21hcHMtYXBpLWxvYWRlci9tYXBzLWFwaS1sb2FkZXInO1xuXG5kZWNsYXJlIHZhciBnb29nbGU6IGFueTtcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBBZ21HZW9jb2RlciB7XG4gIHByb3RlY3RlZCByZWFkb25seSBnZW9jb2RlciQ6IE9ic2VydmFibGU8R2VvY29kZXI+O1xuXG4gIGNvbnN0cnVjdG9yKGxvYWRlcjogTWFwc0FQSUxvYWRlcikge1xuICAgIGNvbnN0IGNvbm5lY3RhYmxlR2VvY29kZXIkID0gbmV3IE9ic2VydmFibGUoc3Vic2NyaWJlciA9PiB7XG4gICAgICBsb2FkZXIubG9hZCgpLnRoZW4oKCkgPT4gc3Vic2NyaWJlci5uZXh0KCkpO1xuICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKCgpID0+IHRoaXMuX2NyZWF0ZUdlb2NvZGVyKCkpLFxuICAgICAgICBtdWx0aWNhc3QobmV3IFJlcGxheVN1YmplY3QoMSkpLFxuICAgICAgKSBhcyBDb25uZWN0YWJsZU9ic2VydmFibGU8R2VvY29kZXI+O1xuXG4gICAgY29ubmVjdGFibGVHZW9jb2RlciQuY29ubmVjdCgpOyAvLyBpZ25vcmUgdGhlIHN1YnNjcmlwdGlvblxuICAgIC8vIHNpbmNlIHdlIHdpbGwgcmVtYWluIHN1YnNjcmliZWQgdGlsbCBhcHBsaWNhdGlvbiBleGl0c1xuXG4gICAgdGhpcy5nZW9jb2RlciQgPSBjb25uZWN0YWJsZUdlb2NvZGVyJDtcbiAgfVxuXG4gIGdlb2NvZGUocmVxdWVzdDogR2VvY29kZXJSZXF1ZXN0KTogT2JzZXJ2YWJsZTxHZW9jb2RlclJlc3VsdFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuZ2VvY29kZXIkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKGdlb2NvZGVyKSA9PiB0aGlzLl9nZXRHb29nbGVSZXN1bHRzKGdlb2NvZGVyLCByZXF1ZXN0KSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0R29vZ2xlUmVzdWx0cyhnZW9jb2RlcjogR2VvY29kZXIsIHJlcXVlc3Q6IEdlb2NvZGVyUmVxdWVzdCk6IE9ic2VydmFibGU8R2VvY29kZXJSZXN1bHRbXT4ge1xuICAgIGNvbnN0IGdlb2NvZGVPYnNlcnZhYmxlID0gYmluZENhbGxiYWNrKGdlb2NvZGVyLmdlb2NvZGUpO1xuICAgIHJldHVybiBnZW9jb2RlT2JzZXJ2YWJsZShyZXF1ZXN0KS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChbcmVzdWx0cywgc3RhdHVzXSkgPT4ge1xuICAgICAgICBpZiAoc3RhdHVzID09PSBHZW9jb2RlclN0YXR1cy5PSykge1xuICAgICAgICAgIHJldHVybiBvZihyZXN1bHRzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKHN0YXR1cyk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVHZW9jb2RlcigpOiBHZW9jb2RlciB7XG4gICAgcmV0dXJuIG5ldyBnb29nbGUubWFwcy5HZW9jb2RlcigpIGFzIEdlb2NvZGVyO1xuICB9XG59XG4iXX0=