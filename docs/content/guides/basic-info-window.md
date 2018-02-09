+++
date = "2017-11-15T15:05:00-07:00"
draft = false
title = "Basic Info Windows"

+++

## Adding an Info Window to a Map Marker

By making a `<agm-info-window>` a child element of an `<agm-marker>`, AGM will automatically make sure that clicking the marker will open the info window.
For example:

```html
<agm-map [latitude]="59.326242" [longitude]="17.8419719" >
  <agm-marker [latitude]="59.326242" [longitude]="17.8419719">
    <agm-info-window>Börk</agm-info-window>
  </agm-marker>
</agm-map>
```