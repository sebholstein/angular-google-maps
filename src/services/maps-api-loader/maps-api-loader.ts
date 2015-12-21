import {Injectable} from 'angular2/core';

@Injectable()
export abstract class MapsAPILoader {
  abstract load(): Promise<void>;
}
