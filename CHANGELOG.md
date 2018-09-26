<a name="1.0.0-beta.5"></a>
# [1.0.0-beta.5 yellow-tape](https://github.com/SebastianM/angular-google-maps/compare/1.0.0-beta.4...1.0.0-beta.5) (2018-09-24)


### Bug Fixes

* **Map:** fitBounds values that are undefined/null ([f9afd4b](https://github.com/SebastianM/angular-google-maps/commit/f9afd4b)), closes [#1505](https://github.com/SebastianM/angular-google-maps/issues/1505) [#1504](https://github.com/SebastianM/angular-google-maps/issues/1504)


<a name="1.0.0-beta.4"></a>
# [1.0.0-beta.4 beryl-cobra](https://github.com/SebastianM/angular-google-maps/compare/1.0.0-beta.3...1.0.0-beta.4) (2018-09-22)

This release adds the long awaited auto fitBounds feature: https://github.com/SebastianM/angular-google-maps/pull/1389

### Bug Fixes

* **AgmPolygon:** double click ([#1442](https://github.com/SebastianM/angular-google-maps/issues/1442)) ([ca0b8f0](https://github.com/SebastianM/angular-google-maps/commit/ca0b8f0)), closes [#1202](https://github.com/SebastianM/angular-google-maps/issues/1202)
* **polyline:** icon to icons ([fc042ae](https://github.com/SebastianM/angular-google-maps/commit/fc042ae)), closes [#948](https://github.com/SebastianM/angular-google-maps/issues/948)


### Features

* **AgmMarker:** add rightclick support ([#1443](https://github.com/SebastianM/angular-google-maps/issues/1443)) ([8abefa0](https://github.com/SebastianM/angular-google-maps/commit/8abefa0)), closes [#1362](https://github.com/SebastianM/angular-google-maps/issues/1362)
* **AgmMarker:** auto-convert string to Number for lat/lng ([#1424](https://github.com/SebastianM/angular-google-maps/issues/1424)) ([c1d6c6d](https://github.com/SebastianM/angular-google-maps/commit/c1d6c6d)), closes [#771](https://github.com/SebastianM/angular-google-maps/issues/771)
* **AgmMarker:** include marker instance in markerClick emitter ([89b6e5c](https://github.com/SebastianM/angular-google-maps/commit/89b6e5c))
* **core:** add rectangle support ([#1450](https://github.com/SebastianM/angular-google-maps/issues/1450)) ([2e4878b](https://github.com/SebastianM/angular-google-maps/commit/2e4878b)), closes [#570](https://github.com/SebastianM/angular-google-maps/issues/570)
* **core:** support auto fitBounds ([4d3103c](https://github.com/SebastianM/angular-google-maps/commit/4d3103c))



<a name="1.0.0-beta.3"></a>
# [1.0.0-beta.3 orange-disk](https://github.com/SebastianM/angular-google-maps/compare/1.0.0-beta.2...1.0.0-beta.3) (2018-05-24)


### Bug Fixes

* **AgmMap:** memory leak when map gets destroyed ([6006617](https://github.com/SebastianM/angular-google-maps/commit/6006617))
* **AgmPolygon:** createPolygon type fix ([2563cae](https://github.com/SebastianM/angular-google-maps/commit/2563cae))
* **Lazy Loading:** check if google maps script was already loaded ([e513c57](https://github.com/SebastianM/angular-google-maps/commit/e513c57)), closes [#692](https://github.com/SebastianM/angular-google-maps/issues/692)
* **LazyMapsAPILoader:** multiple google maps api scripts on page ([07de5a4](https://github.com/SebastianM/angular-google-maps/commit/07de5a4)), closes [#315](https://github.com/SebastianM/angular-google-maps/issues/315) [#775](https://github.com/SebastianM/angular-google-maps/issues/775) [#1260](https://github.com/SebastianM/angular-google-maps/issues/1260)


### Features

* **all packages**: Support angular 6 ([44fba48](https://github.com/SebastianM/angular-google-maps/commit/44fba48))
* **AgmMap:** EventEmitter for maptypeid_changed event ([f9c23aa](https://github.com/SebastianM/angular-google-maps/commit/f9c23aa))
* **AgmMarker:** add animation field to markers ([c57ab39](https://github.com/SebastianM/angular-google-maps/commit/c57ab39)), closes [#580](https://github.com/SebastianM/angular-google-maps/issues/580) [#852](https://github.com/SebastianM/angular-google-maps/issues/852)
* **AgmMarker:** allow objects as label ([658de77](https://github.com/SebastianM/angular-google-maps/commit/658de77))


### Performance Improvements

* **AgmMap:** run resolve outside angular zone ([078c2a5](https://github.com/SebastianM/angular-google-maps/commit/078c2a5))

### BREAKING CHANGES

Angular 4.x is not officially supported anymore. Please update to Angular 5.x or 6.x.

<a name="1.0.0-beta.2"></a>
# [1.0.0-beta.2 angular-five](https://github.com/SebastianM/angular-google-maps/compare/1.0.0-beta.1...1.0.0-beta.2) (2017-10-31)


### Bug Fixes

* **AgmInfoWindow:** disableAutoPan option ([bf99108](https://github.com/SebastianM/angular-google-maps/commit/bf99108))
* **AgmMarkerCluster:** fixes info windows ([e547df8](https://github.com/SebastianM/angular-google-maps/commit/e547df8)), closes [#1126](https://github.com/SebastianM/angular-google-maps/issues/1126)
* **ControlPosition:** correct enum values ([6081e57](https://github.com/SebastianM/angular-google-maps/commit/6081e57)), closes [#1105](https://github.com/SebastianM/angular-google-maps/issues/1105)
* **datalayer:** smarter ngOnChanges ([91cff2a](https://github.com/SebastianM/angular-google-maps/commit/91cff2a)), closes [#1099](https://github.com/SebastianM/angular-google-maps/issues/1099)
* **LazyMapsApiLoader:** Change OpaqueToken to InjectionToken ([f1163fd](https://github.com/SebastianM/angular-google-maps/commit/f1163fd))
* **snazzy-info-window:** fix passing of closeOnMapClick param ([#1221](https://github.com/SebastianM/angular-google-maps/issues/1221)) ([305320a](https://github.com/SebastianM/angular-google-maps/commit/305320a)), closes [#1118](https://github.com/SebastianM/angular-google-maps/issues/1118)


### Features

* support for angular 4.x and 5.x ([4f2a750](https://github.com/SebastianM/angular-google-maps/commit/4f2a750))
* **js-marker-clusterer:** support angular 4.x and 5.x ([b14a4c2](https://github.com/SebastianM/angular-google-maps/commit/b14a4c2))
* **snazzy-info-window:** support angular 4.x and 5.x ([28c9646](https://github.com/SebastianM/angular-google-maps/commit/28c9646))

### BREAKING CHANGES
Angular 2.x is not officially supported anymore. Please update to Angular 4.x or 5.x. 


<a name="1.0.0-beta.1"></a>
# [1.0.0-beta.1 - diamond-compressor](https://github.com/SebastianM/angular-google-maps/compare/1.0.0-beta.0...1.0.0-beta.1) (2017-08-22)


### Bug Fixes

* **AgmCircle:** clickable input ([7468bb4](https://github.com/SebastianM/angular-google-maps/commit/7468bb4))
* **AgmPolygon:** fix editable input ([4b1b42d](https://github.com/SebastianM/angular-google-maps/commit/4b1b42d)), closes [#990](https://github.com/SebastianM/angular-google-maps/issues/990)
* **AgmPolyline:** fix doubleclick output ([4caeb0d](https://github.com/SebastianM/angular-google-maps/commit/4caeb0d)), closes [#1041](https://github.com/SebastianM/angular-google-maps/issues/1041)


### Features

Two new NPM packages!

* @agm/snazzy-info-window for Snazzy Info Window support with AGM
* @agm/js-marker-clusterer for clustered markers support with AGM

Detailed feature list:
* add clustered markers support ([5cbc515](https://github.com/SebastianM/angular-google-maps/commit/5cbc515)), closes [#1044](https://github.com/SebastianM/angular-google-maps/issues/1044)
* support snazzy-info-window ([1205c96](https://github.com/SebastianM/angular-google-maps/commit/1205c96))
* **AgmDataLayer:** add loadGeoJson method ([128c8f3](https://github.com/SebastianM/angular-google-maps/commit/128c8f3)), closes [#1003](https://github.com/SebastianM/angular-google-maps/issues/1003)
* **AgmMap:** recentering for triggerResize ([faea24d](https://github.com/SebastianM/angular-google-maps/commit/faea24d)), closes [#789](https://github.com/SebastianM/angular-google-maps/issues/789) [#976](https://github.com/SebastianM/angular-google-maps/issues/976)
* **AgmMarker:** add clickable support ([fec8b01](https://github.com/SebastianM/angular-google-maps/commit/fec8b01)), closes [#994](https://github.com/SebastianM/angular-google-maps/issues/994)
* **GoogleMapsAPIWrapper:** add panBy method ([1afb152](https://github.com/SebastianM/angular-google-maps/commit/1afb152))

<a name="1.0.0-beta.0"></a>
# [1.0.0-beta.0 - green-zebra](https://github.com/SebastianM/angular-google-maps/compare/0.17.0...1.0.0-beta.0) (2017-04-09)

**Please read the BREAKING CHANGES below!**

### Bug Fixes

* **AgmMap:** Add missing control opt inputs ([52315b3](https://github.com/SebastianM/angular-google-maps/commit/52315b3)), closes [#
863](https://github.com/SebastianM/angular-google-maps/issues/863)
* **AgmMap:** mapDblClick output fixed ([500dce0](https://github.com/SebastianM/angular-google-maps/commit/500dce0)), closes [#879](h
ttps://github.com/SebastianM/angular-google-maps/issues/879) [#880](https://github.com/SebastianM/angular-google-maps/issues/880)
* **AgmMarker:** fix mislocated info window ([c5a2414](https://github.com/SebastianM/angular-google-maps/commit/c5a2414)), closes [#752]
(https://github.com/SebastianM/angular-google-maps/issues/752) [#754](https://github.com/SebastianM/angular-google-maps/issues/754)


### Features

* **change project name to AGM - Angular Google Maps** ([d1bab5a](https://github.com/SebastianM/angular-google-maps/commit/d1bab5a))
* Support data layer ([66806e5](https://github.com/SebastianM/angular-google-maps/commit/66806e5)), closes [#809](https://github.com/
SebastianM/angular-google-maps/issues/809) [#819](https://github.com/SebastianM/angular-google-maps/issues/819)
* **AgmMap:** add gestureHandling option ([f863228](https://github.com/SebastianM/angular-google-maps/commit/f863228)), closes [#919]
(https://github.com/SebastianM/angular-google-maps/issues/919)
* **AgmMap:** add mapTypeId support ([edf6e4f](https://github.com/SebastianM/angular-google-maps/commit/edf6e4f)), closes [#774](http
s://github.com/SebastianM/angular-google-maps/issues/774)
* **AgmMap:** know when map is ready ([2788dba](https://github.com/SebastianM/angular-google-maps/commit/2788dba)), closes [#740](htt
ps://github.com/SebastianM/angular-google-maps/issues/740) [#972](https://github.com/SebastianM/angular-google-maps/issues/972)
* **AgmMap:** Add attribute „clickableIcons“ to map ([9960522](https://github.com/SebastianM/angular-google-maps/commit/996052
2))
* **AgmMap:** Add control options support ([0048ccf](https://github.com/SebastianM/angular-google-maps/commit/0048ccf))
* support angular 4.0 and 2.0 ([263e92d](https://github.com/SebastianM/angular-google-maps/commit/263e92d))

### BREAKING CHANGES
The project and NPM package name changes:

Old name: angular2-google-maps
New NPM pkg name: @agm/core

To have a consistent naming pattern, we also change the
component/directive names:

| Old class name / old selector                               | New class name / new selector         |
|-------------------------------------------------------------|---------------------------------------|
| SebmGoogleMap / sebm-google-map                             | AgmMap / agm-map                      |
| SebmGoogleMapCircle / sebm-google-map-circle                | AgmCircle / agm-circle                |
| SebmGoogleMapInfoWindow / sebm-google-map-info-window       | AgmInfoWindow / agm-info-window       |
| SebmGoogleMapKmlLayer / sebm-google-map-kml-layer           | AgmKmlLayer / agm-kml-layer           |
| SebmGoogleMapMarker / sebm-google-map-marker                | AgmMarker / agm-marker                |
| SebmGoogleMapPolygon / sebm-map-polygon                     | AgmPolygon / agm-polygon              |
| SebmGoogleMapPolyline / sebm-google-map-polyline            | AgmPolyline / agm-polyline            |
| SebmGoogleMapPolylinePoint / sebm-google-map-polyline-point | AgmPolylinePoint / agm-polyline-point |

You can simply migrate by search/replace these class/selector names.

The package structure also changes. The root directory now contains **esm** code (ES5 code with ES2015 modules).

**A CommonJS compatible format and TS are not part of the package any more!  
This change aligns with structure of the @angular packages.**

The styling of the maps is now more intuitive.
To style the map, please use the `agm-map` element (or a custom class or
ID) directly.

**The `.sebm-google-map-container` css class is deprecated and will be
gone with the next version.**

**The `.sebm.google-map-container-inner` is now called
`.agm-map-container-inner`. `.sebm-google-map-container-inner` is
depcrecated and will be gone with the next version.**



<a name="0.17.0"></a>
# [0.17.0 christmas-edition](https://github.com/SebastianM/angular2-google-maps/compare/0.16.0...0.17.0) (2016-12-22)


### Bug Fixes

* **core.umd.js:** ship ES5 compatible UMD file ([c81a15f](https://github.com/SebastianM/angular2-google-maps/commit/c81a15f)), closes [#783](https://github.com/SebastianM/angular2-google-maps/issues/783)
* **InfoWindow:** fire infoWindowClose Event ([b669aea](https://github.com/SebastianM/angular2-google-maps/commit/b669aea)), closes [#728](https://github.com/SebastianM/angular2-google-maps/issues/728) [#811](https://github.com/SebastianM/angular2-google-maps/issues/811)
* **package:** remove indirect peerDependencies ([0f93e39](https://github.com/SebastianM/angular2-google-maps/commit/0f93e39)), closes [#792](https://github.com/SebastianM/angular2-google-maps/issues/792) [#794](https://github.com/SebastianM/angular2-google-maps/issues/794)


### Features

* Support KML Layer ([4d2a5d5](https://github.com/SebastianM/angular2-google-maps/commit/4d2a5d5)), closes [#734](https://github.com/SebastianM/angular2-google-maps/issues/734)
* **SebmGoogleMap:** support maxZoom and minZoom ([0789a17](https://github.com/SebastianM/angular2-google-maps/commit/0789a17))


### BREAKING CHANGES

* core.umd.js: The files under `/esm` are ES5 (before: ES2015) based with ES2015 modules.
In the real world, this should not cause troubles.



<a name="0.16.0"></a>
# [0.16.0 violet-sun](https://github.com/SebastianM/angular2-google-maps/compare/0.15.0...0.16.0) (2016-11-07)


### Bug Fixes

* **SebmGoogleMapPolyline:** fix private member state ([758d3e0](https://github.com/SebastianM/angular2-google-maps/commit/758d3e0))
* **SebmGoogleMapMarker:** fix private member state ([648856d](https://github.com/SebastianM/angular2-google-maps/commit/648856d))
* **SebmGoogleMapMarker:** remove unused fitBounds ([d625ab6](https://github.com/SebastianM/angular2-google-maps/commit/d625ab6))


### Features

* AOT support ([d28ad96](https://github.com/SebastianM/angular2-google-maps/commit/d28ad96)), closes [#709](https://github.com/SebastianM/angular2-google-maps/issues/709) [#629](https://github.com/SebastianM/angular2-google-maps/issues/629)
* **SebmGoogleMapMarker:** support mouseover and mouseout event ([59ba45b](https://github.com/SebastianM/angular2-google-maps/commit/59ba45b)), closes [#662](https://github.com/SebastianM/angular2-google-maps/issues/662)
* **SebmGoogleMapPolygon:** support polygons ([8437c74](https://github.com/SebastianM/angular2-google-maps/commit/8437c74)), closes [#615](https://github.com/SebastianM/angular2-google-maps/issues/615) [#652](https://github.com/SebastianM/angular2-google-maps/issues/652)


### BREAKING CHANGES

* `provideLazyMapsAPILoaderConfig` is gone. Please use the
`AgmCoreModule#forRoot` method instead.

* `LazyMapsAPILoaderConfig` is gone and is now a token named
`LAZY_MAPS_API_CONFIG`. Please use the `AgmCoreModule#forRoot` method instead.



<a name="0.15.0"></a>
# [0.15.0 urban-filly](https://github.com/SebastianM/angular2-google-maps/compare/0.14.0...0.15.0) (2016-09-15)


### Bug Fixes

* **LazyMapsAPILoader:** HTTP loading mode ([cb2c465](https://github.com/SebastianM/angular2-google-maps/commit/cb2c465)), closes [#655](https://github.com/SebastianM/angular2-google-maps/issues/655)
* **MapTypeStyle:** set attrs to optional ([c340ffd](https://github.com/SebastianM/angular2-google-maps/commit/c340ffd)), closes [#617](https://github.com/SebastianM/angular2-google-maps/issues/617)
* **SebmGoogleMapCircle:** removing circles ([fb402f3](https://github.com/SebastianM/angular2-google-maps/commit/fb402f3)), closes [#650](https://github.com/SebastianM/angular2-google-maps/issues/650) [#657](https://github.com/SebastianM/angular2-google-maps/issues/657)
* **SebmGoogleMapInfoWindow:** zIndex and maxWidth ([1bc2ed8](https://github.com/SebastianM/angular2-google-maps/commit/1bc2ed8)), closes [#651](https://github.com/SebastianM/angular2-google-maps/issues/651) [#656](https://github.com/SebastianM/angular2-google-maps/issues/656)


### Features

* support angular 2.0.0 ([8059b44](https://github.com/SebastianM/angular2-google-maps/commit/8059b44)), closes [#658](https://github.com/SebastianM/angular2-google-maps/issues/658) [#659](https://github.com/SebastianM/angular2-google-maps/issues/659)
* **SebmGoogleMap:** support mapTypeControl ([28ec00c](https://github.com/SebastianM/angular2-google-maps/commit/28ec00c)), closes [#612](https://github.com/SebastianM/angular2-google-maps/issues/612)



<a name="0.14.0"></a>
# [0.14.0 tundra-snow](https://github.com/SebastianM/angular2-google-maps/compare/0.13.0...0.14.0) (2016-09-02)


### Bug Fixes

* **core:** dont import full RxJS library ([84dfaaa](https://github.com/SebastianM/angular2-google-maps/commit/84dfaaa)), closes [#619](https://github.com/SebastianM/angular2-google-maps/issues/619)
* **SebmGoogleMapCircle:** circleDblClick output ([6224dc3](https://github.com/SebastianM/angular2-google-maps/commit/6224dc3)), closes [#582](https://github.com/SebastianM/angular2-google-maps/issues/582)


### Code Refactoring

* **core:** remove GOOGLE_MAPS_PROVIDERS ([1995d4a](https://github.com/SebastianM/angular2-google-maps/commit/1995d4a)), closes [#607](https://github.com/SebastianM/angular2-google-maps/issues/607)
* **core:** remove GOOGLE_MAPS_DIRECTIVES ([05544d5](https://github.com/SebastianM/angular2-google-maps/commit/05544d5)), closes [#608](https://github.com/SebastianM/angular2-google-maps/issues/608)


### Features

* Support for Angular 2 RC6 ([c50bc92](https://github.com/SebastianM/angular2-google-maps/commit/c50bc92)), closes [#604](https://github.com/SebastianM/angular2-google-maps/issues/604) [#613](https://github.com/SebastianM/angular2-google-maps/issues/613)
* **AgmCoreModule:** support loader config ([dba6a36](https://github.com/SebastianM/angular2-google-maps/commit/dba6a36)), closes [#609](https://github.com/SebastianM/angular2-google-maps/issues/609)


### BREAKING CHANGES

* core: previously deprecated GOOGLE_MAPS_DIRECTIVES
was removed. Please use AgmCoreModule instead.
* core: previously deprecated GOOGLE_MAPS_PROVIDERS
was removed. Please use AgmCoreModule instead.



<a name="0.13.0"></a>
# [0.13.0 onyx-piranha](https://github.com/SebastianM/angular2-google-maps/compare/0.12.0...0.13.0) (2016-08-15)


### Bug Fixes

* **SebmGoogleMap:** zoom listener ([b379c73](https://github.com/SebastianM/angular2-google-maps/commit/b379c73))
* **SebmGoogleMapMarker:** cleanup event listeners ([c20d005](https://github.com/SebastianM/angular2-google-maps/commit/c20d005))
* **SebmGoogleMapMarker:** set marker title ([9544a00](https://github.com/SebastianM/angular2-google-maps/commit/9544a00)), closes [#505](https://github.com/SebastianM/angular2-google-maps/issues/505)


### Features

* support angular 2.0.0-rc.5 ([43df74e](https://github.com/SebastianM/angular2-google-maps/commit/43df74e)), closes [#564](https://github.com/SebastianM/angular2-google-maps/issues/564)
* support [@NgModule](https://github.com/NgModule) ([1d0cd9c](https://github.com/SebastianM/angular2-google-maps/commit/1d0cd9c)), closes [#560](https://github.com/SebastianM/angular2-google-maps/issues/560) [#571](https://github.com/SebastianM/angular2-google-maps/issues/571)
* **MarkerManager:** set a visible option to marker. ([f8a6553](https://github.com/SebastianM/angular2-google-maps/commit/f8a6553)), closes [#524](https://github.com/SebastianM/angular2-google-maps/issues/524)
* **polylines:** add support for Polylines ([a0ba861](https://github.com/SebastianM/angular2-google-maps/commit/a0ba861)), closes [#554](https://github.com/SebastianM/angular2-google-maps/issues/554)
* **SebmGoogleMap:** support draggable map option ([836078a](https://github.com/SebastianM/angular2-google-maps/commit/836078a)), closes [#556](https://github.com/SebastianM/angular2-google-maps/issues/556)
* **SebmGoogleMap:** support fitBounds ([e913394](https://github.com/SebastianM/angular2-google-maps/commit/e913394)), closes [#283](https://github.com/SebastianM/angular2-google-maps/issues/283) [#492](https://github.com/SebastianM/angular2-google-maps/issues/492)
* **SebmGoogleMap:** support scaleControl option ([468a1a8](https://github.com/SebastianM/angular2-google-maps/commit/468a1a8)), closes [#502](https://github.com/SebastianM/angular2-google-maps/issues/502)
* **SebmGoogleMap:** support zoom_changed event ([df34d0e](https://github.com/SebastianM/angular2-google-maps/commit/df34d0e)), closes [#555](https://github.com/SebastianM/angular2-google-maps/issues/555)
* **SebmGoogleMapMarker:** support opacity ([8ed927b](https://github.com/SebastianM/angular2-google-maps/commit/8ed927b)), closes [#523](https://github.com/SebastianM/angular2-google-maps/issues/523) [#522](https://github.com/SebastianM/angular2-google-maps/issues/522)
* **SebmGoogleMapMarker:** support zIndex option ([75f37a6](https://github.com/SebastianM/angular2-google-maps/commit/75f37a6)), closes [#559](https://github.com/SebastianM/angular2-google-maps/issues/559) [#558](https://github.com/SebastianM/angular2-google-maps/issues/558)



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
