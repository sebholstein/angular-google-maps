# Marker Spider for AGM

-----

This package leverages the [ts-overlapping-marker-spiderfier][ts-overlapping-marker-spiderfier] package
to add spiderfy support to [AGM][agm].

## Installation

@agm/js-marker-spider has a peer depedency on [ts-overlapping-marker-spiderfier@1.0.2][ts-overlapping-marker-spiderfier]

```shell
npm install ts-overlapping-marker-spiderfier@1.0.2 @agm/js-marker-spider --save
# or
yarn add ts-overlapping-marker-spiderfier@1.0.2 @agm/js-marker-spider
```

## Usage

1. Import the module

    ```typescript
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { AppComponent } from './app.component';

    // add these imports
    import { AgmCoreModule } from '@agm/core';
    import { AgmMarkerSpiderModule } from '@agm/js-marker-spider';

    @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        AgmCoreModule.forRoot({
          apiKey: ['YOUR_API_KEY_HERE']
        }),
        AgmMarkerSpiderModule
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
    ```
2. use it in your template

    ```html
    <agm-map style="height: 300px" [latitude]="51.673858" [longitude]="7.815982">
      <agm-marker-spider>
        <agm-marker [latitude]="51.673858" [longitude]="7.815982">
        </agm-marker><!-- multiple markers -->
      </agm-marker-spider>
    </agm-map>
    ```


[ts-overlapping-marker-spiderfier]: https://www.npmjs.com/package/ts-overlapping-marker-spiderfier
[agm]: https://angular-maps.com/
