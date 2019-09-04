// tslint:disable-next-line: callable-types
export interface Type<T> extends Function { new (...args: any[]): T; }
