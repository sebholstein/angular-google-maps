# AGME - Angular Google Maps Extendable

Angular components for Google Maps. (Previously known as angular2-google-maps) Extended version this version uses the google maps @types files instead of custom class/interfaces allowing you to easily extend it with features that may not already exist. This version is probrably not needed for most people and adds features less commonly used.

## Playing with AGME (Angular Google Maps EXTENDED)

If you just want to play with AGM and don't want to set up a full project, you can use the following Plunker. It has all the dependencies to play with Angular, Typescript and of course `AGME`:

[&raquo; Play with Angular Google Maps on Stackblitz](https://stackblitz.com/edit/agm-exteneded-demo)

## Installation

`AGME` gets shipped via the Node Package Manager. So make sure that you have [NodeJS](https://nodejs.org) installed.
You can install the package with the following command:

```shell
npm install --save-dev @types/googlemaps

npm install --save @agme/core
```


## Extended

### added

- added getProjection to agmMap [Projection] can be listened to and will fire once when map is loaded and giving you the projection
- added HeatmapLayer and Manager for the first visualization (not yet added fusionHeatMap)

### TODO

- Fusion
- other visualizations
- set projection
- expand Marker with all options from google maps
- add headings
- what ever else I need in the future
