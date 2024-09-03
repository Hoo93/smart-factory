// Singleton class to manage table names
import { RelationManager } from './relation_manager';
import { type DefineFactoryCallback, RelationType, TableName } from '../contracts';

export class FactoryManager {
  private static instance: FactoryManager;
  private tableNames: Set<string>;
  private relationManager: RelationManager;
  private _tableConstructor: Map<TableName, any> = new Map();
  private _tablePrimaryKey: Map<TableName, string[]> = new Map();

  private constructor() {
    this.tableNames = new Set<string>();
    this.relationManager = new RelationManager();
  }

  public static getInstance(): FactoryManager {
    if (!FactoryManager.instance) {
      FactoryManager.instance = new FactoryManager();
    }
    return FactoryManager.instance;
  }

  public defineFactory<T extends Record<string, any>>(table: string, primaryKey: string[], cb: DefineFactoryCallback<T>) {
    return;
  }

  public addFactory(tableName: string, tableConstructor: any, primaryKey: string[]) {
    if (this.tableNames.has(tableName)) {
      throw new Error(`Table name "${tableName}" already exists.`);
    }
    this.tableNames.add(tableName);
    this.relationManager.addFactory(tableName);
    this._tableConstructor.set(tableName, tableConstructor);
    this._tablePrimaryKey.set(tableName, primaryKey);
  }

  public addRelation(tableName: string, targetTableName: string, relationType: RelationType) {
    this.relationManager.addRelation(tableName, targetTableName, relationType);
  }

  public getTableRelation(tableName: string): ReturnType<RelationManager['getRelations']> {
    return this.relationManager.getRelations(tableName);
  }
}
