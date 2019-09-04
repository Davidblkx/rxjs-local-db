import { Type } from '../models/type';

export function isConstructor<T>(s: unknown): s is Type<T> {
  try {
    const data = new (<any>s)();
    return data ? true : false;
  } catch { return false; }
}
