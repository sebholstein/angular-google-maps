[![AGM - Angular Google Maps](assets/images/angular-google-maps-logo.png)](https://angular-maps.com/)

# AGM - Angular Google Maps Extensible

Angular components for Google Maps. (Previously known as angular2-google-maps) extensible version this version uses the google maps @types files instead of custom class/interfaces allowing you to easily extend it with features that may not already exist.

## Packages

This project is a mono repo and hosts extensible variants of multiple packages:

| Package                               | Downloads                                                                                                                                         |
|---------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| @agm/core                             | [![@agm/core](https://img.shields.io/npm/dm/@agm/core.svg)](https://www.npmjs.com/package/@agm/core)                                              |
| @agm/snazzy-info-window               | [![@agm/snazzy-info-window](https://img.shields.io/npm/dm/@agm/snazzy-info-window.svg)](https://www.npmjs.com/package/@agm/snazzy-info-window)    |
| @agm/js-marker-clusterer              | [![@agm/js-marker-clusterer](https://img.shields.io/npm/dm/@agm/js-marker-clusterer.svg)](https://www.npmjs.com/package/@agm/js-marker-clusterer) |
---

## Playing with AGM (Angular Google Maps)

If you just want to play with AGM and don't want to set up a full project, you can use the following Plunker. It has all the dependencies to play with Angular, Typescript and of course `AGM`:

[&raquo; Play with Angular Google Maps on Stackblitz](https://stackblitz.com/edit/angular-google-maps-demo)

## Installation

`AGM` gets shipped via the Node Package Manager. So make sure that you have [NodeJS](https://nodejs.org) installed.
You can install the package with the following command:

```shell
npm install @types/googlemaps

npm install @agme/core
```

You should also checkout the [Getting started](https://angular-maps.com/guides/getting-started/) guide for further information.

## Extending

```shell
//extend map
import { Component, OnInit, ElementRef } from '@angular/core';
import {  GoogleMapsAPIWrapperExtendedService } from './GoogleMapsAPIWrapperExtendedService'; // you will need to make this
import {
  MarkerManager,
  InfoWindowManager,
  CircleManager,
  PolylineManager,
  PolygonManager,
  KmlLayerManager,
  DataLayerManager
} from '@agme/core';
import { AgmMap } from '@agme/core';

@Component({
  selector: 'sp-extended-map',
  providers: [
    GoogleMapsAPIWrapperExtendedService,
    MarkerManager,
    InfoWindowManager,
    CircleManager,
    PolylineManager,
    PolygonManager,
    KmlLayerManager,
    DataLayerManager
  ],
  styles: [
    `
      .agm-map-container-inner {
        width: inherit;
        height: inherit;
      }
      .agm-map-content {
        display: none;
      }
    `
  ],
  template: `
    <div class='agm-map-container-inner sebm-google-map-container-inner'></div>
    <div class='agm-map-content'>
      <ng-content></ng-content>
    </div>
  `
})
export class ExtendedmapComponent extends AgmMap
  implements OnInit {

    constructor(  _elem: ElementRef,  _mapsWrapper: GoogleMapsAPIWrapper) {super(_elem, _mapsWrapper); }
  ngOnInit() {
    super.ngOnInit();
  }
}

//extended api wrapper
import { Injectable, NgZone } from '@angular/core';
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agme/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsAPIWrapperExtendedService extends GoogleMapsAPIWrapper {

  constructor(_loader: MapsAPILoader, _zone: NgZone) {
    super(_loader, _zone);
  }
}

```
you can now add custom functions and so forth.

## Contributions

Please see the [contribution guidelines](CONTRIBUTING.md) for more details.
