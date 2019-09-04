import { from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { DatabaseSource } from './core/models/db-source';
import { loadDatabase, saveDatabase } from './storage/storage';

export class Database {
  public readonly storage: DatabaseSource = {};

  constructor(
    storage: DatabaseSource,
    public readonly name = 'database.dbrxjs',
  ) {
    this.storage = storage;
  }

  public save() {
    return from(saveDatabase(this.storage, this.name));
  }

  public static fromStorage(name: string = 'database.dbrxjs'): Observable<Database> {
    return from(loadDatabase(name)).pipe(
      catchError(e => of(<DatabaseSource>{})),
      map(e => new Database(e, name)),
    );
  }
}
