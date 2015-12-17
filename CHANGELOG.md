<a name="0.4.0"></a>
# [0.4.0](https://github.com/SebastianM/angular2-google-maps/compare/0.3.0...v0.4.0) (2015-12-17)


### Features

* export ANGULAR2_GOOGLE_MAPS_DIRECTIVES ([83bcd9f](https://github.com/SebastianM/angular2-google-maps/commit/83bcd9f))
* **angular2:** support 2.0.0-beta.0 ([0bae421](https://github.com/SebastianM/angular2-google-maps/commit/0bae421)), closes [#51](https://github.com/SebastianM/angular2-google-maps/issues/51)
* **SebmGoogleMapMarker:** support click event ([2926de7](https://github.com/SebastianM/angular2-google-maps/commit/2926de7))


### BREAKING CHANGES

* angular2_google_maps/components module renamed
to angular2_google_maps/directives



<a name="0.3.0"></a>
# [0.3.0](https://github.com/SebastianM/angular2-google-maps/compare/0.2.0...v0.3.0) (2015-12-10)


### Features

* **angular2:** add angular2.0.0-alpha.52 support ([8a1d813](https://github.com/SebastianM/angular2-google-maps/commit/8a1d813))



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
