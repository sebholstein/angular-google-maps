+++
date = "2018-07-05T15:05:00+02:00"
draft = false
title = "Circles"

+++

## Adding a Circle to the Map

The `<agm-circle>` element will place a circle on the map.
Here's an example:

```html
<agm-map [latitude]="59.326242" [longitude]="17.8419719" >
  <agm-circle 
    [latitude]="59.326242" 
    [longitude]="17.8419719" 
    [radius]="5000" 
    [fillColor]="'red'" 
    [circleDraggable]="true" 
    [editable]="true">
  </agm-circle>
</agm-map>
```

To see an exhaustive list of all availabble properties see the [API DOCS](https://angular-maps.com/api-docs/agm-core/directives/AgmCircle.html).