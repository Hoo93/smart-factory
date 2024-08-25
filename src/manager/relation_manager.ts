// Singleton class to manage table names
import { RelationType, TableName, TableRelations } from '../contracts';

export class RelationManager {
  private _tableNames: Set<TableName>;
  private _tables: Map<TableName, TableRelations>;

  public constructor() {
    this._tableNames = new Set();
    this._tables = new Map();
  }

  public addFactory(tableName: string) {
    if (this._tableNames.has(tableName)) {
      throw new Error(`Table name "${tableName}" already exists.`);
    }
    this._tableNames.add(tableName);
    this._tables.set(tableName, {
      [RelationType.HasOne]: new Set(),
      [RelationType.HasMany]: new Set(),
      [RelationType.BelongsTo]: new Set(),
    });
  }

  public addRelation(tableName: string, targetTableName: string, relationType: RelationType) {
    const table = this._tables.get(tableName);
    const targetTable = this._tables.get(targetTableName);
    if (!table || !targetTable) {
      throw new Error(`Table name "${tableName}" or "${targetTableName}" does not exist.`);
    }

    if (relationType === RelationType.BelongsTo) {
      table[RelationType.BelongsTo].add(tableName);
      targetTable[RelationType.HasMany].add(targetTableName);
    } else if (relationType === RelationType.HasOne) {
      table[RelationType.HasOne].add(targetTableName);
      targetTable[RelationType.BelongsTo].add(tableName);
    } else if (relationType === RelationType.HasMany) {
      table[RelationType.HasMany].add(targetTableName);
      targetTable[RelationType.BelongsTo].add(tableName);
    }
  }

  public getRelations(tableName: string): TableRelations | undefined {
    return this._tables.get(tableName);
  }
}
