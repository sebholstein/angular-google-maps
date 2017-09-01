# Marker Clusterer for AGM

-----

this package levereges the [js-marker-clusterer][js-marker-clusterer] to add clustering support to
[AGM][agm].

## Installation

@agm/js-marker-clusterer has a peer depedency on [js-marker-clusterer][js-marker-clusterer]

```shell
npm install js-marker-clusterer @agm/js-marker-clusterer --save
# or
yarn add js-marker-clusterer @agm/js-marker-clusterer
```

## Usage

1. Import the module

    ```typescript
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { AppComponent } from './app.component';

    // add these imports
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
2. use it in your template

    ```html
    <agm-map style="height: 300px" [latitude]="51.673858" [longitude]="7.815982">
      <agm-marker-cluster imagePath="https://raw.githubusercontent.com/googlemaps/v3-utility-library/master/markerclustererplus/images/m">
        <agm-marker [latitude]="51.673858" [longitude]="7.815982">
        </agm-marker><!-- multiple markers -->
      </agm-marker-cluster>
    </agm-map>
    ```


[js-marker-clusterer]: https://github.com/googlemaps/js-marker-clusterer
[agm]: https://angular-maps.com/
