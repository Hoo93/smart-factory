interface FactoryOption {
  primaryKey: PrimaryKeyOption;
}

interface PrimaryKeyOption {
  name: string;
  type: 'string' | 'number';
}
class Factory {
  private primaryIdSet: Set<any>;
  public tableName: string;

  constructor(tableName: string, createFunction: {}, config: FactoryOption) {
    if (config.primaryKey.type === 'string') {
      this.primaryIdSet = new Set<string>();
    } else if (config.primaryKey.type === 'number') {
      this.primaryIdSet = new Set<number>();
    } else {
      throw new Error('Invalid primary key type');
    }
    this.tableName = tableName;
  }
}
