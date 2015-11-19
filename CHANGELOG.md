<a name="0.2.0"></a>
# [0.2.0](https://github.com/SebastianM/angular2-google-maps/compare/0.1.0...v0.2.0) (2015-11-19)


### Features

* **GoogleMapsAPILoading:** lazy load mechanism ([d05e6d3](https://github.com/SebastianM/angular2-google-maps/commit/d05e6d3))
* **sebmGoogleMapMarker:** support basic label ([f2e1257](https://github.com/SebastianM/angular2-google-maps/commit/f2e1257))


### BREAKING CHANGES

* GoogleMapsAPILoading:
  * You have to add the ANGULAR2_GOOGLE_MAPS_PROVIDERS to your `bootstrap()` method:
```typescript
import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2_google_maps/angular2_google_maps';
bootstrap(myComponent, [ANGULAR2_GOOGLE_MAPS_PROVIDERS]);
```
  * Google Maps API v3 gets loaded automatically now by default. So you can remove the Google Maps API script tag from your page.
Alternatively, you can tell angular2-google-maps that the Google Maps API is already loaded on the page with this configuration:
```typescript
bootstrap(App, [
  ANGULAR2_GOOGLE_MAPS_PROVIDERS,
  // If you don't want to let angular2-google-maps load the Google Maps API script,
  // you can use the NoOpMapsAPILoader like this:
  provide(MapsAPILoader, {useClass: NoOpMapsAPILoader})
])
```



<a name="0.1.0"></a>
# 0.1.0 (2015-11-07)


### Features

* **components:** add sebm-google-map component ([120a5df](https://github.com/SebastianM/angular2-google-maps/commit/120a5df))
* **marker:** add basic marker support ([ec644a4](https://github.com/SebastianM/angular2-google-maps/commit/ec644a4))
