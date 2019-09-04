import { isConstructor } from '../guards/class';
import { Type } from '../models/type';

export interface TableEntityMetadata {
  $name: string;
  $pk: string;
  $getPK: () => string | number;
  $setPK: (id: string | number) => void;
}

/** Checks if is Table entity */
export function isTableEntity<T>(input: T | Type<T>): input is TableEntityMetadata & T {
  const instance = isConstructor(input) ? new input() : input;
  return (
    typeof instance === 'object'
    && instance !== null
    && typeof (<any>instance).$name === 'string'
    && typeof (<any>instance).$pk === 'string'
    && typeof (<any>instance).$getPK === 'function'
    && typeof (<any>instance).$setPK === 'function'
  );
}

/** returns metadata */
export function getTableEntityMetadata<T>(input: T | Type<T>): TableEntityMetadata & T {
  const instance = isConstructor(input) ? new input() : input;

  if (!isTableEntity(instance)) {
    throw new Error('Is not a table entity');
  } else {
    return instance;
  }
}
