---
title: SebmGoogleMapMarker
description: SebMGoogleMapMarker renders a Google map marker.
type: apidetails
categories: components_directives
---

### CSS Selector

```css
sebm-google-map-marker
```

### Usage

```typescript
import {SebmGoogleMap, SebmGoogleMapMarker} from 'angular2_google_maps/angular2_google_maps';
```

```html
<sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
  <sebm-google-map-marker [latitude]="lat" [longitude]="lng" [title]="title" [label]="label"></sebm-google-map-marker>
</sebm-google-map>
```

### Bindings

| Attribute | Type   | Required | Default | Description                                                                                                                                                             |
|-----------|--------|----------|---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| latitude  | number | yes      |         | The latitude position of the marker                                                                                                                                     |
| longitude | number | yes      |         | The longitude position of the marker                                                                                                                                    |
| title     | string | no       |         | The title of the marker (similar to the HTML title attribute). Shows the title when the user hovers over the marker.                                                    |
| label     | string | no       |         | Show a single character instead of a dot in the marker graphic. See [this example](https://developers.google.com/maps/documentation/javascript/examples/marker-labels). |

### Events

| Event name  | Description                                               |
|-------------|-----------------------------------------------------------|
| markerClick | Gets triggered when the user clicks the marker on the map |
