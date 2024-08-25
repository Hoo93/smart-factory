// import { Builder } from './builder/builder';
import { RelationType } from './contracts';
import type { DefineFactoryCallback, DefineStateCallback, RelationshipMeta, RelationshipMetaOptions } from './contracts';
import { FactoryManager } from './manager/factory_manager';
import { Builder } from './builder/builder';

export class FactoryModel<
  Model extends Record<string, any>,
  States extends string | null = null,
  Relationships extends string | null = null,
> {
  /**
   * Store the factory callback
   */
  public callback: DefineFactoryCallback<Model>;

  /**
   * Store each state callbacks
   */
  public states: Record<string, DefineStateCallback<Model>> = {};

  /**
   * Store relations metadata
   */
  public relations: Record<string, Omit<RelationshipMeta, 'factory'>> = {};

  /**
   * The SQL table name for the model.
   */
  public tableName: string;

  constructor(tableName: string, callback: DefineFactoryCallback<Model>) {
    this.tableName = tableName;
    this.callback = callback;
  }

  private addRelation(name: string, type: RelationType, meta?: RelationshipMetaOptions) {
    const foreignKey = type === RelationType.BelongsTo ? `${name}_id` : `${this.tableName}_id`;

    FactoryManager.getInstance().addRelation(this.tableName, name, type);
    // this.relations[name] = {
    //   foreignKey,
    //   localKey: 'id',
    //   ...meta,
    //   type,
    // };
    //
    return this;
  }

  /**
   * Allows you to define a new state for the factory.
   */
  public state<S extends string>(name: S, stateCb: DefineStateCallback<Model>): FactoryModel<Model, Extract<States | S, string>> {
    this.states[name] = stateCb;
    return this;
  }

  /**
   * Add hasOne relationship
   *
   * @remark FK is on the belongsTo side
   */
  public hasOne<S extends string>(
    name: S,
    meta?: RelationshipMetaOptions,
  ): FactoryModel<Model, States, Extract<Relationships | S, string>> {
    return this.addRelation(name, RelationType.HasOne, meta);
  }

  /**
   * Add hasMany relationship
   *
   * @remark FK is on the belongsTo side
   */
  public hasMany<S extends string>(
    name: S,
    meta?: RelationshipMetaOptions,
  ): FactoryModel<Model, States, Extract<Relationships | S, string>> {
    return this.addRelation(name, RelationType.HasMany, meta);
  }

  /**
   * Add belongsTo relationship
   *
   * @remark FK is always on the target table
   */
  public belongsTo<S extends string>(
    name: S,
    meta?: RelationshipMetaOptions,
  ): FactoryModel<Model, States, Extract<Relationships | S, string>> {
    return this.addRelation(name, RelationType.BelongsTo, meta);
  }

  /**
   * Returns the Builder
   */
  public build(): Builder<typeof this> {
    return new Builder(this);
  }
}
