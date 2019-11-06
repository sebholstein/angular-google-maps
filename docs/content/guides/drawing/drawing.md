+++
date = "2017-08-31T13:51:15-05:00"
draft = false
title = "google.maps.drawing.DrawingManager in AGM"
+++

Angular Google Maps provides a package that allows users to draw new shapes on the map, integrating google.maps.drawing.DrawingManager

## Install the needed packages
First make sure that you install the following NPM packages:

```bash
npm install @agm/core @agm/drawing
```

## Loading the modules

Update your root component (e.g. src/app/app.module.ts) and import the following modules:

```typescript
import { AgmCoreModule } from '@agm/core';
import { AgmDrawingModule } from '@agm/drawing';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: ['YOUR_API_KEY_HERE']
    }),
    AgmDrawingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Using the directive

When you import the `AgmDrawingManager`, you can use the `agm-drawing-manager` directive  in your
template. Agm-drawing-manager takes form of an html elements outside the `agm-map` component, where
it is configured with properties. It is connected to the map via `agmDrawingManager` trigger
directive, similar to MatAutocomplete from angular/components library.

```html
<agm-map style="height: 300px" [latitude]="51.673858" [longitude]="7.815982" [agmDrawingManager]="drawing">
</agm-map>
<agm-drawing-manager #drawing="agmDrawingManager" (circleComplete)="circleAdded($event)" [drawingMode]="'circle'" [circleOptions]="{fillColor:'red', radius: 150}"></agm-drawing-manager>
```

### Customizing drawn figures

If you want to control how the figures the user draws will look like, specifically colors,
line thickness, opacity, et cetera, you can provide CircleOptions or PolylineOptions
to the drawing manager, similar how you would do in vanilla javascript with Google Maps javascript.

### Ignored properties

These \*Options interfaces are originally made for the developer displaying the shapes, so they have
properties useless to us such as `map` and `center`. These properties are ignored.
