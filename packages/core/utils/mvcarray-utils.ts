import { fromEventPattern, Observable } from 'rxjs';
import { MapsEventListener, MVCArray } from '../services/google-maps-types';

export function createMVCEventObservable<T>(array: MVCArray<T>): Observable<MVCEvent<T>>{
  const eventNames = ['insert_at', 'remove_at', 'set_at'];
  return fromEventPattern(
    (handler: Function) => eventNames.map(evName => array.addListener(evName,
      (index: number, previous?: T) => handler.apply(array, [ {'newArr': array.getArray(), evName, index, previous} as MVCEvent<T>]))),
    (_handler: Function, evListeners: MapsEventListener[]) => evListeners.forEach(evListener => evListener.remove()));
}

export interface MVCEvent<T> {
  newArr: T[];
  evName: MvcEventType;
  index: number;
  previous?: T;
}

export type MvcEventType = 'insert_at' | 'remove_at' | 'set_at';

export class MvcArrayMock<T> implements MVCArray<T> {
  private vals: T[] = [];
  private listeners: {
    'remove_at': Function[];
    'insert_at': Function[];
    'set_at': Function[];
    [key: string]: Function[];
  } = {
    'remove_at': [] as Function[],
    'insert_at': [] as Function[],
    'set_at': [] as Function[],
  };
  clear(): void {
    for (let i = this.vals.length - 1; i >= 0; i--) {
        this.removeAt(i);
    }
  }
  getArray(): T[] {
    return [...this.vals];
  }
  getAt(i: number): T {
    return this.vals[i];
  }
  getLength(): number {
    return this.vals.length;
  }
  insertAt(i: number, elem: T): void {
    this.vals.splice(i, 0, elem);
    this.listeners.insert_at.map(listener => listener(i));
  }
  pop(): T {
    const deleted = this.vals.pop();
    this.listeners.remove_at.map(listener => listener(this.vals.length, deleted));
    return deleted;
  }
  push(elem: T): number {
    this.vals.push(elem);
    this.listeners.insert_at.map(listener => listener(this.vals.length - 1));
    return this.vals.length;
  }
  removeAt(i: number): T {
    const deleted = this.vals.splice(i, 1)[0];
    this.listeners.remove_at.map(listener => listener(i, deleted));
    return deleted;
  }
  setAt(i: number, elem: T): void {
    const deleted = this.vals[i];
    this.vals[i] = elem;
    this.listeners.set_at.map(listener => listener(i, deleted));
  }
  forEach(callback: (elem: T, i: number) => void): void {
    this.vals.forEach(callback);
  }
  addListener(eventName: string, handler: Function): MapsEventListener {
    const listenerArr = this.listeners[eventName];
    listenerArr.push(handler);
    return {
        remove: () => {
            listenerArr.splice(listenerArr.indexOf(handler), 1);
        },
    };
  }
}
