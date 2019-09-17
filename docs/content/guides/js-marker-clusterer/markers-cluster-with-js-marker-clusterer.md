+++
date = "2017-08-31T13:51:15-05:00"
draft = false
title = "Markers cluster with Marker Clusterer – A Google Maps JavaScript API utility library"
+++

Angular Google Maps provides a package that allows you to use [Marker Clusterer](https://github.com/googlemaps/js-marker-clusterer) together with @agm/core. 'Marker Clustererc' allows you to create and manage per-zoom-level clusters for large amounts of markers.

## Install the needed packages
First make sure that you install the following NPM packages:

```bash
npm install @agm/core @agm/js-marker-clusterer js-marker-clusterer
```

Remember to add `--save` if you want npm to store the package in your packaje.json

Make sure you have a Google Maps API Key - [you can get one here](https://developers.google.com/maps/documentation/javascript/get-api-key?hl=de).

## Loading the modules

Update your root component (e.g. src/app/app.module.ts) and import the following modules:

```typescript
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: ['YOUR_API_KEY_HERE']
    }),
    AgmJsMarkerClustererModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Using the directive

When you import the `AgmJsMarkerClustererModule`, you can use the `agmMarkerCluster` directive  in your template. As you can note, you should use the `imagePath` attribute if you want an image appears behind the markers count in the cluster (js-marker-clusterer use 3 images, with different sizes, in the examplo, the library looks for `m1.png`, `m2.png` and `m3.png`, so adds the number and extension to the given `imagePath`)


```html
<agm-map style="height: 300px" [latitude]="51.673858" [longitude]="7.815982">
  <agm-marker-cluster [imagePath]="'https://googlemaps.github.io/js-marker-clusterer/images/m'">
    <agm-marker *ngFor="let marker of markers" [latitude]="marker.latitude" [longitude]="marker.longitude"></agm-marker>
  </agm-marker-cluster>
</agm-map>
```

### Specifying a custom calculator

If you want to control how the cluster style is calculated, you can pass in a `CalculateFunction` via `calculator`:

```html
<agm-map [latitude]="0" [longitude]="0">
  <agm-marker-cluster [calculator]="myCalculatorFn">
    <agm-marker *ngFor="let marker of markers" [latitude]="marker.latitude" [longitude]="marker.longitude"></agm-marker>
  </agm-marker-cluster>
</agm-map>
```
