import { NgModule, ModuleWithProviders } from '@angular/core';
import { AgmDirection } from './agm-direction.directive';

@NgModule({
  declarations: [
    AgmDirection,
  ],
  exports: [
    AgmDirection,
  ]
})
export class AgmDirectionModule {
  public static forRoot(): ModuleWithProviders<AgmDirectionModule> {
    return {
      ngModule: AgmDirectionModule,
    };
  }

  public static forChild(): ModuleWithProviders<AgmDirectionModule> {
    return {
      ngModule: AgmDirectionModule,
    };
  }
}
