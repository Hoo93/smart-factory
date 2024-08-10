export interface FactoryOption {
  primaryKey: PrimaryKeyOption;
}

export interface PrimaryKeyOption {
  name: string;
  type: 'string' | 'number';
}
