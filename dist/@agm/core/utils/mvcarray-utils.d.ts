import { Observable } from 'rxjs';
import { MapsEventListener, MVCArray } from '../services/google-maps-types';
export declare function createMVCEventObservable<T>(array: MVCArray<T>): Observable<MVCEvent<T>>;
export interface MVCEvent<T> {
    newArr: T[];
    evName: MvcEventType;
    index: number;
    previous?: T;
}
export declare type MvcEventType = 'insert_at' | 'remove_at' | 'set_at';
export declare class MvcArrayMock<T> implements MVCArray<T> {
    private vals;
    private listeners;
    clear(): void;
    getArray(): T[];
    getAt(i: number): T;
    getLength(): number;
    insertAt(i: number, elem: T): void;
    pop(): T;
    push(elem: T): number;
    removeAt(i: number): T;
    setAt(i: number, elem: T): void;
    forEach(callback: (elem: T, i: number) => void): void;
    addListener(eventName: string, handler: Function): MapsEventListener;
}
