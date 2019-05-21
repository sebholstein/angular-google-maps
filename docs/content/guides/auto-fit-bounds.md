+++
date = "2018-09-22T09:31:00-01:00"
draft = false
title = "Enable auto fit bounds"

+++

Angular Google Maps (AGM) has an auto fit bounds feature, that adds all containing components to the bounds of the map. 
To enable it, set the `fitBounds` input of `agm-map` to `true` and add the `agmFitBounds` input/directive to `true` for all components
you want to include in the bounds of the map.

```html
<agm-map [fitBounds]="true">
  <agm-marker [agmFitBounds]="true"></agm-marker>

  <!-- not included -->
  <agm-marker [agmFitBounds]="false"></agm-marker>
</agm-map>
```