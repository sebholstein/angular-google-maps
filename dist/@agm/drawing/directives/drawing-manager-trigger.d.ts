import { AgmMap } from '@agm/core';
import { AfterViewInit, OnDestroy } from '@angular/core';
import { AgmDrawingManager } from './drawing-manager';
export declare class AgmDrawingManagerTrigger implements AfterViewInit, OnDestroy {
    private _agmMap;
    /** The drawing manager to be attached to this trigger. */
    drawingManager: AgmDrawingManager;
    constructor(_agmMap: AgmMap);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
