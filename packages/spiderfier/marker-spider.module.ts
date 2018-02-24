import {NgModule} from '@angular/core';
import {AgmCoreModule} from '@agm/core';
import {AgmMarkerSpider} from './directives/marker-spider';

@NgModule({
  imports: [AgmCoreModule],
  declarations: [AgmMarkerSpider],
  exports: [AgmMarkerSpider]
})
export class AgmMarkerSpiderModule {
}
