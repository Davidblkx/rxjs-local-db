import { DatabaseSource } from '../core/models/db-source';

const STORAGE_NAME = '#RXJS_DB_';

export async function saveDatabase(db: DatabaseSource, name: string): Promise<void> {
  return new Promise(async (res, rej) => {
    const data = JSON.stringify(db);
    if (isBrowser()) {
      localStorage.setItem(STORAGE_NAME + name, data);
      res();
      return;
    } else if(isNode()) {
      const fs = await import('fs');
      fs.writeFile(name, data, {encoding: 'utf-8'}, (err: any) => {
        // tslint:disable-next-line: no-console
        if (err) { console.error(err); rej(err); return; }
        return res();
      });
    } else {
      rej('can not find runtime');
    }
  });
}

export async function loadDatabase(name: string): Promise<DatabaseSource> {
  try {
    if (isBrowser) {
      const data = localStorage.getItem(STORAGE_NAME + name);
      return data ? JSON.parse(data) : {};
    } else if(isNode()) {
      const data = await loadFromNode(name);
      return data ? JSON.parse(data) : {};
    } else {
      return {};
    }
  } catch(err) {
    // tslint:disable-next-line: no-console
    console.error(err);
    return {};
  }
}

async function loadFromNode(name: string): Promise<string> {
  return new Promise((res, rej) => {
    import('fs')
      .then(fs => {
        fs.readFile(name, {encoding: 'utf-8'}, (err, data) => {
          if (data) { res(data); } else { rej(err); }
        });
      });
  });
}

function isNode() {
  // @ts-ignore
  return  typeof process !== 'undefined' &&
  // @ts-ignore
    process.versions != null &&
  // @ts-ignore
    process.versions.node != null;
}

function isBrowser() {
  return typeof window !== 'undefined' &&
    typeof window.document !== 'undefined' &&
    typeof Storage !== 'undefined';
}
