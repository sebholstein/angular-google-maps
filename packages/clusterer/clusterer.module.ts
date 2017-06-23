import {NgModule} from '@angular/core';
import {AgmCoreModule} from '../core';
import {AgmMarkerCluster} from './directives/cluster';
import {ClusterManager} from './services/managers/cluster-manager';

@NgModule({
  imports: [AgmCoreModule],
  declarations: [AgmMarkerCluster],
  exports: [AgmMarkerCluster, AgmCoreModule],
  providers: [ClusterManager],
})
export class AgmClustererModule {
}
