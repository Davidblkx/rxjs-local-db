/**
 * Add METADATA to allow it to be stored
 * @param name name of entity
 * @param pk primary key, id as default
 */
export function TableEntity(name: string, pk = 'id') {
  return <T extends {new(...args: any[]): {}}>(constructor: T) => {
    return class extends constructor {
      public $name = name;
      public $pk = pk;

      constructor(...args: any[]) {
        super();
        const input = args[0];
        if (input && typeof input === 'object') {
          for (const [k, v] of Object.entries(input)) {
            (<any>this)[k] = v;
          }
        }
      }

      public $getPK() { return (<any>this)[this.$pk]; }
      public $setPK(id: string | number) { (<any>this)[this.$pk] = id; }
     };
  };
}
