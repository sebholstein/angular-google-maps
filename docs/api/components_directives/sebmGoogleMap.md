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
<sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
</sebm-google-map>
```

### Bindings

| HTML Attribute Name | Type   | Required | Default | Description                             |
|---------------------|--------|----------|---------|-----------------------------------------|
| latitude            | number | yes      | 0       | The latitude for the center of the map  |
| longitude           | number | yes      | 0       | The longitude for the center of the map |
| zoom                | number | no       | 8       | The initial zoom level of the map       |

### Events

None