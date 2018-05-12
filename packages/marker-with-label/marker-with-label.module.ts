import { NgModule } from '@angular/core';

import { AgmMarkerWithLabel } from './directives/marker-with-label';
import { AgmCoreModule } from '@agm/core';

@NgModule({
    imports: [AgmCoreModule],
    exports: [AgmMarkerWithLabel],
    declarations: [AgmMarkerWithLabel]
})
export class AgmMarkerWithLabelModule { }
