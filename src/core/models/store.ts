export interface Store<T> {
  [key: string]: T | undefined;
}
