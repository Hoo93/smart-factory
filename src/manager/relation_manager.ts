// Singleton class to manage table names
import { TableName, TableRelations } from '../contracts';

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
      hasOne: [],
      hasMany: [],
      belongsTo: [],
    });
  }
}
