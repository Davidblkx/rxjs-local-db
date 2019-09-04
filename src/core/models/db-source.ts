import { Store } from './store';
import { TableSource } from './table-source';

export type DatabaseSource = Store<TableSource<any>>;
