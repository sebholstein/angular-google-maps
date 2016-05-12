import {Injectable} from '@angular/core';

@Injectable()
export abstract class MapsAPILoader {
  abstract load(): Promise<void>;
}
