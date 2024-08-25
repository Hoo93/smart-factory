// Singleton class to manage table names
import { RelationManager } from './relation_manager';

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

  public addFactory(tableName: string) {
    if (this.tableNames.has(tableName)) {
      throw new Error(`Table name "${tableName}" already exists.`);
    }
    this.tableNames.add(tableName);
    this.relationManager.addFactory(tableName);
  }
}
