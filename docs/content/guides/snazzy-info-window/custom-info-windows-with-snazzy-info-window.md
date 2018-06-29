+++
date = "2017-06-20T20:11:15+02:00"
draft = false
title = "Styled Info Windows with Snazzy Info Window & Angular Google Maps"
+++

Angular Google Maps provides a package that allows you to use [Snazzy Info Window](https://github.com/atmist/snazzy-info-window) together with @agm/core. 'Snazzy Info Window' allows you to create custom info window that are styleable via CSS or Angular inputs.

Please note: The @agm/snazzy-info-window package currently supports Angular 4.x only.

## Install the needed packages
First make sure that you install the following NPM packages:

```bash
npm install @agm/core @agm/snazzy-info-window snazzy-info-window@^1.1.0
```

Make sure you have a Google Maps API Key - [you can get one here](https://developers.google.com/maps/documentation/javascript/get-api-key?hl=de).

## Loading the modules

Update your root component (e.g. src/app/app.module.ts) and import the following modules:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// add these imports
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: ['YOUR_API_KEY_HERE']
    }),
    AgmSnazzyInfoWindowModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Load the CSS file

There are some basic style that get shipped with the `snazzy-info-window` NPM package. The CSS file is located here:

```
node_modules/snazzy-info-window/dist/snazzy-info-window.css
```

If you are using Angular CLI, you can simply add this file to your `.angular-cli.json` file like this:

```json
"styles": [
  "styles.css",
  "../node_modules/snazzy-info-window/dist/snazzy-info-window.css"
]
```

## Using the directive with a marker (AgmMarker)

When you import the `AgmSnazzyInfoWindowModule`, you can use the `agmSnazzyInfoWindow` directive  in your template.


```html
<agm-map style="height: 300px" [latitude]="51.673858" [longitude]="7.815982">
  <agm-marker [latitude]="51.673858" [longitude]="7.815982">
    <agm-snazzy-info-window [maxWidth]="200" [closeWhenOthersOpen]="true">
      <ng-template>
        My first Snazzy Info Window!
      </ng-template>
    </agm-snazzy-info-window>
  </agm-marker>
</agm-map>
```

This creates a basic styled info window that opens when the user clicks on the marker and closes when another snazzy info window opens.

## Using the directive as a standalone info window


```html
<agm-map style="height: 300px" [latitude]="51.673858" [longitude]="7.815982">
  <agm-snazzy-info-window [isOpen]="true" [latitude]="51.673858" [longitude]="7.815982" [closeWhenOthersOpen]="true">
    <ng-template>
      My first Snazzy Info Window!
    </ng-template>
  </agm-snazzy-info-window>
</agm-map>
```

## Styling
There a two ways to style the snazzy info window:
1. Via CSS - [simply use these CSS classes shown in this HTML](https://github.com/atmist/snazzy-info-window#html-structure)
1. Via Angular inputs

### Styling via Angular Inputs

There a several inputs that you can use for styling. [Check out the docs of the `agmSnazzyInfoWindow` directive here](https://angular-maps.com/api-docs/agm-snazzy-info-window/components/AgmSnazzyInfoWindow.html). 
