import {NgZone} from '@angular/core';
import {TestBed, inject} from '@angular/core/testing';

import {AgmSearchBox} from './../../directives/search-box';
import {GoogleMapsAPIWrapper} from './../google-maps-api-wrapper';
import {ControlPosition} from './../google-maps-types';
import {SearchBoxManager} from './../managers/search-box-manager';

describe('SearchBoxManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: NgZone, useFactory: () => new NgZone({enableLongStackTrace: true})},
        SearchBoxManager, {
          provide: GoogleMapsAPIWrapper,
          useValue: jasmine.createSpyObj('GoogleMapsAPIWrapper', ['createMarker'])
        }
      ]
    });
  });

  describe('Create a new search box', () => {
    it('should call getSearchBoxEl and receive a valid instance',
      inject(
        [SearchBoxManager, GoogleMapsAPIWrapper],
        (searchBoxManager: SearchBoxManager, apiWrapper: GoogleMapsAPIWrapper) => {
          const searchBox = new AgmSearchBox(apiWrapper, searchBoxManager);
          searchBox.position = ControlPosition.TOP_LEFT;

          expect(searchBox.getSearchBoxEl).toBeDefined();

        }));
  });

});
