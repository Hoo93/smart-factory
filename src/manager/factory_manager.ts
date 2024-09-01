// Singleton class to manage table names
import { RelationManager } from './relation_manager';
import { type DefineFactoryCallback, RelationType } from '../contracts';

export class FactoryManager {
  private static instance: FactoryManager;
  private tableNames: Set<string>;
  private relationManager: RelationManager;

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

  public addFactory(tableName: string) {
    if (this.tableNames.has(tableName)) {
      throw new Error(`Table name "${tableName}" already exists.`);
    }
    this.tableNames.add(tableName);
    this.relationManager.addFactory(tableName);
  }

  public addRelation(tableName: string, targetTableName: string, relationType: RelationType) {
    this.relationManager.addRelation(tableName, targetTableName, relationType);
  }

  public getTableRelation(tableName: string): ReturnType<RelationManager['getRelations']> {
    return this.relationManager.getRelations(tableName);
  }
}
