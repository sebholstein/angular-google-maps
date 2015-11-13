import {Injectable} from 'angular2/angular2';

@Injectable()
export abstract class MapsAPILoader {
  abstract load(): Promise<void>;
}
