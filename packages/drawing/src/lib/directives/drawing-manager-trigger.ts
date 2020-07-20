import { AgmMap } from '@agm/core';
import { AfterViewInit, Directive, Host, Input, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';
import { AgmDrawingManager } from './drawing-manager';

@Directive({
  selector: 'agm-map[agmDrawingManager]',
  exportAs: 'matDrawingManagerTrigger',
})
export class AgmDrawingManagerTrigger implements AfterViewInit, OnDestroy{

  /** The drawing manager to be attached to this trigger. */
  // tslint:disable-next-line: no-input-rename
  @Input('agmDrawingManager') drawingManager: AgmDrawingManager;

  constructor(@Host() private _agmMap: AgmMap) {
  }

  ngAfterViewInit(): void {
    this._agmMap.mapReady.pipe(first()).subscribe(map => this.drawingManager.setMap(map));
  }

  ngOnDestroy() {
    this._agmMap.mapReady.pipe(first()).subscribe(() => this.drawingManager.setMap(null));
  }
}
