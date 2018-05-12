# Marker with label for AGM

-----

this package levereges the [markerwithlabel][markerwithlabel] to add possibility to change marker's label style with css class in [AGM][agm].

## Installation

@agm/marker-with-label has a peer depedency on [markerwithlabel npm package][markerwithlabel npm package]

```shell
npm install markerwithlabel @agm/marker-with-label --save
# or
yarn add markerwithlabel @agm/marker-with-label
```

## Usage

1. Import the module

    ```typescript
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { AppComponent } from './app.component';

    // add these imports
    import { AgmCoreModule } from '@agm/core';
    import { AgmMarkerWithLabelModule } from '@agm/marker-with-label';

    @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        AgmCoreModule.forRoot({
          apiKey: ['YOUR_API_KEY_HERE']
        }),
        AgmMarkerWithLabelModule
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
    ```
2. use it in your template

    ```html
    <agm-map style="height: 300px" [latitude]="51.673858" [longitude]="7.815982">
      <agm-marker-with-label [latitude]="32.085299899999995" [longitude]="34.781767599999995"
        labelContent="Label marker" labelClass="marker-label-class"
        [labelInBackground]="true" [labelAnchor]="{x: 30, y: -9}"></agm-marker-with-label>
    </agm-map>
    ```


[markerwithlabel]: https://github.com/googlemaps/v3-utility-library/tree/master/markerwithlabel
[markerwithlabel npm package]:https://www.npmjs.com/package/markerwithlabel
[agm]: https://angular-maps.com/
