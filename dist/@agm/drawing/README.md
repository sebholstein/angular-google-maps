# Map Drawing for AGM

-----

this package adds drawing support to [AGM][agm].

## Installation

```sh
npm install @agm/drawing
# or
yarn add @agm/drawing
```

## Usage

1. Import the module

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component
// add these imports
import { AgmCoreModule } from '@agm/core';
import { AgmDrawingModule } from '@agm/drawing
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
2. use it in your template

```html
<agm-map style="height: 300px" [latitude]="51.673858" [longitude]="7.815982" [agmDrawingManager]="drawing">
</agm-map>
<agm-drawing-manager #drawing="agmDrawingManager" [drawingMode]="'circle'" [circleOptions]="{fillColor:'red', radius: 150}"></agm-drawing-manager>
```


[drawing-manager]: https://developers.google.com/maps/documentation/javascript/reference/#drawing
[agm]: https://angular-maps.com/
