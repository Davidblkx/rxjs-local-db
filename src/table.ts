import uuid from 'uuid/v4';

import { getTableEntityMetadata } from './core/decorator/table-entity-metadata';
import { Type } from './core/models/type';
import { Database } from './database';

export class Table<T> {
  public readonly type: Type<T>;
  public readonly name: string;

  public get source() {
    return this._db.storage[this.name];
  }

  constructor(
    type: Type<T>,
    name: string,
    protected _db: Database,
  ) {
    this.type = type;
    this.name = name;
  }

  public getById(id: string): T | undefined {
    const obj = this._db.storage[this.name];
    return obj && obj[id];
  }

  public getAll() {
    const table = this._db.storage[this.name];
    const res: T[] = [];
    for (const v of Object.values(table || {})) {
      if (v) { res.push(v); }
    }
    return res;
  }

  public insert(item: T) {
    const table = this._db.storage[this.name] || {};
    const mItem = getTableEntityMetadata(item);
    if (!mItem.$getPK()) {
      mItem.$setPK(uuid());
    }
    table[mItem.$getPK()] = mItem;
    this._db.storage[this.name] = table;
  }

  public delete(id: string): void;
  public delete(item: T): void;
  public delete(itemOrId: T | string) {
    const id = typeof itemOrId !== 'string' ?
      getTableEntityMetadata(itemOrId).$getPK() : itemOrId;
    const table = this._db.storage[this.name] || {};
    delete table[id.toString()];
    this._db.storage[this.name] = table;
  }
}
