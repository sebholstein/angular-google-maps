import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs';

import {AgmFusionTablesLayer} from './../directives/fusion-tables-layer';
import {FusionTablesLayerOptions, FusionTablesMouseEvent} from './../services/google-maps-types';
import {FusionTablesLayerManager} from './../services/managers/fusion-tables-layer-manager';

@Component({
  template:
      `<agm-fusion-tables-layer [options]="options" (layerClick)="layerClick($event)"></agm-fusion-tables-layer>`
})
class ParentComponent {
  @ViewChild(AgmFusionTablesLayer) fusionTablesLayer: AgmFusionTablesLayer;
  options: FusionTablesLayerOptions = {query: {from: 'fusionTableId'}};
  layerClick: any = jest.fn();
}

describe('AgmFusionTablesLayer', () => {
  let fixture: ComponentFixture<ParentComponent>;
  let comp: AgmFusionTablesLayer;
  let manager: FusionTablesLayerManager;
  let mockClick: (data: FusionTablesMouseEvent) => void;

  beforeEach(() => {
    TestBed
        .configureTestingModule({
          declarations: [ParentComponent, AgmFusionTablesLayer],
          providers: [{
            provide: FusionTablesLayerManager,
            useValue: {
              addFusionTablesLayer: jest.fn().mockReturnValue(Promise.resolve()),
              deleteFusionTablesLayer: jest.fn().mockReturnValue(Promise.resolve()),
              createEventObservable: jest.fn(
                  (eventName: string, layer: AgmFusionTablesLayer) => new Observable(obs => {
                    mockClick = data => obs.next(data);
                  })),
              updateFusionTablesLayerOptions: jest.fn().mockReturnValue(Promise.resolve()),
            }
          }]
        })
        .compileComponents();
    fixture = TestBed.createComponent(ParentComponent);
    comp = fixture.componentInstance.fusionTablesLayer;
    fixture.detectChanges();
    manager = TestBed.get(FusionTablesLayerManager);
  });

  describe('Creates a fusion tables layer', () => {
    it('should create a fusion table layer', () => {
      expect(comp).toBeTruthy();
      expect(manager.addFusionTablesLayer).toBeCalledWith(comp);
    });
    it('should have the expected options passed in', () => {
      expect(comp.options).toEqual({query: {from: 'fusionTableId'}});
    });
    it('should create click event listener', () => {
      expect(manager.createEventObservable).toBeCalledWith('click', comp);
    });
    it('should only add to manager once', () => {
      comp.ngOnInit();
      expect(manager.addFusionTablesLayer).toHaveBeenCalledTimes(1);
    });
  });

  describe('Deleting a fusion tables layer', () => {
    beforeEach(() => {
      comp.ngOnDestroy();
    });
    it('should delete the fusion table', () => {
      expect(manager.deleteFusionTablesLayer).toBeCalledWith(comp);
    });
  });

  describe('Updating inputs', () => {
    it('should update when options change', () => {
      fixture.componentInstance.options = {query: {from: 'updatedFusionTableId'}};
      fixture.detectChanges();
      expect(manager.updateFusionTablesLayerOptions).toBeCalledWith(comp, {
        query: {from: 'updatedFusionTableId'}
      });
    });
  });

  describe('Events', () => {
    it('should not emit click when not clicked', () => {
      expect(fixture.componentInstance.layerClick).toHaveBeenCalledTimes(0);
    });
    it('should output when layer is clicked', () => {
      mockClick({row: {columnName: 'Amount', value: '15'}});
      expect(fixture.componentInstance.layerClick).toBeCalledWith({
        row: {columnName: 'Amount', value: '15'}
      });
    });
  });
});
