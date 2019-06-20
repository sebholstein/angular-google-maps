+++
date = "2018-09-22T09:31:00-01:00"
draft = false
title = "Support auto fit bounds for custom components"

+++

Angular Google Maps (AGM) has an auto fit bounds feature, that adds all containing components to the bounds of the map:

```html
<agm-map [fitBounds]="true">
  <agm-marker [agmFitBounds]="true"></agm-marker>
</agm-map>
```

Let`s say we have a custom component, that extends the features of AGM:


```html
<agm-map [fitBounds]="true">
  <my-custom-component></my-custom-component>
</agm-map>
```

To add support the auto fit bounds feature for `<my-custom-component>`, we have to implement the `FitBoundsAccessor`:

```typescript
import { FitBoundsAccessor, FitBoundsDetails } from '@agm/core';
import { forwardRef, Component } from '@angular/core';

@Component({
  selector: 'my-custom-component',
  template: '',
  providers: [
    {provide: FitBoundsAccessor, useExisting: forwardRef(() => MyCustomComponent)}
  ],
})
export class MyCustomComponent implements FitBoundsAccessor {
  **
  * This is a method you need to implement with your custom logic.
  */
  getFitBoundsDetails$(): Observable<FitBoundsDetails> {
    return ...;
  }
}
```

The last step is to change your template. Add the `agmFitBounds` input/directive and set the value to true:

```html
<agm-map [fitBounds]="true">
  <my-custom-component [agmFitBounds]="true"></my-custom-component>
</agm-map>
```