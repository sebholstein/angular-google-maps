import { Marker } from '@agm/core/services/google-maps-types';

export interface MarkerWithLabel extends Marker{
    setOptions(options: any): void;
}
