# Marker Clusterer for AGM

-----

this package levereges the [@google/markerclustererplus][markerclustererplus] to add clustering support to
[AGM][agm].

## Installation

@agm/markerclusterer has a peer depedency on [markerclustererplus][markerclustererplus]

```shell
npm install @google/markerclustererplus @agm/markerclusterer --save
# or
yarn add @google/markerclustererplus @agm/markerclusterer
```

## Usage
1. Add assets command to your angular.json
    In your `angular.json` file, go to `projects/<yourproject>/architect/build/options/assets` and add the following line:
    ```json
    {"input": "./node_modules/@google/markerclustererplus/images", "glob": "*", "output": "/images"}
    ```

2. Import the module

    ```typescript
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { AppComponent } from './app.component';

    // add these imports
    import { AgmCoreModule } from '@agm/core';
    import { AgmMarkerClustererModule } from '@agm/markerclusterer';

    @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        AgmCoreModule.forRoot({
          apiKey: ['YOUR_API_KEY_HERE']
        }),
        AgmMarkerClustererModule
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
    ```
3. use it in your template

    ```html
    <agm-map style="height: 300px" [latitude]="51.673858" [longitude]="7.815982">
      <agm-marker-cluster imagePath="https://raw.githubusercontent.com/googlemaps/v3-utility-library/master/markerclustererplus/images/m">
        <agm-marker [latitude]="51.673858" [longitude]="7.815982">
        </agm-marker><!-- multiple markers -->
      </agm-marker-cluster>
    </agm-map>
    ```


[markerclustererplus]: https://github.com/googlemaps/v3-utility-library/tree/master/markerclustererplus
[agm]: https://angular-maps.com/
