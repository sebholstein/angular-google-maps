// tslint:disable
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// tslint:enable

import {Component, Directive, ElementRef, NgZone} from '@angular/core';
import {AgmMap} from './map';
import {GoogleMapsAPIWrapper} from '../services/google-maps-api-wrapper';
import {FitBoundsService} from '../services/fit-bounds';
import { Subject } from 'rxjs';

@Injectable()
class MockElementRef {
  // constructor() { super(undefined); }
  nativeElement = {};
}
@Injectable()
class MockGoogleMapsAPIWrapper {
  createMap = jest.fn().mockReturnValue(Promise.resolve());
  clearInstanceListeners = jest.fn();
  subscribeToMapEvent = jest.fn().mockReturnValue(new Subject());
  getNativeMap = jest.fn().mockReturnValue(Promise.resolve({}));
}

@Injectable()
class MockFitBoundsService { }

describe('AgmMap', () => {
  let fixture: ComponentFixture<AgmMap>;
  let component: AgmMap;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AgmMap
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]});
    TestBed.overrideComponent(AgmMap, {
      set: {
        providers: [
          {provide: ElementRef, useClass: MockElementRef},
          {provide: GoogleMapsAPIWrapper, useClass: MockGoogleMapsAPIWrapper},
          {provide: FitBoundsService, useClass: MockFitBoundsService},
          // NgZone,
        ],
      }
    }).compileComponents();
    fixture = TestBed.createComponent(AgmMap);
    component = fixture.debugElement.componentInstance;
  }));

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should not enable controls when disableViewControls is true', () => {
    component.disableDefaultUI = true;
    fixture.detectChanges();
    const mockApiWrapper: MockGoogleMapsAPIWrapper = fixture.debugElement.injector.get(GoogleMapsAPIWrapper) as any;
    expect(mockApiWrapper.createMap.mock.calls[0][1].streetViewControl).not.toBe(true);
    expect(mockApiWrapper.createMap.mock.calls[0][1].zoomControl).not.toBe(true);
  });

});
