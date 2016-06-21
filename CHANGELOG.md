<a name="0.12.0"></a>
# [0.12.0 unexpected-lion](https://github.com/SebastianM/angular2-google-maps/compare/0.11.0...0.12.0) (2016-06-21)


### Bug Fixes

* **LazyMapsAPILoader:** use OpaqueTokens for globs ([78daae0](https://github.com/SebastianM/angular2-google-maps/commit/78daae0)), closes [#436](https://github.com/SebastianM/angular2-google-maps/issues/436) [#441](https://github.com/SebastianM/angular2-google-maps/issues/441)


### Features

* support Circle ([d5cc7b1](https://github.com/SebastianM/angular2-google-maps/commit/d5cc7b1)), closes [#432](https://github.com/SebastianM/angular2-google-maps/issues/432) [#449](https://github.com/SebastianM/angular2-google-maps/issues/449)
* **SebmGoogleMap:** support bounds_changed event ([4bbc3b3](https://github.com/SebastianM/angular2-google-maps/commit/4bbc3b3)), closes [#200](https://github.com/SebastianM/angular2-google-maps/issues/200) [#450](https://github.com/SebastianM/angular2-google-maps/issues/450)
* **SebmGoogleMap:** support streetViewControl opt ([e7426c5](https://github.com/SebastianM/angular2-google-maps/commit/e7426c5)), closes [#418](https://github.com/SebastianM/angular2-google-maps/issues/418) [#438](https://github.com/SebastianM/angular2-google-maps/issues/438)



<a name="0.11.0"></a>
# [0.11.0 red-motherboard](https://github.com/SebastianM/angular2-google-maps/compare/0.10.0...0.11.0) (2016-06-12)


### Bug Fixes

* **SebmGoogleMap:** remove event listeners on destroy ([223d0de](https://github.com/SebastianM/angular2-google-maps/commit/223d0de)), closes [#425](https://github.com/SebastianM/angular2-google-maps/issues/425)
* **tests:** fix path in unit tests ([f03f04f](https://github.com/SebastianM/angular2-google-maps/commit/f03f04f))


### Code Refactoring

* **GoogleMapsAPIWrapper:** rename getMap method ([f2084dd](https://github.com/SebastianM/angular2-google-maps/commit/f2084dd)), closes [#407](https://github.com/SebastianM/angular2-google-maps/issues/407)


### Features

* provide an UMD bundle ([531110d](https://github.com/SebastianM/angular2-google-maps/commit/531110d))
* rename *ANGULAR2_GOOGLE_MAPS* constants ([8efa96d](https://github.com/SebastianM/angular2-google-maps/commit/8efa96d)), closes [#406](https://github.com/SebastianM/angular2-google-maps/issues/406)
* **infoWindow:** emit event when closed ([00f4f2d](https://github.com/SebastianM/angular2-google-maps/commit/00f4f2d)), closes [#306](https://github.com/SebastianM/angular2-google-maps/issues/306) [#317](https://github.com/SebastianM/angular2-google-maps/issues/317) [#360](https://github.com/SebastianM/angular2-google-maps/issues/360)
* **InfoWindow:** support initial open state ([4947efc](https://github.com/SebastianM/angular2-google-maps/commit/4947efc)), closes [#382](https://github.com/SebastianM/angular2-google-maps/issues/382) [#390](https://github.com/SebastianM/angular2-google-maps/issues/390)
* **LazyMapsApiLoader:** add the channel parameter ([52fe30e](https://github.com/SebastianM/angular2-google-maps/commit/52fe30e)), closes [#319](https://github.com/SebastianM/angular2-google-maps/issues/319)
* **LazyMapsAPILoader:** provide shortcut ([997aa80](https://github.com/SebastianM/angular2-google-maps/commit/997aa80)), closes [#388](https://github.com/SebastianM/angular2-google-maps/issues/388) [#420](https://github.com/SebastianM/angular2-google-maps/issues/420)
* **npm:** define dependencies as peerDependencies ([b85ad0e](https://github.com/SebastianM/angular2-google-maps/commit/b85ad0e)), closes [#399](https://github.com/SebastianM/angular2-google-maps/issues/399) [#403](https://github.com/SebastianM/angular2-google-maps/issues/403)
* **SebmGoogleMap:** support idle event ([c5d5744](https://github.com/SebastianM/angular2-google-maps/commit/c5d5744)), closes [#393](https://github.com/SebastianM/angular2-google-maps/issues/393) [#417](https://github.com/SebastianM/angular2-google-maps/issues/417)
* **SebmGoogleMap:** support panning ([760f410](https://github.com/SebastianM/angular2-google-maps/commit/760f410)), closes [#412](https://github.com/SebastianM/angular2-google-maps/issues/412) [#416](https://github.com/SebastianM/angular2-google-maps/issues/416)
* **SebmGoogleMaps:** support styles ([0e61df3](https://github.com/SebastianM/angular2-google-maps/commit/0e61df3)), closes [#387](https://github.com/SebastianM/angular2-google-maps/issues/387)


### BREAKING CHANGES

* **SebmGoogleMap**:

The latitude, longitude and zoom inputs of <sebm-google-map> must be of type number now.
Strings are not supported any more.

Example:

Old (now unsupported way):
```
<sebm-google-map latitude="33" longitude="22" zoom="8">...
```

New:
```
<sebm-google-map [latitude]="33" [longitude]="22" [zoom]="8">...
```
* **GoogleMapsAPIWrapper**: `getMap()` is now called `getNativeMap()`.

* `ANGULAR2_GOOGLE_MAPS_PROVIDERS` is now called `GOOGLE_MAPS_PROVIDERS`.
* `ANGULAR2_GOOGLE_MAPS_DIRECTIVES` is now called `GOOGLE_MAPS_DIRECTIVES`.

The SystemJS based bundle located in the `bundles/` dir is gone!
Please use the new UMD bundle located under `core/core.umd.js`.

SystemJS example:

```js
SystemJS.config({
	packages: {
		'angular2-google-maps/core': { main:  'core.umd.js', defaultExtension: 'js' }
	}
})
```



<a name="0.10.0"></a>
# [0.10.0 agate-octopus](https://github.com/SebastianM/angular2-google-maps/compare/0.9.0...0.10.0) (2016-05-12)


### Features

* support angular2.0.0-rc.1 ([84bc54a](https://github.com/SebastianM/angular2-google-maps/commit/84bc54a)), closes [#339](https://github.com/SebastianM/angular2-google-maps/issues/339)



<a name="0.9.0"></a>
# [0.9.0 icy-lama](https://github.com/SebastianM/angular2-google-maps/compare/0.8.1...0.9.0) (2016-03-22)


### Bug Fixes

* **LazyMapsAPILoader:** use default API version 3 ([426da66](https://github.com/SebastianM/angular2-google-maps/commit/426da66)), closes [#195](https://github.com/SebastianM/angular2-google-maps/issues/195)

### Features

* Expose GoogleMapsAPIWrapper ([8999da2](https://github.com/SebastianM/angular2-google-maps/commit/8999da2))
* Expose InfoWindowManager ([7c95e55](https://github.com/SebastianM/angular2-google-maps/commit/7c95e55))
* Expose MarkerManager ([0726ddb](https://github.com/SebastianM/angular2-google-maps/commit/0726ddb))
* **GoogleMapsAPIWrapper:** expose map instance ([69e3c0e](https://github.com/SebastianM/angular2-google-maps/commit/69e3c0e)), closes [#161](https://github.com/SebastianM/angular2-google-maps/issues/161)
* **LazyMapsAPILoaderConfig:** add clientId ([652b711](https://github.com/SebastianM/angular2-google-maps/commit/652b711)), closes [#198](https://github.com/SebastianM/angular2-google-maps/issues/198)
* **SebmGoogleMap:** support backgroundColor opt ([bda7ca8](https://github.com/SebastianM/angular2-google-maps/commit/bda7ca8)), closes [#233](https://github.com/SebastianM/angular2-google-maps/issues/233)
* **SebmGoogleMap:** support centerChange event ([20ad62b](https://github.com/SebastianM/angular2-google-maps/commit/20ad62b)), closes [#212](https://github.com/SebastianM/angular2-google-maps/issues/212)
* **SebmGoogleMap:** support draggableCursor opt ([00d26e5](https://github.com/SebastianM/angular2-google-maps/commit/00d26e5)), closes [#234](https://github.com/SebastianM/angular2-google-maps/issues/234)
* **SebmGoogleMap:** support draggingCursor opt ([553842a](https://github.com/SebastianM/angular2-google-maps/commit/553842a)), closes [#235](https://github.com/SebastianM/angular2-google-maps/issues/235)
* **SebmGoogleMap:** support keyboardShortcuts opt ([1a14570](https://github.com/SebastianM/angular2-google-maps/commit/1a14570)), closes [#236](https://github.com/SebastianM/angular2-google-maps/issues/236)
* **SebmGoogleMap:** support scrollwheel mapOption ([e19d99b](https://github.com/SebastianM/angular2-google-maps/commit/e19d99b)), closes [#232](https://github.com/SebastianM/angular2-google-maps/issues/232) [#159](https://github.com/SebastianM/angular2-google-maps/issues/159) [#211](https://github.com/SebastianM/angular2-google-maps/issues/211)
* **SebmGoogleMap:** support zoomControl opt ([a5b909a](https://github.com/SebastianM/angular2-google-maps/commit/a5b909a)), closes [#237](https://github.com/SebastianM/angular2-google-maps/issues/237)
* **SebmGoogleMap:** triggering resize events ([b27ae46](https://github.com/SebastianM/angular2-google-maps/commit/b27ae46)), closes [#166](https://github.com/SebastianM/angular2-google-maps/issues/166) [#188](https://github.com/SebastianM/angular2-google-maps/issues/188)
* **SebmGoogleMapInfoWindow:** Basic support ([a3df794](https://github.com/SebastianM/angular2-google-maps/commit/a3df794)), closes [#150](https://github.com/SebastianM/angular2-google-maps/issues/150) [#238](https://github.com/SebastianM/angular2-google-maps/issues/238)
* support angular2.0.0-beta.11 ([e187ae6](https://github.com/SebastianM/angular2-google-maps/commit/e187ae6))
* **SebmGoogleMapMarker:** add custom icon support ([13ec2a1](https://github.com/SebastianM/angular2-google-maps/commit/13ec2a1)), closes [#123](https://github.com/SebastianM/angular2-google-maps/issues/123) [#224](https://github.com/SebastianM/angular2-google-maps/issues/224)



<a name="0.8.1"></a>
## [0.8.1](https://github.com/SebastianM/angular2-google-maps/compare/0.8.0...v0.8.1) (2016-02-28)


### Bug Fixes

* **SebmGoogleMap:** allow styling via comp styles ([509b610](https://github.com/SebastianM/angular2-google-maps/commit/509b610)), closes [#162](https://github.com/SebastianM/angular2-google-maps/issues/162) [#169](https://github.com/SebastianM/angular2-google-maps/issues/169)
* **SebmGoogleMapMarker:** longitude changes ([e4ca50b](https://github.com/SebastianM/angular2-google-maps/commit/e4ca50b)), closes [#163](https://github.com/SebastianM/angular2-google-maps/issues/163) [#167](https://github.com/SebastianM/angular2-google-maps/issues/167)



<a name="0.8.0"></a>
# [0.8.0 clean-phantom](https://github.com/SebastianM/angular2-google-maps/compare/0.6.1...0.8.0) (2016-02-21)


### Bug Fixes

* **SebmGogleMapMarker:** label updates ([e2b9923](https://github.com/SebastianM/angular2-google-maps/commit/e2b9923))

### Features

* rename MapMouseEvent to MouseEvent ([978e881](https://github.com/SebastianM/angular2-google-maps/commit/978e881)), closes [#148](https://github.com/SebastianM/angular2-google-maps/issues/148)
* support angular beta.7 ([66ccfe7](https://github.com/SebastianM/angular2-google-maps/commit/66ccfe7)), closes [#144](https://github.com/SebastianM/angular2-google-maps/issues/144)
* **LazyMapsAPILoader:** support libraries query param ([a94662f](https://github.com/SebastianM/angular2-google-maps/commit/a94662f)), closes [#114](https://github.com/SebastianM/angular2-google-maps/issues/114)
* **LazyMapsAPILoader:** support region & language ([a127a79](https://github.com/SebastianM/angular2-google-maps/commit/a127a79)), closes [#102](https://github.com/SebastianM/angular2-google-maps/issues/102) [#125](https://github.com/SebastianM/angular2-google-maps/issues/125)
* **SebmGoogleMap:** support disableDefaultUI MapOption ([a5c9002](https://github.com/SebastianM/angular2-google-maps/commit/a5c9002)), closes [#103](https://github.com/SebastianM/angular2-google-maps/issues/103) [#113](https://github.com/SebastianM/angular2-google-maps/issues/113)
* **SebmGoogleMapMarker:** add draggable option ([a8ba736](https://github.com/SebastianM/angular2-google-maps/commit/a8ba736)), closes [#70](https://github.com/SebastianM/angular2-google-maps/issues/70) [#147](https://github.com/SebastianM/angular2-google-maps/issues/147)
* **SebmGoogleMapMarker:** support dragend event ([8f60c54](https://github.com/SebastianM/angular2-google-maps/commit/8f60c54)), closes [#71](https://github.com/SebastianM/angular2-google-maps/issues/71) [#149](https://github.com/SebastianM/angular2-google-maps/issues/149)


### BREAKING CHANGES

* `MapMouseEvent` is now called `MouseEvent`. Please update your
imports:

before:
```
import {MapMouseEvent} from 'angular2-google-maps/core';
```

after:
```
import {MouseEvent} from 'angular2-google-maps/core';
```


<a name="0.7.0"></a>
# [0.7.0](2016-02-21)
This release was incorrect; replaced with 0.8.0

<a name="0.6.1"></a>
## [0.6.1 shiny-neutron](https://github.com/SebastianM/angular2-google-maps/compare/0.6.0...0.6.1) (2016-01-30)


### Bug Fixes

* **SebmGoogleMap:** show map when zoom is not set ([b975c76](https://github.com/SebastianM/angular2-google-maps/commit/b975c76)), closes [#81](https://github.com/SebastianM/angular2-google-maps/issues/81)
* **SebmGoogleMapMarker:** run click event in zone ([2a3e390](https://github.com/SebastianM/angular2-google-maps/commit/2a3e390))
* **SebMGoogleMapMarker:** 0 value for lat/lng ([e65568e](https://github.com/SebastianM/angular2-google-maps/commit/e65568e)), closes [#82](https://github.com/SebastianM/angular2-google-maps/issues/82) [#101](https://github.com/SebastianM/angular2-google-maps/issues/101)

### Features

* **angular2:** support angular2-beta.2 ([592648c](https://github.com/SebastianM/angular2-google-maps/commit/592648c))



<a name="0.6.0"></a>
# [0.6.0 supersonic-scorpion](https://github.com/SebastianM/angular2-google-maps/compare/0.5.0...0.6.0) (2016-01-12)


### Bug Fixes

* **SebmGoogleMap:** use ngOnInit to support angular 2.0.0-beta.1 ([1c25cb9](https://github.com/SebastianM/angular2-google-maps/commit/1c25cb9)), closes [#79](https://github.com/SebastianM/angular2-google-maps/issues/79) [#76](https://github.com/SebastianM/angular2-google-maps/issues/76)

### Features

* **LazyMapsAPILoader:** make Google Maps API version configurable ([728960d](https://github.com/SebastianM/angular2-google-maps/commit/728960d))



<a name="0.5.0"></a>
# [0.5.0 eager-electron](https://github.com/SebastianM/angular2-google-maps/compare/0.4.0...0.5.0) (2015-12-27)


### Bug Fixes

* **package:** align peer & JSPM dependencies with ng2 beta.0 ([4fcd9af](https://github.com/SebastianM/angular2-google-maps/commit/4fcd9af))

### Features

* change file naming convention ([5a1ac76](https://github.com/SebastianM/angular2-google-maps/commit/5a1ac76))
* **packaging:** change package structure ([77d634e](https://github.com/SebastianM/angular2-google-maps/commit/77d634e))
* **SebmGoogleMap:**  support map click event ([c18640c](https://github.com/SebastianM/angular2-google-maps/commit/c18640c))
* **SebmGoogleMap:** support disableDoubleClickZoom mapOption ([fff0a29](https://github.com/SebastianM/angular2-google-maps/commit/fff0a29))
* **SebmGoogleMap:** support double-click event ([5f1ae68](https://github.com/SebastianM/angular2-google-maps/commit/5f1ae68))
* **SebmGoogleMap:** support right click event ([eab715e](https://github.com/SebastianM/angular2-google-maps/commit/eab715e))


### BREAKING CHANGES

* When you import a directive directly, you have to change the
import path:

Old:
```
import {SebmGoogleMap} from 'angular2-google-maps/directives/google_map';
```

New:
```
import {SebmGoogleMap} from 'angular2-google-maps/directives/google-map';
```

* The module name has changed. So you have to change your import path.  
  old: `angular2_google_maps/angular2_google_maps`  
  new: `angular2-google-maps/core`
* ES5 files that can be consumed using CommonJS are now in the root directory (old path was `/cjs/angular2_google_maps`)
* The ES6 files directory has changed:
  Old dir: `/es6/angular2_google_maps`  
  New dir: `/es6`
* The TypeScript files directory has changed:  
  Old dir: `/ts/angular2_google_maps`  
  New dir: `/ts`
* The `/typings` directory with bundled typings was deleted.  
  (Typings are now in the root directory seperated by file)



<a name="0.4.0"></a>
# [0.4.0](https://github.com/SebastianM/angular2-google-maps/compare/0.3.0...0.4.0) (2015-12-17)


### Features

* export ANGULAR2_GOOGLE_MAPS_DIRECTIVES ([83bcd9f](https://github.com/SebastianM/angular2-google-maps/commit/83bcd9f))
* **angular2:** support 2.0.0-beta.0 ([0bae421](https://github.com/SebastianM/angular2-google-maps/commit/0bae421)), closes [#51](https://github.com/SebastianM/angular2-google-maps/issues/51)
* **SebmGoogleMapMarker:** support click event ([2926de7](https://github.com/SebastianM/angular2-google-maps/commit/2926de7))


### BREAKING CHANGES

* angular2_google_maps/components module renamed
to angular2_google_maps/directives



<a name="0.3.0"></a>
# [0.3.0](https://github.com/SebastianM/angular2-google-maps/compare/0.2.0...0.3.0) (2015-12-10)


### Features

* **angular2:** add angular2.0.0-alpha.52 support ([8a1d813](https://github.com/SebastianM/angular2-google-maps/commit/8a1d813))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/SebastianM/angular2-google-maps/compare/0.1.0...0.2.0) (2015-11-19)


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
