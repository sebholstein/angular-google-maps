import {NgModule} from '@angular/core';
import {AgmAutocompleteDirective} from '@agm/places/directives/autocomplete';
import {AgmCoreModule} from '@agm/core';

/**
 * @internal
 */
export function placesDirectives() {
  return [
    AgmAutocompleteDirective
  ];
}

@NgModule({
  imports: [AgmCoreModule],
  declarations: placesDirectives(),
  exports: placesDirectives()
})
export class AgmPlacesModule {}
