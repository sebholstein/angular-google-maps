# Agm-Direction

[![npm version](https://badge.fury.io/js/agm-direction.svg)](https://badge.fury.io/js/agm-direction)
[![npm](https://img.shields.io/npm/dm/localeval.svg)](https://github.com/explooosion/Agm-Direction)
[![Build Status](https://travis-ci.org/explooosion/Agm-Direction.svg?branch=master)](https://travis-ci.org/explooosion/Agm-Direction)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)


[Agm-Direction](https://github.com/explooosion/Agm-Direction) is the directive for [@agm/core](https://github.com/SebastianM/angular-google-maps) (not official)

- Angular
- Google Map API

How to use?  
👉 [Start Reading](https://robby570.tw/Agm-Direction-Docs/)
👉 [Build With Ionic](https://github.com/explooosion/ionic-agm-direction-example)


![Agm-Direction](https://i.imgur.com/DCIoXqS.jpg)

## Credit

#### [SebastianM/angular-google-maps](https://github.com/SebastianM/angular-google-maps) - [Directions service #495](https://github.com/SebastianM/angular-google-maps/issues/495)

## Installation

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

- Use npm
  ```bash
  npm install --save @agm/core agm-direction
  ```

- Use yarn
  ```bash
  yarn add @agm/core agm-direction
  ```

## Importing Modules

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';            // @agm/core
import { AgmDirectionModule } from 'agm-direction';   // agm-direction

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({ // @agm/core
      apiKey: 'your key',
    }),
    AgmDirectionModule,     // agm-direction
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Usage

HTML

```html
<agm-map [latitude]="lat" [longitude]="lng">
  <agm-direction 
    [origin]="origin" 
    [destination]="destination"
  >
  </agm-direction>
</agm-map>
```

CSS

```css
agm-map {
    height: 400px;
}
```

TS

```typescript
public lat = 24.799448;
public lng = 120.979021;

public origin: any;
public destination: any;

ngOnInit() {
  this.getDirection();
}

getDirection() {
  this.origin = { lat: 24.799448, lng: 120.979021 };
  this.destination = { lat: 24.799524, lng: 120.975017 };

  // Location within a string
  // this.origin = 'Taipei Main Station';
  // this.destination = 'Taiwan Presidential Office';
}
```

## Document
- Document [Agm-Direction-Docs](https://robby570.tw/Agm-Direction-Docs/)
- Less useful [AgmDirectionModule](https://robby570.tw/Agm-Direction/)

## Development

👉 [Playground Project](https://github.com/explooosion/Agm-Direction/tree/master/playground)

```bash
git clone https://github.com/explooosion/Agm-Direction.git
```

## Generator
This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.0.

## Code scaffolding

Run `ng generate component component-name --project agm-direction` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project agm-direction`.
> Note: Don't forget to add `--project agm-direction` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build agm-direction` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build agm-direction`, go to the dist folder `cd dist/agm-direction` and run `npm publish`.

## Running unit tests

Run `ng test agm-direction` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## License

[MIT](http://opensource.org/licenses/MIT)
