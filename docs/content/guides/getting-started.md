+++
date = "2017-05-04T20:11:15+02:00"
draft = false
title = "Getting started with Angular Google Maps (AGM)"

+++

## Playing with Angular Google Maps (AGM)

If you just want to play with AGM and don't want to set up a full project with NPM, you can use the following Stackblitz. It has all the dependencies to play with Angular, Typescript and of course `angular-google-maps`:


<a href="https://stackblitz.com/edit/angular-google-maps-demo" target="_blank" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
  Play with AGM on Stackblitz.io
</a>

## Getting started guide video

There's also a really great video tutorial that follows exactly this guide. So if you prefer videos, we recommend watching this tutorial:

[![Google Maps & Angular | ANGULAR SNIPPETS](http://img.youtube.com/vi/lApggVS0icc/0.jpg)](http://www.youtube.com/watch?v=lApggVS0icc "")

## Setting up a basic project structure

**If you're familiar with setting up Angular 2 projects with Angular CLI & TypeScript, you can skip this part and move on to this part:**

<a href="#setting-up-angular-google-maps" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
  Setting up Angular Google Maps
</a>


### Create an Angular CLI project

We start by creating a project with [Angular CLI](https://cli.angular.io/). Angular CLI makes it easy to create an application that already works and allows you to follow the best practices. I you haven't installed Angular CLI yet, please run the following command first:

```bash
npm install -g @angular/cli
```

Run the following commands to create a new Angular project with Angular CLI:

```bash
ng new my-maps-project
cd my-maps-project
```

## Setting up Angular Google Maps

### Install Angular Google Maps

`Angular Google Maps (short name: AGM)` gets shipped via the Node Package Manager (NPM). Run the following command to add it to your new project:

```bash
npm install @agm/core --save
```

### Setup @NgModule

Open `src/app/app.module.ts` and import the `AgmCoreModule`.  
**You neeed to provide a Google Maps API key to be able to see a Map. Get an API key [here](https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key).**

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_KEY'
    })
  ],
  providers: [],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
```

### Extending the app component
Angular CLI already created an app component the we'll now use to create our first google map.  
Open the file `src/app/app.component.ts` and modify it like below:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;
}
```

### Setup the template
Open the file `src/app/app.component.html` and paste the following content:

```html
<h1>{{ title }}</h1>

<!-- this creates a google map on the page with the given lat/lng from -->
<!-- the component as the initial center of the map: -->
<agm-map [latitude]="lat" [longitude]="lng">
  <agm-marker [latitude]="lat" [longitude]="lng"></agm-marker>
</agm-map>
```

### Setup the CSS file
Open the file `src/app/app.component.css` and paste the following content:

```css
agm-map {
  height: 300px;
}
```

<div class="note note-red">
  <h4 class="note-title">CSS styling is required!</h4>
  <div class="note-body">It is really important that you define a height component `agm-map`. Otherwise, you won't see a map on the page!</div>
</div>

## Build and run your application

Great! So we have created all the needed source files, so everything should be ready to build an run the application.

Run the following command in the **project root folder**:

```bash
ng serve
```

Then, open the following URL in your browser: <a href="http://localhost:4200/" target="_blank">http://localhost:4200/</a>

The command starts the following things:
* Starts the TypeScript compiler and compiles all sources files (watches also for file changes in the source files and recompiles all files if something has changed)
* Starts a local web server to serve the Angular application. It refreshes the page when served files change.

**When everything works as expected, you should see your first Google Map created with AGM 🎉🎉🎉!**

## Questions?

When you have problems setting up **Angular Google Maps (AGM)** or questions in general, the best way is to join the chat where you find nice people from the community that can answer you questions:

<a href="https://discord.gg/XAr2ACE" target="_blank" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
  Chat on Discord
</a>
