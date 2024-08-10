import { FactoryOption, InstanceGeneratorFunction } from './types';
import { Factory } from './factory.interface';

export const defineFactory = <T>(tableName: string, instanceGenerator: InstanceGeneratorFunction<T>, config: FactoryOption) => {
  return new Factory(tableName, instanceGenerator, config);
};
