---
title: SebmGoogleMap
description: SebMGoogleMap renders a Google Map.
type: apidetails
categories: components_directives
---

### CSS Selector

```css
sebm-google-map
```

### Usage

```typescript
import {SebmGoogleMap} from 'angular2-google-maps/core';
```

```html
<sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom" (mapClick)="mapClicked($event)">
</sebm-google-map>
```

### Bindings

| HTML Attribute Name    | Type    | Required | Default | Description                                       |
|------------------------|---------|----------|---------|---------------------------------------------------|
| latitude               | number  | yes      | `0`     | The latitude for the center of the map            |
| longitude              | number  | yes      | `0`     | The longitude for the center of the map           |
| zoom                   | number  | no       | `8`     | The initial zoom level of the map                 |
| disableDoubleClickZoom | boolean | no       | `false` | Enables/disables zoom and center on double click. |

### Events

| Event name    | Arguments                       | Description                                                                                                                         |
|---------------|---------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| mapClick      | [MapMouseEvent](#MapMouseEvent) | Gets emitted when the user clicks on the map                                                                                        |
| mapRightClick | [MapMouseEvent](#MapMouseEvent) | Gets emitted when the user uses a right click on the map.                                                                           |
| mapDblClick   | [MapMouseEvent](#MapMouseEvent) | Gets emitted when the user double-clicks on the map.  Note that the `mapClick` event emitter will also fire, right before this one. |

### Event Interfaces

#### MapMouseEvent <a name="mapClickEvent"></a>
```typescript
interface MapMouseEvent {
  coords: LatLngLiteral // { lat: number, lng: number }
}; 
```
