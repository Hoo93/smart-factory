// Singleton class to manage table names
import { RelationType, TableName, TableRelations } from '../contracts';

export class RelationManager {
  private static instance: RelationManager;

  private _tableNames: Set<TableName>;
  private _tables: Map<TableName, TableRelations>;

  private constructor() {
    this._tableNames = new Set();
    this._tables = new Map();
  }

  public static getInstance(): RelationManager {
    if (!RelationManager.instance) {
      RelationManager.instance = new RelationManager();
    }
    return RelationManager.instance;
  }

  public addFactory(tableName: string) {
    if (this._tableNames.has(tableName)) {
      throw new Error(`Table name "${tableName}" already exists.`);
    }
    this._tableNames.add(tableName);
    this._tables.set(tableName, {
      [RelationType.HasOne]: [],
      [RelationType.HasMany]: [],
      [RelationType.BelongsTo]: [],
    });
  }

  public addRelation(tableName: string, relationType: RelationType, relationName: string) {
    const table = this._tables.get(tableName);
    if (!table) {
      throw new Error(`Table name "${tableName}" does not exist.`);
    }
  }
}
