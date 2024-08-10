import { FactoryOption, InstanceGeneratorFunction } from './types';

export class Factory<T> {
  private primaryIdSet: Set<any>;
  public tableName: string;
  public instanceGenerator;

  constructor(tableName: string, instanceGenerator: InstanceGeneratorFunction<T>, config: FactoryOption) {
    if (config.primaryKey.type === 'string') {
      this.primaryIdSet = new Set<string>();
    } else if (config.primaryKey.type === 'number') {
      this.primaryIdSet = new Set<number>();
    } else {
      throw new Error('Invalid primary key type');
    }
    this.tableName = tableName;
    this.instanceGenerator = instanceGenerator;
  }
}
