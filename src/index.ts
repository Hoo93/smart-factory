import { defineFactorifyConfig } from './config';
import { FactoryModel } from './model';
import type { Builder } from './builder/builder';
import type { DefineFactoryCallback } from './contracts';
import { FactoryManager } from './factory-manager';

export { defineFactorifyConfig, FactoryModel, Builder };

/**
 * Define a new factory.
 */
export function defineFactory<T extends Record<string, any>>(table: string, cb: DefineFactoryCallback<T>) {
  const tableNameManager = FactoryManager.getInstance();

  if (tableNameManager.hasTableName(table)) {
    throw new Error(`Table name "${table}" already exists.`);
  }

  // Register the table name in the singleton manager
  tableNameManager.addFactory(table);

  return new FactoryModel<T>(table, cb);
}
